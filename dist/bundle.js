(()=>{class e extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML='\n          <style>\n              .loader {\n                  border: 8px solid #f3f3f3; /* Light grey */\n                  border-top: 8px solid #3498db; /* Blue */\n                  border-radius: 50%;\n                  width: 50px;\n                  height: 50px;\n                  animation: spin 1s linear infinite;\n                  position: fixed;\n                  top: 50%;\n                  left: 50%;\n                  transform: translate(-50%, -50%);\n                  z-index: 9999; /* Ensure it\'s on top of other elements */\n              }\n\n              @keyframes spin {\n                  0% { transform: rotate(0deg); }\n                  100% { transform: rotate(360deg); }\n              }\n          </style>\n          <div class="loader"></div>\n      '}}function n(){const e=document.createElement("loading-indicator");document.body.appendChild(e)}function t(){const e=document.querySelector("loading-indicator");e&&e.remove()}async function o(){n();try{const e=await fetch("https://notes-api.dicoding.dev/v2/notes");if(!e.ok)throw new Error("Failed to fetch notes");const n=await e.json();return localStorage.setItem("notes",JSON.stringify(n.data)),n}catch(e){throw console.error("Error fetching notes:",e),e}finally{t()}}function s(e){const n=document.getElementById("notesList");n.innerHTML="",e.forEach((e=>{const t=document.createElement("div");t.classList.add("note"),t.innerHTML=`\n          <h2>${e.title}</h2>\n          <p>${e.body}</p>\n          <button class="deleteBtn" data-id="${e.id}"></button>\n      `,n.appendChild(t)}))}customElements.define("loading-indicator",e),document.getElementById("noteForm").addEventListener("submit",(async function(e){e.preventDefault();const d=document.getElementById("noteTitle").value.trim(),i=document.getElementById("noteBody").value.trim();if(d&&i){n();try{const e=await fetch("https://notes-api.dicoding.dev/v2/notes",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:d,body:i})});if(!e.ok)throw new Error("Failed to add note");const n=await e.json();console.log("Note added:",n),s((await o()).data),document.getElementById("noteForm").reset()}catch(e){console.error("Error adding note:",e)}finally{t()}}})),document.getElementById("notesList").addEventListener("click",(async function(e){if(e.target.classList.contains("deleteBtn")){const d=e.target.dataset.id;if(confirm("Are you sure you want to delete this note?")){n();try{const e=await fetch(`https://notes-api.dicoding.dev/v2/notes/${d}`,{method:"DELETE"});if(!e.ok)throw new Error("Failed to delete note");const n=await e.json();console.log("Note deleted:",n),s((await o()).data)}catch(e){console.error("Error deleting note:",e)}finally{t()}}}})),document.addEventListener("DOMContentLoaded",(function(){const e=document.getElementById("darkModeSwitcher"),n=document.getElementById("fontSizer");"true"===localStorage.getItem("darkMode")&&function(){const e=document.getElementById("darkModeSwitcher");document.getElementById("fontSizer"),document.body.classList.add("dark-mode"),document.body.style.backgroundColor="#074173",document.body.style.color="#fff",e.classList.add("dark-mode-enabled")}();const t=localStorage.getItem("fontSize");t&&(document.body.style.fontSize=t),s(function(){const e=localStorage.getItem("notes");return e?JSON.parse(e):[]}()),e.addEventListener("click",(function(){const n=document.body.classList.toggle("dark-mode");localStorage.setItem("darkMode",n),n?(document.body.style.backgroundColor="#074173",document.body.style.color="#074173",e.classList.add("dark-mode-enabled")):(document.body.style.backgroundColor="#f0f0f0",document.body.style.color="#000",e.classList.remove("dark-mode-enabled"))})),n.addEventListener("click",(function(){const e=prompt("Enter new font size (e.g., 16px):");e&&(document.body.style.fontSize=e,localStorage.setItem("fontSize",e))}))}));class d extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML='\n      <style>\n        header {\n          background-color: #007bff;\n          color: white;\n          padding: 10px 20px;\n          display: flex;\n          align-items: center;\n          justify-content: center; /* Posisikan header di tengah */\n          position: sticky;\n          top: 0;\n          z-index: 1000;\n        }\n        .logo {\n          max-width: 50px;\n          height: auto;\n          margin-right: 10px;\n        }\n        h1 {\n          margin: 0;\n        }\n      </style>\n      <header>\n        <img src="/img/kicky-note.png" alt="Logo" class="logo">\n        <h1>Kicky Notes</h1>\n      </header>\n    '}}customElements.define("custom-header",d);class i extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML='\n      <style>\n        .custom-menu {\n          position: sticky;\n          top: 60px; /* Adjust as needed based on header height */\n          background-color: #0056b3;\n          padding: 10px 20px;\n          z-index: 999;\n          opacity: 1; /* Menampilkan menu saat halaman dimuat */\n          transition: opacity 0.3s ease-in-out;\n          display: flex; /* Gunakan flexbox */\n          justify-content: center; /* Posisikan menu di tengah */\n        }\n        .custom-menu ul {\n          list-style: none;\n          padding: 0;\n          margin: 0;\n        }\n        .custom-menu ul li {\n          display: inline;\n        }\n        .custom-menu ul li a {\n          color: white;\n          margin-right: 20px;\n          text-decoration: none;\n        }\n        .custom-menu ul li a:hover {\n          background-color: #007bff;\n        }\n      </style>\n      <nav class="custom-menu">\n        <ul>\n          <li><a href="#">Home</a></li>\n          <li><a href="#">About</a></li>\n          <li><a href="#">Contact</a></li>\n        </ul>\n      </nav>\n    '}connectedCallback(){const e=document.querySelector("custom-header"),n=this.shadowRoot.querySelector(".custom-menu");window.addEventListener("scroll",(()=>{window.scrollY>e.offsetHeight?n.style.opacity="0":n.style.opacity="1"}))}}customElements.define("custom-menu",i);class a extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML="\n          <style>\n              footer {\n                  position: fixed;\n                  bottom: 0;\n                  left: 0;\n                  width: 100%;\n                  background-color: #007bff;\n                  color: white;\n                  text-align: center;\n                  padding: 10px;\n                  \n              }\n          </style>\n          <footer>\n              <p>© 2024 Kicky Notes. All rights reserved.</p>\n          </footer>\n      "}}customElements.define("custom-footer",a);class c extends HTMLElement{connectedCallback(){this.innerHTML='\n          <div class="custom-figure">\n              <img src="/img/kicky-note.png" alt="Logo" class="logo">\n          </div>\n      '}}customElements.define("custom-figure",c)})();