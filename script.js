const BASE_URL = "http://localhost:1337"; // Cambia con il tuo dominio Strapi
const map = {
  "Concerto": "Concerti",
  "Servizio": "Servizi",
  "Cena": "Cene",
  "Tutto": "Tutto"
};
const data = {
  "data": [
    {
      "id": 2,
      "Name": "Michela Fassi",
      "Picture": {
        "url": "/uploads/maestro_michela_fassi_e1c5f4fe3e.jpg"
      }
    }
  ]
};

// Estrarre l'URL dell'immagine
const pictureUrl = `${BASE_URL}${data.data[0].Picture.url}`;

console.log(pictureUrl);
//setHome();

async function getHomeFileds() {
  try {
    const response = await fetch(`${BASE_URL}/api/home?populate=*`);
    if (!response.ok) throw new Error("Errore nel recupero dei dati");

    const json = await response.json();
    const data = json.data;
    return data;
  } catch (error) {
    console.error("Errore:", error);
    throw error;
  }
}

async function setHomePage() {
  try {
    let home = await getHomeFileds();

    // Modifica il titolo della pagina
    document.title = home.Title;
    console.log(home);
    // Modifica l'immagine di copertina
    const coverUrl = `${BASE_URL}${home.Cover.url}`;
    document.getElementById('cover').style.backgroundImage = `url(${coverUrl})`;
    //Modifico il titolo della copertina
    document.getElementById('cover-title').innerText = home.Title;
    //modifico foto maestro
    document.getElementById('maestro').innerText = home.ConductorName;
    document.getElementById('maestro-img').src = `${BASE_URL}${home.ConductorPhoto.url}`;
    // modifico foto presidente
    document.getElementById('presidente').innerText = home.PresidentName;
    document.getElementById('presidente-img').src = `${BASE_URL}${home.PresidentPhoto.url}`;
    
    document.getElementById('musicisti').innerText = home.Musicians;
    document.getElementById('musicisti-img').src = `${BASE_URL}${home.MusiciansPhoto.url}`;

  } catch (error) {
    console.error("Errore:", error);
  }
}

//getLatestPastEvent();
async function getLatestPastEvent() {
  try {
    const today = new Date(Date.now()).toISOString().split('T')[0];
    console.log(today);
    const response = await fetch(`${BASE_URL}/api/events?filters[Date][$lt]=${today}&sort=Date:DESC&pagination[limit]=1&populate=*`);
    if (!response.ok) throw new Error("Errore nel recupero dei dati");

    const json = await response.json();
    const data = json.data[0];  // Otteniamo l'oggetto data
    console.log(data);

    return data;

  } catch (error) {
    console.error("Errore:", error);
    throw error;
  }
}

//getUpcomingEvents();
async function getUpcomingEvents() {
  try {
    const today = '2025-01-01';

    const response = await fetch(`${BASE_URL}/api/events?filters[Date][$gte]=${today}&sort=Date:ASC&populate=*`);
    if (!response.ok) throw new Error("Errore nel recupero dei dati");

    const json = await response.json();
    const data = json.data;  // Otteniamo l'oggetto data
    console.log(data);
    return data;
  } catch (error) {
    console.error("Errore:", error);
    throw error;
  }
}

//getEventsByYear(2025);
async function getEventsByYear(year) {
  try {
    const response = await fetch(`${BASE_URL}/api/events?filters[Date][$contains]=${year}&sort=Date:ASC&populate=*`);
    if (!response.ok) throw new Error("Errore nel recupero dei dati");

    const json = await response.json();
    const data = json.data;  // Otteniamo l'oggetto data
    console.log(data);
    return data;
  } catch (error) {
    console.error("Errore:", error);
    throw error;
  }
}

//getEventsByYear(2025);
async function getPastEventsByYear(year) {
  try {
    const today = new Date(Date.now()).toISOString().split('T')[0];
    console.log(today);
    const response = await fetch(`${BASE_URL}/api/events?filters[Date][$lt]=${today}&filters[Date][$contains]=${year}&sort=Date:ASC&populate=*`);
    if (!response.ok) throw new Error("Errore nel recupero dei dati");

    const json = await response.json();
    const data = json.data;  // Otteniamo l'oggetto data
    console.log(data);
    return data;
  } catch (error) {
    console.error("Errore:", error);
    throw error;
  }
}


