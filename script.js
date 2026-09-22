// Database with All Real Scripts & Custom Supported Games
const scriptsData = [
  {
    id: "lumia-hub",
    title: "Lumia Hub V1",
    desc: "Feature-rich multi-game script hub designed for sports, arcade, combat, and classic Roblox titles.",
    supportedGames: [
      "RF Fan Leagues",
      "Real Futbol 24",
      "FUT",
      "Pure Soccer",
      "Slap Duels",
      "Murder Mystery 2",
      "Rivals",
      "Jailbreak",
      "Basketball Legends"
    ],
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
    code: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/LumiaDevJacob/LUMIAHUB/refs/heads/main/v1"))()'
  },
  {
    id: "bk-hub-steal-an-egg",
    title: "BK Hub",
    desc: "Custom feature-packed hub specifically optimized for Steal An Egg.",
    supportedGames: [
      "Steal An Egg"
    ],
    img: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=600&q=80",
    code: 'loadstring(game:HttpGet("https://api.luarmor.net/files/v4/loaders/9ee4edde227ac85f50872bf9e4226508.lua"))()'
  },
  {
    id: "bk-hub-server-hopper",
    title: "BK Hub Server Hopper",
    desc: "Automated server hopper and utility hub designed for Steal A Brainrot.",
    supportedGames: [
      "Steal A Brainrot"
    ],
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    code: 'loadstring(game:HttpGet("https://api.luarmor.net/files/v4/loaders/3a9e351cf6ad3cecbc4d5476f5a23958.lua"))()'
  }
];

// Navigation ScrollSpy
function setupNavScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Render Scripts Grid with Special Supported Games Box
function renderScripts(items) {
  const container = document.getElementById("scriptsGrid");
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center;">No scripts found matching your search.</p>`;
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="script-card">
      <img src="${item.img}" alt="${item.title}" class="script-img">
      <div class="script-body">
        <h3 class="script-title">${item.title}</h3>
        <p class="script-desc">${item.desc}</p>
        
        <div class="supported-games-box">
          <span class="box-title"><i class="fa-solid fa-gamepad"></i> Supported Games</span>
          <div class="game-tags">
            ${item.supportedGames.map(game => `<span class="game-tag">${game}</span>`).join('')}
          </div>
        </div>

        <button class="btn btn-primary" onclick="openScriptModal('${item.id}')">
          <i class="fa-solid fa-download"></i> Get Script
        </button>
      </div>
    </div>
  `).join('');
}

// Search Filter (Title, Description, or Supported Game name)
function filterScripts() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = scriptsData.filter(s => 
    s.title.toLowerCase().includes(query) || 
    s.desc.toLowerCase().includes(query) ||
    s.supportedGames.some(g => g.toLowerCase().includes(query))
  );
  renderScripts(filtered);
}

// Modal Logic
function openScriptModal(scriptId) {
  const script = scriptsData.find(s => s.id === scriptId);
  if (!script) return;

  document.getElementById("modalTitle").innerText = script.title;
  document.getElementById("modalCode").innerText = script.code;
  document.getElementById("scriptModal").classList.add("active");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}

function copyCode() {
  const codeText = document.getElementById("modalCode").innerText;
  navigator.clipboard.writeText(codeText).then(() => {
    showToast("Script copied to clipboard!");
  });
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

// DOM Ready Initialization
document.addEventListener("DOMContentLoaded", () => {
  renderScripts(scriptsData);
  setupNavScrollSpy();
});