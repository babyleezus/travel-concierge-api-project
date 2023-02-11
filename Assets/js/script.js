const btn = document.querySelector('#searchBtn')

btn.addEventListener('click', () => {
    console.log('zoom in')
})

function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {pageLanguage: 'en' },
        'google_translate_element'
    );
}

var cities = [
    { name: "London", lat: 51.5074, lng: -0.1278 },
    { name: "Manchester", lat: 53.4808, lng: -2.2426 },
    { name: "Birmingham", lat: 52.4862, lng: -1.8904 },
    { name: "Liverpool", lat: 53.4308, lng: -2.9608 },
    { name: "Bristol", lat: 51.4545, lng: -2.5879 }
  ];

  var map = L.map('mapid').setView([52.3555, -1.1743], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var markers = [];
  cities.forEach(function(city) {
    var marker = L.marker([city.lat, city.lng]).addTo(map);
    marker.bindPopup(city.name);
    markers.push(marker);
  });

  document.getElementById("searchBtn").addEventListener("click", function() {
    var cityName = document.getElementById("citySearch").value;
    markers.forEach(function(marker) {
      if (marker._popup._content.toLowerCase() === cityName.toLowerCase()) {
        marker.openPopup();
      } else {
        marker.closePopup();
      }
    });
  });

  const unsplashApiKey = "I2CEN80WyrKtGF99TtTTe4bmuO-I85cJDYQyZvKZFt4"
  const queryKey = 'https://api.unsplash.com/photos/?client_id=' + unsplashApiKey

fetch(queryKey)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

  // SIGN BUTTON AND UNSPLASH API 

  const signupButton = document.getElementById("signup-button");
  const signupModal = document.getElementById("signup-modal");
  const signupForm = document.getElementById("signup-form");
  const signinButton = document.getElementById("signin-button");
  const signinModal = document.getElementById("signin-modal");
  const signinForm = document.getElementById("signin-form");
  const closeButton = document.querySelector(".close");

  signupButton.addEventListener("click", function () {
    signupModal.style.display = "block";
  });

  signinButton.addEventListener("click", function () {
    signinModal.style.display = "block";
  });

  closeButton.addEventListener("click", function () {
    signupModal.style.display = "none";
    signinModal.style.display = "none";
  });

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    // Store the user information in local storage
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    signupModal.style.display = "none";
  });

  signinForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const signinUsername = document.getElementById("signin-username").value;
    const signinPassword = document.getElementById("signin-password").value;

    console.log("Signin username:", signinUsername);
    console.log("Signin password:", signinPassword);

    // Get the user information from local storage
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    // Check if the sign in information matches the information stored in local storage
    if (signinUsername === username && signinPassword === password) {
      console.log("Sign in successful!");
      signinModal.style.display = "none";

      // Give the user full access to the HTML file
      document.body.style.pointerEvents = "auto";
    } else {
      console.log("Sign in failed. Please try again.");
    }
  });

  // unsplash api

  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const imagesContainer = document.getElementById("images-container");

  // Function to fetch photos from the Unsplash API based on a search term
  // add local store for the images

  const fetchPhotos = (searchTerm) => {
    fetch(
      `https://api.unsplash.com/search/photos?client_id=I2CEN80WyrKtGF99TtTTe4bmuO-I85cJDYQyZvKZFt4&query=${searchTerm}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Clear the images container
        imagesContainer.innerHTML = "";
        // Loop through the photos and add them to the HTML
        data.results.forEach((photo) => {
          const div = document.createElement("div");
          div.classList.add("card", "m-2");
          div.style.width = "18rem";
          const img = document.createElement("img");
          img.src = photo.urls.regular;
          img.classList.add("card-img-top");
          div.appendChild(img);
          imagesContainer.appendChild(div);
        });
      });
  };

  // Fetch photos when the page loads
  fetchPhotos("");

  // Listen for the search button to be clicked
  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value;
    fetchPhotos(searchTerm);
  });

  // unsplash api

  

