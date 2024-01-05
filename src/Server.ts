// Internal dependencies
import loadImage from "./image/LoadImage";
// External dependencies
import Express from "express";

const app = Express();

app.use('/', Express.static('build'));

app.get("/image/:bannerfont", async (req, res, next) => {
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

app.listen(3000, () => {
    console.log("Server is active");
});