proj4.defs('EPSG:2180', "+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs");

    var p = ol.proj.get('EPSG:2180');

    var mapTiles = new ol.Map({
        target: 'map',
        renderer: 'canvas',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer',
                    params: {
                        'LAYERS': 'Raster',
                        'CRS': 'EPSG:2180',
                        'VERSION': '1.1.1'
                    }
                }),
                isBaseLayer: true,
                projection: p
            })
        ],

        view: new ol.View({
            center: ol.proj.transform([19, 52], 'EPSG:4326', 'EPSG:2180'),
            zoom: 6,
            projection: p
        })
    });
    
    var contextmenu_items = [
  {
    text: 'add popup',
    classname: 'bold',
 	callback: popup
  },
  '-' // this is a separator
];

var contextmenu = new ContextMenu({
  width: 180,
  items: contextmenu_items
});
mapTiles.addControl(contextmenu);
var content = document.getElementById('popup-content');


document.getElementById('popup-closer').onclick = function() {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};




function popup(obj){
 overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
  element: document.getElementById('popup'),
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
}));

mapTiles.addOverlay(overlay);
content.innerHTML = '<p>You clicked here:</p><code>'+obj.coordinate+'</code>';
overlay.setPosition(obj.coordinate);

}



