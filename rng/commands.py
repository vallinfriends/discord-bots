import discord

from typing import List
import random

import utils

PREFIX = "$"

MENU = {
    "help": "display this message",
    "coinflip": "randomly choose heads or tails",
    "drawcard": "generate random playing card",
    "randint a,b": "generate random integer from a to b, inclusive",
    "randdec a,b,c": "generate random decimal from a to b, inclusive, with c digits after the decimal point",
    "pickfrom <list>": "randomly choose from list",
    "shuffle <list>": "shuffle list",
    "matchmaker <list1> <list2>": "make random pairs from the 2 lists",
}

# show list of commands
def help() -> discord.Embed:
    commands_embed = discord.Embed(
        title="RNG Bot Commands",
        description="All of my commands! Any lists should be in the format <item1, item2, item3, etc.>",
        color=0x991122
    )
    for command in MENU:
        commands_embed.add_field(name=PREFIX+command, value=MENU[command], inline=False)
    return commands_embed

# flip a coin
def coinflip() -> str:
    flip = random.choice(["heads", "tails"])
    return flip

# pick a playing card
def drawcard() -> str:
    values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    symbols = ["♤", "♧", "♡", "♢"]
    card = random.choice(values) + random.choice(symbols)
    return card

# generate random integer in user's range
def randint(min_num: str, max_num: str) -> int:
    min_num = int(min_num)
    max_num = int(max_num)
    rand_num = random.randint(min_num, max_num)
    return rand_num

# generate random decimal in user's range, with specified decimal places
def randdec(min_num: str, max_num: str, rounding: str) -> float:
    min_num = float(min_num)
    max_num = float(max_num)
    rounding = int(rounding)
    rand_num = round(random.uniform(min_num, max_num), rounding)
    return rand_num

# pick from user's list
def pickfrom(options: List[str]) -> str:
    pick = random.choice(options)
    return pick

# shuffle user's list
def shuffle(items: List[str]) -> List[str]:
    items = utils.shuffle(items)
    items = ",".join(str(item) for item in items)
    return items

# makes random matches between 2 of user's lists
def matchmaker(list1: List[str], list2: List[str]) -> str:
    list2 = utils.shuffle(list2)
    pairs = ""
    for x,y in zip(list1, list2):
        pairs += x + " - " + y + "\n"
    return pairs
