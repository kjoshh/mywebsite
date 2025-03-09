// index.js
import { initializeTerminalScript } from './terminalstuff.js';
import './hover-effects.js';
import './home-loading-animations.js';
import './home-exit-animation.js';
import './browser-detect.js';

// index.js

let terminalInitialized = false;

function setupTerminalActivation() {
  const activateButton = document.getElementById('activate-terminal-img');
  if (activateButton) {
    activateButton.addEventListener('click', function () {
      if (!terminalInitialized) {
        initializeTerminalScript();
        terminalInitialized = true;
        activateButton.disabled = true;
      } else {
        console.log('Terminal already initialized.');
      }
    });
  } else {
    console.error('Activate button not found!');
  }
}

export function isInternalNavigation() {
  if (sessionStorage.getItem('isInternalNavigation') === 'true') {
    sessionStorage.removeItem('isInternalNavigation');
    return true;
  }
  return false;
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('index.js: DOMContentLoaded');
  const internal = isInternalNavigation();
  console.log('Is internal navigation:', internal);
  setupTerminalActivation();
});
