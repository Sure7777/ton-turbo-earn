import { Bot } from "grammy";

// استدعاء التوكن بشكل آمن من البيئة المحيطة
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// عند إرسال /start في البوت
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

// تشغيل الدالة كـ Serverless Function على Vercel
export default async (req, res) => {
  if (req.method === "POST") {
    try {
      await bot.handleUpdate(req.body);
      return res.status(200).send("OK");
    } catch (err) {
      console.error("Error handling update:", err);
      return res.status(500).send("Internal Error");
    }
  } else {
    return res.status(200).send("Bot is running successfully!");
  }
};
