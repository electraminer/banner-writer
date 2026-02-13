// Internal dependencies
import loadImage from "./image/LoadImage";
// External dependencies
import Express from "express";
import path from "path";
import loadLayer from "./image/LoadLayer";

const server = Express();

server.get("/image/:filename", async (req, res, next) => {
    let canvas = undefined;
    const filename = req.params.filename;
    try {
        if (filename.slice(-4) !== ".png") {
            return next();
        }
        canvas = await loadImage(filename.slice(0, -4));
    } catch {
        return next();
    }

    res.writeHead(200, {
        "Content-Type": "image/png",
    });
    res.end(canvas.toBuffer("image/png"));
});

server.get("/image/:cbmode/:filename", async (req, res, next) => {
    let canvas = undefined;
    const filename = req.params.filename;
    const colorblindMode = req.params.cbmode;
    try {
        if (filename.slice(-4) !== ".png") {
            return next();
        }
        canvas = await loadImage(filename.slice(0, -4), colorblindMode);
    } catch {
        return next();
    }

    res.writeHead(200, {
        "Content-Type": "image/png",
    });
    res.end(canvas.toBuffer("image/png"));
});

server.get("/textures/:cbmode/:filename", async (req, res, next) => {
    let canvas = undefined;
    const filename = req.params.filename;
    const colorblindMode = req.params.cbmode;
    try {
        if (filename.slice(-4) !== ".png") {
            return next();
        }
        canvas = await loadLayer(filename.slice(0, -4), colorblindMode);
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