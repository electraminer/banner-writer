// Internal dependencies
import Writing from "./model/Writing";
import renderImage from "./image/RenderImage";
// External dependencies
import Express from "express";

const app = Express();

app.use('/', Express.static('build'));

app.get("/:bannerfont", async (req, res, next) => {
    const bannerfont = req.params.bannerfont;
    let writing = undefined;
    try {
        [writing] = Writing.fromString(bannerfont);
    } catch {
        return next();
    }
    const canvas = await renderImage(writing);

    res.writeHead(200, {
        "Content-Type": "image/png",
    });
    res.end(canvas.toBuffer("image/png"));
});

app.listen(3000, () => {
    console.log("Server is active");
});