
// Regular expressions for different filters
export const dateRegex = /(\d{1,2})\.(\d{1,2})\.(\d{2,4})/;
export const costRegex = /(\d{1,2})€/;
export const timeRegex = /(\d{1,2})(doors|close)/;
export const connectionRegex = /(\[\[.*?\]\]|.*?\|\[\[.*?\]\])/;

// Regular expressions matrix for different categories
export const REGEX_MATRIX: Record<string, RegExp[]> = {
    address: [/\b[A-Za-zÄÖÜäöüß]+(?:\s[A-Za-zÄÖÜäöüß]+)*\s\d{1,5}\s[A-Za-zÄÖÜäöüß]+(?:\s[A-Za-zÄÖÜäöüß]+)*\b/i],
    time: [/\d{1,2}:\d{2} Uhr?/, /\d{1,2} Uhr/, /\d{1,2}:\d{2} (am|pm)/, /\d{1,2} (am|pm)/, /\d{1,2}:\d{2} (am|pm)/],
    date: [/\d{4}-\d{2}-\d{2}/, /\d{1,2}\.\d{1,2}\.\d{4}/, /\d{1,2}\.\d{1,2}\./, /\bheute\b/],
    price: [/eintritt.*frei/i, /eintritt.*kostenlos/i, /\bkostenlos\b/i, /\d{1,2}€/i, /\d{1,2} €/i, /free/],
    website: [/\bhttps?:\/\/\S+/],
    name: [/\bname:.*\b/i, /\b.*\b/i],
    location: [/\[\[.*?\]\]/i]

};

export const linkRegex = /\[\[([^\]]+)\]\]/g;
export const headerRegex = /^(#+)\s+(.+)/gm;
export const hrefRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;
export const noteRegex = />(.+)/gm;
export const boldRegex = /\*\*(.*?)\*\*/g; // Regex to match text between **
export const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g; // Regex to match URLs
export const lineRegex = /\n/gm;
export const confirmedRegex = /confirmed: .*/i;
export const dateSplitRegex = /[-.]/gm;


export const FILTER_REGEX: { [key: string]: RegExp } = {
    date: dateRegex,
    cost: costRegex,
    time: timeRegex,
    connection: connectionRegex,
};
