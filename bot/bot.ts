import { TelegramService } from "./service";
import { MessageController } from "./messages";
import { CallbackQueryController } from "./callback";
import { ContentType, DetailsType, Message } from '../app/types';
import { getContent } from "../utils/string";
import TelegramBot from "node-telegram-bot-api";

const telegramService = new TelegramService();
const messageController = new MessageController(telegramService);
const callbackQueryController = new CallbackQueryController(telegramService);

telegramService.bot.on("callback_query", callbackQueryController.handleCallbackQuery.bind(callbackQueryController));

telegramService.bot.on("message", (message: TelegramBot.Message) => {
  let parsedMessage: Message = {
    message_id: message.message_id,
    chat_id: message.chat.id,
    user_id: message.from?.id || message.reply_to_message?.from?.id || 0,
    text: message.text || message.caption || "",
    content: {
      details: {
        created: new Date(),
        creator: message.from?.username
      } as DetailsType,
    } as ContentType,
    reply: {
      message_id: message.reply_to_message?.message_id,
      chat_id: message.reply_to_message?.chat.id,
      user_id: message.reply_to_message?.from?.id,
      text: message.reply_to_message?.text || message.reply_to_message?.caption,
      content: {} as ContentType,
    } as Message,
  };

  parsedMessage.content = getContent(parsedMessage);
  parsedMessage.reply.content = getContent(parsedMessage.reply);

  if (message.text?.startsWith("/")) messageController.handleCommand(parsedMessage);
  else if (message.reply_to_message) messageController.handleChange(parsedMessage);
  else messageController.handleCreate(parsedMessage);

});
