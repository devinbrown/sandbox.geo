// Generated by CoffeeScript 1.3.1
(function() {
  var SANDBOXMAP, f, kml_base_url, kml_filenames, kml_layers, load_toggle_controls;

  kml_base_url = "http://erikj.me/sandbox.geo/googlemaps/kml/";

  kml_filenames = ["betasso.kml", "boulder.kml", "flagstaff.kml", "gold-hill.kml", "mesa-lab.kml"];

  kml_layers = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = kml_filenames.length; _i < _len; _i++) {
      f = kml_filenames[_i];
      _results.push(new google.maps.KmlLayer(kml_base_url + f));
    }
    return _results;
  })();

  SANDBOXMAP = {};

  this.SANDBOXMAP = SANDBOXMAP;

  SANDBOXMAP.load_map = function(map_div_name) {
    var boulder, config, kml, map, map_div, _i, _len;
    boulder = new google.maps.LatLng(-105.3, 40.028);
    config = {
      zoom: 11,
      center: boulder,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.TERRAIN, 'OSM']
      }
    };
    map_div = document.getElementById(map_div_name);
    map = new google.maps.Map(map_div, config);
    map.mapTypes.set("OSM", new google.maps.ImageMapType({
      getTileUrl: function(coord, zoom) {
        return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
      },
      tileSize: new google.maps.Size(256, 256),
      name: "OpenStreetMap",
      maxZoom: 18
    }));
    for (_i = 0, _len = kml_layers.length; _i < _len; _i++) {
      kml = kml_layers[_i];
      kml.setMap(map);
    }
    load_toggle_controls('layer_controls');
    return map;
  };

  load_toggle_controls = function(control_div_name) {
    var control_div, i, kml, _i, _len;
    control_div = document.getElementById(control_div_name);
    control_div.innerHTML = '';
    i = 0;
    for (_i = 0, _len = kml_layers.length; _i < _len; _i++) {
      kml = kml_layers[_i];
      control_div.innerHTML += "<input type='checkbox' id='kml_layer_" + i + "_checkbox' checked='yes' value='layer " + i + "' onclick='SANDBOXMAP.toggle_layer(map," + i + ");' /> ";
      control_div.innerHTML += "" + kml_filenames[i] + "<br/>";
      i += 1;
    }
  };

  SANDBOXMAP.toggle_layer = function(map, i) {
    var checkbox_div;
    checkbox_div = "kml_layer_" + i + "_checkbox";
    if (document.getElementById(checkbox_div).checked) {
      return kml_layers[i].setMap(map);
    } else {
      return kml_layers[i].setMap(null);
    }
  };

}).call(this);