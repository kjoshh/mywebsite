import gsap from 'gsap';

if (typeof window.terminalActive === 'undefined') {
  window.terminalActive = false;
}

let terminalInitialized = false;
let inputListenerAdded = false;

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
  const sanitizedText = sanitizeHTML(inputText);

  userLine.innerHTML = `<span class="prompt">visitor@kernjosh.com:~$ </span>${sanitizeHTML(
    inputText
  )}`;
  outputDiv.appendChild(userLine);
  scrollToBottom();
}

function appendOutputWithTyping(text, callback) {
  if (!window.terminalActive) return;
  const newLine = document.createElement('div');
  newLine.textContent = '';
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

const commands = {
  inspect: () => {
    const uptime = getUptime();
    const inspectText = `– Url: www.kernjosh.com\n– Version: 2.1\n- Uptime: ${uptime}\n- Framework: HTML, CSS, JavaScript, GSAP, Three.js`;
    appendOutputWithTyping(inspectText, null);
  },
  whois:
    'Josh Kern:\n– Amateur photographer\n– Professional dogwalker\nType any of the words above to find out more.',
  copyright:
    'Copyrights are for little boy businessmen. Share it. Copy it. Paste it. Cut it. Destroy it. Remake it… and credit me.\n– Gravestones/Church Signs by Moose Lane. 2016ish and No Apology #1 by Heidi. Early 1990s',
  contact:
    'Mail: hi(at)kernjosh.com \nPhone: 00 49 176 70917543... only for assignments or stuff like that. please use my email to say hello. thank youuu',
  josh: "Actually, Joshua. I think my parents named me after the U2 album 'The Joshua Tree'.",
  kern: "Translates to 'core'.",
  amateur:
    '- the enthusiast who pursues her work in the spirit of love, regardless of the potential for fame, money or career.\n- are regular people who get obsessed by something and spend a ton of time thinking out loud about it.',
  professional:
    'The dedicated expert who approaches their work with consistent skill, discipline, and a commitment to quality, often in pursuit of a career.',
  photographer: 'Someone who likes to take pictures?',
  dogwalker: 'https://www.dogwalkerkoeln.com',
  hi: 'Hello visitor :)',
  hello: 'Helloi visitor :)',
  hey: 'Hello visitor :)',
  film: 'Kodak Gold 200',
  camera: 'I mostly use a Nikon FM or Olympus XA.',
  inspira: 'Type: books, photobooks or films',
  friends:
    '– Asli Oezcelik\n– Jule Wild\n– Ülgen Atakman\n– Max Knoll\n– Fotobus Society',
  help: 'Some available commands:\n- whois\n- whoami\n– contact\n- copyright\n- desktop\n- inspect\n- fixme',
  morecommands: '– friends\n– inspira\n– camera\n– film',
  books:
    '– Eigensinn Macht Spaß by Hermann Hesse\n– Steal Like An Artist by Austion Kleon\n– Big Magic by Elizabeth Gilbert',
  photobooks:
    '– Winterreise by Luc Delahaye\n– Looking for love on the left bank by Ed Van Der Elsken\n– Wires Crossed by Ed Templeton',
  films: '– Beautiful Losers by Aaron Rose',
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
          `– Name: visitor\n– Browser: ${browser}\n– Language: ${language}\n– Platform: ${platform}\n– Resolution: ${resolution}\n– IP Address: ${ip}`,
          null
        );
      })
      .catch((error) => {
        console.error('Failed to fetch IP address:', error);
        appendOutputWithTyping(
          `[IP Address: Unknown (Error)]\n[Browser: ${browser}]\n[Platform: ${platform}]\n[Resolution: ${resolution}]`,
          null
        );
      });
  },
  clear: () => {
    outputDiv.innerHTML = '';
    scrollToBottom();
  },
};

const totalCommands = Object.keys(commands).length;

function handleCommand(command) {
  console.log('Handling command: ', command);
  if (!window.terminalActive) return;

  if (command.trim() === 'exit') {
    stopTerminal();
    return;
  }

  const cleanCommand = command.toLowerCase().trim();

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
      commands[cleanCommand](outputDiv, inputField);
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
    commandCounter.style.cssText = `...`;
    commandCounter.textContent = `commands: 0/${Object.keys(commands).length}`;
    terminal.appendChild(commandCounter);
  }

  terminal.style.display = 'block';
  const banner = '';

  appendOutputWithTyping(banner, () => {
    const initialMessage =
      "\nLast login by kernjosh.com: 10th Mar 2025, 15:33 CET\n\n**********************************************************\n*****  Type 'help' for a list of available commands  *****\n*****  Type 'exit' to return to the previous screen  *****\n**********************************************************\n\n";
    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('terminal-banner');
    bannerDiv.textContent = initialMessage;
    outputDiv.appendChild(bannerDiv);
    inputField.focus();
    updateCursorPosition();
    startLetterGlitch();
  });
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
    appendUserInput(userInput);
    handleCommand(userInput.toLowerCase());
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

      console.log('Dispatching terminalecitit e');
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
