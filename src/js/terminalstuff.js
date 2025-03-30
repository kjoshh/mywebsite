import gsap from 'gsap';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  enableIndexedDbPersistence,
  deleteDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { HangmanGame } from './hangman.js';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.projectId) {
  console.error('Firebase project ID is missing.');
  console.log('Available env vars:', {
    apiKey: !!firebaseConfig.apiKey,
    authDomain: !!firebaseConfig.authDomain,
    projectId: !!firebaseConfig.projectId,
    storageBucket: !!firebaseConfig.storageBucket,
    messagingSenderId: !!firebaseConfig.messagingSenderId,
    appId: !!firebaseConfig.appId,
  });
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    console.log('Multiple tabs open...');
  } else if (err.code == 'unimplemented') {
    console.log(
      'browser doesnt support features required to enable persistence'
    );
  }
});

if (typeof window.terminalActive === 'undefined') {
  window.terminalActive = false;
}

let terminalInitialized = false;
let inputListenerAdded = false;
let isSigningGuestbook = false;
let currentMode = 'normal';
let currentGame = null;
let guestbookState = {
  step: '',
  name: '',
};

let currentUser = localStorage.getItem('guestbookUser') || 'visitor';

const activateButton = document.getElementById('activate-terminal');
const terminal = document.getElementById('terminal');
const inputField = document.getElementById('command-input');
const outputDiv = document.getElementById('output');
const inputLine = document.getElementById('input-line');
const cursor = document.getElementById('cursor');

const errortext = document.getElementById('errortext');
const textBlock = document.getElementById('text-block');
const noiseLayer = document.getElementById('noise-layer');
const secondInter = document.getElementById('secondinterda');
const typingEffect = document.getElementById('typing-effect');

terminal.style.display = 'none';
outputDiv.style.opacity = '0';
inputLine.style.opacity = '0';

outputDiv.style.overflowY = 'auto';
outputDiv.style.pointerEvents = 'auto';
outputDiv.style.maxHeight = 'calc(100% - 12px)';

function scrollToBottom() {
  requestAnimationFrame(() => {
    outputDiv.scrollTop = outputDiv.scrollHeight;
  });
}

function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

function appendUserInput(inputText) {
  if (!window.terminalActive) return;
  const userLine = document.createElement('div');
  userLine.style.whiteSpace = 'pre-wrap';
  userLine.style.wordWrap = 'break-word';
  userLine.style.width = '100%';
  userLine.innerHTML = `<span class="prompt">${currentUser}@kernjosh.com:~$ </span>${sanitizeHTML(
    inputText
  )}`;
  outputDiv.appendChild(userLine);
  scrollToBottom();
}

function appendOutputWithTyping(text, callback) {
  if (!window.terminalActive) return;
  const newLine = document.createElement('div');
  newLine.style.whiteSpace = 'pre-wrap';
  newLine.style.wordWrap = 'break-word';
  newLine.style.width = '100%';
  outputDiv.appendChild(newLine);
  scrollToBottom();
  typeText(newLine, text, callback);
}

function typeText(element, text, callback) {
  let index = 0;
  const typingSpeed = 1;

  const interval = setInterval(() => {
    if (!window.terminalActive) {
      clearInterval(interval);
      return;
    }

    if (index < text.length) {
      element.textContent += sanitizeHTML(text[index]);
      index++;
      scrollToBottom();
    } else {
      clearInterval(interval);
      if (callback) callback();
    }
  }, typingSpeed);
}

let discoveredCommands = new Set();

const createLinkCommand = (url) => () => {
  const message = '';
  appendOutputWithTyping(message, () => {
    const linkElement = document.createElement('div');
    linkElement.innerHTML = `<a href="${url}" target="_blank" style="color: #89e142; text-decoration: underline; cursor: pointer; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">${url}</a>`;
    outputDiv.appendChild(linkElement);
    scrollToBottom();
  });
};

let isAdminMode = false;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  console.error('Admin password not found in environment variables!');
}

