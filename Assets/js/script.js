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
      title: 'Exploring the canals',
      text: 'Amsterdam is famous for its network of canals, which date back to the 17th century. One of the best ways to explore the city is by taking a boat tour of the canals, which will give you a unique perspective on Amsterdam architecture and history.',
      image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
    },
    {
      title: 'Visiting the Van Gogh Museum',
      text: 'The Van Gogh Museum is one of Amsterdams most popular museums, housing the largest collection of works by the Dutch artist Vincent van Gogh.',
      image: 'https://images.unsplash.com/photo-1589869571832-6db8facdad09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
    },
    {
      title: 'Biking through the city',
      text: 'Amsterdam is one of the most bike-friendly cities in the world, with over 800,000 bicycles in the city. Renting a bike is a great way to see the city like a local and explore Amsterdams many parks and neighborhoods.',
      image: 'https://images.unsplash.com/photo-1524047934617-cb782c24e5f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
    },
    {
      title: 'Touring the Anne Frank House',
      text: 'The Anne Frank House is a museum located in the building where Anne Frank and her family hid from the Nazis during World War II.',
      image: 'https://images.unsplash.com/photo-1663491840526-e0c11c8a3b5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
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
      title: 'Visiting the Eiffel Tower',
      text: 'The Eiffel Tower is one of the most iconic structures in the world, and a trip to Paris is not complete without a visit. You can take a guided tour to learn about its history or simply enjoy the view from the top of the tower.',
      image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2001&q=80'
    },
    {
      title: 'Louvre Museum',
      text: 'The Louvre is one of the worlds most famous museums and home to some of the most significant art collections in the world. You can see the Mona Lisa, the Winged Victory of Samothrace, and many other masterpieces of art and sculpture.',
      image: 'https://images.unsplash.com/photo-1560425946-7d5830202765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80'
    },
    {
      title: 'Watching a play at ShSeine River Cruise',
      text: 'Taking a river cruise on the Seine is a popular way to experience the beauty of Paris from a different perspective. You can see the citys famous landmarks like Notre Dame Cathedral, the Louvre Museum, and the Eiffel Tower, while enjoying a relaxing and scenic ride along the river.',
      image: 'https://images.unsplash.com/photo-1637851058613-95f0d41c3c2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1058&q=80'
    },
    {
      title: 'Montmartre and the Sacré-Cœur',
      text: 'Montmartre is a charming neighborhood that has long been a haven for artists, writers, and intellectuals. Its winding streets, picturesque cafes, and artistic heritage are a significant draw for visitors to Paris. At the top of the hill, you will find the beautiful Sacré-Cœur basilica, which offers stunning views of the city.',
      image: 'https://images.unsplash.com/photo-1556176311-b327bc0d4c78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=994&q=80'
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
      title: 'Visiting the Colosseum',
      text: 'The Colosseum is one of the most famous landmarks in Rome, and it is a must-see attraction for visitors. The ancient amphitheater was once the site of gladiatorial contests and other public spectacles, and it is now a popular tourist destination where you can explore the history of ancient Rome.',
      image: 'https://images.unsplash.com/photo-1670280221119-434f6384dc00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80'
    },
    {
      title: 'Exploring the Vatican Museums',
      text: 'The Vatican Museums are home to one of the worlds most extensive art collections, including works by Michelangelo, Raphael, and other famous artists. You can explore the museums and see famous pieces like the Sistine Chapel and the statue of Laocoön and His Sons.',
      image: 'https://images.unsplash.com/photo-1610655769765-be8a0dd9627a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80'
    },
    {
      title: 'Throwing a Coin in the Trevi Fountain',
      text: 'The Trevi Fountain is a stunning Baroque masterpiece and one of the most famous fountains in the world. It is a popular tourist spot where you can toss a coin over your shoulder into the fountain and make a wish.',
      image: 'https://images.unsplash.com/photo-1596198332978-1ff331d6d63e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
    },
    {
      title: 'Walking through the Roman Forum',
      text: 'The Roman Forum is a sprawling complex of ruins that was once the center of political and social life in ancient Rome. Visitors can stroll through the ruins and imagine what life was like during the time of Julius Caesar and other famous historical figures.',
      image: 'https://images.unsplash.com/photo-1655781750963-9fb29bb1798f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
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
      title: 'Exploring Gaudí Works',
      text: 'Barcelona is famous for the unique architecture of Antoni Gaudí, whose works can be found all over the city. Some of his most famous works include the Park Güell, the Casa Batlló, and the Sagrada Familia, an unfinished church that has become a symbol of the city.',
      image: 'https://images.unsplash.com/photo-1597032868256-1f659aeb0d49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
    },
    {
      title: 'Strolling Down Las Ramblas',
      text: 'Las Ramblas is a famous pedestrian street in the heart of Barcelona that is known for its lively atmosphere and street performers. You can stroll down the street, take in the sights and sounds, and stop for a drink or a meal at one of the many outdoor cafes.',
      image: 'https://images.unsplash.com/photo-1614635739240-5cdb1f76fa9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    {
      title: 'Visiting the Gothic Quarter',
      text: 'The Gothic Quarter is a historic neighborhood in Barcelona that is known for its narrow streets, charming squares, and medieval architecture. Visitors can explore the area on foot and see famous landmarks like the Barcelona Cathedral and the Plaça Reial.',
      image: 'https://images.unsplash.com/photo-1562861844-763c4ae2e696?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
    },
    {
      title: 'Relaxing on the Beaches',
      text: 'Barcelona has several beautiful beaches, including Barceloneta and Nova Icaria. These beaches are perfect for sunbathing, swimming, and enjoying the Mediterranean climate. You can also take a stroll along the beachfront promenade, which offers stunning views of the sea and the city.',
      image: 'https://images.unsplash.com/photo-1464790719320-516ecd75af6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
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