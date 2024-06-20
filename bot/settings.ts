import dotenv from "dotenv";

dotenv.config();

export const settings = {
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  modChannelId: process.env.MOD_CHANNEL_ID ? parseInt(process.env.MOD_CHANNEL_ID) : -1002107989866,
  dataDir: process.env.DATA_DIR || "./data",
};
