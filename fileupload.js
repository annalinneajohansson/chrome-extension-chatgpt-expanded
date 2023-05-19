// Create a container div for all the elements
const uploadContainer = document.createElement('div');
uploadContainer.style.display = 'none'; // Hide the container initially
uploadContainer.className = 'upload-container border mb-4 p-2 flex flex-col gap-2';
uploadContainer.style.backgroundColor = '#FFFFFF';

const button = document.createElement('button');
button.className = 'btn relative btn-neutral border-0 md:border padding-0';
button.setAttribute('as', 'button');

const buttonContentDiv = document.createElement('div');
buttonContentDiv.className = 'flex w-full gap-2 items-center justify-center';

const buttonText = document.createTextNode('Upload file');
buttonContentDiv.appendChild(buttonText);
button.appendChild(buttonContentDiv);

const chunkSizeInput = document.createElement('input');
chunkSizeInput.type = 'number';
chunkSizeInput.min = '1';
chunkSizeInput.value = '15000';
chunkSizeInput.title = 'Chunk Size';
chunkSizeInput.style.margin = '3px';
chunkSizeInput.style.width = '80px';
chunkSizeInput.style.height = '28px';
chunkSizeInput.style.color = 'black';
chunkSizeInput.style.fontSize = '14px';

const buttonContainer = document.createElement('div');
buttonContainer.className = 'btn-container';
buttonContainer.appendChild(button);
buttonContainer.appendChild(chunkSizeInput);

const stopButton = document.createElement('button');
stopButton.style.display = 'none';
stopButton.className = 'btn relative btn-neutral border-0 md:border padding-0';
stopButton.setAttribute('as', 'button');

const stopButtonContentDiv = document.createElement('div');
stopButtonContentDiv.className = 'flex w-full gap-2 items-center justify-center';

const stopButtonText = document.createTextNode('Stop upload');
stopButtonContentDiv.appendChild(stopButtonText);
stopButton.appendChild(stopButtonContentDiv);

buttonContainer.appendChild(stopButton);

let stopUpload = false;
stopButton.addEventListener('click', () => {
	stopUpload = true;
	stopButton.style.display = 'none';
});

const progressBar = document.createElement('div');
progressBar.style.width = '99%';
progressBar.style.height = '5px';
progressBar.style.margin = '3px';
progressBar.max = 100; // The maximum value is set to 100
progressBar.value = 0; // The current value is set to 0

button.addEventListener('click', async () => {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.txt,.js,.py,.html,.css,.json,.csv,.php,.scss';

	input.addEventListener('change', async () => {
		stopButton.style.display = 'block';

		progressBar.style.width = '0%';
		progressBar.style.backgroundColor = '#32a9db';

		const file = input.files[0];
		const text = await file.text();

		const chunkSize = parseInt(chunkSizeInput.value);

		const numChunks = Math.ceil(text.length / chunkSize);
		// ...

		for (let i = 0; i < numChunks; i++) {
			if (stopUpload) {
				console.log('Upload stopped');
				stopUpload = false; // Reset the flag for future uploads
				stopButton.style.display = 'none';
				return; // Exit the loop
			}
			if (1 == numChunks) {
				stopButton.style.display = 'none';
			}
			const chunk = text.slice(i * chunkSize, (i + 1) * chunkSize);

			await submitConversation(chunk, i + 1, file.name);

			progressBar.style.width = `${((i + 1) / numChunks) * 100}%`;

			// Focus the target element
			const targetElement = document.querySelector('.flex-shrink-0.flex.flex-col.relative.items-end');
			if (targetElement) {
				targetElement.focus();
			}

			let chatgptReady = false;
			while (!chatgptReady) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				chatgptReady = !document.querySelector('.text-2xl > span:not(.invisible)');
			}
		}

		stopButton.style.display = 'none';
		progressBar.style.backgroundColor = '#32a9db';
	});

	input.click();
});

async function submitConversation(text, part, filename) {
	const textarea = document.querySelector("textarea[tabindex='0']");
	const enterKeyEvent = new KeyboardEvent('keydown', {
		bubbles: true,
		cancelable: true,
		keyCode: 13,
	});
	textarea.value = `Part ${part} of ${filename}:\n\n${text}`;
	textarea.dispatchEvent(enterKeyEvent);
}

const fileUploadDiv = document.createElement('div');
fileUploadDiv.id = 'file-upload';
fileUploadDiv.className = 'chatgpt-extended';

fileUploadDiv.appendChild(buttonContainer);
fileUploadDiv.appendChild(progressBar);

const targetSelector = '.flex.flex-col.w-full.py-2.flex-grow.md\\:py-3.md\\:pl-4';

// Append all the elements to the uploadContainer div
uploadContainer.appendChild(buttonContainer);
uploadContainer.appendChild(progressBar);

// Create the toggleButton element
const toggleButton = document.createElement('button');
toggleButton.textContent = 'Toggle Upload';
toggleButton.className = 'block btn btn-primary btn-sm mb-2 w-[184px]'; // Added btn-primary and btn-sm classes

// Apply additional styling to match the "Regenerate Response" button
toggleButton.style.marginLeft = 'auto'; // Align the button to the right
toggleButton.style.marginRight = 'auto'; // Add some right margin for spacing
toggleButton.style.height = '32px'; // Set the height
toggleButton.style.padding = '0 12px'; // Add padding to the button

// Add hover effect to the button
toggleButton.addEventListener('mouseover', () => {
	toggleButton.style.backgroundColor = '#209cee'; // Change the background color on hover
});

toggleButton.addEventListener('mouseout', () => {
	toggleButton.style.backgroundColor = ''; // Revert the background color on mouseout
});

// Add click event listener to toggle the uploadContainer
toggleButton.addEventListener('click', () => {
	if (uploadContainer.style.display === 'none') {
		uploadContainer.style.display = 'block';
	} else {
		uploadContainer.style.display = 'none';
	}
});

setTimeout(() => {
	const targetElement = document.querySelector(targetSelector);
	if (targetElement && !targetElement.contains(uploadContainer)) {
		targetElement.parentNode.insertBefore(uploadContainer, targetElement);
		targetElement.parentNode.insertBefore(toggleButton, targetElement);
	}
}, 2000);
