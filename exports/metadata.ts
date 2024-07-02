// metadata.ts
import { Metadata as NextMetadata } from 'next';

export const SITE_METADATA = {
    title: "Singularity",
    description: "Singularity is a hub dedicated to exploring and showcasing various subcultures from around the world.",
    abstract: "Singularity is a platform that connects and highlights diverse subcultures, providing a space for a creative's expression, unique concepts, and collaborative efforts.",
    keywords: ["Singularity", "Subcultures", "Creative Expressions", "Unique Concepts", "Collectives", "Collaborations", "Chemnitz"],
    applicationName: "Singularity Subculture Hub",
    authors: [
        {
            name: "Robin Seerig",
            email: "robin@seerig.de",
            phone: "+49 176 12345678",
            address: "Chemnitz, Germany",
        },
        {
            name: "Singularity",
            url: "https://singularity.2n40.eu",
        },
    ],
    robots: "index, follow",
} as NextMetadata;

export const CATEGORY_DESCRIPTIONS: { [key: string]: string } = {
    collaborations: "Veranstaltungen, die durch kreative Konzepte entstehen.",
    collectives: "Gruppen, die gemeinsam inspirierende Inhalte erstellen.",
    creatives: "Inhaltsschöpfer, die ihre Vorstellungskraft in die Tat umsetzen.",
    concepts: "Ideen, die unseren Content formen.",
};
