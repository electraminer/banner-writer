// Internal dependencies
import loadImage from "./image/LoadImage";
// External dependencies
import Express from "express";

const app = Express();

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

app.use('/', Express.static('build'));

app.use("/", (req, res) => {
    const basePath = __dirname.replace(/\\ts-build\\src$/, "");
    res.sendFile(`${basePath}/build/index.html`);
});

export default app;