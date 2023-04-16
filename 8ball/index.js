const DISCORD = require('discord.js');
const BOT = new DISCORD.Client();
const TOKEN = process.env.DISCORD_BOT_TOKEN;

const PREFIX = '!';

const COMMANDS = new Map([
    ['help', 'display this message'],
    ['greet', 'generate random greeting'],
    ['8ball', 'generate random fortune for a yes/no question'],
    ['shower-thought', 'generate random statement proving life is a lie']
]);
const GREETINGS = [
    'hi!',
    'hello!',
    'how are you?',
    'hey!',
    'what\'s up?',
    'howdy!',
    'what\'s crackin\'?',
    'g\'day mate!'
];
const FORTUNES = [
    'yes',
    'no',
    'maybe',
    'possibly',
    'most likely',
    'very doubtful',
    'signs point to yes',
    'outlook not good',
    'cannot tell now',
    'try again'
];
const SHOWER_THOUGHTS = [
    'the word "nun" is the letter n doing a cartwheel',
    'theater ppl say break a leg bc they want u in a cast',
    'ppl say be there or be square bc ur not a-round',
    'when you say the words "touch" and "separate," ur lips do the opposite',
    'erasers are also called rubbers bc they rub out ur mistakes',
    '"why did the chicken cross the road" is a suicide joke',
    'ptsd is just spicy nostalgia',
    'waffles are just pancakes with abs',
    'the division sign is just a blank fraction',
    'lasagna is just spaghetti flavored cake',
    'milk is just cereal sauce',
    'ur not afraid of being alone in the dark, ur afraid of being not alone in the dark',
    'u don\'t need a parachute to go skydiving, u only need one to go skydiving twice',
    'saying ur up for smth and ur down for smth mean the same thing',
    'cargo goes on ships, and shipments go on cars',
    'a larger bed means more bed room but less bedroom',
    'bacon is cooked and cookies are baked',
    'when u clean a vacuum cleaner, u become the vacuum cleaner',
    'when u wait for the waiter, u become the waiter',
    'when u sweat in a sweater, u become the sweater',
    'if 2 vegans fight, is it still beef?',
    'if ur a security guard at samsung, then r u guardian of the galaxy?',
    'why aren’t iphone chargers called apple juice?',
    'why do we call them paintings and not painteds when they’re already done?',
    'u can never buy hotpockets, only cold pockets - u have to supply the heat urself',
    'ur alarm sound is basically ur theme song, bc it starts every episode of ur life'
];

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
        for (let[key, value] of COMMANDS.entries())
            menu += '**' + PREFIX + key + '**\n*' + value + '*\n';
        message.channel.send(menu);
    }
    // generate something random
    else if (command == 'greet')
        message.channel.send(sendRandom(GREETINGS));
    else if (command == '8ball')
        message.channel.send(sendRandom(FORTUNES));
    else if (command == 'shower-thought')
        message.channel.send(sendRandom(SHOWER_THOUGHTS));
});

let sendRandom = (list) => {
    return list[Math.floor(Math.random()*list.length)];
}
