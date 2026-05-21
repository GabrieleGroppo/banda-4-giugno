// Gestione Menu Mobile
function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function () {
    
    // Gestione Scroll Header per effetto trasparenza
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            header.style.background = window.scrollY > 50 ? 'rgba(18, 18, 18, 1)' : 'rgba(18, 18, 18, 0.95)';
        }
    });

    // Event listener per "Aggiungi al calendario"
    const calendarBtn = document.getElementById('add-to-calendar');
    if (calendarBtn) {
        calendarBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // DATI EVENTO (Modifica qui se cambia la data dell'evento statico)
            const eventTitle = "Concerto della Battaglia 2026 - Banda 4 Giugno 1859";
            const location = "Cortile del palazzo comunale, Magenta (MI)";
            const startDate = new Date(2026, 6, 6, 21, 0); 
            const endDate = new Date(2026, 6, 6, 23, 0);
            
            // Funzione utility per formattare la data per Google
            const formatDate = (date) => date.toISOString().replace(/-|:|\.\d+/g, '');
            
            const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent("Concerto della Banda cittadina. Ingresso Libero.")}&location=${encodeURIComponent(location)}`;
            
            window.open(googleCalendarUrl, '_blank');
        });
    }
});