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

