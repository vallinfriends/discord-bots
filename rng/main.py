import discord
import os
import commands

bot = discord.Client()

VALID_KEYWORDS = ["help", "coinflip", "drawcard", "randint", "randdec", "pickfrom", "shuffle", "matchmaker"]

@bot.event
async def on_ready():
    print(f"logged in as {bot.user}")

@bot.event
async def on_message(message):
    if not message.content.startswith(commands.PREFIX):
        return
    
    command = message.content[1:].split()
    print(command)
    keyword = command[0]

    # invalid command
    if keyword not in VALID_KEYWORDS:
        error_embed = discord.Embed(
            title="Command Not Found",
            description="I do not recognize that command. Please check your spelling and try again."
        )
        await message.channel.send(embed=error_embed)
    # basic commands
    elif len(command) == 1:
        if keyword == "help":
            await message.channel.send(embed=commands.help())
        elif keyword == "coinflip":
            await message.channel.send(commands.coinflip())
        elif keyword == "drawcard":
            await message.channel.send(commands.drawcard())
    # rng commands
    elif "rand" in keyword:
        num_range = command[1].split(",")
        if keyword == "randint":
            await message.channel.send(commands.randint(num_range[0], num_range[1]))
        elif keyword == "randdec":
            await message.channel.send(commands.randdec(num_range[0], num_range[1], num_range[2]))
    # commands with lists
    else:
        list1 = command[1][1:-1].split(",")
        if keyword == "pickfrom":
            await message.channel.send(commands.pickfrom(list1))
        elif keyword == "shuffle":
            await message.channel.send(commands.shuffle(list1))
        elif keyword == "matchmaker":
            list2 = command[2][1:-1].split(",")
            await message.channel.send(commands.matchmaker(list1, list2))

bot.run(os.getenv("DISCORD_BOT_TOKEN"))
