import React, { useEffect, useState } from "react";
import { useConnections } from '@/hooks/useConnections';
import { ContentType } from "@/exports/interfaces";

interface ConnectionsProps {
  contents?: ContentType[];
}

const Connections: React.FC<ConnectionsProps> = ({ contents: files }) => {
  const fileNames = files ? files.map(file => file.metadata?.name as string) : [];
  const { connections, loading } = useConnections(fileNames);
  const [displayGraph, setDisplayGraph] = useState<boolean>(false);
  const [asyncLoading, setAsyncLoading] = useState<boolean>(true);

  useEffect(() => {
    const asyncLoadTimeout = setTimeout(() => {
      setAsyncLoading(false);
    }, 1000); // Adjust the delay time as needed

    return () => {
      clearTimeout(asyncLoadTimeout);
    };
  }, []);

  useEffect(() => {
    if (!loading && !asyncLoading) {
      setDisplayGraph(true);
    }
  }, [loading, asyncLoading]);

  return (
    <>
      {/* {displayGraph && <Graph graphData={connections as any} />} */}
    </>
  );
};

export default Connections;
