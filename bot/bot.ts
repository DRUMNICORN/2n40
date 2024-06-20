import { TelegramService } from "./service";
import { MessageController } from "./messages";
import { CallbackQueryController } from "./callback";
import { ContentType, Message } from '../app/types';
import { getContent } from "../utils/string";

const telegramService = new TelegramService();
const messageController = new MessageController(telegramService);
const callbackQueryController = new CallbackQueryController(telegramService);

telegramService.bot.on("callback_query", callbackQueryController.handleCallbackQuery.bind(callbackQueryController));

telegramService.bot.on("message", (message: any) => {
  let parsedMessage: Message = {
    message_id: message.message_id,
    chat_id: message.chat.id,
    user_id: message.from.id,
    text: message.text || message.caption,
    content: {} as ContentType,
    reply: {
      message_id: message.reply_to_message?.message_id,
      chat_id: message.reply_to_message?.chat.id,
      user_id: message.reply_to_message?.from.id,
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