const INITIAL_BANNER =
  "\nLast login: 17th Mar 2025, 14:03 CET\n\n**********************************************************\n*****  Type 'help' for a list of available commands  *****\n*****  Type 'exit' to return to the previous screen  *****\n**********************************************************\n\n";

const commands = {
  inspect: () => {
    const uptime = getUptime();
    const inspectText = `– Url: www.kernjosh.com\n– Version: 2.2\n- Uptime: ${uptime}\n- Framework: HTML, CSS, JavaScript, GSAP, Three.js\nUse "latestversion" command to check for updates.`;
    appendOutputWithTyping(inspectText, null);
  },
  latestversion:
    'Version: 2.2, March 30th 2025\nFixed:\n- timing of loading percent and loading bar not synchronized on how to leave town pages\n- pin jumps after loading on some how to leave town pages\n- some images load too late\n- transition after loading images on some projects is too harsh\n- get rid of "use chrome browser" on htlt p1 page - adjust timing of animation\n- some map images are not showing on scroll\n- clean up html of diary page\n- noise flickers on page transition (preloading pages not working)\n- transition on close three modal on love me is too harsh\n- not responsive on big screens\nAdded:\n- video autoplay when open\n- guestbook in terminal\n- hangman in terminal\n- more stuff in terminal',
  whois:
    'Josh Kern:\n– Amateur photographer\n– Professional dogwalker\nType any of the words above to find out more.',
  copyright:
    'Copyrights are for little boy businessmen.\nShare it. Print it. Copy it. Paste it. Cut it. Destroy it.\n– Gravestones/Church Signs by Moose Lane. 2016ish and No Apology #1 by Heidi. Early 1990s',
  contact:
    'Mail: hi(at)kernjosh.com \nPhone: 00 49 176 70917543... only for assignments or stuff like that. please use my email to say hello. thank youuu',
  josh: "Actually, Joshua. I think my parents named me after the U2 album 'The Joshua Tree'.",
  kern: "Translates to 'core'.",
  amateur:
    '- the enthusiast who pursues her work in the spirit of love, regardless of the potential for fame, money or career.\n- are regular people who get obsessed by something and spend a ton of time thinking out loud about it.',
  professional:
    'The dedicated expert who approaches their work with consistent skill, discipline, and a commitment to quality, often in pursuit of a career.',
  photographer: 'Someone who likes to take pictures?',
  hi: 'Hello visitor :)',
  hello: 'Helloi visitor :)',
  hey: 'Hello visitor :)',
  film: 'Kodak Gold 200',
  camera: 'I mostly use a Nikon FM or Olympus XA.',
  inspira: 'Type: books, photobooks or films',
  friends:
    '– Asli\n– Jule\n– Uelgen\n– Max\n– eigensinn\n– Fotobus\nType any of the names above to find out more.',
  books:
    '– Eigensinn Macht Spaß by Hermann Hesse\n– Steal Like An Artist by Austion Kleon\n– Big Magic by Elizabeth Gilbert',
  photobooks:
    '– Winterreise by Luc Delahaye\n– Looking for love on the left bank by Ed Van Der Elsken\n– Wires Crossed by Ed Templeton',
  films: '– Beautiful Losers by Aaron Rose',
  help: `Some available commands:
- whois
- whoami
- contact
- copyright
– setname
- guestbook
– morecommands`,
  morecommands: `A few more available commands:
- inspect
- friends
- hangman
- desktop
- fixme
– clear`,
  instagram: createLinkCommand('https://www.instagram.com/_kjosh/'),
  dogwalker: createLinkCommand('https://www.dogwalkerkoeln.com'),
  eigensinn: createLinkCommand('https://eigensinnpublishing.com/'),
  asli: createLinkCommand('https://www.aslioezcelik.com/'),
  jule: createLinkCommand('https://www.julewild.com/'),
  uelgen: createLinkCommand('https://www.uelgenatakman.com/'),
  max: createLinkCommand('https://maxknoll.com/'),
  fotobus: createLinkCommand('https://fotobus-society.com/'),
  guestbook: async () => {
    appendOutputWithTyping('Loading guestbook entries...', null);

    try {
      const q = query(
        collection(db, 'guestbook'),
        orderBy('date', 'asc'),
        limit(10)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        appendOutputWithTyping(
          'No entries yet.\nUse "sign" command to leave a message.',
          null
        );
        return;
      }

      const messages = querySnapshot.docs
        .map((doc) => {
          const entry = doc.data();
          const idPart = isAdminMode ? ` (ID: ${doc.id})` : '';
          return `[${formatDate(entry.date)}] ${entry.name}: ${
            entry.message
          }${idPart}`;
        })
        .join('\n');

      let helpText = '\n\nUse "sign" command to leave a message.';

      appendOutputWithTyping(
        '=== Recent Guestbook Entries ===\n' + messages + helpText,
        null
      );
    } catch (error) {
      console.error('Error loading guestbook:', error);
      appendOutputWithTyping(
        'Error loading guestbook. Please try again later.',
        null
      );
    }
  },
  setname: () => {
    currentMode = 'guestbook';
    guestbookState.step = 'name';
    appendOutputWithTyping('Enter your name:', null);
  },
  sign: () => {
    const hasName = localStorage.getItem('guestbookUser');
    if (!hasName || currentUser === 'visitor') {
      appendOutputWithTyping(
        'Please set your name first using the "setname" command.',
        null
      );
      return;
    }
    currentMode = 'guestbook';
    guestbookState.step = 'message';
    appendOutputWithTyping('Enter your message:', null);
  },

  desktop: () => {
    appendOutputWithTyping(`opening desktop...`);
    setTimeout(() => {
      window.open('https://kernjosh.com/desktop', '_blank');
    }, 1000);
  },
  fixme: () => {
    appendOutputWithTyping(`opening github...`);
    setTimeout(() => {
      window.open('https://github.com/kjoshh/mywebsite.git', '_blank');
    }, 1000);
  },

  whoami: () => {
    const browser = getBrowserName();
    const language = navigator.language;
    const platform = navigator.platform;
    const resolution = `${window.screen.width}×${window.screen.height}`;

    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        const ip = data.ip;
        appendOutputWithTyping(
          `– Name: ${currentUser}\n– Browser: ${browser}\n– Language: ${language}\n– Platform: ${platform}\n– Resolution: ${resolution}\n– IP Address: ${ip}`,
          null
        );
      })
      .catch((error) => {
        console.error('Failed to fetch IP address:', error);
        appendOutputWithTyping(
          `– Name: ${currentUser}\n– Browser: ${browser}\n– Language: ${language}\n– Platform: ${platform}\n– Resolution: ${resolution}\n– IP Address: Unknown (Error)`,
          null
        );
      });
  },
  clear: () => {
    const banner = document.querySelector('.terminal-banner');
    const output = document.getElementById('output');

    output.innerHTML = '';
    if (banner) {
      output.appendChild(banner);
    }

    if (currentGame) {
      currentGame = null;
      currentMode = 'normal';
    }
  },
  name: () => {
    currentMode = 'guestbook';
    guestbookState.step = 'name';
    appendOutputWithTyping('Enter your new name:', null);
  },
  delete: async (outputDiv, inputField, args) => {
    if (!isAdminMode) {
      appendOutputWithTyping('Unknown command: delete', null);
      return;
    }

    if (!args || args.length === 0) {
      appendOutputWithTyping(
        'Please provide a message ID. Usage: delete <message-id>',
        null
      );
      return;
    }

    const messageId = args[0];
    try {
      const docRef = doc(db, 'guestbook', messageId);

      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.log('Document not found. Checking case-sensitivity...');

        const q = query(collection(db, 'guestbook'));
        const querySnapshot = await getDocs(q);

        const correctId = querySnapshot.docs.find(
          (doc) => doc.id.toLowerCase() === messageId.toLowerCase()
        )?.id;

        if (correctId) {
          console.log('Found correct case:', correctId);
          await deleteDoc(doc(db, 'guestbook', correctId));
          appendOutputWithTyping('Message deleted successfully!', null);
        } else {
          appendOutputWithTyping('Message ID not found.', null);
          return;
        }
      } else {
        await deleteDoc(docRef);
        appendOutputWithTyping('Message deleted successfully!', null);
      }

      setTimeout(async () => {
        const q = query(
          collection(db, 'guestbook'),
          orderBy('date', 'asc'),
          limit(10)
        );

        const updatedSnapshot = await getDocs(q);
        const messages = updatedSnapshot.docs
          .map((doc) => {
            const entry = doc.data();
            const idPart = isAdminMode ? ` (ID: ${doc.id})` : '';
            return `[${formatDate(entry.date)}] ${entry.name}: ${
              entry.message
            }${idPart}`;
          })
          .join('\n');

        appendOutputWithTyping(
          '=== Updated Guestbook Entries ===\n' + messages,
          null
        );
      }, 1000);
    } catch (error) {
      console.error('Error in delete operation:', error);
      appendOutputWithTyping(`Error deleting message: ${error.message}`, null);
    }
  },
  admin: (outputDiv, inputField, args) => {
    if (!args || args.length === 0) {
      appendOutputWithTyping('Usage: admin <password>', null);
      return;
    }

    const password = args[0];
    if (password === ADMIN_PASSWORD) {
      isAdminMode = true;
      appendOutputWithTyping(
        'Admin mode activated. IDs will now be visible.',
        null
      );
    } else {
      appendOutputWithTyping('Invalid password.', null);
    }
  },
  hangman: () => {
    currentMode = 'game';
    currentGame = new HangmanGame(appendOutputWithTyping);
    currentGame.start();
  },
};

