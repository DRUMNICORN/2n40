import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios, { CancelToken } from 'axios';
import { getUrl, loadContents } from '@/utils/web';
import { ContentTypes, ContentType } from '@/app/types';
import { useQuery } from '@/providers/QueryProvider';
import { useContentOverlay } from '@/providers/OverlayProvider';

interface UseContentControllerReturn {
  contentFiles: ContentType[];
  isLoading: boolean;
  loadError: string;
  relatedContents: ContentType[];
}

interface SearchParamsController {
}

export const useContents = (): UseContentControllerReturn & SearchParamsController => {
  const [contentFiles, setContentFiles] = useState<ContentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [relatedContents, setRelatedContents] = useState<ContentType[]>([]);
  const { param, setParamState } = useQuery();
  const { connections: paramConnections, name: paramName, category: paramCategory } = param;
  const searchParams = useSearchParams();
  const updateParamFromQuerys = useCallback(() => {
    const hash = window.location.hash || '';
    let name = hash ? decodeURI(hash.replace('#', '')) : searchParams.get('name') || '';

    const newParam = {
      name,
      connections: (searchParams.get('connections')?.split(',') || []).filter(Boolean),
      category: searchParams.get('category') as ContentTypes,
    };

    setParamState(newParam);
  }, []);

  const url = useMemo(() => getUrl('contents', {
    name: paramName || undefined,
    connections: (paramConnections as string[] || []).join(',') || undefined,
    category: paramCategory || undefined,
  }), [paramName, paramConnections, paramCategory]);

  const syncSearchParams = useCallback(() => {
    const params = new URLSearchParams();
    const path = window.location.pathname.split('/').filter(p => p)[0];
    let hash = window.location.hash || '';

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
    const newUrl = `${window.location.pathname}?${params}${hash}`;
    window.history.replaceState({}, '', newUrl);
  }, [param]);  
  
  const filter = useCallback((content: ContentType): boolean => {
    const itemName = (content.metadata?.name as string || '').toLowerCase();
    const itemConnections = (content.metadata?.connections as string[] || []).map(c => c.toLowerCase());
    const isNameIncluded = !paramName || itemName.includes((paramName as string).toLowerCase());
    const isConnectionsIncluded = !(paramConnections as string[] || []).length || (paramConnections as string[] || []).every(conn => itemConnections.includes(conn.toLowerCase()) || itemName.includes(conn.toLowerCase()) || content.context?.includes(conn.toLowerCase()));
    return isNameIncluded && isConnectionsIncluded;
  }, [paramName, paramConnections]);

  useEffect(() => {
    updateParamFromQuerys();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchContentFiles = async (cancelToken: CancelToken) => {
      try {

        if (!url) return;

        const result = await loadContents(url, { name: paramName, connections: paramConnections || [] }, paramCategory as string, cancelToken);
        setContentFiles(result.files);
        setRelatedContents(result.connections);
        setLoadError(result.error || '');
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
  };
};
