const launchBtn = document.getElementById('launchBtn');
const usernameInput = document.getElementById('username');
const logEl = document.getElementById('log');

launchBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim() || 'Player';
  window.electronAPI.launchGame(username);
});

window.electronAPI.onLog((msg) => {
  logEl.textContent += msg + '\n';
  logEl.scrollTop = logEl.scrollHeight;
});
