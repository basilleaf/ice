// map
var base = {
  Empty: L.tileLayer("")
};

var map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: -1,
  maxZoom: 1,
  center: [0, 0],
  zoom: 1,
  layers: [base.Empty]
});

function onMapClick(e) {
  console.log("You clicked the map at " + e.latlng);
}

map.on("click", onMapClick);

var map_control = L.control.layers(base).addTo(map);

var bounds;
const base_url = "https://s3-us-west-1.amazonaws.com/antarcticmicrobia/";
const vid_config = {
  muted: true,
  autoplay: true,
  loop: true
};

const all_vids = [
  "Rotifer_Short.m3u8",
  "Ciliate_Short.m3u8",
  "Tardigrade_Short.m3u8",
  "Rotifer_Short1.m3u8",
  "Ciliate_Short1.m3u8",
  "Tardigrade_Short1.m3u8",
  "Rotifer_Short2.m3u8",
  "Ciliate_Short2.m3u8",
  "Tardigrade_Short2.m3u8",
  "Rotifer_Short3.m3u8",
  "Ciliate_Short3.m3u8",
  "Tardigrade_Short3.m3u8",
  "Rotifer_Short4.m3u8",
  "Ciliate_Short4.m3u8",
  "Tardigrade_Short4.m3u8",
  "Rotifer_Short5.m3u8",
  "Ciliate_Short5.m3u8",
  "Tardigrade_Short5.m3u8"
];

const all_locs = [
  [[0, 0], [400, 400]],
  [[0, 0], [-400, -400]],
  [[0, 0], [-400, 400]],
  [[0, 0], [400, -400]],
  [[200, 200], [700, 700]],
  [[-200, -200], [-700, -700]],
  [[200, -200], [700, -700]],
  [[-200, 200], [-700, 700]],
  [[700, 700], [1500, 1500]],
  [[-700, -700], [-1500, -1500]],
  [[700, -700], [1500, -1500]],
  [[-500, 500], [-1200, 1200]],
  [([1200, 1200], [1800, 1700])],
  [[-1200, -1200], [-1800, -1700]],
  [[-1200, 1200], [-1800, 1700]],
  [[1200, -1200], [1800, -1700]]
];

console.log("locations: ", all_locs.length);

var key = 0;
var bounds, url, videoOverlay, filename;

all_locs.forEach((loc, key) => {
  var bounds = L.latLngBounds(loc);
  var filename = all_vids[key];
  var url = `${base_url}${filename}`;
  var video_overlay = L.videoOverlay(url, bounds, vid_config).addTo(map);

  try {
    videojs(video_overlay.getElement());
  } catch (e) {
    // there are 2 videos that the bucket won't serve :shrug:
    // console.log(e);
  }

  if (key > 4) {
    console.log("pause");
    video_overlay.getElement().pause();
  }
});
