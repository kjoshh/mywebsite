import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('device-check-overlay');
  const message = document.getElementById('device-check-message');
  const whyLink = document.getElementById('browser-check-why-link');
  const mobileWhyLink = document.getElementById('mobile-check-why-link');
  const explanation = document.getElementById('browser-check-explanation');
  const mobileExplanation = document.getElementById('mobile-check-explanation');
  const content = document.getElementById('device-check-content');

  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  function isDesktopSafari() {
    const userAgent = navigator.userAgent;
    return (
      userAgent.indexOf('Safari') > -1 &&
      userAgent.indexOf('Chrome') == -1 &&
      !isMobileDevice()
    );
  }

  if (isMobileDevice()) {
    console.log('ismobileeee');
    message.textContent =
      'oh no, you are using a phone :( you need a larger device, like a laptop in order to enter this page. also pls dont use safariiii';
    overlay.classList.remove('hidden');
    mobileWhyLink.classList.remove('hidden');
    content.classList.add('mobile');
  } else if (isDesktopSafari()) {
    console.log('issafariiiiii');
    message.textContent =
      'oh no, you are using safari :( you need a different browser like chrome in order to enter this page.';
    overlay.classList.remove('hidden');
    whyLink.classList.remove('hidden');
  } else {
    console.log('isnohtinginging');

    overlay.classList.add('hidden');
  }

  whyLink.addEventListener('click', function (event) {
    event.preventDefault();
    explanation.classList.toggle('show');
  });
  mobileWhyLink.addEventListener('click', function (event) {
    event.preventDefault();
    mobileExplanation.classList.toggle('show');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const finderItems = document.querySelectorAll('.finder-item');
  finderItems.forEach((item) => {
    const imageSrc = item.getAttribute('data-image-src');
    const imageName = item.getAttribute('data-image-name');
    const jpgIcon = item.querySelector('.jpg-icon');
    if (imageSrc && jpgIcon) {
      const img = document.createElement('img');
      img.src = imageSrc;
      img.alt = imageName;

      jpgIcon.appendChild(img);
    }
  });

  const infoElements = [
    document.querySelector('.infott._1'),
    document.querySelector('.infott._2'),
    document.querySelector('.infott._3'),
    document.querySelector('.infott._4'),
    document.querySelector('.infott._5'),
    document.querySelector('.infott._6'),
  ];
  const textMainElements = [
    document.querySelector('.textmain._1'),
    document.querySelector('.textmain._2'),
    document.querySelector('.textmain._3'),
    document.querySelector('.textmain._4'),
    document.querySelector('.textmain._5'),
    document.querySelector('.textmain._6'),
  ];
  const clickDeskElements = [
    document.querySelector('#firstclickdesk'),
    document.querySelector('#secondclickdesk'),
    document.querySelector('#thirdclickdesk'),
    document.querySelector('#fourthclickdesk'),
    document.querySelector('#fifthclickdesk'),
    document.querySelector('#sixthclickdesk'),
  ];

  function hideElements(elements) {
    elements.forEach((element) => {
      if (element) {
        element.style.display = 'none';
      }
    });
  }

  function handleClick(index) {
    hideElements(infoElements);
    hideElements(textMainElements);

    clickDeskElements.forEach((element) => {
      if (element) {
        element.style.backgroundColor = 'transparent';
      }
    });

    if (infoElements[index]) {
      infoElements[index].style.display = 'block';
    }
    if (textMainElements[index]) {
      textMainElements[index].style.display = 'block';
    }

    if (clickDeskElements[index]) {
      clickDeskElements[index].style.backgroundColor = '#a18528';
    }
  }

  clickDeskElements.forEach((element, index) => {
    if (element) {
      element.addEventListener('click', () => handleClick(index));
    } else {
      console.error(`ClickDesk element at index ${index} not found!`);
    }
  });

  const imageItems = document.querySelectorAll('.finder-item[data-image-src]');
  imageItems.forEach((item) => {
    item.addEventListener('click', () => {
      const imageSrc = item.getAttribute('data-image-src');
      const imageName = item.getAttribute('data-image-name');

      if (window.openImageDisplay) {
        window.openImageDisplay(imageSrc, imageName);
      }
    });
  });
});
const contiiii = document.querySelector('.contiiii');
const macbookPreloader = document.querySelector('.macbook-preloader');
setTimeout(() => {
  contiiii.style.visibility = 'visible';
  macbookPreloader.style.display = 'none';
}, 4350);
setTimeout(() => {
  contiiii.style.display = 'block';
}, 1000);

