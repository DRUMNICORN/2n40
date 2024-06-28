// import { Edge, Node } from "vis-network";
import { connectionRegex, costRegex, dateRegex, timeRegex } from '../utils/regex';
import { Metadata as NextMetadata } from 'next';

export const FILTER_REGEX: { [key: string]: RegExp } = {
  date: dateRegex,
  cost: costRegex,
  time: timeRegex,
  connection: connectionRegex,
};

// Enum for metadata types
export enum ContentTypes {
  default = "default",
  website = "website",
  mail = "mail",
  date = "date",
  price = "price",
  time = "time",
  address = "address",
  tel = "tel",
  instagram = "instagram",
  youtube = "youtube",
  soundcloud = "soundcloud",
  spotify = "spotify",
  facebook = "facebook",
  bandcamp = "bandcamp",
  telegram = "telegram",
  twitter = "twitter",
  add = "add",
  name = "name",
  description = "description",
  category = "category",
  concepts = "concepts",
  connections = "connections",
  collectives = "collectives",
  collaborations = "collaborations",
  creatives = "creatives",
  info = "info",
  close = "close",
  share = "share",
  days = "days",
  weeks = "weeks",
  carousel = "carousel",
  github = "github",
  form = "form",
  search = "search"
}

// Descriptions for different categories
export const CATEGORY_DESCRIPTIONS: { [key: string]: string } = {
  collaborations: "Veranstaltungen, die durch kreative Konzepte entstehen.",
  collectives: "Gruppen, die gemeinsam inspirierende Inhalte erstellen.",
  creatives: "Inhaltsschöpfer, die ihre Vorstellungskraft in die Tat umsetzen.",
  concepts: "Ideen, die unseren Content formen.",
};

// Metadata for the site
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
} as NextMetadata


export interface NodeConnectionType {
  title: string;
  nodes: any[];
  edges: any[];
}

export enum RelationType {
  Left = "left",
  Right = "right",
  Center = "center",
  Above = "above",
  Below = "below",
  Inside = "inside",
  Outside = "outside",
  Before = "before",
  After = "after",
  Next = "next",
  Previous = "previous",
}

export interface ContentConnectionType {
  relation?: RelationType;
  connection?: ContentType;
}

export const CITY: string = "Chemnitz";

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

export enum CommandType {
  Start = "start",
  Confirm = "confirm",
  Cancel = "cancel",
  Change = "change",
  Create = "create",
  Check = "check",
  Connect = "connect",
  Clear = "clear",
}

