import { NextRequest, NextResponse } from 'next/server';
import { ContentType, NodeConnectionType } from '@/app/types';
import { parseContentFromNextRequest, areParamsEmpty } from '@/utils/next';
import { loadFile, loadFiles } from './file';
import { createResponse } from './next';
// import { MarkdownParser } from './markdown'; // Assuming MarkdownParser is not used in this snippet

// Handler for GET request to fetch a single file
export async function handleFileGet(req: NextRequest, res: NextResponse): Promise<Response> {
    const params = parseContentFromNextRequest(req);
    const { id: fileId, category: fileCategory } = params;

    if (!fileId) {
        return createResponse({ error: "fileId parameter is missing" }, 400);
    }

    try {
        const file = await loadFile(fileId.toString(), fileCategory || "collaborations");

        if (!file) {
            return createResponse({ error: "file not found" }, 404);
        }

        // Process file content (if needed)
        // const content = MarkdownParser.parse(file || "");
        // content.id = Number(fileId);

        return createResponse(file, 200);
    } catch (error) {
        return createResponse({ error: "Error loading file" }, 500);
    }
}

// Handler for POST requests to update a file
export async function handleFilePost(req: NextRequest, res: NextResponse): Promise<Response> {
    const newFile = await req.json() as ContentType;
    const { id: fileId } = newFile;

    if (!fileId) {
        return createResponse({ error: "fileId parameter is missing" }, 400);
    }

    try {
        const existingFile = await loadFile(fileId.toString(), newFile.category || "collaborations");

        if (!existingFile) {
            return createResponse({ error: "file not found" }, 404);
        }

        // TODO: Implement changes to save file
        // const changes: Change[] = getChanges(existingFile, newFile);
        // if (changes.length === 0) {
        //     return createResponse({ error: "no changes" }, 400);
        // }

        // const changesFile = generateChangesFile(newFile, existingFile.name);
        // saveFile(changesFile);

        return createResponse({ file: existingFile }, 200);
    } catch (error) {
        return createResponse({ error: "Error updating file" }, 500);
    }
}

// Handler for GET requests to fetch multiple files
export async function handleFilesGet(req: NextRequest, res: NextResponse): Promise<Response> {
    const params = parseContentFromNextRequest(req);
    console.log("params", params);

    if (areParamsEmpty(params)) {
        return createResponse([], 200);
    }

    try {
        const files = await loadFiles(params);
        return createResponse(files, 200);
    } catch (error) {
        return createResponse({ error: "Error loading files" }, 500);
    }
}

// Handler for GET requests to fetch connections
export async function handleConnectionsGet(req: NextRequest, res: NextResponse): Promise<Response> {
    const params = parseContentFromNextRequest(req);
    const { id: fileId, metadata } = params;

    if (!metadata?.name) {
        return createResponse({ error: "metadata.name parameter is missing" }, 400);
    }

    try {
        const file = await loadFile(fileId?.toString() || "", params.category || "collaborations");

        if (!file) {
            return createResponse({ error: "file not found" }, 404);
        }

        // const connection = await findConnections(file);

        // const relation: NodeConnectionType = {
        //     title: file.name,
        //     nodes: connection.nodes,
        //     edges: connection.edges,
        // };

        // return createResponse(relation, 200);
        
        // For now, returning an empty relation as per original code
        return createResponse({ title: 'No file found', nodes: [], edges: [] }, 200);
    } catch (error) {
        return createResponse({ error: "Error fetching connections" }, 500);
    }
}