function initializeGoHomeFunctionality() {
  const goHomeImages = document.querySelectorAll('.gohome');

  goHomeImages.forEach((image) => {
    image.addEventListener('click', function (event) {
      event.preventDefault();

      const newTab = window.open('/', '_blank');

      if (newTab) {
        newTab.focus();
      } else {
        alert('Please allow popups for this website to open the link.');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initializeGoHomeFunctionality);
function applyTemporaryFilter(event) {
  const button = event.currentTarget;

  button.classList.add('filtered');

  setTimeout(() => {
    button.classList.remove('filtered');
  }, 150);
}

document.querySelectorAll('.icon-button').forEach((button) => {
  button.addEventListener('click', applyTemporaryFilter);
});
const dockContainer = document.querySelector('.dock');
const dockItems = dockContainer.querySelectorAll('.dock-item');
const defaultItemScale = 1;
const hoverItemScale = 2.25;
const neighborItemScale = 1.5;
const defaultMargin = '7.5px';
const expandedMargin = '32.5px';
const updateDockItems = () => {
  dockItems.forEach((item) => {
    let scale = defaultItemScale;
    let margin = defaultMargin;
    if (item.isHovered) {
      scale = hoverItemScale;
      margin = expandedMargin;
    } else if (item.isNeighbor) {
      scale = neighborItemScale;
      margin = expandedMargin;
    }
    item.style.transform = `scale(${scale})`;
    item.style.margin = `0 ${margin}`;
  });
};
dockItems.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    dockItems.forEach((otherItem) => {
      otherItem.isHovered = otherItem === item;
      otherItem.isNeighbor =
        Math.abs(
          Array.from(dockItems).indexOf(otherItem) -
            Array.from(dockItems).indexOf(item)
        ) === 1;
    });
    updateDockItems();
  });
});
dockContainer.addEventListener('mouseleave', () => {
  dockItems.forEach((item) => {
    item.isHovered = item.isNeighbor = false;
  });
  updateDockItems();
});
function updateBerlinDateTime() {
  const berlinDateTimeRaw = new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());
  const berlinDateTime = berlinDateTimeRaw.replace(/,/g, '');
  document.getElementById('berlin-time').innerText = berlinDateTime;
}
setInterval(updateBerlinDateTime, 10000);
updateBerlinDateTime();
(function () {
  emailjs.init('tXokJpIqEzL17NWMR');
})();

function closeNotification(id) {
  document.getElementById(id).style.display = 'none';
}

