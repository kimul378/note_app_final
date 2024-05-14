import '/src/style.css';

console.log('Webpack setup');
// Custom Loading Indicator Component
class LoadingIndicator extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
  <style>
    header {
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: center; /* Posisikan header di tengah */
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .logo {
      max-width: 50px;
      height: auto;
      margin-right: 10px;
    }
    h1 {
      margin: 0;
    }
  </style>
  <header>
    <img src="./img/kicky-note.png" alt="Logo" class="logo">
    <h1>Kicky Notes</h1>
  </header>
`;

  }
}

customElements.define('loading-indicator', LoadingIndicator);

// Function to show loading indicator
function showLoadingIndicator() {
  const loader = document.createElement('loading-indicator');
  document.body.appendChild(loader);
}

// Function to hide loading indicator
function hideLoadingIndicator() {
  const loader = document.querySelector('loading-indicator');
  if (loader) {
      loader.remove();
  }
}

// Function to fetch notes from API and store in local storage
async function fetchNotes() {
  showLoadingIndicator();
  try {
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
      if (!response.ok) {
          throw new Error('Failed to fetch notes');
      }
      const notes = await response.json();
      localStorage.setItem('notes', JSON.stringify(notes.data)); // Store notes in local storage
      return notes;
  } catch (error) {
      console.error('Error fetching notes:', error);
      throw error; // Re-throw to be caught by other error handlers
  } finally {
      hideLoadingIndicator();
  }
}

// Function to retrieve notes from local storage
function getNotesFromLocalStorage() {
  const notesString = localStorage.getItem('notes');
  return notesString ? JSON.parse(notesString) : [];
}

// Function to render notes
function renderNotes(notes) {
  const notesList = document.getElementById('notesList');
  notesList.innerHTML = '';
  notes.forEach(note => {
      const noteDiv = document.createElement('div');
      noteDiv.classList.add('note');
      noteDiv.innerHTML = `
          <h2>${note.title}</h2>
          <p>${note.body}</p>
          <button class="deleteBtn" data-id="${note.id}"></button>
      `;
      notesList.appendChild(noteDiv);
  });
}

// Function to handle form submission for adding note
document.getElementById('noteForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const noteTitle = document.getElementById('noteTitle').value.trim();
  const noteBody = document.getElementById('noteBody').value.trim();

  if (noteTitle && noteBody) {
      showLoadingIndicator();
      try {
          const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  title: noteTitle,
                  body: noteBody
              })
          });

          if (!response.ok) {
              throw new Error('Failed to add note');
          }

          const data = await response.json();
          console.log('Note added:', data);
          // Fetch and render updated notes
          const updatedNotes = await fetchNotes();
          renderNotes(updatedNotes.data);
          // Reset form
          document.getElementById('noteForm').reset();
      } catch (error) {
          console.error('Error adding note:', error);
      } finally {
          hideLoadingIndicator();
      }
  }
});


// Function to handle delete button click
document.getElementById('notesList').addEventListener('click', async function(event) {
  if (event.target.classList.contains('deleteBtn')) {
      const noteId = event.target.dataset.id;
      const confirmDelete = confirm('Are you sure you want to delete this note?');
      if (confirmDelete) {
          showLoadingIndicator();
          try {
              const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`, {
                  method: 'DELETE'
              });
              if (!response.ok) {
                  throw new Error('Failed to delete note');
              }
              const data = await response.json();
              console.log('Note deleted:', data);
              // Fetch and render updated notes
              const updatedNotes = await fetchNotes();
              renderNotes(updatedNotes.data);
          } catch (error) {
              console.error('Error deleting note:', error);
          } finally {
              hideLoadingIndicator();
          }
      }
  }
});

// Function to enable dark mode
function enableDarkMode() {
  const darkModeSwitcher = document.getElementById('darkModeSwitcher');
  const fontSizer = document.getElementById('fontSizer');

  document.body.classList.add('dark-mode');
  document.body.style.backgroundColor = '#074173';
  document.body.style.color = '#fff';
  darkModeSwitcher.classList.add('dark-mode-enabled');
}

