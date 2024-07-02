import TelegramBot from "node-telegram-bot-api";
import { CommandType, ContentType, Language, MessageType, Message, i18n } from "../exports/types";
import { MarkdownParser } from "../utils/markdown";
import dotenv from "dotenv";
// telegram message type

export class TelegramService {
  public bot: TelegramBot;
  private currentLanguage: Language = Language.DE;
  private settings: {
    telegramBotToken?: string;
    modChannelId?: number;
    dataDir?: string;
  };

  public getModChannelId(): number {
    return this.settings.modChannelId as number;
  }

  public getDataDir(): string {
    return this.settings.dataDir as string;
  }

  constructor() {
    dotenv.config();
    this.settings = {
      telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
      modChannelId: process.env.MOD_CHANNEL_ID ? parseInt(process.env.MOD_CHANNEL_ID) : undefined,
      dataDir: process.env.DATA_DIR || undefined,
    };

    if (!this.settings.telegramBotToken) {
      throw new Error("Telegram bot token is not set");
    }


    if (!this.settings.modChannelId) {
      throw new Error("Mod channel id is not set");
    }

    if (!this.settings.dataDir) {
      throw new Error("Data dir is not set");
    }
    
    this.bot = new TelegramBot(this.settings.telegramBotToken as string, { polling: true });
  }

  getMessage(key: MessageType): string {
    return i18n[this.currentLanguage][key] || i18n[Language.EN][key] || key;
  }

  sendMessage(chatId: number, text: string): void {
    this.bot.sendMessage(chatId, text, { parse_mode: "Markdown" });
  }

  sendEditMessage(
    content: ContentType,
    commands: CommandType[],
    chatId: number,
    messageId: number
  ): void {
    const text = MarkdownParser.serialize(content);
    const opts = {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: { inline_keyboard: this.buildInlineKeyboard(commands) },
    };
    this.bot.editMessageText(text, opts);
  }

  sendCommandMessage(chatId: number, text: string, commands: CommandType[]): void {
    this.bot.sendMessage(chatId, text, {
      parse_mode: "Markdown",
      reply_markup: { inline_keyboard: this.buildInlineKeyboard(commands) },
    });
  }

  sendCommandMessageMarkdown(msg: Message, commands: CommandType[]): void {
    const opts = {
      reply_to_message_id: msg.reply.message_id,
      reply_markup: { inline_keyboard: this.buildInlineKeyboard(commands) },
    } as any;
    this.bot.sendMessage(msg.chat_id, MarkdownParser.serialize(msg.content), opts);
  }

  sendAutoRemovalMessage(
    chatId: number,
    text: string,
    timeout: number = 4.2
  ): void {
    this.bot.sendMessage(chatId, text, { parse_mode: "Markdown" })
      .then((sentMessage: any) => {
        setTimeout(() => {
          this.bot.deleteMessage(chatId, sentMessage.message_id.toString())
        }, timeout * 1000);
      })
  }

  buildInlineKeyboard(commands: CommandType[]): any[][] {
    return commands.map((command) => [
      { text: command.toString(), callback_data: command.toString() },
    ]);
  }
}