const totalCommands = Object.keys(commands).length;

function handleCommand(command) {
  if (!window.terminalActive) return;

  if (command.trim() === 'exit') {
    stopTerminal();
    return;
  }

  const parts = command.toLowerCase().trim().split(' ');
  const cleanCommand = parts[0];
  const args = parts.slice(1);

  if (commands[cleanCommand]) {
    if (!discoveredCommands.has(cleanCommand)) {
      discoveredCommands.add(cleanCommand);
      const commandCounter = document.getElementById('command-counter');
      if (commandCounter) {
        commandCounter.textContent = `commands: ${discoveredCommands.size}/${
          Object.keys(commands).length
        }`;
      }
    }

    if (typeof commands[cleanCommand] === 'function') {
      commands[cleanCommand](outputDiv, inputField, args);
    } else {
      appendOutputWithTyping(commands[cleanCommand], null);
    }
  } else {
    appendOutputWithTyping(`Unknown command: ${command}`, null);
  }
}

function getUptime() {
  const startTime = new Date('2025-02-09T15:00:00+01:00');
  const now = new Date();

  let difference = now.getTime() - startTime.getTime();

  if (difference < 0) {
    return 'Not yet started';
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  return `${days} Days, ${hours} Hours`;
}

function getBrowserName() {
  const userAgent = navigator.userAgent;

  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    return 'Chrome';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    return 'Safari';
  } else if (userAgent.includes('Firefox')) {
    return 'Firefox';
  } else if (userAgent.includes('Edg')) {
    return 'Microsoft Edge';
  } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
    return 'Opera';
  }
  return 'Unknown Browser';
}

