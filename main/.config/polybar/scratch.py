import json
import sys

data = json.load(sys.stdin)

def count_scratch(node):
    c = 0
    if node['scratchpad_state'] != 'none':
        c += 1
    for n in node['nodes'] + node['floating_nodes']:
        c += count_scratch(n)
    return c

# Subtract one to account for dropdown
scratch = count_scratch(data) - 1
if scratch > 0:
    print(f'   {scratch}')
