/* ==========================================================================
   PORTFOLIO INTERACTIVE JAVASCRIPT SYSTEM
   Developer: Aditya Beckham
   Features: Ambient Scroll Section Color Shifts, Custom Cursor, Jello Bouncing,
             3D Tilt, Audio Feedback, Sticky Note Corkboard, LocalStorage, Lightbox
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initJelloText();
  init3DTilt();
  initThemeToggle();
  initAudioPlayer();
  initMobileDrawer();
  initScrollEffects();
  initSectionColorShift();
  initDraggableCards();
  initCertificateModal();
  initProjectFilters();
  initStickerBoard();
  initGuestbookBoard();
});

/* ==========================================================================
   1. Custom Trailing Cursor Logic
   ========================================================================== */
function initCustomCursor() {
  let cursorInner = document.querySelector('.cursor-inner');
  let cursorOuter = document.querySelector('.cursor-outer');

  if (!cursorInner) {
    cursorInner = document.createElement('div');
    cursorInner.className = 'cursor-inner';
    document.body.appendChild(cursorInner);
  }

  if (!cursorOuter) {
    cursorOuter = document.createElement('div');
    cursorOuter.className = 'cursor-outer';
    document.body.appendChild(cursorOuter);
  }

  let mouseX = 0, mouseY = 0;
  let outerX = 0, outerY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorInner.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function loop() {
    outerX += (mouseX - outerX) * 0.18;
    outerY += (mouseY - outerY) * 0.18;
    cursorOuter.style.transform = `translate(${outerX}px, ${outerY}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  loop();

  const interactiveElems = document.querySelectorAll('a, button, input, textarea, .project-card, .certificate-card, .sticker-badge, .color-dot-btn, .sticky-note-card');
  interactiveElems.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      cursorInner.classList.add('hover');
      cursorOuter.classList.add('hover');
    });
    elem.addEventListener('mouseleave', () => {
      cursorInner.classList.remove('hover');
      cursorOuter.classList.remove('hover');
    });
  });
}

/* ==========================================================================
   2. Dynamic Ambient Scroll Color Shift per Section
   ========================================================================== */
function initSectionColorShift() {
  const sections = document.querySelectorAll('section[id]');
  
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -40% 0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.body.classList.remove(
          'section-active-home',
          'section-active-about',
          'section-active-skills',
          'section-active-experience',
          'section-active-projects',
          'section-active-certificates',
          'section-active-guestbook',
          'section-active-contact'
        );
        document.body.classList.add(`section-active-${id}`);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   3. Jello Letter Bouncing Text Effect
   ========================================================================== */
function initJelloText() {
  const jelloElements = document.querySelectorAll('.jello-title');
  jelloElements.forEach(element => {
    const text = element.textContent.trim();
    element.innerHTML = '';
    
    [...text].forEach(char => {
      const span = document.createElement('span');
      span.className = char === ' ' ? 'jello-space' : 'jello';
      span.textContent = char === ' ' ? '\u00A0' : char;
      element.appendChild(span);
    });
  });
}

/* ==========================================================================
   4. 3D Tilt Effect on Cards
   ========================================================================== */
function init3DTilt() {
  const tiltCards = document.querySelectorAll('.project-card, .certificate-card, .about-image-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

/* ==========================================================================
   5. Sound Synth Audio Feedback (Web Audio API)
   ========================================================================== */
function playPopSound(freq = 440) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.8, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // Ignore audio restrictions
  }
}

/* ==========================================================================
   6. Theme Toggle System
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');

  const savedTheme = localStorage.getItem('aditya_portfolio_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('aditya_portfolio_theme', newTheme);
      updateThemeIcon(newTheme);
      playPopSound(520);
    });
  }

  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }
}

/* ==========================================================================
   7. Ambient Audio Player
   ========================================================================== */
function initAudioPlayer() {
  const audioBtn = document.getElementById('audio-toggle-btn');
  const bgAudio = document.getElementById('bg-audio');
  let isPlaying = false;

  if (audioBtn && bgAudio) {
    audioBtn.addEventListener('click', () => {
      if (isPlaying) {
        bgAudio.pause();
        audioBtn.textContent = '🎵';
        audioBtn.title = 'Play background music';
        isPlaying = false;
      } else {
        bgAudio.play().then(() => {
          audioBtn.textContent = '🔊';
          audioBtn.title = 'Pause background music';
          isPlaying = true;
        }).catch(err => {
          console.log('Audio playback restricted:', err);
        });
      }
    });
  }
}

/* ==========================================================================
   8. Mobile Navigation Drawer
   ========================================================================== */
function initMobileDrawer() {
  const openBtn = document.getElementById('mobile-menu-open');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-links a');

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  navLinks.forEach(link => link.addEventListener('click', closeDrawer));
}

/* ==========================================================================
   9. Scroll Progress Bar & Reveal Animations
   ========================================================================== */
function initScrollEffects() {
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const header = document.querySelector('.site-header');
  const reveals = document.querySelectorAll('.reveal');

  window.addEventListener('scroll', () => {
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    if (scrollProgress) scrollProgress.style.width = scrolled + '%';

    if (backToTopBtn) {
      if (windowScroll > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    if (header) {
      if (windowScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 120;
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  setTimeout(() => {
    window.dispatchEvent(new Event('scroll'));
  }, 100);
}

/* ==========================================================================
   10. Draggable Scrapbook Elements
   ========================================================================== */
function initDraggableCards() {
  const floatingCards = document.querySelectorAll('.floating-card');
  floatingCards.forEach(card => {
    makeElementDraggable(card);
  });
}

function makeElementDraggable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  element.onmousedown = dragMouseDown;
  element.ontouchstart = dragTouchStart;

  function dragMouseDown(e) {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function dragTouchStart(e) {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const touch = e.touches[0];
    pos3 = touch.clientX;
    pos4 = touch.clientY;
    document.ontouchend = closeTouchElement;
    document.ontouchmove = elementTouchDrag;
  }

  function elementTouchDrag(e) {
    const touch = e.touches[0];
    pos1 = pos3 - touch.clientX;
    pos2 = pos4 - touch.clientY;
    pos3 = touch.clientX;
    pos4 = touch.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeTouchElement() {
    document.ontouchend = null;
    document.ontouchmove = null;
  }
}

/* ==========================================================================
   11. Certificate Lightbox Modal
   ========================================================================== */
function initCertificateModal() {
  const certCards = document.querySelectorAll('.certificate-card');
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('modal-cert-img');
  const modalTitle = document.getElementById('modal-cert-title');
  const closeModalBtn = document.getElementById('close-modal-btn');

  if (!modal || !modalImg) return;

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-cert-img');
      const title = card.getAttribute('data-cert-title');
      modalImg.src = imgSrc;
      if (modalTitle) modalTitle.textContent = title;
      modal.classList.add('active');
      playPopSound(600);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

/* ==========================================================================
   12. Project Filter Tabs
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      playPopSound(480);

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'note-spawn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   13. Interactive Tech Sticker Board
   ========================================================================== */
function initStickerBoard() {
  const stickers = document.querySelectorAll('.sticker-badge');
  const tidyBtn = document.getElementById('tidy-stickers-btn');

  stickers.forEach(sticker => {
    const randomRot = Math.floor(Math.random() * 12) - 6;
    sticker.style.transform = `rotate(${randomRot}deg)`;
    makeElementDraggable(sticker);
  });

  if (tidyBtn) {
    tidyBtn.addEventListener('click', () => {
      playPopSound(500);
      stickers.forEach(sticker => {
        sticker.style.top = '0px';
        sticker.style.left = '0px';
        sticker.style.position = 'relative';
        const randomRot = Math.floor(Math.random() * 12) - 6;
        sticker.style.transform = `rotate(${randomRot}deg)`;
      });
    });
  }
}

/* ==========================================================================
   14. Direct On-Board Interactive Sticky Notes System
   ========================================================================== */
const INITIAL_COMMUNITY_NOTES = [
  {
    id: 'init-1',
    author: 'Dev Friend 🚀',
    message: 'Awesome portfolio design! Loved the sticky note guestbook idea 📌',
    color: 'yellow',
    likes: 14,
    date: '2026-08-17'
  },
  {
    id: 'init-2',
    author: 'Sarah UI/UX',
    message: 'Keren banget mas Aditya! UI-nya sangat interaktif dan responsif 🙌',
    color: 'pink',
    likes: 9,
    date: '2026-08-17'
  },
  {
    id: 'init-3',
    author: 'Budi (DBS Fellow)',
    message: 'Mantap bang Aditya, sukses selalu buat project fullstacknya! 🔥',
    color: 'green',
    likes: 12,
    date: '2026-08-17'
  }
];

function initGuestbookBoard() {
  const corkboardGrid = document.getElementById('corkboard-notes-grid');
  const spawnBtn = document.getElementById('spawn-note-btn');
  const colorDots = document.querySelectorAll('.color-dot-btn');

  let selectedColor = 'yellow';

  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      colorDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      selectedColor = dot.getAttribute('data-color');
      spawnDraftStickyNote(selectedColor);
    });
  });

  if (spawnBtn) {
    spawnBtn.addEventListener('click', () => {
      spawnDraftStickyNote(selectedColor);
    });
  }

  loadAndRenderPinnedNotes();
}

function getStoredNotes() {
  const stored = localStorage.getItem('aditya_portfolio_sticky_notes');
  if (!stored) {
    localStorage.setItem('aditya_portfolio_sticky_notes', JSON.stringify(INITIAL_COMMUNITY_NOTES));
    return INITIAL_COMMUNITY_NOTES;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_COMMUNITY_NOTES;
  }
}

function saveNotesToStorage(notes) {
  localStorage.setItem('aditya_portfolio_sticky_notes', JSON.stringify(notes));
}

function loadAndRenderPinnedNotes() {
  const corkboardGrid = document.getElementById('corkboard-notes-grid');
  if (!corkboardGrid) return;

  const notes = getStoredNotes();
  const existingDraft = corkboardGrid.querySelector('.draft-note');

  corkboardGrid.innerHTML = '';
  if (existingDraft) {
    corkboardGrid.appendChild(existingDraft);
  }

  notes.forEach(note => {
    const noteCard = createPinnedNoteCard(note);
    corkboardGrid.appendChild(noteCard);
  });
}

function spawnDraftStickyNote(color = 'yellow') {
  const corkboardGrid = document.getElementById('corkboard-notes-grid');
  if (!corkboardGrid) return;

  playPopSound(700);

  const existingDraft = corkboardGrid.querySelector('.draft-note');
  if (existingDraft) {
    existingDraft.remove();
  }

  const randomRot = Math.floor(Math.random() * 8) - 4;
  const draftCard = document.createElement('div');
  draftCard.className = `sticky-note-card note-theme-${color} draft-note`;
  draftCard.style.transform = `rotate(${randomRot}deg)`;

  draftCard.innerHTML = `
    <div>
      <textarea class="note-textarea" maxlength="84" placeholder="Tulis pesan / feedback kamu di sini... ✍️"></textarea>
      <input type="text" class="note-author-input" placeholder="Nama kamu..." maxlength="24">
    </div>
    <div class="note-footer-actions">
      <span class="char-limit-indicator"><span class="char-count">0</span>/84</span>
      <button class="btn btn-accent btn-sm pin-note-btn">Pin it 📌</button>
    </div>
  `;

  corkboardGrid.insertBefore(draftCard, corkboardGrid.firstChild);

  const textarea = draftCard.querySelector('.note-textarea');
  const authorInput = draftCard.querySelector('.note-author-input');
  const charCounter = draftCard.querySelector('.char-count');
  const pinBtn = draftCard.querySelector('.pin-note-btn');

  textarea.focus();

  textarea.addEventListener('input', () => {
    charCounter.textContent = textarea.value.length;
  });

  pinBtn.addEventListener('click', () => {
    const text = textarea.value.trim();
    const author = authorInput.value.trim() || 'Anonymous';

    if (!text) {
      textarea.style.border = '1px solid red';
      setTimeout(() => textarea.style.border = 'none', 1500);
      return;
    }

    const newNote = {
      id: 'note-' + Date.now(),
      author: author,
      message: text,
      color: color,
      likes: 0,
      date: new Date().toISOString().split('T')[0]
    };

    const currentNotes = getStoredNotes();
    currentNotes.unshift(newNote);
    saveNotesToStorage(currentNotes);

    playPopSound(880);
    draftCard.remove();
    loadAndRenderPinnedNotes();
  });
}

function createPinnedNoteCard(note) {
  const randomRot = Math.floor(Math.random() * 10) - 5;
  const card = document.createElement('div');
  card.className = `sticky-note-card note-theme-${note.color}`;
  card.style.transform = `rotate(${randomRot}deg)`;
  card.setAttribute('data-id', note.id);

  card.innerHTML = `
    <div>
      <p class="note-text-display">${escapeHTML(note.message)}</p>
    </div>
    <div>
      <div class="note-author-display">— ${escapeHTML(note.author)}</div>
      <div class="note-footer-actions">
        <button class="like-note-btn" title="Sukai note ini">❤️ <span>${note.likes}</span></button>
        <button class="delete-note-btn" title="Hapus note">🗑️</button>
      </div>
    </div>
  `;

  const likeBtn = card.querySelector('.like-note-btn');
  const deleteBtn = card.querySelector('.delete-note-btn');

  likeBtn.addEventListener('click', () => {
    note.likes += 1;
    likeBtn.querySelector('span').textContent = note.likes;
    const currentNotes = getStoredNotes();
    const target = currentNotes.find(n => n.id === note.id);
    if (target) {
      target.likes = note.likes;
      saveNotesToStorage(currentNotes);
    }
    playPopSound(640);
  });

  deleteBtn.addEventListener('click', () => {
    card.style.animation = 'note-spawn 0.3s ease reverse';
    setTimeout(() => {
      card.remove();
      const currentNotes = getStoredNotes().filter(n => n.id !== note.id);
      saveNotesToStorage(currentNotes);
      playPopSound(300);
    }, 250);
  });

  return card;
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
