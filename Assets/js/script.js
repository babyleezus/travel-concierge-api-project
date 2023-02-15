//unsplash api
const searchInput = document.getElementById("searchTerm");
const searchBtn = document.getElementById("searchButton");
const imagesContainer = document.getElementById("images-container");

// Function to fetch photos from the Unsplash API based on a search term
// add local store for the images

const fetchPhotos = (searchTerm) => {
  fetch(
    `https://api.unsplash.com/search/photos?client_id=DUM8TbIYndcAruIhX49IMY-89SQd2zLXmzsfrlfxsBo&query=${searchTerm}`
  )
    .then((response) => response.json())
    .then((data) => {
      // Clear the images container
      imagesContainer.innerHTML = "";
      // Loop through the photos and add them to the HTML
      data.results.forEach((photo) => {
        const div = document.createElement("div");
        div.classList.add("cards", "m-2");
        div.style.width = "18rem";
        const img = document.createElement("img");
        img.src = photo.urls.regular;
        img.classList.add("cards-img-contain");
        div.appendChild(img);
        imagesContainer.appendChild(div);
      });
    });
};

// Fetch photos when the page loads
fetchPhotos("");

// Listen for the search button to be clicked
searchBtn.addEventListener("click", () => {
  const searchTerm = searchInput.value;
  fetchPhotos(searchTerm);
});

// openweather api

const apiKey = "9b0a103316d21cb27769a0ef1db4a9e7";
const forecastContainer = document.getElementById("forecast-container");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
  const cityInput = document.getElementById("searchTerm").value;
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      forecastContainer.innerHTML = "";
      for (let i = 0; i < data.list.length; i += 8) {
        const temperature = data.list[i].main.temp - 273.15;
        const iconCode = data.list[i].weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        forecastContainer.innerHTML += `
                <div">
                  <h3>${new Date(
                    data.list[i].dt * 1000
                  ).toLocaleDateString()}</h3>
                  <p>Temperature: ${temperature.toFixed(2)}°C</p>
                  <img src="${iconUrl}" alt="Weather Icon">
                  <p>${data.list[i].weather[0].description}</p>
                </div>
              `;
      }
    });
});

// map api

const citySearch = document.getElementById("searchTerm");
const searchMap = document.getElementById("searchButton");
const map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

