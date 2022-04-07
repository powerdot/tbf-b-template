require("dotenv").config();
let { TBF } = require("@powerdot/telegram_bot_framework");

TBF({
    telegram: {
        token: process.env.TOKEN,
    },
    mongo: {
        dbName: "tbf_testbot"
    }
}).then(({ bot, db, openPage }) => {
    bot.command("start", async (ctx) => {
        await db.messages.removeMessages(ctx);
        await db.messages.user.removeSpecialCommandsExceptLastOne(ctx);
        await db.user.data.destroy(ctx);
        await openPage({ ctx, page: "index" });
    });
})