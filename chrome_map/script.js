const base_url = "https://s3.amazonaws.com/lifeundertheice/"

// map
vid_size_x = 500 //
overlap = 10

img_height = 1080
img_width = 1920
rows = 6 // square grid number of rows/columns

x = vid_size_x
y = x * (img_height / img_width)

// this will fill a grid from left to right but we really need to
// fill the screen in viewport, then fill an adjacent screen and so on
//   [[0 * y - overlap, 0 * x - overlap], [1 * y + overlap, 1 * x + overlap]],
//   [[0 * y - overlap, 1 * x - overlap], [1 * y + overlap, 2 * x + overlap]],
//   [[0 * y - overlap, 2 * x - overlap], [1 * y + overlap, 3 * x + overlap]],
//   [[0 * y - overlap, 3 * x - overlap], [1 * y + overlap, 4 * x + overlap]],
//
//   [[1 * y - overlap, 0 * x - overlap], [2 * y + overlap, 1 * x + overlap]],
//   [[1 * y - overlap, 1 * x - overlap], [2 * y + overlap, 2 * x + overlap]],
//   [[1 * y - overlap, 2 * x - overlap], [2 * y + overlap, 3 * x + overlap]],
//   [[1 * y - overlap, 3 * x - overlap], [2 * y + overlap, 4 * x + overlap]]

// that pattern ^ scripted:
let all_locs = []
for (i = 0; i < rows; i++) {
  for (j = 0; j < rows; j++) {
    all_locs.push([
      [i * y - overlap, j * x - overlap],
      [(i + 1) * y + overlap, (j + 1) * x + overlap]
    ])
  }
}

var base = {
  Empty: L.tileLayer("")
}

var map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: -5,
  center: [(y * rows) / 2, (x * rows) / 2],
  zoom: 4,
  layers: [base.Empty],
  interactive: true,
  className: ""
})

// map click
function onMapClick(e) {
  console.log("You clicked the map at", e.latlng)
}
map.on("click", onMapClick)

var map_control = L.control.layers(base).addTo(map)

// video

const all_vid_names = [
  "112118_CanadaGlacierCryoconite1_NikonE200_10x_PinkRotifer.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_10x_Tardigrade_Beginning.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_10x_Tardigrade_End.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_40x_TwoSpirals_02.m3u8",

  "112118_CanadaGlacierCryoconite1_NikonE200_10x_PinkRotifer.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_10x_Tardigrade_Beginning.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_10x_Tardigrade_End.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_40x_TwoSpirals_02.m3u8",

  "112118_CanadaGlacierCryoconite1_NikonE200_10x_PinkRotifer.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_10x_Tardigrade_Beginning.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_10x_Tardigrade_End.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_40x_TwoSpirals_02.m3u8",

  "112118_CanadaGlacierCryoconite1_NikonE200_10x_PinkRotifer.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_10x_Tardigrade_Beginning.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_10x_Tardigrade_End.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_40x_TwoSpirals_02.m3u8",

  "112118_CanadaGlacierCryoconite1_NikonE200_10x_PinkRotifer.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_10x_Tardigrade_Beginning.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_10x_Tardigrade_End.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_40x_TwoSpirals_02.m3u8",

  "112118_CanadaGlacierCryoconite1_NikonE200_10x_PinkRotifer.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_10x_Tardigrade_Beginning.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_10x_Tardigrade_End.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_40x_TwoSpirals_02.m3u8",

  "112118_CanadaGlacierCryoconite1_NikonE200_10x_PinkRotifer.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_10x_Tardigrade_Beginning.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_10x_Tardigrade_End.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_40x_TwoSpirals_02.m3u8",

  "112118_CanadaGlacierCryoconite1_NikonE200_10x_PinkRotifer.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_10x_Tardigrade_Beginning.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_10x_Tardigrade_End.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_40x_TwoSpirals_02.m3u8",

  "112118_CanadaGlacierCryoconite1_NikonE200_10x_PinkRotifer.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_10x_Tardigrade_Beginning.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_10x_Tardigrade_End.m3u8",
  "112118_CanadaGlacierCryoconite1_NikonE200_40x_TwoSpirals_02.m3u8"
]

all_vid_names.sort(function() {
  return 0.5 - Math.random()
})

const vid_config = {
  muted: true,
  autoplay: true,
  loop: true
}

var video, bounds, url, video_overlay, filename
var all_hls = []
var key = 0

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
  // bounds = L.latLngBounds(loc)

  video_overlay = L.videoOverlay(url, loc, vid_config).addTo(map)
  video = video_overlay.getElement()

  // video = document.createElement("video")
  video.id = "video" + key.toString()

  // video.muted = true
  // video.loop = true
  // video.autoplay = true
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
