let { Component } = require("@powerdot/telegram_bot_framework");

module.exports = Component(() => {
    return {
        actions: {
            async main() {
                await this.clearChat();
                this.send({
                    text: `Hey how are you?!`,
                    buttons: [[
                        { text: "I'm fine", action: "reaction", data: "fine" },
                        { text: "I'm not fine", action: "reaction", data: "not_fine" }
                    ]]
                });
            },
            reaction({ data }) {
                let text = "";
                if (data == "fine") {
                    text = "Great!";
                } else {
                    text = "Oh, I'm sorry to hear that!";
                }
                this.update({
                    text,
                    buttons: [
                        [{ text: "Who are you?", action: "whois" }],
                        [{ text: "Back", action: "main" }]
                    ]
                });
            },
            whois: {
                handler() {
                    this.update({
                        text: "I'm a bot. And you?\n<i>Text me...</i>",
                        buttons: [
                            [{ text: "Back", action: "main" }]
                        ]
                    });
                },
                messageHandler({ text }) {
                    if (!text) return false;
                    this.update({
                        text: `Glad to meet you, ${text}!`,
                        buttons: [
                            [{ text: "Back", action: "main" }]
                        ]
                    });
                }
            }
        }
    }
})