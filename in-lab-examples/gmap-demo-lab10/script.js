window.initMap = function() {
	const location = {lat: -20, lng: 130};
	const config = {zoom: 6, center: location};
	const mapElement = document.querySelector("#map");
	const map = new google.maps.Map(mapElement, config);
}