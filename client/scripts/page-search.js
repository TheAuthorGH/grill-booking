let gbPos = {};

function searchGrills(query) {
	$.ajax({
		type: 'GET',
		url: '/grills/?' + query
	})
	.done(res => {
		const grills = $('ul.gb-grill-list').empty();
		for(let g of res) {
			grills.append(`
				<li>
					<div><h3>${g.model}</h3> <span>$${g.price}</span></div>
					<div>
						<img src="${g.imageurl}" alt="image of this grill"/>
						<p>${g.description}</p>
					</div>
				</li>
			`);
		}
	})
	.fail(() => {
		window.location.href = '/error';
	});
}

function handleSearchControls() {
	$('.gb-grill-search').submit(function(evt) {
		evt.preventDefault();
		searchGrills(`lat=${gbPos.lat}&lng=${gbPos.lng}`);
	});
}

function initMap() {
	const map = new google.maps.Map(document.getElementById('gb-search-map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 6
	});
	const infoWindow = new google.maps.InfoWindow;

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(pos => {
			gbPos.lat = pos.coords.latitude,
			gbPos.lng = pos.coords.longitude
			
			infoWindow.setPosition(gbPos);
			infoWindow.setContent('Location found.');
			infoWindow.open(map);
			map.setCenter(gbPos);
		});
	} else {
		$('#gb-search-map').html('<p>It seems your browser does not support geolocation.</p>');
	}
}

$(function() {
	checkAuth().then(() => {
		handleSearchControls();
	});
});