function showNotification(id) {
  const notification = document.getElementById(id);
  notification.style.display = 'flex';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 5000);
}
document
  .getElementById('contact-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('Form submission event fired');

    const sendButton = document.querySelector('.send-button');
    const spinner = document.getElementById('spinner');
    sendButton.classList.add('disabled');
    spinner.style.display = 'inline-block';

    const form = event.target;

    const formData = {
      to: form.to.value,
      cc: form.cc.value,
      bcc: form.bcc.value,
      subject: form.subject.value,
      from: form.from.value,
      message: form.message.value,
    };

    if (!validateEmail(form.from.value)) {
      alert('Please enter a valid email address.');

      spinner.style.display = 'none';
      sendButton.classList.remove('disabled');
      return;
    }

    emailjs
      .send('service_gnk5nwl', 'template_tscpgz9', formData)
      .then(
        function (response) {
          console.log('SUCCCCESS!', response.status, response.text);

          showNotification('success-message');

          document.getElementById('error-message').style.display = 'none';
          form.reset();
        },
        function (error) {
          console.error('FAILED...', error);

          showNotification('error-message');

          document.getElementById('success-message').style.display = 'none';
        }
      )
      .finally(() => {
        spinner.style.display = 'none';
        sendButton.classList.remove('disabled');
      });
  });

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
let topZIndex = 1000;
const Z_INDEX_RESET_THRESHOLD = 10000;
document.addEventListener('DOMContentLoaded', () => {
  const dockButtons = document.querySelectorAll('.icon-button');
  const windows = document.querySelectorAll('.window');

  dockButtons.forEach((button) => {
    const windowId = button.getAttribute('data-window-id');
    const associatedWindow = document.getElementById(windowId);
    if (!associatedWindow) {
      console.warn(`No w found with id: ${windowId}`);
      return;
    }
    button.addEventListener('click', () => {
      toggleWindowDisplay(associatedWindow, button);
    });
    loadWindowState(associatedWindow);
  });
  windows.forEach((win) => {
    const header = win.querySelector('.window-header');
    const controls = win.querySelectorAll('.control');
    let isDragging = false;
    let isResizing = false;
    let resizeDir = '';
    let startX, startY, startWidth, startHeight, startLeft, startTop;
    const resizeThreshold = 10;
    win.addEventListener('mousedown', () => {
      bringToFront(win);
    });
    header.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('control')) {
        return;
      }
      isDragging = true;
      const rect = win.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      startLeft = rect.left;
      startTop = rect.top;
      bringToFront(win);
      header.classList.add('dragging');
      document.body.style.userSelect = 'none';
    });
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        let newX = startLeft + dx;
        let newY = startTop + dy;
        const windowWidth = win.offsetWidth;
        const windowHeight = win.offsetHeight;
        const bodyWidth = document.body.clientWidth;
        const bodyHeight = document.body.clientHeight;
        newX = Math.max(0, Math.min(newX, bodyWidth - windowWidth));
        newY = Math.max(0, Math.min(newY, bodyHeight - windowHeight));
        win.style.left = `${newX}px`;
        win.style.top = `${newY}px`;
      } else if (isResizing) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        let newWidth = startWidth;
        let newHeight = startHeight;
        let newLeft = startLeft;
        let newTop = startTop;
        if (resizeDir.includes('e')) {
          newWidth = startWidth + dx;
        }
        if (resizeDir.includes('w')) {
          newWidth = startWidth - dx;
          newLeft = startLeft + dx;
        }
        if (resizeDir.includes('s')) {
          newHeight = startHeight + dy;
        }
        if (resizeDir.includes('n')) {
          newHeight = startHeight - dy;
          newTop = startTop + dy;
        }
        const minWidth = 550;
        const minHeight = 350;
        const maxWidth = document.body.clientWidth - newLeft;
        const maxHeight = document.body.clientHeight - newTop;
        newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
        newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));
        win.style.width = `${newWidth}px`;
        win.style.height = `${newHeight}px`;
        win.style.left = `${newLeft}px`;
        win.style.top = `${newTop}px`;
      } else {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const rect = win.getBoundingClientRect();
        const edge = resizeThreshold;
        let cursor = 'default';
        if (
          mouseX >= rect.left - edge &&
          mouseX <= rect.left + edge &&
          mouseY >= rect.top - edge &&
          mouseY <= rect.top + edge
        ) {
          cursor = 'nwse-resize';
        } else if (
          mouseX >= rect.right - edge &&
          mouseX <= rect.right + edge &&
          mouseY >= rect.top - edge &&
          mouseY <= rect.top + edge
        ) {
          cursor = 'nesw-resize';
        } else if (
          mouseX >= rect.left - edge &&
          mouseX <= rect.left + edge &&
          mouseY >= rect.bottom - edge &&
          mouseY <= rect.bottom + edge
        ) {
          cursor = 'nesw-resize';
        } else if (
          mouseX >= rect.right - edge &&
          mouseX <= rect.right + edge &&
          mouseY >= rect.bottom - edge &&
          mouseY <= rect.bottom + edge
        ) {
          cursor = 'nwse-resize';
        } else if (mouseX >= rect.left - edge && mouseX <= rect.left + edge) {
          cursor = 'ew-resize';
        } else if (mouseX >= rect.right - edge && mouseX <= rect.right + edge) {
          cursor = 'ew-resize';
        } else if (mouseY >= rect.top - edge && mouseY <= rect.top + edge) {
          cursor = 'ns-resize';
        } else if (
          mouseY >= rect.bottom - edge &&
          mouseY <= rect.bottom + edge
        ) {
          cursor = 'ns-resize';
        } else if (header.contains(e.target)) {
          cursor = 'grab';
        } else {
          cursor = 'default';
        }
        win.style.cursor = cursor;
      }
    });
    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        header.classList.remove('dragging');
        document.body.style.userSelect = 'auto';
        saveWindowState(win);
      }
      if (isResizing) {
        isResizing = false;
        document.body.style.userSelect = 'auto';
        saveWindowState(win);
      }
    });
    win.addEventListener('mousedown', (e) => {
      const rect = win.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const edge = resizeThreshold;
      let onLeftEdge = mouseX >= rect.left - edge && mouseX <= rect.left + edge;
      let onRightEdge =
        mouseX >= rect.right - edge && mouseX <= rect.right + edge;
      let onTopEdge = mouseY >= rect.top - edge && mouseY <= rect.top + edge;
      let onBottomEdge =
        mouseY >= rect.bottom - edge && mouseY <= rect.bottom + edge;
      if (onLeftEdge && onTopEdge) {
        resizeDir = 'nw';
        isResizing = true;
      } else if (onRightEdge && onTopEdge) {
        resizeDir = 'ne';
        isResizing = true;
      } else if (onLeftEdge && onBottomEdge) {
        resizeDir = 'sw';
        isResizing = true;
      } else if (onRightEdge && onBottomEdge) {
        resizeDir = 'se';
        isResizing = true;
      } else if (onLeftEdge) {
        resizeDir = 'w';
        isResizing = true;
      } else if (onRightEdge) {
        resizeDir = 'e';
        isResizing = true;
      } else if (onTopEdge) {
        resizeDir = 'n';
        isResizing = true;
      } else if (onBottomEdge) {
        resizeDir = 's';
        isResizing = true;
      }
      if (isResizing) {
        const rect = win.getBoundingClientRect();
        startX = e.clientX;
        startY = e.clientY;
        startWidth = rect.width;
        startHeight = rect.height;
        startLeft = rect.left;
        startTop = rect.top;
        bringToFront(win);
        document.body.style.userSelect = 'none';
        e.preventDefault();
      }
    });
    controls.forEach((control) => {
      const action = control.classList.contains('close')
        ? 'close'
        : control.classList.contains('minimize')
        ? 'minimize'
        : 'maximize';
      control.addEventListener('click', (e) => {
        e.stopPropagation();
        if (action === 'close') {
          closeWindow(win);
          updateIconState(win.id, false);
        } else if (action === 'minimize') {
          minimizeWindow(win);
          updateIconState(win.id, false);
        } else if (action === 'maximize') {
          toggleMaximize(win);
        }
      });
    });
    if (win.id === 'finder-window') {
      initializeFinder(win);
    }
  });
  function bringToFront(win) {
    topZIndex += 1;
    if (topZIndex > Z_INDEX_RESET_THRESHOLD) {
      topZIndex = 1000;
      const allWindows = document.querySelectorAll('.window');
      allWindows.forEach((w) => {
        w.style.zIndex = topZIndex;
      });
    }
    win.style.zIndex = topZIndex;
  }
  function toggleWindowDisplay(win, icon) {
    if (win.style.display === 'none' || win.style.display === '') {
      win.classList.remove('hidden');
      win.classList.add('visible');
      win.style.display = 'flex';
      requestAnimationFrame(() => {
        win.classList.add('visible');
      });
      bringToFront(win);
      icon.classList.add('active');
    } else {
      win.classList.remove('visible');
      win.classList.add('hidden');
      const transitionEndHandler = (e) => {
        if (e.propertyName === 'opacity') {
          win.style.display = 'none';
          win.removeEventListener('transitionend', transitionEndHandler);
        }
      };
      win.addEventListener('transitionend', transitionEndHandler);
      icon.classList.remove('active');
    }
    saveWindowState(win);
  }
  function minimizeWindow(win) {
    win.classList.remove('visible');
    win.classList.add('hidden');
    win.addEventListener('transitionend', function handler(e) {
      if (e.propertyName === 'opacity') {
        win.style.display = 'none';
        win.removeEventListener('transitionend', handler);
      }
    });
    const windowId = win.id;
    const icon = document.querySelector(
      `.icon-button[data-window-id="${windowId}"]`
    );
    if (icon) {
      icon.classList.remove('active');
    }
    saveWindowState(win);
  }
  function closeWindow(win) {
    win.classList.remove('visible');
    win.classList.add('hidden');
    win.addEventListener('transitionend', function handler(e) {
      if (e.propertyName === 'opacity') {
        win.style.display = 'none';
        win.removeEventListener('transitionend', handler);
      }
    });
    const windowId = win.id;
    const icon = document.querySelector(
      `.icon-button[data-window-id="${windowId}"]`
    );
    if (icon) {
      icon.classList.remove('active');
    }
    saveWindowState(win);
  }
  function toggleMaximize(win) {
    if (win.classList.contains('maximized')) {
      win.classList.remove('maximized');
      const originalState = win.dataset.originalState;
      if (originalState) {
        const state = JSON.parse(originalState);
        win.style.left = state.left;
        win.style.top = state.top;
        win.style.width = state.width;
        win.style.height = state.height;
        delete win.dataset.originalState;
      }
    } else {
      const rect = win.getBoundingClientRect();
      win.dataset.originalState = JSON.stringify({
        left: win.style.left,
        top: win.style.top,
        width: win.style.width,
        height: win.style.height,
      });
      win.style.left = '0px';
      win.style.top = '0px';
      win.style.width = '100vw';
      win.style.height = '100vh';
      win.classList.add('maximized');
    }
    saveWindowState(win);
  }
  function updateIconState(windowId, isActive) {
    const icon = document.querySelector(
      `.icon-button[data-window-id="${windowId}"]`
    );
    if (icon) {
      if (isActive) {
        icon.classList.add('active');
      } else {
        icon.classList.remove('active');
      }
    }
  }
  function saveWindowState(win) {
    const rect = win.getBoundingClientRect();
    const state = {
      left: win.style.left,
      top: win.style.top,
      width: win.style.width,
      height: win.style.height,
      display: win.style.display,
      zIndex: win.style.zIndex,
      isMaximized: win.classList.contains('maximized'),
    };
    localStorage.setItem(win.id, JSON.stringify(state));
  }
  function loadWindowState(win) {
    const savedState = localStorage.getItem(win.id);
    if (savedState) {
      const state = JSON.parse(savedState);
      win.style.left = state.left;
      win.style.top = state.top;
      win.style.width = state.width;
      win.style.height = state.height;
      win.style.zIndex = state.zIndex;
      if (state.isMaximized) {
        win.classList.add('maximized');
      }
      if (state.display === 'flex') {
        win.classList.add('visible');
        win.classList.remove('hidden');
        const icon = document.querySelector(
          `.icon-button[data-window-id="${win.id}"]`
        );
        if (icon) {
          icon.classList.add('active');
        }
      } else {
        win.classList.add('hidden');
        win.classList.remove('visible');
        const icon = document.querySelector(
          `.icon-button[data-window-id="${win.id}"]`
        );
        if (icon) {
          icon.classList.remove('active');
        }
      }
    } else {
      const isVisible = win.classList.contains('visible');
      if (isVisible) {
        win.style.display = 'flex';
        const icon = document.querySelector(
          `.icon-button[data-window-id="${win.id}"]`
        );
        if (icon) {
          icon.classList.add('active');
        }
      } else {
        win.style.display = 'none';
      }
    }
  }
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'm') {
      restoreAllWindows();
      alert('All minimized windows have been restored.');
    }
  });
  function restoreAllWindows() {
    const windows = document.querySelectorAll('.window');
    const icons = document.querySelectorAll('.icon-button');
    windows.forEach((win) => {
      if (win.style.display === 'none' || win.style.display === '') {
        win.classList.remove('hidden');
        win.classList.add('visible');
        win.style.display = 'flex';
        bringToFront(win);
        const windowId = win.id;
        const icon = document.querySelector(
          `.icon-button[data-window-id="${windowId}"]`
        );
        if (icon) {
          icon.classList.add('active');
        }
        saveWindowState(win);
      }
    });
  }
  function initializeFinder(win) {
    const sidebar = win.querySelector('.finder-sidebar');
    const tabs = sidebar.querySelectorAll('li');
    const sections = win.querySelectorAll('.finder-section');
    const finderTitle = win.querySelector('.finder-title');
    function deactivateAllTabs() {
      tabs.forEach((tab) => {
        tab.classList.remove('active');
      });
    }
    function hideAllSections() {
      sections.forEach((section) => {
        section.classList.remove('active');
      });
      const folderContentSections = win.querySelectorAll('.folder-content');
      folderContentSections.forEach((folderSection) => {
        folderSection.classList.add('hidden');
      });
    }
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const selectedTab = tab.getAttribute('data-tab');
        deactivateAllTabs();
        hideAllSections();

        tab.classList.add('active');

        const section = win.querySelector(`#${selectedTab}`);
        if (section) {
          section.classList.add('active');
        }

        finderTitle.textContent = capitalizeFirstLetter(
          selectedTab.replace('-', ' ')
        );
      });
    });

    const finderItems = win.querySelectorAll(
      '.finder-item[data-folder], .finder-item[data-image-src]'
    );
    finderItems.forEach((item) => {
      item.addEventListener('click', () => {
        if (item.hasAttribute('data-image-src')) {
          const imageSrc = item.getAttribute('data-image-src');
          const imageName = item.getAttribute('data-image-name');
          if (window.openImageDisplay) {
            window.openImageDisplay(imageSrc, imageName);
          }
        } else if (item.hasAttribute('data-folder')) {
          const folderName = item.getAttribute('data-folder');
          const folderSection = win.querySelector(`#${folderName}`);
          if (folderSection) {
            hideAllSections();
            deactivateAllTabs();

            folderSection.classList.remove('hidden');
            folderSection.classList.add('active');

            finderTitle.textContent = capitalizeFirstLetter(
              folderName.replace('-', ' ')
            );
          }
        }
      });

      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (item.hasAttribute('data-image-src')) {
            const imageSrc = item.getAttribute('data-image-src');
            const imageName = item.getAttribute('data-image-name');
            if (window.openImageDisplay) {
              window.openImageDisplay(imageSrc, imageName);
            }
          } else if (item.hasAttribute('data-folder')) {
            const folderName = item.getAttribute('data-folder');
            const folderSection = win.querySelector(`#${folderName}`);
            if (folderSection) {
              hideAllSections();
              deactivateAllTabs();

              folderSection.classList.remove('hidden');
              folderSection.classList.add('active');

              finderTitle.textContent = capitalizeFirstLetter(
                folderName.replace('-', ' ')
              );
            }
          }
        }
      });
    });

    const backButtons = win.querySelectorAll('.back-button');
    backButtons.forEach((backBtn) => {
      backBtn.addEventListener('click', () => {
        const currentFolderContent = backBtn.closest('.folder-content');
        if (currentFolderContent) {
          currentFolderContent.classList.add('hidden');
          currentFolderContent.classList.remove('active');

          finderTitle.textContent = 'Finder';
        }
      });
    });
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function openImageDisplay(imageSrc, imageName) {
    if (!imageDisplayWindow || !displayedImage) return;

    displayedImage.src = imageSrc;
    displayedImage.alt = imageName;

    imageDisplayTitle.textContent = `Image - ${imageName}`;

    imageDisplayWindow.classList.remove('hidden');
    imageDisplayWindow.style.display = 'flex';
    ('visible');
    requestAnimationFrame(() => {
      imageDisplayWindow.classList.add('visible');
    });

    bringToFront(imageDisplayWindow);
  }

  window.openImageDisplay = openImageDisplay;
});

