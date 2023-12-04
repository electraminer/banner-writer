const Express = require("express");
const Canvas = require("canvas");
const Writing = require("./src/model/Writing.js");
const Helmet = require("helmet");

const app = Express();

app.use('/', Express.static('public'));

app.get("/:characters", async (req, res) => {
    console.log(req.params.characters);
    const writing = Writing.fromCharacters(req.params.characters);

    const size = 20;
    const margin = 2;

    const width = writing.lines.map(l => l.length).reduce(Math.max, 0);
    const height = writing.lines.length;
    
    const canvas = Canvas.createCanvas(margin + (size + margin) * width, margin + (size * 2 + margin) * height);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(49,51,56)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const [y, line] of writing.lines.entries()) {
        for (const [x, banner] of line.entries()) {
            if (banner == undefined) {
                continue;
            }
            for (const layer of banner.layersWithBackground()) {
                const image = await Canvas.loadImage("./public" + layer.texture());
                ctx.drawImage(image, margin + (size + margin) * x, margin + (size * 2 + margin) * y, size, size * 2);
            }
        }
    }

    res.writeHead(
        200,
        //this is the headers object
        {
          //content-type: image/png tells the browser to expect an image
          "Content-Type": "image/png",
        }
      );
    
      //ending the response by sending the image buffer to the browser
      res.end(canvas.toBuffer("image/png"));
});

app.get("/", (req, res) => {
    res.end('trans rights!');
});

app.listen(3000);