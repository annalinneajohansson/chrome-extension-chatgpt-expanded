# Chrome Extension - ChatGPT Expanded

This is a Chrome extension that enhances the user experience with OpenAI's ChatGPT. It includes functionality for pinning chats and reordering them based on their pinned status. The extension also provides a file upload feature.

## File Structure

├── assets
│ └── icon.png
├── css
│ └── app.css
├── js
│ ├── background.js
│ ├── fileupload.js
│ └── pinchats.js
├── LICENSE
├── manifest.json
└── README.md


## Files Description

- `assets/icon.png`: This is the icon of the extension.
- `css/app.css`: This file contains all the styles used by the extension.
- `js/background.js`: This is the service worker file for the extension. It's responsible for injecting the content scripts into the pages where the extension is active.
- `js/fileupload.js`: This file provides the file upload functionality.
- `js/pinchats.js`: This file provides the functionality for pinning chats and reordering them based on their pinned status.
- `LICENSE`: This file contains the Unlicense for the project.
- `manifest.json`: This file contains all the metadata about the extension, like its name, version, permissions it needs, and files it uses.
- `README.md`: This is the file you're reading right now. It explains what the project is about and how its files are structured.

## How to Install

1. Download or clone this repository to your local machine.
2. Open the Chrome browser and navigate to `chrome://extensions`.
3. Enable "Developer mode" by clicking the toggle switch on the top right.
4. Click "Load unpacked" and select the directory where you've downloaded or cloned this repository.
5. The extension should now appear in your list of extensions.

Note: This extension is only active when visiting `https://chat.openai.com`.

## License

This project is released into the public domain with The Unlicense. For more details, see the `LICENSE` file.
