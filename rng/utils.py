from typing import List
import random

# shuffling algorithm - helper function
def shuffle(items: List[str]) -> List[str]:
    for i in range(len(items)-1, -1, -1):
        x = random.randint(0, i)
        items.append(items[x])
        items.remove(items[x])
    return items
    
"""
add validation and error-handling functions
"""
