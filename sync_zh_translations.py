
import json

def generate_placeholder(key):
    # This is a simple placeholder generation, might need to be improved for Chinese
    return ' '.join(word.capitalize() for word in key.replace('_', ' ').split(' '))

def sync_json_files(master_file, target_file):
    with open(master_file, 'r', encoding='utf-8') as f:
        master_data = json.load(f)

    try:
        with open(target_file, 'r', encoding='utf-8') as f:
            target_data = json.load(f)
    except FileNotFoundError:
        target_data = {}

    updated = False
    for key, value in master_data.items():
        if key not in target_data:
            target_data[key] = generate_placeholder(key)
            updated = True

    if updated:
        with open(target_file, 'w', encoding='utf-8') as f:
            json.dump(target_data, f, indent=2, ensure_ascii=False)
        print(f"'{target_file}' has been updated with missing keys from '{master_file}'.")
    else:
        print(f"'{target_file}' is already in sync with '{master_file}'.")

if __name__ == '__main__':
    sync_json_files('lang/vi.json', 'lang/zh.json')
