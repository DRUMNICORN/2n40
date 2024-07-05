import { ContentType } from "./interfaces";

interface CacheHandler {
    getNode: (id: number, category: string) => ContentType | null;
    setNode: (id: number, category: string, node: ContentType) => void;
    getNodesByCategory: (category: string) => ContentType[];
}

class CacheHandlerImpl implements CacheHandler {
    private cache: Record<string, ContentType> = {};

    private generateKey(id: number, category: string): string {
        return `${category}-${id}`;
    }

    getNode(id: number, category: string): ContentType | null {
        const key = this.generateKey(id, category);
        return this.cache[key] || null;
    }

    setNode(id: number, category: string, node: ContentType): void {
        const key = this.generateKey(id, category);
        this.cache[key] = node;
    }

    getNodesByCategory(category: string): ContentType[] {
        return Object.values(this.cache).filter(node => node.category === category);
    }
}

export const cacheHandler = new CacheHandlerImpl();
