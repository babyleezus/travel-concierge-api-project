function GetInfo(){
	const restaurantName= document.getElementById('restaurantName');
}

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '43a48491b6mshe887897b8e58e78p1e0934jsn82cdea6f0aaa',
		'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
	}
};

fetch('https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=304554', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(error => console.error(error));

console.log(fetch())


function GetInfo(){
	const newTranslation= document.getElementById('newTranslation');
}

const encodedParams = new URLSearchParams();
encodedParams.append("q", "Hello, world!");
encodedParams.append("target", "es");
encodedParams.append("source", "en");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'Accept-Encoding': 'application/gzip',
		'X-RapidAPI-Key': 'a16aec5effmsh1f03abc2bac9cfap1d6c69jsn50e18bdb7471',
		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
	},
	body: encodedParams
};

fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

console.log(fetch(url))


function GetInfo(){
	const newCity = document.getElementById('newCity');
	const newRestaurant = document.getElementById('newRestaurant');
	const newLocalEntertainment= document.getElementById('newLocalEntertainment');
}

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a16aec5effmsh1f03abc2bac9cfap1d6c69jsn50e18bdb7471',
		'X-RapidAPI-Host': 'maptiles.p.rapidapi.com'
	}
};

fetch('https://maptiles.p.rapidapi.com/en/map/v1/3/6/3.png', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

console.log(fetch(url))