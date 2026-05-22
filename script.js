// ─── Utility ────────────────────────────────────────────────────────────────

function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (_) {}
}

// ─── Mobile Menu ─────────────────────────────────────────────────────────────

function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// ─── Scroll: Header shadow ────────────────────────────────────────────────────

const header = document.querySelector('header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
}

// ─── Theme Toggle ─────────────────────────────────────────────────────────────

const themeBtn = document.getElementById('theme-toggle');

function syncToggleIcon(theme) {
    if (!themeBtn) return;
    themeBtn.querySelector('i').className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

syncToggleIcon(getTheme());

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const next = getTheme() === 'light' ? 'dark' : 'light';
        setTheme(next);
        syncToggleIcon(next);
    });
}

// ─── Add-to-Calendar ──────────────────────────────────────────────────────────

const calendarBtn = document.getElementById('add-to-calendar');
if (calendarBtn) {
    calendarBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // DATI EVENTO — aggiorna qui se cambia la data
        const title    = 'Concerto della Battaglia 2026 - Banda 4 Giugno 1859';
        const location = 'Cortile del palazzo comunale, Magenta (MI)';
        const start    = new Date(2026, 5, 6, 21, 0);   // 6 giugno 2026, 21:00
        const end      = new Date(2026, 5, 6, 23, 0);

        const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE`
            + `&text=${encodeURIComponent(title)}`
            + `&dates=${fmt(start)}/${fmt(end)}`
            + `&details=${encodeURIComponent('Concerto della Banda cittadina. Ingresso Libero.')}`
            + `&location=${encodeURIComponent(location)}`;

        window.open(url, '_blank');
    });
}