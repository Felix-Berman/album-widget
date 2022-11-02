// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: magic;


// fill in user specific data
const apiKey = ''	// last.fm api key
const user = '' // lastfm user name
const period = '7day' // time period (overall | 7day | 1month | 3month | 6month | 12month)
const imageQuality = 3 // 0-3 low to high
const tight = false	// choose if album covers are packed tightly
// end of user specific data

const url = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=' + user + '&period=' + period + '&api_key=' + apiKey + '&format=json'

let topAlbums = await getTopAlbums()
let [covers, names] = await getAlbumCovers()
let widget = await createWidget()
widget.containerRelativeShape = true

if (config.runsInWidget) {
  	Script.setWidget(widget)
} else {
	let image = makeChart()
	Photos.save(image)
  	// widget.presentLarge()
}

Script.complete()

async function createWidget() {
	
	let widget = new ListWidget()
	
	var d = new DrawContext()
	d.size = new Size(1,1)
	var point = new Point(0,0)
	d.drawImageAtPoint(covers[0], point)
	d.setFillColor(new Color("#e8e1cf", 0.4))
	d.fillRect(new Rect(0,0,1,1))
	let img = d.getImage()
	widget.backgroundImage = img
	
	if (tight) {
		let main = widget.addStack()
		main.addImage(makeChart())
		return widget
	}
	
	let main = widget.addStack()
	main.layoutVertically()
	main.centerAlignContent()
	main.spacing = 18
	addRow(0)
	addRow(1)
	addRow(2)
	
	function addRow(i) {
		let row = main.addStack()
		row.layoutHorizontally()
		row.spacing = 10
		i *= 3
		addCover(covers[i], names[i])
		addCover(covers[i+1], names[i+1])
		addCover(covers[i+2], names[i+2])
		
		function addCover(image, name) {
			let cover = row.addStack()
			cover.addImage(image)
			cover.cornerRadius = 5
		}
	}
	
	return widget
 }

async function getTopAlbums() {
  	const request = new Request(url)
 	const json = await request.loadJSON()
  	return json
}

async function getAlbumCovers() {
	var images = new Array()
	var names = new Array()
	let i = 0
	let j = 0
	while (images.length < 9) {
		try {
            var imgURL = topAlbums.topalbums.album[i].image[imageQuality]['#text']		
			if (imgURL === '') {
				i++
				continue
			}
			const request = new Request(imgURL)
			var image = await request.loadImage()
			images[j] = image
			names[j] = topAlbums.topalbums.album[i].name
			i++
			j++
        }
        catch(err) {
			const draw = new DrawContext()
			draw.setFillColor(Color.black())
			draw.fillRect(new Rect(0, 0, 200, 200))
			const blank = draw.getImage()
             images[j] = blank		
			names[j] = ""
			j++
        }

		
	}
	
	return [images, names]
}

function makeChart() {
	let d = new DrawContext()
	let size = covers[0].size.width
	d.size = new Size(size*3, size*3)
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			let point = new Point(i*size, j*size)
			d.drawImageAtPoint(covers[i+j*3], point)
		}
	}
	return d.getImage()
}