import { useEffect, useState } from 'react';
import axios, { CancelToken } from 'axios';
import { fetchFileById, getUrl } from '@/utils/web';
import { ContentType } from '@/exports/interfaces';

interface UseContentControllerReturn {
    contentFile: ContentType | null;
    isLoading: boolean;
    loadError: string;
    relatedContents: ContentType[];
}

const useContent = (id: number | undefined, category: string, name?: string): UseContentControllerReturn => {
    const [contentFile, setContentFile] = useState<ContentType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [relatedContents, setRelatedContents] = useState<ContentType[]>([]);

    useEffect(() => {
        const fetchContent = async (cancelToken: CancelToken) => {
            setIsLoading(true);
            try {
                // Check if id is defined
                if (!id) {
                    setIsLoading(false);
                    return;
                }

                // Construct URL based on parameters
                const url = getUrl('contents', {
                    id,
                    name: name || undefined,
                    category,
                });

                if (!url) {
                    setIsLoading(false);
                    return;
                }

                // Fetch content
                const result = await fetchFileById(id, category, cancelToken);
                
                if (!result) {
                    setIsLoading(false);
                    return;
                }   
                


                setContentFile(result);
                // setRelatedContents(result.connections);
                setLoadError('');
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Error fetching file:', error);
                    setLoadError('Error fetching file');
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            const cancelSource = axios.CancelToken.source();
            fetchContent(cancelSource.token);

            return () => {
                cancelSource.cancel('Operation canceled due to new fetch request.');
            };
        } else {
            setIsLoading(false);
        }
    }, [id, category, name]);

    return {
        contentFile,
        isLoading,
        loadError,
        relatedContents,
    };
};

export default useContent;
