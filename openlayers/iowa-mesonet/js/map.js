(function() {
  var load_map;

  load_map = function(div_name) {
    var GOESCONUSIR, GOESEASTIR, GOESWESTIR, NEXRADBASEREFLECT, NEXRADN0Q, iowa_cgi, iowa_cgis, iowa_wms_layer, layerSwitcher, map, ol_wms, _i, _len;
    map = new OpenLayers.Map(div_name);
    ol_wms = new OpenLayers.Layer.WMS("OpenLayers WMS", "http://vmap0.tiles.osgeo.org/wms/vmap0?", {
      layers: "basic"
    });
    map.addLayer(ol_wms);
    GOESEASTIR = {
      layer: 'east_ir_4km',
      url: 'http://mesonet.agron.iastate.edu/cgi-bin/wms/goes/east_ir.cgi?',
      visibility: true
    };
    GOESWESTIR = {
      layer: 'west_ir_4km',
      url: 'http://mesonet.agron.iastate.edu/cgi-bin/wms/goes/west_ir.cgi?'
    };
    GOESCONUSIR = {
      layer: 'goes_conus_ir',
      url: 'http://mesonet.agron.iastate.edu/cgi-bin/wms/goes/conus_ir.cgi?'
    };
    NEXRADBASEREFLECT = {
      layer: "nexrad_base_reflect",
      url: "http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0q.cgi?",
      visibility: true
    };
    NEXRADN0Q = {
      layer: "nexrad-n0q",
      url: "http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0q.cgi?",
      visibility: true
    };
    iowa_cgis = [GOESEASTIR, GOESWESTIR, NEXRADBASEREFLECT, NEXRADN0Q];
    for (_i = 0, _len = iowa_cgis.length; _i < _len; _i++) {
      iowa_cgi = iowa_cgis[_i];
      iowa_wms_layer = new OpenLayers.Layer.WMS(iowa_cgi['layer'], iowa_cgi['url'], {
        layers: iowa_cgi['layer'],
        transparent: true,
        format: "image/png"
      });
      iowa_wms_layer.setOpacity(.6);
      iowa_wms_layer.setVisibility((iowa_cgi['visibility'] != null) && iowa_cgi['visibility']);
      map.addLayer(iowa_wms_layer);
    }
    layerSwitcher = new OpenLayers.Control.LayerSwitcher();
    map.addControl(layerSwitcher);
    layerSwitcher.maximizeControl();
    return map.zoomToExtent(new OpenLayers.Bounds(-100.898437, 22.148438, -78.398437, 39.726563));
  };

  $(function() {
    return load_map('map');
  });

}).call(this);