searchMap.addEventListener("click", () => {
  const city = citySearch.value;
  const API_KEY = "c7a34fd37a9e46e89b140f5d67bf1b54";
  const API_URL = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${API_KEY}`;
  axios
    .get(API_URL)
    .then((response) => {
      const lat = response.data.results[0].geometry.lat;
      const lng = response.data.results[0].geometry.lng;
      const latLng = [lat, lng];
      map.setView(latLng, 13);
      L.marker(latLng).addTo(map);
    })
    .catch((error) => {
      console.log(error);
    });
});

// google translation

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: "en" },
    "google_translate_element"
  );
}


// london activities

function showLondon() {
  const cardContainer = document.getElementById('card-container');
  cardContainer.style.display = 'flex';
  
  const cards = [
    {
      title: 'Visiting the British Museum',
      text: 'The British Museum is one of the world most famous museums, housing over 8 million artifacts from all over the world.',
      image: 'https://images.unsplash.com/photo-1577729507926-78897cc4de05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    {
      title: 'Riding the London Eye',
      text: 'The London Eye is a giant ferris wheel located on the South Bank of the River Thames.',
      image: 'https://images.unsplash.com/photo-1611078214787-8095d414314e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=940&q=80'
    },
    {
      title: 'Watching a play at Shakespeare Globe',
      text: 'The Globe Theatre is a replica of the original theatre where Shakespeare plays were first performed.',
      image: 'https://images.unsplash.com/photo-1628630470691-4a53e09fceec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80'
    },
    {
      title: 'Taking a tour of Buckingham Palace',
      text: 'Buckingham Palace is the official residence of the British monarch and is open to visitors during the summer months.',
      image: 'https://images.unsplash.com/photo-1582581388879-65cdb825ec67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
    }
  ];
  
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    const cardImageElement = document.createElement('img');
    cardImageElement.className = 'card-img-top';
    cardImageElement.src = card.image;
    cardImageElement.alt = `Image for ${card.title}`;
    const cardBodyElement = document.createElement('div');
    cardBodyElement.className = 'card-body';
    const cardTitleElement = document.createElement('h5');
    cardTitleElement.className = 'card-title';
    cardTitleElement.textContent = card.title;
    const cardTextElement = document.createElement('p');
    cardTextElement.className = 'card-text';
    cardTextElement.textContent = card.text;
    cardBodyElement.appendChild(cardTitleElement);
    cardBodyElement.appendChild(cardTextElement);
    cardElement.appendChild(cardImageElement);
    cardElement.appendChild(cardBodyElement);
    cardContainer.appendChild(cardElement);
  }
}

// Amsterdam activities

function showAmsterdam() {
  const cardContainer = document.getElementById('card-container');
  cardContainer.style.display = 'flex';
  
  const cards = [
    {
      title: 'Visiting the British Museum',
      text: 'The British Museum is one of the world most famous museums, housing over 8 million artifacts from all over the world.',
      image: 'https://images.unsplash.com/photo-1577729507926-78897cc4de05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    {
      title: 'Riding the London Eye',
      text: 'The London Eye is a giant ferris wheel located on the South Bank of the River Thames.',
      image: 'https://images.unsplash.com/photo-1611078214787-8095d414314e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=940&q=80'
    },
    {
      title: 'Watching a play at Shakespeare Globe',
      text: 'The Globe Theatre is a replica of the original theatre where Shakespeare plays were first performed.',
      image: 'https://images.unsplash.com/photo-1628630470691-4a53e09fceec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80'
    },
    {
      title: 'Taking a tour of Buckingham Palace',
      text: 'Buckingham Palace is the official residence of the British monarch and is open to visitors during the summer months.',
      image: 'https://images.unsplash.com/photo-1582581388879-65cdb825ec67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
    }
  ];
  
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    const cardImageElement = document.createElement('img');
    cardImageElement.className = 'card-img-top';
    cardImageElement.src = card.image;
    cardImageElement.alt = `Image for ${card.title}`;
    const cardBodyElement = document.createElement('div');
    cardBodyElement.className = 'card-body';
    const cardTitleElement = document.createElement('h5');
    cardTitleElement.className = 'card-title';
    cardTitleElement.textContent = card.title;
    const cardTextElement = document.createElement('p');
    cardTextElement.className = 'card-text';
    cardTextElement.textContent = card.text;
    cardBodyElement.appendChild(cardTitleElement);
    cardBodyElement.appendChild(cardTextElement);
    cardElement.appendChild(cardImageElement);
    cardElement.appendChild(cardBodyElement);
    cardContainer.appendChild(cardElement);
  }
}

// Paris activities

function showParis() {
  const cardContainer = document.getElementById('card-container');
  cardContainer.style.display = 'flex';
  
  const cards = [
    {
      title: 'Visiting the British Museum',
      text: 'The British Museum is one of the world most famous museums, housing over 8 million artifacts from all over the world.',
      image: 'https://images.unsplash.com/photo-1577729507926-78897cc4de05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    {
      title: 'Riding the London Eye',
      text: 'The London Eye is a giant ferris wheel located on the South Bank of the River Thames.',
      image: 'https://images.unsplash.com/photo-1611078214787-8095d414314e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=940&q=80'
    },
    {
      title: 'Watching a play at Shakespeare Globe',
      text: 'The Globe Theatre is a replica of the original theatre where Shakespeare plays were first performed.',
      image: 'https://images.unsplash.com/photo-1628630470691-4a53e09fceec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80'
    },
    {
      title: 'Taking a tour of Buckingham Palace',
      text: 'Buckingham Palace is the official residence of the British monarch and is open to visitors during the summer months.',
      image: 'https://images.unsplash.com/photo-1582581388879-65cdb825ec67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
    }
  ];
  
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    const cardImageElement = document.createElement('img');
    cardImageElement.className = 'card-img-top';
    cardImageElement.src = card.image;
    cardImageElement.alt = `Image for ${card.title}`;
    const cardBodyElement = document.createElement('div');
    cardBodyElement.className = 'card-body';
    const cardTitleElement = document.createElement('h5');
    cardTitleElement.className = 'card-title';
    cardTitleElement.textContent = card.title;
    const cardTextElement = document.createElement('p');
    cardTextElement.className = 'card-text';
    cardTextElement.textContent = card.text;
    cardBodyElement.appendChild(cardTitleElement);
    cardBodyElement.appendChild(cardTextElement);
    cardElement.appendChild(cardImageElement);
    cardElement.appendChild(cardBodyElement);
    cardContainer.appendChild(cardElement);
  }
}

// Rome activities

function showRome() {
  const cardContainer = document.getElementById('card-container');
  cardContainer.style.display = 'flex';
  
  const cards = [
    {
      title: 'Visiting the British Museum',
      text: 'The British Museum is one of the world most famous museums, housing over 8 million artifacts from all over the world.',
      image: 'https://images.unsplash.com/photo-1577729507926-78897cc4de05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    {
      title: 'Riding the London Eye',
      text: 'The London Eye is a giant ferris wheel located on the South Bank of the River Thames.',
      image: 'https://images.unsplash.com/photo-1611078214787-8095d414314e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=940&q=80'
    },
    {
      title: 'Watching a play at Shakespeare Globe',
      text: 'The Globe Theatre is a replica of the original theatre where Shakespeare plays were first performed.',
      image: 'https://images.unsplash.com/photo-1628630470691-4a53e09fceec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80'
    },
    {
      title: 'Taking a tour of Buckingham Palace',
      text: 'Buckingham Palace is the official residence of the British monarch and is open to visitors during the summer months.',
      image: 'https://images.unsplash.com/photo-1582581388879-65cdb825ec67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
    }
  ];
  
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    const cardImageElement = document.createElement('img');
    cardImageElement.className = 'card-img-top';
    cardImageElement.src = card.image;
    cardImageElement.alt = `Image for ${card.title}`;
    const cardBodyElement = document.createElement('div');
    cardBodyElement.className = 'card-body';
    const cardTitleElement = document.createElement('h5');
    cardTitleElement.className = 'card-title';
    cardTitleElement.textContent = card.title;
    const cardTextElement = document.createElement('p');
    cardTextElement.className = 'card-text';
    cardTextElement.textContent = card.text;
    cardBodyElement.appendChild(cardTitleElement);
    cardBodyElement.appendChild(cardTextElement);
    cardElement.appendChild(cardImageElement);
    cardElement.appendChild(cardBodyElement);
    cardContainer.appendChild(cardElement);
  }
}

// Barcelona activities

function showBarcelona() {
  const cardContainer = document.getElementById('card-container');
  cardContainer.style.display = 'flex';
  
  const cards = [
    {
      title: 'Visiting the British Museum',
      text: 'The British Museum is one of the world most famous museums, housing over 8 million artifacts from all over the world.',
      image: 'https://images.unsplash.com/photo-1577729507926-78897cc4de05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    {
      title: 'Riding the London Eye',
      text: 'The London Eye is a giant ferris wheel located on the South Bank of the River Thames.',
      image: 'https://images.unsplash.com/photo-1611078214787-8095d414314e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=940&q=80'
    },
    {
      title: 'Watching a play at Shakespeare Globe',
      text: 'The Globe Theatre is a replica of the original theatre where Shakespeare plays were first performed.',
      image: 'https://images.unsplash.com/photo-1628630470691-4a53e09fceec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80'
    },
    {
      title: 'Taking a tour of Buckingham Palace',
      text: 'Buckingham Palace is the official residence of the British monarch and is open to visitors during the summer months.',
      image: 'https://images.unsplash.com/photo-1582581388879-65cdb825ec67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
    }
  ];
  
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    const cardImageElement = document.createElement('img');
    cardImageElement.className = 'card-img-top';
    cardImageElement.src = card.image;
    cardImageElement.alt = `Image for ${card.title}`;
    const cardBodyElement = document.createElement('div');
    cardBodyElement.className = 'card-body';
    const cardTitleElement = document.createElement('h5');
    cardTitleElement.className = 'card-title';
    cardTitleElement.textContent = card.title;
    const cardTextElement = document.createElement('p');
    cardTextElement.className = 'card-text';
    cardTextElement.textContent = card.text;
    cardBodyElement.appendChild(cardTitleElement);
    cardBodyElement.appendChild(cardTextElement);
    cardElement.appendChild(cardImageElement);
    cardElement.appendChild(cardBodyElement);
    cardContainer.appendChild(cardElement);
  }
}