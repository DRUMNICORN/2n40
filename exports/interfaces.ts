// interfaces.ts
import { ContentTypes, RelationType, CommandType, StatusType } from './enums';

export interface NodeConnectionType {
    title: string;
    nodes: any[];
    edges: any[];
}

export interface ContentConnectionType {
    relation?: RelationType;
    connection?: ContentTypes;
}

export interface MetadataType {
    [key: string]: string | string[] | number;
}

export interface ChangeType {
    type: string;
    key: string;
    post: string;
    past: string;
}

export interface DetailsType {
    created: Date;
    creator: string;
    lastEdit?: Date;
    editor?: string;
}

export interface ContentType {
    id: number;
    category: ContentTypes;
    metadata: MetadataType;
    context: string;
    connections: ContentConnectionType[];
    details: DetailsType;
}

export interface Message {
    user_id?: number;
    chat_id: number;
    message_id: number;
    text: string;
    reply: Message;
    command?: CommandType;
    content: ContentType;
}
