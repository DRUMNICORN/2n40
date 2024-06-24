import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios, { CancelToken } from 'axios';
import { getUrl, loadContents } from '@/utils/web';
import { CategoryType, ContentType, MetadataType } from '@/app/types';
import { useQuery } from '@/providers/QueryProvider';

interface UseContentControllerReturn {
  contentFiles: ContentType[];
  isLoading: boolean;
  loadError: string | null;
  relatedContents: ContentType[];
}

interface SearchParamsController {
  // param: MetadataType;
  // setParam: (key: string, value: string | number | string[] | null) => void;
  // getParam: (key: string) => string | number | string[] | null;
  // toggleParam: (key: keyof SearchParamsController['param'], value: string) => void;
  syncSearchParams: () => void;
}

export const useContent = (): UseContentControllerReturn & SearchParamsController => {
  const [contentFiles, setContentFiles] = useState<ContentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [relatedContents, setRelatedContents] = useState<ContentType[]>([]);

  // const [param, setParamState] = useState<MetadataType>({} as MetadataType);
  const { param, setParam, toggleParam, setParamState
  } = useQuery();
  const { connections: paramConnections, name: paramName, category: paramCategory } = param;

  const searchParams = useSearchParams();

  useEffect(() => {
    const updateParamFromQuerys = () => {
      const newParam = {
        name: searchParams.get('name') || '',
        connections: (searchParams.get('connections')?.split(',') || []).filter(Boolean),
        category: searchParams.get('category') || CategoryType.Collaboration,
      };

      updateDecodedHash();
      setParamState(newParam);
    };
    updateParamFromQuerys();
    window.addEventListener('popstate', updateParamFromQuerys);
    return () => window.removeEventListener('popstate', updateParamFromQuerys);
  }, []);

  const syncSearchParams = useCallback(() => {
    const params = new URLSearchParams();
    const path = window.location.pathname.split('/').filter(p => p)[0];

    for (const [key, value] of Object.entries(param)) {
      if (!value) continue;
      if (key === 'category' && value === path) continue;
      if (Array.isArray(value) && value.length) {
        params.set(key, value.join(','));
      } else if (typeof value === 'string' && value.trim()) {
        params.set(key, value);
      }
    }
    // updateDecodedHash();
    const newUrl = `${window.location.pathname}?${params}`;
    window.history.replaceState({}, '', newUrl);
  }, [param]);

  // useEffect(() => {
  //   const path = window.location.pathname.split('/').filter(p => p)[0];
  //   setParamState(prev => ({ ...prev, category: path || CategoryType.Collaboration }));
  //   updateDecodedHash()
  // }, []);

  const updateDecodedHash = useCallback(() => {
    const hash = window.location.hash;
    if (hash) {
      const name = decodeURI(hash.replace('#', ''));
      setParam('name', name);	
      // setParamState(prev => ({ ...prev, name }));
    } else {
      const currentPath = window.location.pathname;
    }
  }, []);

  const filter = useCallback((content: ContentType): boolean => {
    const itemName = (content.metadata?.name as string || '').toLowerCase();
    const itemConnections = (content.metadata?.connections as string[] || []).map(c => c.toLowerCase());
    const isNameIncluded = !paramName || itemName.includes((paramName as string).toLowerCase());
    const isConnectionsIncluded = !(paramConnections as string[] || []).length || (paramConnections as string[] || []).every(conn => itemConnections.includes(conn.toLowerCase()) || itemName.includes(conn.toLowerCase()) || content.context?.includes(conn.toLowerCase()));
    return isNameIncluded && isConnectionsIncluded;
  }, [paramName, paramConnections]);

  const url = useMemo(() => getUrl('contents', {
    name: paramName,
    connections: (paramConnections as string[] || []).join(','),
    category: paramCategory,
  }), [paramName, paramConnections, paramCategory]);

  // const [lastUrl, setLastUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchContentFiles = async (cancelToken: CancelToken) => {
      setIsLoading(true);
      try {

        const result = await loadContents(url, { name: paramName, connections: paramConnections || []}, paramCategory as string, cancelToken);
        setContentFiles(result.files);
        setRelatedContents(result.connections);
        setLoadError(result.error || null);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error('Error fetching files:', error);
          setLoadError('Error fetching files');
        }
      } finally {
        setIsLoading(false);
      }
    };

    const cancelSource = axios.CancelToken.source();
    fetchContentFiles(cancelSource.token);
    return () => cancelSource.cancel('Operation canceled due to new fetch request.');
  }, [paramConnections]);

  useEffect(() => {
    syncSearchParams();
  }, [param, syncSearchParams]);

  return {
    contentFiles: contentFiles.filter(filter),
    isLoading,
    loadError,
    relatedContents,
    // param,
    // setParam,
    // getParam,
    // toggleParam,
    syncSearchParams,
  };
};
