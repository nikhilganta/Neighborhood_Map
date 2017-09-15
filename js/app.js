var map, clientID, clientSecret;

function ViewModel() {
  var self = this;
  // Creating a new blank array for all the listing markers.
  this.markers = [];
  // this.list = [];
  this.searchBox = ko.observable("");

  // This function populates the infowindow when the marker is clicked. We'll only allow
  // one infowindow which will open at the marker that is clicked, and populate based
  // on that markers position.
  this.populateInfoWindow = function(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      this.contentOne = '<h3>' + marker.title + '</h3>' + '<h4>(' + marker.type + ')</h4>';


      clientID = 'RB3KVOZKCOUIIA2DICNFGG4VRIMTAIA1FS2GLPI4DD2E4NAY';
      clientSecret = 'EEVS0EM432XTXTQN32GXNS2FHF135D4LMRKVG1A4XDF1URUK';
      //Foursquare API URL
      var fsUrl = 'https://api.foursquare.com/v2/venues/search?client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20130815&ll=' + marker.position.lat + ',' + marker.position.lng + '&query=' + marker.title;

      $.getJSON(fsUrl).done(function(marker) {
          var data = marker.response.venues[0];
          self.street = data.location.formattedAddress[0];
          self.city = data.location.city;
          self.state = data.location.state;
          self.country = data.location.country;
          self.contentTwo = '<div>' +
          '<p> Address: </p>' +
          '<p>' + self.street + '</p>' +
          '<p>' + self.city + '</p>' +
          '<p>' + self.state + '</p>' +
          '<p>' + self.country + '</p>' +
          '</div>';
          infowindow.setContent(self.contentOne + self.contentTwo);

      }).fail(function(e) {
          // Handling Errors
          alert('Foursquare API could not be loaded');
      });

      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function() {
        infowindow.setMarker = null;
      });
    }
  };

  this.initMap = function() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 17.720993, lng: 83.319972},
        zoom: 16,
        styles: mapStyles
      });

    this.largeInfowindow = new google.maps.InfoWindow();
    this.bounds = new google.maps.LatLngBounds();

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
      // Get the position from the location array.
      this.title = locations[i].title;
      this.position = locations[i].location;
      this.type = locations[i].type;

      // this.list.push(locations[i].title);

      // Create a marker per location, and put into markers array.
      this.marker = new google.maps.Marker({
        map: map,
        position: this.position,
        title: this.title,
        type: this.type,
        animation: google.maps.Animation.DROP,
        id: i
      });
      // Push the marker to our array of markers.
      this.markers.push(this.marker);

      this.animationFunction  = function() {
        self.populateInfoWindow(this, self.largeInfowindow);
        this.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout((function() {
            this.setAnimation(null);
        }).bind(this), 2100);
      };
      // Create an onclick event to open an infowindow at each marker.
      this.marker.addListener('click', this.animationFunction);

      this.bounds.extend(this.markers[i].position);
    }

    // Extend the boundaries of the map for each marker
    map.fitBounds(this.bounds);
  };

  this.initMap();

  // This block appends our locations to a list using data-bind
  // It also serves to make the filter work
  this.locationsList = ko.computed(function() {
      var result = [];
      for (var i = 0; i < this.markers.length; i++) {
          var markerLocation = this.markers[i];
          if (markerLocation.title.toLowerCase().includes(this.searchBox()
                  .toLowerCase())) {
              result.push(markerLocation);
              this.markers[i].setVisible(true);
          } else {
              this.markers[i].setVisible(false);
          }
      };
      return result;
  }, this);

}

function startApp() {
    ko.applyBindings(new ViewModel());
}