export function initializeTerminalScript() {
  const existingBanner = outputDiv.querySelector('.terminal-banner');
  if (existingBanner) {
    return;
  }

  window.terminalActive = true;
  terminalInitialized = true;

  if (!inputListenerAdded) {
    inputListenerAdded = true;
  }

  flickerNoise();

  let commandCounter = document.getElementById('command-counter');
  if (!commandCounter) {
    commandCounter = document.createElement('div');
    commandCounter.id = 'command-counter';
    commandCounter.textContent = `commands: 0/${Object.keys(commands).length}`;
    terminal.appendChild(commandCounter);
  }
  gsap.to(commandCounter, {
    opacity: 1,
    duration: 0.25,
    delay: 2,
  });
  terminal.style.display = 'block';

  const bannerDiv = document.createElement('div');
  bannerDiv.classList.add('terminal-banner');
  outputDiv.appendChild(bannerDiv);

  const initialMessage =
    "\nLast login: 17th Mar 2025, 14:03 CET\n\n**********************************************************\n*****  Type 'help' for a list of available commands  *****\n*****  Type 'exit' to return to the previous screen  *****\n**********************************************************\n\n";

  typeText(bannerDiv, initialMessage, () => {
    inputField.focus();
    updateCursorPosition();
    startLetterGlitch();
  });

  const inputPrompt = document.querySelector('#input-line span');
  if (inputPrompt) {
    inputPrompt.className = 'input-prompt';
    inputPrompt.textContent = `${currentUser}@kernjosh.com:~$ `;
  }
}

