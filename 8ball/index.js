const DISCORD = require('discord.js');
const BOT = new DISCORD.Client();
const TOKEN = process.env.DISCORD_BOT_TOKEN;

const PREFIX = '!';

const COMMANDS = new Map([
    ['help', 'display this message'],
    ['greet', 'generate a random greeting'],
    ['8ball', 'generate a random fortune']
]);

const GREETINGS = ["hi!", "hello!", "how are you?", "hey!", "what's up?", "howdy!", "what's crackin'?", "g'day mate!"];
const FORTUNES = ["yes", "no", "maybe", "possibly", "most likely", "very doubtful", "signs point to yes", "outlook not good", "cannot tell now", "try again"];

BOT.login(TOKEN);

BOT.on('ready', () => {
    console.log(`logged in as ${BOT.user.tag}`);
});

BOT.on('message', (message) => {
    if (!message.content.startsWith(PREFIX))
        return;

    let command = message.content.slice(PREFIX.length);

    // display list of commands
    if (command == 'help') {
        let menu = '';
        for (let[key, value] of COMMANDS.entries()) {
            menu += '**' + key + '**\n*' + value + '*\n'; 
        }
        message.channel.send(menu);
    }
    // display random greeting
    else if (command == 'greet') {
        let randomNum = Math.floor(Math.random()*GREETINGS.length);
        message.channel.send(GREETINGS[randomNum]);
    }
    // display random fortune
    else if (command == '8ball') {
        let randomNum = Math.floor(Math.random()*FORTUNES.length);
        message.channel.send(FORTUNES[randomNum]);
    }
});
