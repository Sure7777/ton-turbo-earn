const { Bot } = require("grammy"); // مكتبة سهلة لتشغيل البوت

// استدعاء توكن البوت بشكل آمن من البيئة المحيطة
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// عندما يضغط المستخدم /start في البوت
bot.command("start", async (ctx) => {
  const userId = ctx.from.id;
  const username = ctx.from.username || "User";

  // رابط تطبيق الويب المصغر الخاص بك (الموجود في جيثاب)
  const webAppUrl = "https://sure7777.github.io/ton-turbo-earn/";

  await ctx.reply(`أهلاً بك يا ${username} في بوت TON Turbo Earn! 🚀\n\nاضغط على الزر أدناه لفتح التطبيق وبدء كسب الأرباح ومشاهدة الإعلانات.`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🚀 افتح التطبيق وابدأ الربح", web_app: { url: webAppUrl } }]
      ]
    }
  });
});

// تشغيل البوت كـ Serverless Function على Vercel
module.exports = async (req, res) => {
  try {
    if (req.method === "POST") {
      await bot.handleUpdate(req.body);
    }
    res.status(200).send("Bot is running...");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error handling update");
  }
};