async function getEventsByYearAndCategory(year, category) {
  try {
    console.log(category);
    //just the first letter in uppercase
    //category = category.charAt(0).toUpperCase() + category.slice(1);
    const response = await fetch(`${BASE_URL}/api/events?filters[Date][$contains]=${year}&filters[EventType]=${category}&sort=Date:ASC&populate=*`);
    if (!response.ok) throw new Error("Errore nel recupero dei dati");

    const json = await response.json();
    const data = json.data;  // Otteniamo l'oggetto data
    //console.log(data);
    return data;
  } catch (error) {
    console.error("Errore:", error);
    throw error;
  }
}


async function getPastEventsByYearAndCategory(year, category) {
  try {
    console.log(category);
    const today = new Date(Date.now()).toISOString().split('T')[0];
    console.log(today);
    //just the first letter in uppercase
    //category = category.charAt(0).toUpperCase() + category.slice(1);
    const response = await fetch(`${BASE_URL}/api/events?filters[Date][$lt]=${today}&filters[Date][$contains]=${year}&filters[EventType]=${category}&sort=Date:ASC&populate=*`);
    if (!response.ok) throw new Error("Errore nel recupero dei dati");

    const json = await response.json();
    const data = json.data;  // Otteniamo l'oggetto data
    //console.log(data);
    return data;
  } catch (error) {
    console.error("Errore:", error);
    throw error;
  }
}


//filterEvents();
async function filterEvents(year, category) {
  console.log(year + " " + category);
  let events = category != 'Tutto' ? await getPastEventsByYearAndCategory(year, category) : await getPastEventsByYear(year);
  document.getElementById('events-year').innerText = map[category] + " - " + year;
  document.getElementById('events-containter').innerHTML = "";
  events.forEach(event => {
    //console.log("Evento:", event); // Log più chiaro

    let date = getIntalianDateTime(event.Date, event.Time);

    let eventHtml =
      `
    <div class="w3-third w3-margin-bottom event"><img
                        src="${BASE_URL}${event.Cover.url}"
                        alt="${event.Cover.alternativeText}" style="width:100%"
                        class="w3-hover-opacity">
                    <div class="w3-container w3-white">
                        <h4>${event.Title}</h4>
                        <p class="w3-opacity">${date}</p>
                        <p>${event.ShortDescription}</p>
                    </div>
                </div>
    `;
    //console.log(eventHtml);
    document.getElementById('events-containter').innerHTML += eventHtml;
  });
}

fetch("footer.html")
  .then(response => response.text())
  .then(data => document.getElementById("footer-container").innerHTML = data);

//filterEvents();
// Function to show/hide events based on the selected year

var year = 2025;
var category = 'Tutto';
// Function to filter events by dropdown selection
function filterByYear(new_year) {
  year = new_year;
  filterEvents(new_year, category);
}

function filterByCategory(new_category) {
  category = new_category;
  filterEvents(year, new_category);
}

// Used to toggle the menu on small screens when clicking on the menu button
function mini_munu() {
  var x = document.getElementById("mini_nav_bar");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

function getIntalianDateTime(old_date, old_time) {
  let date = new Date(old_date);
  if (isNaN(date.getTime())) {
    console.error("Data evento non valida:", Date);
  } else {
    let opzioniData = { day: "2-digit", month: "long", year: "numeric" };
    let dataFormattata = date.toLocaleDateString("it-IT", opzioniData); // Formato italiano: "dd mese yyyy"
    if (old_time) {
      let time = new Date("1970-01-01T" + old_time).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
      dataFormattata += " ore " + time;
    }
    return dataFormattata;
  }
}
window.onload = function () {
  loadCategories();
  loadYears();
  filterEvents(year, category);
};

function loadCategories() {
  let categories = ["Tutto", "Concerto", "Servizio", "Cena"];
  
  let select = document.getElementById("memCategories");
  select.innerHTML = "";
  categories.forEach(category => {
    let option = document.createElement('option');
    option.value = category;
    option.text = map[category];
    select.appendChild(option);
  });
}

function loadYears() {
  const start = '2022';
  const end = '2025';
  let select = document.getElementById('memYears');
  for (let year = end; year >= start; year--) {
    let option = document.createElement('option');
    option.value = year;
    option.text = year;
    select.appendChild(option);
  }
}