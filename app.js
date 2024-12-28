const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const clearBtn = document.getElementById('clear-btn');
const output = document.getElementById('output');
let recognition;

// Check for browser support
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.continuous = true; // Continue listening
    recognition.interimResults = false; // Only finalized results
    recognition.lang = 'en-US'; // for language

    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
                transcript += result[0].transcript + '\n';
            }
        }
        output.textContent += transcript; // Add text to the output
    };

    recognition.onstart = () => {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        startBtn.textContent = 'Listening...';
    };

    recognition.onend = () => {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        startBtn.textContent = 'Start Listening';
    };

    recognition.onerror = (event) => {
        console.error('Speech Recognition Error:', event.error);
        alert('Error occurred during speech recognition: ' + event.error);
        startBtn.disabled = false;
        stopBtn.disabled = true;
        startBtn.textContent = 'Start Listening';
    };

    startBtn.addEventListener('click', () => {
        recognition.start();
    });

    stopBtn.addEventListener('click', () => {
        recognition.stop();
    });

    clearBtn.addEventListener('click', () => {
        output.textContent = '';
    });
} else {
    alert('Your browser does not support Speech Recognition. Please try using Chrome.');
    startBtn.disabled = true;
    stopBtn.disabled = true;
    clearBtn.disabled = true;
}