import { Bot } from "grammy";

// استدعاء التوكن بشكل آمن
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// أمر البدء والترحيب بالمستخدم
bot.command("start", async (ctx) => {
  const username = ctx.from.username || "User";
  const webAppUrl = "https://ton-turbo-earn.vercel.app/";

  await ctx.reply(`أهلاً بك يا ${username} في بوت TON Turbo Earn! 🚀\n\nاضغط على الزر أدناه لفتح التطبيق وبدء كسب الأرباح ومشاهدة الإعلانات.`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🚀 افتح التطبيق وابدأ الربح", web_app: { url: webAppUrl } }]
      ]
    }
  });
});

// تشغيل البوت متوافقاً مع نظام Vercel الحديث
export default async (req, res) => {
  if (req.method === "POST") {
    try {
      await bot.handleUpdate(req.body);
      res.status(200).send("OK");
    } catch (err) {
      console.error("Error handling update:", err);
      res.status(500).send("Internal Error");
    }
  } else {
    res.status(200).send("Bot is running successfully with ESM!");
  }
};
