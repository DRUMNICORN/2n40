import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import axios, { CancelToken } from 'axios';
import { fetchFileById, getUrl, loadContents } from '@/exports/web';
import { ContentType } from '@/exports/interfaces';
import { cacheHandler } from '@/exports/cache';

interface ContentContextType {
    contentFiles: ContentType[];
    isLoading: boolean;
    loadError: string;
    setContentFiles: React.Dispatch<React.SetStateAction<ContentType[]>>;
    fetchContentNode: (id: number, category: string, name?: string) => Promise<ContentType | null>;
    getCachedNodes: (category: string) => ContentType[];
    fetchNodesByCategory: (category: string) => Promise<void>; // Updated return type
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContentContext = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContentContext must be used within a ContentProvider');
    }
    return context;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [contentFiles, setContentFiles] = useState<ContentType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [loadedCategories, setLoadedCategories] = useState<string[]>([]); // Track loaded categories

    const fetchContentNode = useCallback(async (id: number, category: string, name?: string): Promise<ContentType | null> => {
        const cachedNode = cacheHandler.getNode(id, category);
        if (cachedNode) {
            return cachedNode;
        }

        const cancelSource = axios.CancelToken.source();
        try {
            const result = await fetchFileById(id, category, cancelSource.token);
            if (result) {
                cacheHandler.setNode(id, category, result);
                return result;
            }
        } catch (error) {
            if (!axios.isCancel(error)) {
                setLoadError('Error fetching file');
            }
        } finally {
            cancelSource.cancel('Operation canceled due to component unmount or new request.');
        }
        return null;
    }, []);

    const fetchContentFiles = useCallback(async (cancelToken: CancelToken) => {
        try {
            const url = getUrl('contents', {
                // Add necessary query params here if any
            });
            if (!url) return;

            const result = await loadContents(url, {}, '', cancelToken);
            setContentFiles(result.files);
            setLoadError(result.error || '');

            result.files.forEach(file => {
                cacheHandler.setNode(file.id, file.category, file);
            });

            // Track loaded categories
            const loadedCategoriesSet = new Set(loadedCategories);
            result.files.forEach(file => loadedCategoriesSet.add(file.category));
            setLoadedCategories(Array.from(loadedCategoriesSet));
        } catch (error) {
            if (!axios.isCancel(error)) {
                setLoadError('Error fetching files');
            }
        } finally {
            setIsLoading(false);
        }
    }, [loadedCategories]);

    useEffect(() => {
        setIsLoading(true);
        const cancelSource = axios.CancelToken.source();
        fetchContentFiles(cancelSource.token);
        return () => cancelSource.cancel('Operation canceled due to new fetch request.');
    }, [fetchContentFiles]);

    const getCachedNodes = useCallback((category: string): ContentType[] => {
        return cacheHandler.getNodesByCategory(category);
    }, []);

    const fetchNodesByCategory = useCallback(async (category: string): Promise<void> => {
        if (!loadedCategories.includes(category)) { // Check if category is already fully loaded
            try {
                const cancelSource = axios.CancelToken.source();
                const url = getUrl('contents', { category });
                const result = await loadContents(url, { category }, category, cancelSource.token);
                setContentFiles(result.files);
                setLoadError(result.error || '');

                result.files.forEach(file => {
                    cacheHandler.setNode(file.id, file.category, file);
                });

                // Update loaded categories
                const updatedLoadedCategories = [...loadedCategories, category];
                setLoadedCategories(updatedLoadedCategories);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    setLoadError('Error fetching files');
                }
            } finally {
                setIsLoading(false);
            }
        }
    }, [loadedCategories]);

    const contextValue = useMemo(() => ({
        contentFiles,
        isLoading,
        loadError,
        setContentFiles,
        fetchContentNode,
        getCachedNodes,
        fetchNodesByCategory,
    }), [contentFiles, isLoading, loadError, fetchContentNode, getCachedNodes, fetchNodesByCategory]);

    return (
        <ContentContext.Provider value={contextValue}>
            {children}
        </ContentContext.Provider>
    );
};

export default ContentProvider;
