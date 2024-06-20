import fs from 'fs';

import { ContentType } from "@/app/types";

const DATA_DIR = './data/';

export function loadFiles(query: ContentType): string[] {
    const dir = `${DATA_DIR}${query.category}`;
    return fs.readdirSync(dir);
}

export function loadFile(id: string, category: string): string {
    return fs.readFileSync(`${DATA_DIR}/${category}/${id}.md`, 'utf-8');
}
