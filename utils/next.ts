import { ReadonlyURLSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { ContentType } from "./interfaces";
import { ContentTypes } from "./enums";

export const createResponse = (body: any, status: number): Response => {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const parseContentFromMockRequest = (req: Request): ContentType => JSON.parse((req as any).body) as ContentType;


export const parseContentFromNextRequest = (req: NextRequest): ContentType => {
    const categoryString = req.nextUrl.searchParams.get("category") || "";
    const category: ContentTypes = categoryString as ContentTypes;

    const name = req.nextUrl.searchParams.get("name") || "";

    const date = req.nextUrl.searchParams.get("date") || "";

    const connectionsParam = req.nextUrl.searchParams.get("connections") || "";
    const connections = connectionsParam.split(",").filter(Boolean);

    const id = Number(req.nextUrl.searchParams.get("id") || "");

    let content = { id, category, metadata: { name, date }, // TODO: maybe connections in here?
        context: req.nextUrl.searchParams.get("context") || "",
        details: {
            created: new Date(),
            creator: "unknown",
        },
        connections: connections, 
    } as ContentType;

    return content;
    // return { id, category, metadata: { name, date, connections } };
}


export const parseContentFromURLSearchParams = (searchParams: ReadonlyURLSearchParams): ContentType => {
    const categoryString = searchParams.get("category") || "";
    const category: ContentTypes = categoryString as ContentTypes;

    const name = searchParams.get("name") || "";

    const date = searchParams.get("date") || "";

    const connectionsParam = searchParams.get("connections") || "";
    const connections = connectionsParam.split(",").filter(Boolean);

    const id = Number(searchParams.get("id") || "");

    let content = { id, category, metadata: { name, date }, // TODO: maybe connections in here?
        context: searchParams.get("context") || "",
        details: {
            created: new Date(),
            creator: "unknown",
        },
        connections: connections, 
    } as ContentType;

    return content;
    // return { id, category, metadata: { name, date, connections } };
}


export const areParamsEmpty = (params: ContentType): boolean => {
    return Object.values(params).every(param => param === "" || (Array.isArray(param) && param.length === 0));
}

