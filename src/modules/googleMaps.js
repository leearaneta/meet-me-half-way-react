const GoogleMaps = (function() {

  var createMap = () => {
    document.getElementById('map').innerHTML = ""
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.705253, lng: -74.01407},
      zoom: 18,
      scrollwheel: false
    })
    return map
  }

  var createMarker = ({address, onClick}) => {
    var lat = parseFloat(address.lat)
    var lng = parseFloat(address.lng)
    var markerProto = {
      position: {lat, lng},
      title: address.name,
      animation: google.maps.Animation.DROP
    }
    if (address.id) { // if the address is a vendor, add an event listener and a green icon
      markerProto.icon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      var marker = new google.maps.Marker(markerProto)
      marker.addListener('click', () => {
        onClick(address)
      })
    } else {
      var marker = new google.maps.Marker(markerProto)
    }
    return marker
  }

  var createAndSetMarker = ({address, onClick, map}) => {
    var marker = createMarker({address, onClick})
    marker.setMap(map)
    return marker
  }

  var createAndFitBounds = ({markers, map}) => {
    var bounds = new google.maps.LatLngBounds()
    markers.forEach(marker => bounds.extend(marker.getPosition()))
    map.fitBounds(bounds)
  }

  var calculateAndDisplayRoute = ({origin, destination, travelMode, map}) => {
    var directionsService = new google.maps.DirectionsService
    var directionsDisplay = new google.maps.DirectionsRenderer
    directionsDisplay.setOptions( { suppressMarkers: true, preserveViewport: true } )
    var route = []
    directionsDisplay.setMap(map)
    directionsService.route({
      origin,
      destination,
      travelMode
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response)
        route.push(directionsDisplay)
      } else {
        console.log(status)
      }
    })
    return route
  }

  return {createMap, createAndSetMarker, createAndFitBounds, calculateAndDisplayRoute}

})()

export default GoogleMaps