function updateCursorPosition() {
  if (!window.terminalActive) return;
  const caretPosition = inputField.selectionStart || 0;
  const inputValue = inputField.value;

  const hiddenMeasure = document.getElementById('hidden-measure');
  hiddenMeasure.textContent = inputValue.substring(0, caretPosition);
  const textWidth = hiddenMeasure.offsetWidth;

  cursor.style.left = `${textWidth + inputField.offsetLeft + 3}px`;
}

inputField.addEventListener('keyup', (event) => {
  if (!window.terminalActive) return;
  if (event.key === 'Enter') {
    const userInput = inputField.value.trim();
    if (userInput === '') return;

    if (currentMode === 'normal') {
      appendUserInput(userInput);
      handleCommand(userInput.toLowerCase());
    } else if (currentMode === 'guestbook') {
      handleGuestbookInput(userInput);
    } else if (currentMode === 'game' && currentGame) {
      if (userInput.trim().toLowerCase() === 'clear') {
        commands.clear();
        inputField.value = '';
        updateCursorPosition();
        return;
      }

      const result = currentGame.handleGuess(userInput.toLowerCase());
      document.getElementById('command-input').value = '';

      if (result.gameOver) {
        currentGame = null;
        currentMode = 'normal';
        scrollToBottom();
      }
      return;
    }

    inputField.value = '';
    scrollToBottom();
    updateCursorPosition();
  }
});

inputField.addEventListener('input', () => {
  if (!window.terminalActive) return;
  if (!inputField.value.startsWith(' ')) {
    inputField.value = ' ' + inputField.value.trimStart();
  }
  updateCursorPosition();
});

terminal.addEventListener('click', () => {
  if (window.terminalActive) {
    inputField.focus();
  }
});

function startLetterGlitch() {
  const timeline = gsap.timeline();
  timeline
    .to([outputDiv, inputLine], {
      opacity: 0.75,
      duration: 0,
      delay: 0,
    })
    .to([outputDiv, inputLine], {
      opacity: 0.75,
      duration: 0,
      delay: 0,
    })
    .to([outputDiv, inputLine], {
      opacity: 0,
      duration: 0,
      delay: 0.15,
    })
    .to([outputDiv, inputLine], {
      opacity: 1,
      duration: 0,
      delay: 0.1,
    })
    .to([outputDiv, inputLine], {
      opacity: 0,
      duration: 0,
      delay: 0.07,
    })
    .to([outputDiv, inputLine], {
      opacity: 1,
      duration: 0,
      delay: 0.05,
    })
    .to([outputDiv, inputLine], {
      opacity: 0,
      duration: 0,
      delay: 0.5,
    })
    .to([outputDiv, inputLine], {
      opacity: 1,
      duration: 0,
      delay: 0.05,
    });
}

