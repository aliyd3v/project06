const telegramBot = require('node-telegram-bot-api');
const { botToken } = require('../config/config');

const bot = new telegramBot(botToken, { polling: true })
bot.on('polling_error', console.error)

exports.sendingOrderToTgChannel = (message) => {
    const formatMessage = (msg) => {
        try {
            return JSON.stringify(msg, null, 4)
        } catch (err) {
            console.error(err);
            return 'Invalid message format'
        }
    }

    const formattedMessage = formatMessage(message)

    bot.sendMessage('@gijduvonuzamaliyot', formattedMessage)
        .then(() => {
            console.log(
                `Order sent to Telegram channel at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
            )
        })
        .catch((error) => {
            console.error('Error sending message:', error)
        })
}