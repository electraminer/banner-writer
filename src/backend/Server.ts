// Internal dependencies
import loadImage from "./image/LoadImage";
// External dependencies
import Express from "express";
import path from "path";

const server = Express();

server.get("/image/:bannerfont", async (req, res, next) => {
    const bannerfont = req.params.bannerfont;
    let canvas = undefined;
    console.log("test");
    try {
        canvas = await loadImage(bannerfont);
    } catch {
        return next();
    }

    res.writeHead(200, {
        "Content-Type": "image/png",
    });
    res.end(canvas.toBuffer("image/png"));
});

server.use('/', Express.static('build'));

server.use("/", (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../../../build/index.html`));
});

export default server;