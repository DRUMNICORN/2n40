import { NodeConnectionType } from "@/app/types";
import { getUrl } from "@/utils/web";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

export const useConnections = (names: string[]) => {
    const [connections, setConnections] = useState<NodeConnectionType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchConnections = useCallback(async () => {
        setLoading(true);
        try {
            let mergedNodes: any[] = [];
            let mergedEdges: any[] = [];

            for (const name of names) {
                if (!name) continue;
                const url = getUrl('connections', { name });
                const response = await axios.get(url);

                const nodesToMerge = response.data.nodes.slice(0, 100 - mergedNodes.length);
                mergedNodes = [...mergedNodes, ...nodesToMerge];
                mergedEdges = [...mergedEdges, ...response.data.edges];
            }

            setConnections({
                title: 'Merged Connections',
                nodes: mergedNodes,
                edges: mergedEdges,
            });

            setError(null);
        } catch (error) {
            console.error('Error fetching connections:', error);
            setError((error as Error).message || 'Unknown error');
            setConnections(null);
        } finally {
            setLoading(false);
        }
    }, [names]);

    useEffect(() => {
        if (names.length > 0) {
            fetchConnections();
        }
    }, [fetchConnections, names]);

    return { connections, loading, error };
};
