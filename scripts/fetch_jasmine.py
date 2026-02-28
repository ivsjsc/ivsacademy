import requests

def fetch(path, dest):
    url = f'https://unpkg.com/{path}'
    print('fetching', url)
    r = requests.get(url)
    print('status', r.status_code)
    if r.status_code == 200:
        with open(dest, 'wb') as f:
            f.write(r.content)
        print('saved', dest)
    else:
        print('failed to fetch', url, 'body', r.text[:200])

if __name__ == '__main__':
    files = [
        ('jasmine-core/lib/jasmine-core/jasmine.js', 'tests/jasmine.js'),
        ('jasmine-core/lib/jasmine-core/jasmine-html.js', 'tests/jasmine-html.js'),
        ('jasmine-core/lib/jasmine-core/boot.js', 'tests/boot.js'),
        ('jasmine-core/lib/jasmine-core/jasmine.css', 'tests/jasmine.css'),
    ]
    for path, dest in files:
        fetch(path, dest)