function startGlitchEffect() {
  const glitchImages = document.querySelectorAll('.imgbghome');

  glitchImages.forEach((baseImage) => {
    const parent = baseImage.parentElement;

    for (let i = 0; i < 2; i++) {
      const glitchLayer = baseImage.cloneNode(true);
      glitchLayer.classList.add('glitch-layer');
      parent.insertBefore(glitchLayer, baseImage.nextSibling);
    }
    const errortext = document.getElementById('errortext');
    const glitchLayers = parent.querySelectorAll('.glitch-layer');
    const opacitititi = gsap.to([glitchLayers, glitchImages], {
      opacity: () => (Math.random() > 0.8 ? 1 : 0),
      duration: 0,
      stagger: 0.02,
      repeat: -1,
      onRepeat: () => {
        glitchLayers.forEach((layer) => {
          gsap.set(layer, { opacity: () => (Math.random() > 0.8 ? 1 : 0) });
        });

        glitchImages.forEach((image) => {
          gsap.set(image, { opacity: () => (Math.random() > 0.8 ? 1 : 0) });
        });
      },
    });

    gsap.delayedCall(4.4, () => {
      const topimgs = document.querySelectorAll('.imgbghome.archive');

      opacitititi.kill();
      window.terminalActive = false;

      const terminalEvent = new Event('terminalecitit');
      document.dispatchEvent(terminalEvent);

      setTimeout(() => {
        gsap.set([glitchLayers, glitchImages], { opacity: 0 });
        gsap.set(topimgs, { opacity: 1 });
      }, 200);
    });

    const xShiftTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: Math.random() * 0.5 + 0.5,
      onRepeat: function () {
        this.repeatDelay(Math.random() * 0.5 + 3);
      },
    });

    xShiftTimeline.to(glitchLayers, {
      x: () => Math.random() * 20 - 10,
      y: () => Math.random() * 20 - 10,
      duration: 0.1,
      ease: 'none',
    });

    xShiftTimeline.to(glitchLayers, {
      duration: 1.4,
    });

    const clipPathTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: Math.random() * 0.5 + 0.5,
      onRepeat: function () {
        this.repeatDelay(Math.random() * 0.5 + 3);

        gsap.set(glitchLayers, {
          clipPath: () =>
            `inset(${Math.random() * 30}% ${Math.random() * 30}% ${
              Math.random() * 30
            }% ${Math.random() * 30}%)`,
          x: () => Math.random() * 100 - 10,
          y: () => Math.random() * 20 - 10,
        });
      },
    });

    clipPathTimeline.to(glitchLayers, {
      duration: 0.1,
      ease: 'none',
    });

    clipPathTimeline.to(glitchLayers, {
      duration: 1.4,
    });

    const invertTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: Math.random() * 1.5 + 0.5,
      onRepeat: function () {
        this.repeatDelay(Math.random() * 1.75 + 0.75);

        gsap.set(glitchLayers, {
          filter: () => (Math.random() > 0.7 ? 'invert(1)' : 'none'),
        });
      },
    });
    invertTimeline.to(glitchLayers, {
      duration: 0.1,
      ease: 'none',
    });

    invertTimeline.to(glitchLayers, {
      duration: 1.4,
    });

    const errortextTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: Math.random() * 0.3 + 0.01,
      onRepeat: function () {
        this.repeatDelay(Math.random() * 0.3 + 0.01);

        gsap.set(errortext, {
          y: () => (Math.random() > 0.5 ? '0.5px' : '0px'),
        });
      },
    });
    errortextTimeline.to(errortext, {
      duration: 0.1,
      ease: 'none',
    });

    errortextTimeline.to(errortext, {
      duration: 1.4,
    });
  });
}

function flickerNoise() {
  const timeline = gsap.timeline();

  timeline
    .to(noiseLayer, {
      opacity: 0.75,
      duration: 0,
      delay: 0.1,
    })
    .to(noiseLayer, {
      opacity: 0,
      duration: 0,
      delay: 0.3,
    })
    .to(noiseLayer, {
      opacity: 0.75,
      duration: 0,
      delay: 0.6,
    })
    .to(noiseLayer, {
      opacity: 0,
      duration: 0,
      delay: 0.2,
    })
    .to(noiseLayer, {
      opacity: 1,
      duration: 0,
      delay: 0.25,
    })
    .to(noiseLayer, {
      opacity: 0,
      duration: 0,
      delay: 0.1,
    })
    .to(noiseLayer, {
      opacity: 1,
      duration: 0,
      delay: 0.2,
    })
    .to(noiseLayer, {
      opacity: 0,
      duration: 0,
      delay: 0.15,
    })
    .to(noiseLayer, {
      opacity: 1,
      duration: 0,
      delay: 0.2,
    })
    .to(noiseLayer, {
      opacity: 0,
      duration: 0,
      delay: 0.15,
    })
    .to(noiseLayer, {
      opacity: 1,
      duration: 0,
      delay: 0.25,
    })
    .to(noiseLayer, {
      opacity: 0,
      duration: 0,
      delay: 0.1,
    })
    .to(noiseLayer, {
      opacity: 0.5,
      duration: 0,
      delay: 0.2,
    })
    .to(noiseLayer, {
      opacity: 0,
      duration: 0,
      delay: 0.15,
    });
}

