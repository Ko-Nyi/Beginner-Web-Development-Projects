var geocoder = L.Control.Geocoder.nominatim();
      var map, marker, latitude, longitude;
      
      function getLocation() {
        if (!navigator.geolocation) {
          alert("Browser doesn't support geolocation");
        } else {
          navigator.geolocation.getCurrentPosition(success, error);
        }
      }
      
     // Get current position successfully
    function success(position) {
      
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      
      // Instance map using leaflet
      map = L.map('map').setView([latitude, longitude], 13);
      // Tile layer using key api at cloudmade.com
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        key: '760506895e284217a7442ce2efe97797',
        styleId: 103288,
        maxZoom: 16
      }).addTo(map);

      // Marker using leaflet
      marker = L.marker([latitude, longitude]).addTo(map);

      // Popup in leaflet
      marker.bindPopup('<p></p>').openPopup();
      
      getPhysicalAddress({lat:latitude, lng:longitude});
    }

    // Get current position fail
    function error() {
      alert('Get current position fail.');
    }

     var marker;
      
    function getPhysicalAddress(latlong) {
        geocoder.reverse(latlong, 500000, function(results) {
          var r = results[0];
          document.querySelector("#address").innerHTML+=r.name;
          console.log(r.name);
          document.querySelector("#surfaceAddress").value = r.name; 
          if (r) {
            if (marker) {
              marker
                .setLatLng(r.center)
                .setPopupContent(r.html || r.name)
                .openPopup();
            } else {
              marker = L.marker(r.center)
                .bindPopup(r.name)
                .addTo(map)
                .openPopup();
            }
          }
        });
    }

      