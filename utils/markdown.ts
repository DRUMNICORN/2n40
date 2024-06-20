import { CategoryType, ContentType, MetadataType } from '@/app/types';
export class MarkdownParser {

    static parse(contentString: string): ContentType {
        const [metadataPart, ...contextParts] = contentString.split('---').filter(part => part.trim());
        const context = contextParts[contextParts.length - 1];

        const metadataLines = metadataPart.split('\n').filter(line => line.trim());
        const metadata: MetadataType = {};
        let currentKey: string | null = null;

        for (const line of metadataLines) {
            if (line.replaceAll(" ", "").replaceAll("   ", "").startsWith("-")) {
                if (!currentKey) {
                    continue; // Skip if no key was set
                }
                if (!Array.isArray(metadata[currentKey])) {
                    metadata[currentKey] = []; // Initialize as array if not already
                }
                const trimmedValues = line.split('-');
                // remove first element, which is an empty string
                trimmedValues.shift();
                const trimmedValue = trimmedValues.join('-').trim();
                (metadata[currentKey] as string[]).push(trimmedValue); // Push the trimmed value

            } else {
                const [key, ...valueParts] = line.split(':').map(part => part.trim());
                if (!key || valueParts.length === 0) {
                    continue;
                }

                const value = valueParts.join(':').trim();
                
                if (!isNaN(Number(value))) {
                    if (Number.isInteger(Number(value)) && value !== '') {
                        metadata[key] = Number(value);
                    } else {
                        currentKey = key;
                        metadata[currentKey] = [];
                    }
                } else {
                    metadata[key] = value;
                }
            }
        }

        // fix date
        if (metadata.date) {
            let dateStr = metadata.date as string;
            let dateArr = dateStr.split('.');
            // filter out empty strings
            dateArr = dateArr.filter((date) => date !== '');
            if (dateArr.length < 3) dateArr.push(new Date().getFullYear().toString());
            dateArr = dateArr.reverse();
            // if no year set current year
            metadata.date = dateArr.join('-');
            
            metadata.date = new Date(metadata.date as string).toISOString().split('T')[0].split('-').reverse().join('-');
            // metadata.date = new Date(metadata.date as string).toISOString().split('T')[0];
        }

        let content = {
            id: -1,
            metadata,
            context,
            category: metadata.category as CategoryType,
            connections: [],
            details: {
                created: new Date(),
                creator: 'unknown',
            },
        } as ContentType;


        return content;
    }

    static toJSON(content: ContentType): string {
        return JSON.stringify(content, null, 2);
    }

    static serialize(content: ContentType): string {
        const metadataString = content.metadata
            ? Object.entries(content.metadata)
                .map(([key, value]) => {
                    if (Array.isArray(value)) {
                        return `${key}:\n  - ${value.join('\n  - ')}`;
                    }
                    return `${key}: ${value}`;
                })
                .join('\n') + '\n'
            : '';
        return `${metadataString}---\n${content.context}`;
    }

}
