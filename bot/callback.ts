import { Message, CommandType, MessageType, ContentType, MetadataType } from "../app/types";
import { getContent, getMetadataString } from "../utils/string";
import { TelegramService } from "./service";
import { MarkdownParser } from "../utils/markdown";
import fs from "fs";

export class CallbackQueryController {
  constructor(private telegramService: TelegramService) {}

  async handleCallbackQuery(callbackQuery: any): Promise<void> {
    const { message, from, data: command } = callbackQuery;
    const msg: Message = {
      message_id: message.message_id,
      chat_id: message.chat.id,
      user_id: from.id,
      text: message.text || message.caption || "",
      command: command as CommandType,
      content: {} as ContentType,
      reply: {
        message_id: message.reply_to_message?.message_id,
        chat_id: message.reply_to_message?.chat.id,
        user_id: message.reply_to_message?.from.id,
        text: message.reply_to_message?.text || message.reply_to_message?.caption || "",
      } as Message,
    };

    msg.content = getContent(msg);
    msg.reply.content = getContent(msg.reply);


    try {
    switch (command) {
      case CommandType.Confirm:
        await this.handleConfirm(msg);
        break;
      case CommandType.Change:
        await this.handleChange(msg);
        break;
      case CommandType.Cancel:
        await this.handleCancel(msg);
        break;
      case CommandType.Clear:
        await this.telegramService.bot.deleteMessage(msg.chat_id, msg.message_id);
        break;
      default:
        this.telegramService.sendCommandText(msg.chat_id, this.telegramService.getMessage(MessageType.INVALID_COMMAND), [CommandType.Clear]);
        break;
    }
  } catch (error) {
    console.error(error);
  }

    this.telegramService.bot.answerCallbackQuery(callbackQuery.id);
  }

  private async handleConfirm(msg: Message): Promise<void> {
    if (msg.chat_id === this.telegramService.settings.modChannelId) {
      return this.handleModConfirm(msg);
    }

    const generatedMarkdown = MarkdownParser.serialize(msg.content!);
    if (!generatedMarkdown) return;

    const opts = {
      parse_mode: "Markdown",
      reply_markup: { inline_keyboard: this.telegramService.buildInlineKeyboard([CommandType.Confirm, CommandType.Change, CommandType.Cancel]) },
    } as any;

    this.telegramService.bot.sendMessage(this.telegramService.settings.modChannelId, generatedMarkdown, opts);

    this.telegramService.bot.sendMessage(msg.chat_id, `${this.telegramService.getMessage(MessageType.MODERATION_REQUEST)}\n---\n${generatedMarkdown}`, {
      parse_mode: "Markdown",
      reply_markup: { inline_keyboard: this.telegramService.buildInlineKeyboard([CommandType.Clear, CommandType.Change, CommandType.Cancel]) },
    } as any);

    this.telegramService.bot.deleteMessage(msg.chat_id, msg.message_id);
  }

  private handleChange(msg: Message): void {
    const exampleMessage = this.telegramService.getMessage(MessageType.EXAMPLE_MESSAGE);
    const exampleResponse = getMetadataString(exampleMessage);
    this.telegramService.sendCommandText(
        msg.chat_id,
        this.telegramService.getMessage(MessageType.CHANGE_MESSAGE) + "\n" +
        this.telegramService.getMessage(MessageType.EXAMPLE_MESSAGE) + "\n" +
        exampleResponse,
        [CommandType.Clear],
    );

    this.telegramService.sendEditMessage(msg.content as ContentType, [CommandType.Confirm, CommandType.Cancel], msg.chat_id, msg.message_id);
  }

  private async handleSave(content: ContentType): Promise<void> {
    delete content.metadata.confirmed;
    const serializedContent = MarkdownParser.serialize(content);
    if (!serializedContent) return;

    let path = `${this.telegramService.settings.dataDir}/${content.id}.md`;
  
    fs.writeFile(path, serializedContent, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
    );

    content.metadata.path = path;
    const serializedContent2 = MarkdownParser.serialize(content);
    if (!serializedContent2) return;

    this.telegramService.bot.editMessageText(serializedContent2, {
      chat_id: this.telegramService.settings.modChannelId,
      message_id: content.id,
      parse_mode: "Markdown",
      reply_markup: { inline_keyboard: this.telegramService.buildInlineKeyboard([CommandType.Cancel]) },
    });
  }

  private handleModCancel(msg: Message): void {
    const moderatedContent = getContent(msg);

    let path = `${this.telegramService.settings.dataDir}/${moderatedContent.id}.md`;
    let isFileExists = fs.existsSync(path)
    
    if (isFileExists) fs.unlinkSync(path);
    else this.telegramService.sendCommandText(msg.chat_id, this.telegramService.getMessage(MessageType.INVALID_COMMAND), [CommandType.Clear]);
    
    this.telegramService.bot.deleteMessage(msg.chat_id, msg.message_id);
  }

  private handleCancel(msg: Message): void {
    if (msg.chat_id == this.telegramService.settings.modChannelId) {
      return this.handleModCancel(msg);
    }

    const serializedContent = MarkdownParser.serialize(msg.content!).split("---")[0];
    if (!serializedContent) return;

    let text = this.telegramService.getMessage(MessageType.MODERATION_CANCEL_REQUEST) + "\n---\n" + serializedContent + "\n---\n";
    
    this.telegramService.bot.sendMessage(this.telegramService.settings.modChannelId, text, {
      parse_mode: "Markdown",
      reply_markup: { inline_keyboard: this.telegramService.buildInlineKeyboard([CommandType.Clear]) },
    } as any);

    this.telegramService.sendAutoRemovalMessage(msg.chat_id, this.telegramService.getMessage(MessageType.MODERATION_DELETE_REQUEST));

  }

  private async handleModConfirm(msg: Message): Promise<void> {
    const moderatedContent = getContent(msg);

    let member_count_mod_channel = await this.telegramService.bot.getChatMemberCount(this.telegramService.settings.modChannelId)

    let confirmedRegex = /confirmed: (\d+)/g;
    let confirmedCount = 0;
    let match = confirmedRegex.exec(msg.text);
    if (match) {
      confirmedCount = parseInt(match[1]);
    }
    confirmedCount += 1;
    moderatedContent.metadata.confirmed = `${confirmedCount} / ${member_count_mod_channel}`;

    moderatedContent.id = msg.message_id;
    if (confirmedCount >= member_count_mod_channel) {
      return this.handleSave(moderatedContent);
    }

    const serializedContent = MarkdownParser.serialize(moderatedContent);

    this.telegramService.bot.editMessageText(serializedContent, {
      chat_id: this.telegramService.settings.modChannelId,
      message_id: msg.message_id,
      parse_mode: "Markdown",
      reply_markup: { inline_keyboard: this.telegramService.buildInlineKeyboard([CommandType.Confirm, CommandType.Change, CommandType.Cancel]) },
    });
  }
}
