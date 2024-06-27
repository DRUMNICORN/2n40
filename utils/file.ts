import fs from 'fs';
import path from 'path';

import { ContentType } from "@/app/types";

const DATA_DIR = path.resolve('./data/');

function isPathSafe(base: string, target: string): boolean {
    const relative = path.relative(base, target);
    return !relative.startsWith('..') && !path.isAbsolute(relative);
}

export function loadFiles(query: ContentType): string[] {
    const dir = path.join(DATA_DIR, query.category);

    if (!isPathSafe(DATA_DIR, dir)) {
        throw new Error('Invalid path');
    }

    return fs.readdirSync(dir);
}

export function loadFile(id: string, category: string): string {
    const filePath = path.join(DATA_DIR, category, `${id}.md`);

    if (!isPathSafe(DATA_DIR, filePath)) {
        throw new Error('Invalid path');
    }

    return fs.readFileSync(filePath, 'utf-8');
}