export function stopTerminal() {
  const promptText = 'visitor@kernjosh.com:~$ ';
  const systemResponse = 'ERROR: System resources corrupted.';
  activateButton.style.display = 'none';

  setTimeout(() => {
    errortext.style.display = 'block';

    flickerNoise();
    startGlitchEffect();
    if (secondInter) {
      secondInter.style.display = 'none';
    }
  }, 1100);

  setTimeout(() => {
    gsap.to('#text-block', {
      opacity: 1,
      delay: 0,
      duration: 0.15,
      ease: 'ease',
    });
  }, 4000);

  if (outputDiv) {
    const userLine = document.createElement('div');
    userLine.innerHTML = ``;
    outputDiv.appendChild(userLine);
    scrollToBottom();

    setTimeout(() => {
      const responseDiv = document.createElement('div');
      responseDiv.textContent = systemResponse;
      outputDiv.appendChild(responseDiv);
      scrollToBottom();

      setTimeout(() => {
        terminal.style.display = 'none';
        terminalInitialized = false;
      }, 3250);
    }, 100);
  }
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function scrollToBottomSmooth() {
  outputDiv.scrollTo({
    top: outputDiv.scrollHeight,
    behavior: 'smooth',
  });
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function updatePrompt(newUser) {
  currentUser = newUser;
  localStorage.setItem('guestbookUser', currentUser);

  const promptSpan = document.querySelector('.input-prompt');
  if (promptSpan) {
    promptSpan.textContent = `${currentUser}@kernjosh.com:~$ `;
  }
}

async function handleGuestbookInput(input) {
  if (guestbookState.step === 'name') {
    appendUserInput(input);

    if (input.length > 20) {
      appendOutputWithTyping(
        'Name too long (max 20 characters). Try again:',
        null
      );
      return;
    }

    updatePrompt(sanitizeHTML(input));

    currentMode = 'normal';
    guestbookState = { step: '', name: '' };
  } else if (guestbookState.step === 'message') {
    appendUserInput(input);

    if (input.length > 700) {
      appendOutputWithTyping(
        'Message too long (max 700 characters). Try again:',
        null
      );
      return;
    }

    try {
      await addDoc(collection(db, 'guestbook'), {
        name: currentUser,
        message: sanitizeHTML(input),
        date: new Date().toISOString(),
      });

      currentMode = 'normal';
      guestbookState = { step: '', name: '' };

      setTimeout(async () => {
        try {
          const q = query(
            collection(db, 'guestbook'),
            orderBy('date', 'asc'),
            limit(10)
          );

          const querySnapshot = await getDocs(q);
          const messages = querySnapshot.docs
            .map((doc) => {
              const entry = doc.data();
              const idPart = isAdminMode ? ` (ID: ${doc.id})` : '';
              return `[${formatDate(entry.date)}] ${entry.name}: ${
                entry.message
              }${idPart}`;
            })
            .join('\n');

          let helpText = '\n\nUse "sign" to leave a message.';
          if (isAdminMode) {
            helpText += '\nUse "delete <message-id>" to remove a message.';
          }

          appendOutputWithTyping(
            '=== Updated Guestbook Entries ===\n' + messages,
            null
          );
        } catch (error) {
          console.error('Error refreshing guestbook:', error);
          appendOutputWithTyping(
            'Error refreshing guestbook. Use "guestbook" command to see all entries.',
            null
          );
        }
      }, 1000);
    } catch (error) {
      console.error('Error saving entry:', error);
      appendOutputWithTyping(
        'Error saving your message. Please try again later.',
        null
      );
    }
  }
}