export enum StatusType {
  Creating = "creating",
  Created = "created",
  Canceled = "canceled",
  Changed = "changed",
  Confirmed = "confirmed",
  Changing = "changing",
  Closed = "closed",
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


// Define an enum for languages
export enum Language {
  EN = 'en',
  DE = 'de',
}

// Define an enum for message types
export enum MessageType {
  WELCOME = "welcome",
  UNKNOWN = "unknown",
  INVALID_COMMAND = "invalid_command",
  NO_CHANGES_DETECTED = "no_changes_detected",
  NO_CONTENT_DETECTED = "no_content_detected",
  FAILED_TO_DELETE_MESSAGE = "failed_to_delete_message",
  FAILED_TO_SEND_MESSAGE = "failed_to_send_message",
  EVENT_MANAGER_BOT = "event_manager_bot",
  EXAMPLE_MESSAGE = "example_message",
  EXAMPLE_RESPONSE = "example_response",
  CHANGE_MESSAGE = "change_message",
  MODERATION_POLL = "moderation_poll",
  MODERATION_APPROVE = "moderation_approve",
  MODERATION_REQUEST = "moderation_request",
  MODERATION_REJECT = "moderation_reject",
  MODERATION_DELETE_REQUEST = "moderation_delete_request",
  NOT_CREATED_YET = "not_created_yet",
  MODERATION_CANCEL = "moderation_cancel",
  MODERATION_CANCEL_REQUEST = "moderation_cancel_request",
}

export const i18n: Record<Language, Record<MessageType, string>> = {
  [Language.EN]: {
    [MessageType.UNKNOWN]: "🤔 Unknown",
    [MessageType.WELCOME]: "👋 Welcome to the Event Manager Bot! 🎉\nThis bot is your trusty sidekick for managing events. You can create, edit, and delete events with ease. To create an event, just send a message with the event details. To edit an event, reply to the event message with the updated info. To delete an event, simply delete the event message. Easy peasy!",
    [MessageType.INVALID_COMMAND]: "🚫 Oops! Invalid command 😅",
    [MessageType.NO_CHANGES_DETECTED]: "🕵️ No changes detected",
    [MessageType.NO_CONTENT_DETECTED]: "✍️ Please provide some content",
    [MessageType.FAILED_TO_DELETE_MESSAGE]: "❌ Failed to delete message: {error}",
    [MessageType.FAILED_TO_SEND_MESSAGE]: "❌ Failed to send message: {error}",
    [MessageType.EVENT_MANAGER_BOT]: "Event Manager Bot",
    [MessageType.EXAMPLE_MESSAGE]: "🕛 12 PM, 📅 12/12/2021, 🎟️ Free Entry, Name: Event Name",
    [MessageType.EXAMPLE_RESPONSE]: "```json\n{example_response}\n```",
    [MessageType.CHANGE_MESSAGE]: "🔄 To change a message, reply to the message you want to change with the new content",
    [MessageType.MODERATION_POLL]: "🗳️ Moderation Poll",
    [MessageType.MODERATION_APPROVE]: "✅ Moderation Approved",
    [MessageType.MODERATION_REQUEST]: "🚀 Your changes have been submitted for moderation. Please wait for approval.",
    [MessageType.MODERATION_REJECT]: "❌ Moderation Rejected",
    [MessageType.MODERATION_DELETE_REQUEST]: "🗑️ Delete Request",
    [MessageType.NOT_CREATED_YET]: "🚧 This hasn't been created or released yet",
    [MessageType.MODERATION_CANCEL]: "🚫 Moderation Cancelled",
    [MessageType.MODERATION_CANCEL_REQUEST]: "❌ *Moderation Cancel Request*",
  },
  [Language.DE]: {
    [MessageType.UNKNOWN]: "🤷 Unbekannt",
    [MessageType.WELCOME]: "👋 **Willkommen beim Event Manager Bot!** 🎉\nDieser Bot ist dein treuer Helfer für die Verwaltung von Veranstaltungen. Du kannst Veranstaltungen erstellen, bearbeiten und löschen. Um eine Veranstaltung zu erstellen, sende einfach eine Nachricht mit den Veranstaltungsdetails. Um eine Veranstaltung zu bearbeiten, antworte auf die Veranstaltungsnachricht mit den aktualisierten Infos. Zum Löschen einer Veranstaltung, lösche einfach die Veranstaltungsnachricht. Kinderleicht!",
    [MessageType.INVALID_COMMAND]: "🚫 Ups! Ungültiger Befehl 😅",
    [MessageType.NO_CHANGES_DETECTED]: "🕵️ Keine Änderungen festgestellt",
    [MessageType.NO_CONTENT_DETECTED]: "✍️ Bitte Inhalt angeben",
    [MessageType.FAILED_TO_DELETE_MESSAGE]: "❌ Fehler beim Löschen der Nachricht: {error}",
    [MessageType.FAILED_TO_SEND_MESSAGE]: "❌ Fehler beim Senden der Nachricht: {error}",
    [MessageType.EVENT_MANAGER_BOT]: "Event Manager Bot",
    [MessageType.EXAMPLE_MESSAGE]: "🕛 12 Uhr, 📅 12.12.2021, 🎟️ Eintritt frei, Name: Event Name",
    [MessageType.EXAMPLE_RESPONSE]: "```json\n{example_response}\n```",
    [MessageType.CHANGE_MESSAGE]: "🔄 Um eine Nachricht zu ändern, antworte mit dem neuen Inhalt auf die Nachricht, die du ändern möchtest",
    [MessageType.MODERATION_POLL]: "🗳️ Moderation Abstimmung",
    [MessageType.MODERATION_APPROVE]: "✅ Moderation Genehmigt",
    [MessageType.MODERATION_REQUEST]: "🚀 Deine Änderungen wurden zur Moderation eingereicht. Bitte warte auf die Genehmigung.",
    [MessageType.MODERATION_REJECT]: "❌ Moderation Abgelehnt",
    [MessageType.MODERATION_DELETE_REQUEST]: "🗑️ Löschanfrage",
    [MessageType.NOT_CREATED_YET]: "🚧 Dies wurde noch nicht erstellt oder veröffentlicht",
    [MessageType.MODERATION_CANCEL]: "🚫 Moderation Abgebrochen",
    [MessageType.MODERATION_CANCEL_REQUEST]: "❌ *Moderation Abbruch Anfrage*",
  }
};