document.addEventListener('DOMContentLoaded', () => {
  const imageDisplayWindow = document.getElementById('image-display-window');
  const displayedImage = document.getElementById('displayed-image');

  const closeBtn = imageDisplayWindow.querySelector('.control.close');
  const minimizeBtn = imageDisplayWindow.querySelector('.control.minimize');
  const maximizeBtn = imageDisplayWindow.querySelector('.control.maximize');

  const imageDisplayTitle = document.getElementById('image-display-title');

  let topZIndex = 2000;
  const Z_INDEX_RESET_THRESHOLD = 3000;
  function bringToFront(win) {
    topZIndex += 1;
    if (topZIndex > Z_INDEX_RESET_THRESHOLD) {
      topZIndex = 2000;

      const allWindows = document.querySelectorAll('.window');
      allWindows.forEach((w) => {
        w.style.zIndex = topZIndex;
      });
    }
    win.style.zIndex = topZIndex;
    console.log(`Brought ${win.id} to front with z-index: ${topZIndex}`);
  }

  function openImageDisplay(imageSrc, imageName) {
    if (!imageDisplayWindow || !displayedImage) return;

    displayedImage.src = imageSrc;
    displayedImage.alt = imageName;

    imageDisplayTitle.textContent = `${imageName}`;

    imageDisplayWindow.classList.remove('hidden');
    imageDisplayWindow.style.display = 'flex';
    ('visible');
    requestAnimationFrame(() => {
      imageDisplayWindow.classList.add('visible');
    });

    bringToFront(imageDisplayWindow);
  }

  function closeImageDisplay() {
    if (!imageDisplayWindow) return;

    imageDisplayWindow.classList.remove('visible');
    imageDisplayWindow.classList.add('hidden');

    const transitionEndHandler = (e) => {
      if (e.propertyName === 'opacity') {
        imageDisplayWindow.style.display = 'none';
        imageDisplayWindow.removeEventListener(
          'transitionend',
          transitionEndHandler
        );
      }
    };
    imageDisplayWindow.addEventListener('transitionend', transitionEndHandler);

    displayedImage.src = '';
    displayedImage.alt = '';
    imageDisplayTitle.textContent = 'Image Viewer';
  }

  closeBtn.addEventListener('click', closeImageDisplay);
  minimizeBtn.addEventListener('click', () => {
    if (!imageDisplayWindow) return;

    imageDisplayWindow.classList.remove('visible');
    imageDisplayWindow.classList.add('hidden');

    const transitionEndHandler = (e) => {
      if (e.propertyName === 'opacity') {
        imageDisplayWindow.style.display = 'none';
        imageDisplayWindow.removeEventListener(
          'transitionend',
          transitionEndHandler
        );
      }
    };
    imageDisplayWindow.addEventListener('transitionend', transitionEndHandler);
  });
  maximizeBtn.addEventListener('click', () => {
    if (!imageDisplayWindow) return;
    if (imageDisplayWindow.classList.contains('maximized')) {
      imageDisplayWindow.classList.remove('maximized');
      imageDisplayWindow.style.width = '800px';
      imageDisplayWindow.style.height = '600px';
      imageDisplayWindow.style.top = '100px';
      imageDisplayWindow.style.left = '60px';
    } else {
      imageDisplayWindow.classList.add('maximized');
      imageDisplayWindow.style.width = '100vw';
      imageDisplayWindow.style.height = '100vh';
      imageDisplayWindow.style.top = '0';
      imageDisplayWindow.style.left = '0';
    }
  });

  window.openImageDisplay = openImageDisplay;
});

const editableText = document.querySelector("[contenteditable='true']");

editableText.focus();

const clickAudio = document.getElementById('click-audio');
const hoverAudio = document.getElementById('hover-audio');

const linkClasses = [
  {
    className: 'image-25',
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
  {
    className: 'image-25._2',
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
  {
    className: 'image-25._3',
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
  {
    className: 'image-25._4',
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
  {
    className: 'image-25._5',
    clickAudio: clickAudio,
    hoverAudio: hoverAudio,
  },
];
linkClasses.forEach((linkInfo) => {
  const link = document.querySelector(`.${linkInfo.className}`);
  if (link) {
    if (linkInfo.clickAudio) {
      link.addEventListener('click', function (event) {
        linkInfo.clickAudio.currentTime = 0;
        linkInfo.clickAudio.play();
      });
    }

    if (linkInfo.hoverAudio) {
      link.addEventListener('mouseover', function () {
        linkInfo.hoverAudio.play();
      });

      link.addEventListener('mouseleave', function () {
        linkInfo.hoverAudio.pause();
        linkInfo.hoverAudio.currentTime = 0;
      });
    }
  }
});
