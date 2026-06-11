import { Bot } from "grammy";

// استدعاء توكن البوت بشكل آمن من البيئة المحيطة
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// عندما يضغط المستخدم /start في البوت
bot.command("start", async (ctx) => {
  const username = ctx.from.username || "User";

  // رابط تطبيق الويب المصغر الخاص بك في فيرسيل
  const webAppUrl = "https://ton-turbo-earn.vercel.app/";

  await ctx.reply(`أهلاً بك يا ${username} في بوت TON Turbo Earn! 🚀\n\nاضغط على الزر أدناه لفتح التطبيق وبدء كسب الأرباح ومشاهدة إحصائياتك!`, 
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🚀 افتح التطبيق وابدأ الربح", web_app: { url: webAppUrl } }]
        ]
      }
    }
  );
});

// تشغيل البوت كـ Serverless Function متوافق مع نظام ES Modules الحديث
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
    return res.status(200).send("Bot is running successfully with ESM!");
  }
};
