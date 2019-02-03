const base_url = "https://s3-us-west-1.amazonaws.com/antarcticmicrobia/"

// map
var base = {
  Empty: L.tileLayer("")
}

var map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: -1,
  maxZoom: 1,
  center: [0, 0],
  zoom: 1,
  layers: [base.Empty]
})

function onMapClick(e) {
  console.log("You clicked the map at " + e.latlng)
}

map.on("click", onMapClick)

var map_control = L.control.layers(base).addTo(map)

var bounds
const vid_config = {
  muted: true,
  autoplay: true,
  loop: true
}

const all_vid_names = [
  "Rotifer_Short.m3u8",
  "Ciliate_Short.m3u8",
  "Tardigrade_Short.m3u8",
  "Ciliate_Short1.m3u8",
  "Tardigrade_Short1.m3u8",
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
]

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
]

var video
var all_hls = []
var key = 0
var bounds, url, video_overlay, filename

var config = {
  capLevelToPlayerSize: true,
  maxBufferSize: 30,
  maxBufferLength: 5
}

var all_vids = []
all_vid_names.forEach((filename, key) => {
  if (!all_locs[key]) return

  loc = all_locs[key]
  url = `${base_url}${filename}`
  bounds = L.latLngBounds(loc)

  video_overlay = L.videoOverlay(url, bounds, vid_config).addTo(map)
  video = video_overlay.getElement()

  // video = document.createElement("video")
  video.id = "video" + key.toString()
  video.muted = true
  video.loop = true
  video.autoplay = true
  // document.getElementById("map").appendChild(video)

  if (Hls.isSupported()) {
    all_hls[key] = new Hls(config)
    all_hls[key].loadSource(url)
    all_hls[key].attachMedia(video)
    all_hls[key].on(Hls.Events.MANIFEST_PARSED, function() {
      video.muted = true
      video.loop = true
      video.autoplay = true
    })
  }

  // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
  // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
  // This is using the built-in support of the plain video element, without using hls.js.
  // Note: it would be more normal to wait on the 'canplay' event below however on Safari (where you are most likely to find built-in HLS support) the video.src URL must be on the user-driven
  // white-list before a 'canplay' event will be emitted; the last video event that can be reliably listened-for when the URL is not on the white-list is 'loadedmetadata'.
  else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = url
    video.addEventListener("loadedmetadata", function() {
      video.play()
    })
  }
})