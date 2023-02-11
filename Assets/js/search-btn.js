$(document).ready(function () {
  (function () {
    var placesAutocomplete = places({
      appId: "plEHFE8OXN3L",
      apiKey: "a6eb12d44e181f3c3c3d02bd7cf7b2fd",
      container: document.querySelector("#address"),
    });

    var $address = document.querySelector("#address-value");
    placesAutocomplete.on("change", function (e) {
      $address.textContent = e.suggestion.value;
    });

    placesAutocomplete.on("clear", function () {
      $address.textContent = "none";
    });
  })();
});
