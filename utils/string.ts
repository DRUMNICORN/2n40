import { ContentType, Message, MetadataType, REGEX_MATRIX } from "../app/types";

export function getMetadataString(context: string): MetadataType {
  const metadata: MetadataType = {};
  if (!context) return metadata;
  for (const [key, regexList] of Object.entries(REGEX_MATRIX)) {
    for (const regex of regexList) {
      const insensitiveRegex = new RegExp(regex.source, 'i');
      const match = context.match(insensitiveRegex);
      if (match) {
        metadata[key] = match[0];
        context = context.replace(match[0], "").trim();
        break;
      }
    }
  }

  if (metadata.address){
    // it must contain chemnitz and no other regex
    let isChemnitz = false;

    let address = metadata.address;

    if ((address as string).toLowerCase().includes("chemnitz"))
      isChemnitz = true;

    if (!isChemnitz) {
      delete metadata.address
    }
  }

  if (metadata.name) {
    metadata.name = (metadata.name as string).replace("name:", "").replace(":", "").trim();
  }

  return metadata;
}

export function getContent(message: Message): ContentType {
  let context = message.text || "";
  if (context.includes("---")) {
    const contextValues = context.split("---");
    if (contextValues.length > 1) {
      context = contextValues[contextValues.length - 1].trim();
    }
  }

  const metadata = getMetadataString(message.text || "");

  let content: ContentType = {
    id: message.message_id,
    metadata,
    context: context,
  } as ContentType;

  return content;
}
