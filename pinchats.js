// Function to reorder the chat items based on pinned status
function reorderChats() {
	// Get all the parent <ol> elements
	const chatLists = Array.from(document.querySelectorAll('ol'));

	// For each <ol>, reorder its child chat items
	chatLists.forEach((chatList) => {
		const chatItems = Array.from(chatList.querySelectorAll('li.relative'));
		const pinnedChats = JSON.parse(localStorage.getItem('pinnedChats')) || [];

		chatItems.sort((a, b) => {
			const titleA = a.querySelector('div.flex-1').innerText;
			const titleB = b.querySelector('div.flex-1').innerText;

			const aIsPinned = pinnedChats.includes(titleA);
			const bIsPinned = pinnedChats.includes(titleB);

			if ((aIsPinned && bIsPinned) || (!aIsPinned && !bIsPinned)) {
				return 0;
			}
			if (aIsPinned && !bIsPinned) {
				return -1;
			}
			if (bIsPinned && !aIsPinned) {
				return 1;
			}
		});

		chatItems.forEach((chatItem) => chatList.appendChild(chatItem));
	});

	console.log('Chats reordered');
}

setTimeout(() => {
	document.querySelectorAll('li.relative').forEach((chatItem, index) => {
		// Creating a pin button
		const pinButton = document.createElement('button');
		pinButton.textContent = 'Pin';
		pinButton.style.marginLeft = '10px';

		// Attaching click event
		pinButton.addEventListener('click', function (e) {
			e.stopPropagation(); // prevent triggering chat item click event
			let pinnedChats = JSON.parse(localStorage.getItem('pinnedChats')) || [];
			const chatTitle = chatItem.querySelector('div.flex-1').innerText;

			if (pinnedChats.includes(chatTitle)) {
				// If the chat is already pinned, unpin it
				pinnedChats = pinnedChats.filter((title) => title !== chatTitle);
				pinButton.textContent = 'Pin';
			} else {
				// If the chat isn't pinned, pin it
				pinnedChats.push(chatTitle);
				pinButton.textContent = 'Unpin';
			}
			localStorage.setItem('pinnedChats', JSON.stringify(pinnedChats));

			// Call the reordering function
			reorderChats();
		});

		// Adding the pin button to the chat item
		const chatLink = chatItem.querySelector('a.flex');
		if (chatLink) {
			chatLink.appendChild(pinButton);
			console.log('Pin button added to chat item ' + index);
		} else {
			console.log('Unable to find element to append pinButton to');
		}

		// Check if chat is already pinned
		const chatTitle = chatItem.querySelector('div.flex-1').innerText;
		let pinnedChats = JSON.parse(localStorage.getItem('pinnedChats')) || [];
		if (pinnedChats.includes(chatTitle)) {
			pinButton.textContent = 'Unpin';
		}
	});
	// Select a single element with a specific aria-label
	const link = document.querySelector('[aria-label="Chat history"]');
	link.addEventListener('click', () => reorderChats());

	// Call reorderChats to initially order chat items
	reorderChats();
}, 3000);
