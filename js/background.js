chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === 'complete' && tab.url.includes('https://chat.openai.com')) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ['js/fileupload.js', 'js/pinchats.js'],
		});
	}
});
