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
            const eventTitle = "Concerto di Natale - Banda 4 Giugno 1859";
            const location = "Teatro Lirico, Magenta";
            // Nota: Mese in JS va da 0 (Gennaio) a 11 (Dicembre). Qui è impostato 12 Dicembre 2025.
            const startDate = new Date(2025, 11, 12, 21, 0); 
            const endDate = new Date(2025, 11, 12, 23, 0);
            
            // Funzione utility per formattare la data per Google
            const formatDate = (date) => date.toISOString().replace(/-|:|\.\d+/g, '');
            
            const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent("Concerto della Banda cittadina. Ingresso Libero.")}&location=${encodeURIComponent(location)}`;
            
            window.open(googleCalendarUrl, '_blank');
        });
    }
});