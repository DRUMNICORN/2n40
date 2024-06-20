import { Message, MessageType, CommandType, ContentType, DetailsType } from "../app/types";
import { getContent, getMetadataString } from "../utils/string";
import { TelegramService } from "./service";

export class MessageController {
  handleCommand(message: any) {
    if (message.text?.startsWith("/")) {
      const command = message.text.split(" ")[0].substring(1);
      if (command === CommandType.Start) {
        this.handleStart(message);
      } else {
        this.telegramService.sendAutoRemovalMessage(message.chat_id, this.telegramService.getMessage(MessageType.INVALID_COMMAND));
      }
    }
  }
  constructor(private telegramService: TelegramService) {}

  handleStart(msg: Message): void {
    this.telegramService.sendCommandText(msg.chat_id, this.telegramService.getMessage(MessageType.WELCOME), [CommandType.Create]);
  }

  handleCreate(msg: Message): void {
    msg.content = msg.content;
    
    this.telegramService.sendCommandMarkdown(msg, [CommandType.Change, CommandType.Cancel, CommandType.Confirm]);
    this.telegramService.bot.deleteMessage(msg.chat_id, msg.message_id);
  }

  handleChange(msg: Message): void {
    let oldContent = msg.reply.content as ContentType;
    let newContent = msg.content as ContentType;

    let mergedContent = this.mergeContent(oldContent, newContent);


    if (oldContent.context === mergedContent.context) {
      this.telegramService.sendAutoRemovalMessage(msg.chat_id, this.telegramService.getMessage(MessageType.NO_CHANGES_DETECTED));
    } else {
      this.telegramService.sendEditMessage(mergedContent, [CommandType.Change, CommandType.Cancel, CommandType.Confirm], msg.chat_id, msg.reply.message_id);
    }

    this.telegramService.bot.deleteMessage(msg.chat_id, msg.message_id);
  }

  private mergeContent(oldContent: ContentType, newContent: ContentType): ContentType {
    let mergedMetadata = { ...oldContent.metadata, ...newContent.metadata };

    let oldContext = oldContent.context;
    let newContext = newContent.context;

    let mergedContent: ContentType = {
      id: newContent.id,
      metadata: mergedMetadata,
      context: newContext,
      category: newContent.category,
      connections: newContent.connections,
      details: {
      } as DetailsType
    };

    let newMergedValues = Object.values(mergedMetadata);
    let newContextWithoutMergedValues = newContext;

    for (let value of newMergedValues) {
      const regex = new RegExp(value as string, 'gi');
      newContextWithoutMergedValues = newContextWithoutMergedValues.replace(regex, "");
    }

    let newContextWithoutMergedValuesTrimmed = newContextWithoutMergedValues.trim();
    if (newContextWithoutMergedValuesTrimmed === "") {
      mergedContent.context = oldContext;
      for (let [oldValue, newValue] of Object.entries(mergedMetadata)) {
        const regex = new RegExp(oldValue, 'gi');
        mergedContent.context = mergedContent.context.replace(regex, newValue as string);
      }
    }

    return mergedContent;
  }
}
