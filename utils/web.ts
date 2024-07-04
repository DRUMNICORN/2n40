import axios from 'axios';
import { MarkdownParser } from './markdown';
import { ContentType, MetadataType } from '@/utils/interfaces';
import { ContentTypes } from '@/utils/enums';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Generates a complete URL with query parameters.
 * @param endpoint The API endpoint path.
 * @param params Query parameters as key-value pairs.
 * @returns Complete URL as a string.
 */
export const getUrl = (endpoint: string, params: Record<string, any>): string => {
    const url = new URL(`${BASE_API_URL}${endpoint}`);
    let params_ = { ...params };
    
    let hasOne = false;
    Object.entries(params_).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            url.searchParams.append(key, value.toString());
            hasOne = true;
        }
    });

    if (!hasOne) {
        return '';
    }

    
    return url.toString();
};

/**
 * Fetches data from a given URL with optional query parameters.
 * @param url The complete URL to fetch data from.
 * @param params Optional query parameters as key-value pairs.
 * @param cancelToken Axios cancellation token.
 * @returns The fetched data or throws an error.
 */
export const fetchData = async (url: string, params: Record<string, any> = {}, cancelToken?: any): Promise<any> => {
    try {
        const response = await axios.get(url, { params, cancelToken });
        return response.data;
    } catch (error) {
        throw new Error((error as Error).message || 'Unknown error');
    }
};

/**
 * Loads files and their connections based on provided URL, parameters, and category.
 * @param url The URL to fetch data from.
 * @param params Optional query parameters for fetching data.
 * @param category The category of content to load.
 * @param cancelToken Axios cancellation token.
 * @returns Object containing loaded files, connections, and potential error.
 */
export const loadContents = async (url: string, params: Record<string, any> = {}, category: string, cancelToken?: any): Promise<{ files: ContentType[], connections: ContentType[], error: string | null }> => {
    try {
        const fetchedPaths = await fetchData(url, params, cancelToken);
        const newFiles: ContentType[] = [];
        const connectionsSet = new Set<ContentType>();

        if (Array.isArray(fetchedPaths)) {
            for (const path of fetchedPaths) {
                const id = (path || '').split(".")[0];

                if (!id || isNaN(Number(id))) {
                    continue;
                }

                const fileUrl = getUrl('content', { id, category });

                if(fileUrl === '') {
                    continue;
                }

                const data = await fetchData(fileUrl, { id, category }, cancelToken);
                let file: ContentType = MarkdownParser.parse(data);
                file.id = id;
                file.category = ContentTypes[category as keyof typeof ContentTypes];
                newFiles.push(file);

                // Extract and process connections metadata
                const name = data.metadata?.name as string;
                if (name) {
                    connectionsSet.add({ metadata: { name: name.toLowerCase() } as MetadataType } as ContentType);
                }

                const connections = data.connections as string[];
                if (connections && connections.length > 0) {
                    connections.forEach((connection: string) => {
                        connectionsSet.add({ metadata: { name: connection.toLowerCase() } as MetadataType } as ContentType);
                    });
                }
            }
        } else {
            newFiles.push(fetchedPaths as ContentType);
        }

        const connectionsArray = Array.from(connectionsSet);

        return {
            files: newFiles,
            connections: connectionsArray,
            error: null,
        };
    } catch (error) {
        if (axios.isCancel(error)) {
            // Expected error for canceled fetch requests
            return {
                files: [],
                connections: [],
                error: 'Fetch canceled',
            };
        } else {
            // Unexpected errors
            return {
                files: [],
                connections: [],
                error: (error as Error).message || 'Unknown error',
            };
        }
    }
};

/**
 * Fetches a single file by its id and category.
 * @param id The id of the file to fetch.
 * @param category The category of the content to load.
 * @param cancelToken Axios cancellation token.
 * @returns The fetched file data or throws an error.
 */
export const fetchFileById = async (id: number, category: string, cancelToken?: any): Promise<ContentType | null> => {
    try {
        const fileUrl = getUrl('content', { id, category });

        if (fileUrl === '') {
            throw new Error('Invalid file URL');
        }

        const data = await fetchData(fileUrl, { id, category }, cancelToken);
        let file: ContentType = MarkdownParser.parse(data);
        file.id = id;
        file.category = ContentTypes[category as keyof typeof ContentTypes];

        return file;
    } catch (error) {
        return null;
    }
};
