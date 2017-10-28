function initialize() {
    var latlng = new google.maps.LatLng(34.704, 135.497);
    var MY_MAPTYPE_ID = google.maps.MapTypeId.ROADMAP
    var featureOpts = [{
        "stylers": [
            { "hue": "#339966" },
            { "saturation": -70 }
        ],
        "elementType": "all",
        "featureType": "all"
    }]
    var myOptions = {
        zoom: 15,
        center: latlng,
        mapTypeId: MY_MAPTYPE_ID,
        mapTypeControl: false,
        disableDefaultUI: true
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);

    var styledMapOptions = {
        name: 'Pandy Map'
    };
    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
    map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
}
