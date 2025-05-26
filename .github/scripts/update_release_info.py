import requests
import re
import os
import json

# GitHub API settings
REPO = "fork-maintainers/iceraven-browser"
RELEASE_API = f"https://api.github.com/repos/{REPO}/releases/latest"

def fetch_latest_release():
    """Fetch the latest release information from GitHub."""
    response = requests.get(RELEASE_API)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch release info: {response.status_code}")
    return response.json()

def update_version_in_file(file_path, version):
    """Update version number in a file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update version patterns
    patterns = [
        (r'Iceraven: [\d\.]+', f'Iceraven: {version}'),
        (r'Version: [\d\.]+', f'Version: {version}'),
        (r'v[\d\.]+', f'v{version}'),
        (r'iceraven-[\d\.]+', f'iceraven-{version}')
    ]
    
    for pattern, replacement in patterns:
        content = re.sub(pattern, replacement, content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def update_download_links(file_path, assets):
    """Update download links in a file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Create a mapping of asset types to their download URLs
    asset_map = {}
    for asset in assets:
        name = asset['name'].lower()
        if 'arm64' in name:
            asset_map['arm64'] = asset['browser_download_url']
        elif 'arm-v7a' in name:
            asset_map['arm-v7a'] = asset['browser_download_url']
        elif 'x86_64' in name:
            asset_map['x86_64'] = asset['browser_download_url']
        elif 'x86' in name:
            asset_map['x86'] = asset['browser_download_url']
    
    # Update download links
    for arch, url in asset_map.items():
        pattern = rf'https?://[^\s"\']+{arch}[^\s"\']*'
        content = re.sub(pattern, url, content, flags=re.IGNORECASE)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    # Fetch latest release info
    release = fetch_latest_release()
    version = release['tag_name'].replace('iceraven-', '')
    assets = release['assets']
    
    # Files to update
    files_to_update = [
        'README.md',
        'index.html',
        'docs/building-guide.html',
        'manifest.json'
    ]
    
    # Update each file
    for file_path in files_to_update:
        if os.path.exists(file_path):
            print(f"Updating {file_path}...")
            update_version_in_file(file_path, version)
            update_download_links(file_path, assets)
    
    print(f"Successfully updated to version {version}")

if __name__ == "__main__":
    main() 