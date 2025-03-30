import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const guestbookCommands = {
  guestbook: async (appendOutputWithTyping) => {
    appendOutputWithTyping('Loading guestbook entries...', null);

    try {
      const q = query(
        collection(db, 'guestbook'),
        orderBy('date', 'desc'),
        limit(10)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        appendOutputWithTyping(
          'No entries yet. Be the first to sign!\nUse "sign" command to leave a message.',
          null
        );
        return;
      }

      const messages = querySnapshot.docs
        .map((doc) => {
          const entry = doc.data();
          return `[${formatDate(entry.date)}] ${entry.name}: ${entry.message}`;
        })
        .join('\n');

      appendOutputWithTyping(
        '=== Recent Guestbook Entries ===\n' +
          messages +
          '\n\nUse "sign" command to leave a message.',
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

  sign: (appendOutputWithTyping, inputField, sanitizeHTML, onComplete) => {
    let isWaitingForName = true;
    let userName = '';

    appendOutputWithTyping('Enter your name (max 20 characters):', null);

    const messageHandler = async (event) => {
      if (event.key === 'Enter') {
        const input = event.target.value.trim();
        inputField.value = '';

        if (isWaitingForName) {
          if (!input || input.length > 20) {
            appendOutputWithTyping(
              'Invalid name. Please try again (max 20 characters).',
              null
            );
            return;
          }
          userName = input;
          isWaitingForName = false;
          appendOutputWithTyping(`${input}`, null);
          appendOutputWithTyping(
            'Enter your message (max 100 characters):',
            null
          );
        } else {
          if (!input || input.length > 100) {
            appendOutputWithTyping(
              'Invalid message. Please try again (max 100 characters).',
              null
            );
            return;
          }

          try {
            await addDoc(collection(db, 'guestbook'), {
              name: sanitizeHTML(userName),
              message: sanitizeHTML(input),
              date: new Date().toISOString(),
            });

            appendOutputWithTyping(`${input}`, null);
            appendOutputWithTyping(
              'Thank you for signing the guestbook! Type "guestbook" to see all entries.',
              null
            );
            inputField.removeEventListener('keyup', messageHandler);
            onComplete(); // Call the completion callback
          } catch (error) {
            console.error('Error adding entry:', error);
            appendOutputWithTyping(
              'Error saving your message. Please try again later.',
              null
            );
            onComplete(); // Call the completion callback even on error
          }
        }
      }
    };

    inputField.addEventListener('keyup', messageHandler);
  },
};