// Add event listener to enable dark mode on DOM content load
document.addEventListener('DOMContentLoaded', function() {
  const darkModeSwitcher = document.getElementById('darkModeSwitcher');
  const fontSizer = document.getElementById('fontSizer');

  // Check if dark mode preference is stored in local storage
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  // Apply dark mode if it's enabled in local storage
  if (isDarkMode) {
      enableDarkMode();
  }

  // Check if font size preference is stored in local storage
  const storedFontSize = localStorage.getItem('fontSize');

  // Apply font size if it's set in local storage
  if (storedFontSize) {
      document.body.style.fontSize = storedFontSize;
  }

  // Fetch notes from local storage and render them
  const notesFromLocalStorage = getNotesFromLocalStorage();
  renderNotes(notesFromLocalStorage);

  // Add event listener to dark mode switcher
  darkModeSwitcher.addEventListener('click', function() {
      const darkModeEnabled = document.body.classList.toggle('dark-mode');

      // Store dark mode preference in local storage
      localStorage.setItem('darkMode', darkModeEnabled);

      // Apply appropriate styles based on dark mode status
      if (darkModeEnabled) {
          document.body.style.backgroundColor = '#074173';
          document.body.style.color = '#074173';
          darkModeSwitcher.classList.add('dark-mode-enabled');
      } else {
          document.body.style.backgroundColor = '#f0f0f0';
          document.body.style.color = '#000';
          darkModeSwitcher.classList.remove('dark-mode-enabled');
      }
  });

  // Add event listener to font sizer
  fontSizer.addEventListener('click', function() {
      // Prompt user for new font size
      const newSize = prompt('Enter new font size (e.g., 16px):');

      // Set font size if user provided a value
      if (newSize) {
          document.body.style.fontSize = newSize;

          // Store font size preference in local storage
          localStorage.setItem('fontSize', newSize);
      }
  });
});
class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        header {
          background-color: #007bff;
          color: white;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          justify-content: center; /* Posisikan header di tengah */
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .logo {
          max-width: 50px;
          height: auto;
          margin-right: 10px;
        }
        h1 {
          margin: 0;
        }
      </style>
      <header>
        <img src="/img/kicky-note.png" alt="Logo" class="logo">
        <h1>Kicky Notes</h1>
      </header>
    `;
  }
}

customElements.define('custom-header', HeaderComponent);

class CustomMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .custom-menu {
          position: sticky;
          top: 60px; /* Adjust as needed based on header height */
          background-color: #0056b3;
          padding: 10px 20px;
          z-index: 999;
          opacity: 1; /* Menampilkan menu saat halaman dimuat */
          transition: opacity 0.3s ease-in-out;
          display: flex; /* Gunakan flexbox */
          justify-content: center; /* Posisikan menu di tengah */
        }
        .custom-menu ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .custom-menu ul li {
          display: inline;
        }
        .custom-menu ul li a {
          color: white;
          margin-right: 20px;
          text-decoration: none;
        }
        .custom-menu ul li a:hover {
          background-color: #007bff;
        }
      </style>
      <nav class="custom-menu">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    `;
  }

  connectedCallback() {
    const header = document.querySelector('custom-header');
    const nav = this.shadowRoot.querySelector('.custom-menu');

    // Tambahkan event listener untuk mendeteksi scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > header.offsetHeight) {
        nav.style.opacity = '0'; // Menu akan menghilang saat di-scroll ke bawah
      } else {
        nav.style.opacity = '1'; // Menu akan muncul saat di-scroll ke atas
      }
    });
  }
}

customElements.define('custom-menu', CustomMenu);

// Komponen Footer
class FooterComponent extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
          <style>
              footer {
                  position: fixed;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  background-color: #007bff;
                  color: white;
                  text-align: center;
                  padding: 10px;
                  
              }
          </style>
          <footer>
              <p>© 2024 Kicky Notes. All rights reserved.</p>
          </footer>
      `;
  }
}

customElements.define('custom-footer', FooterComponent);

class CustomFigure extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `
          <div class="custom-figure">
              <img src="/img/kicky-note.png" alt="Logo" class="logo">
          </div>
      `;
  }
}
customElements.define('custom-figure', CustomFigure);
