const getStartedBtn = document.getElementById('getStartedBtn');
const output = document.getElementById('output');

const initialMessage = `CareerPilot AI helps you explore career paths, prepare for aptitude tests, and create a personalized roadmap.`;

function showMessage(message) {
  output.textContent = message;
  output.classList.remove('hidden');
}

getStartedBtn.addEventListener('click', () => {
  showMessage(initialMessage);
});
