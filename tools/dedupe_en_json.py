#!/usr/bin/env python3
import json
from pathlib import Path
from collections import OrderedDict
p = Path(r"e:\IVS\Website\ivs.github.io\lang\en.json")
backup = p.with_suffix('.json.bak')
text = p.read_text(encoding='utf-8')
# backup
backup.write_text(text, encoding='utf-8')
# parse preserving pairs
pairs = json.loads(text, object_pairs_hook=lambda pairs: pairs)
result = OrderedDict()
for k,v in pairs:
    if k in result:
        existing = result[k]
        # prefer non-TODO value
        if (isinstance(existing, str) and 'TODO' in existing) and (isinstance(v, str) and 'TODO' not in v):
            result[k] = v
        # else keep existing
    else:
        result[k] = v
# write back
p.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding='utf-8')
print(f"Original pairs: {len(pairs)}, unique keys: {len(result)}")
print(f"Backup written to: {backup}")
