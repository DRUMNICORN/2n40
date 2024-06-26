import axios from 'axios';
import { MetadataTypes, ContentType, MetadataType } from '@/app/types';
import { MarkdownParser } from './markdown';

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
    if (!params_.category) {
        params_.category = MetadataTypes.collaborations;
    }
    Object.entries(params_).forEach(([key, value]) => {
        if (value) {
            url.searchParams.append(key, value.toString());
        }
    });
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
                const id = path.split(".")[0];
                const fileUrl = getUrl('content', { id, category });

                const data = await fetchData(fileUrl, { id, category }, cancelToken);
                let file: ContentType = MarkdownParser.parse(data);
                file.id = id;
                file.category = MetadataTypes[category as keyof typeof MetadataTypes];
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
