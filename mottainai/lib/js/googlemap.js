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
        mapType: 'styledMap',
        zoom: 15,
        center: latlng,
        mapTypeId: MY_MAPTYPE_ID,
        mapTypeControl: false,
        disableDefaultUI: true
    };
    var data = google.visualization.arrayToDataTable([
        ['Lat', 'Long', 'Weight'],
        [34.001, 135.5, 2.3],
        [34.003, 135.48, 3.0]
    ])
    map = new google.visualization.Map(document.getElementById('map-canvas'), myOptions);
    map.draw(data, {
        showToolTip: true,
        showInfoWindow: true
    });

    var styledMapOptions = {
        name: 'Pandy Map'
    };
    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
    map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
}
