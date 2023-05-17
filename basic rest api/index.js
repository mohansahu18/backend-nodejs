import express from "express";
import bodyParser from "body-parser";

const port = 3009;
const app = express();

// lets memic database using array
let blogList = [];

// before hit the api first hit this (middleware)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// read data
app.get('/blogs', (req, res) => {
    console.log(req.method);
    return res.status(200).json({
        data: blogList,
        success: true
    })
})

// create data
app.post('/blogs', (req, res) => {

    blogList.push({
        title: req.body.title,
        content: req.body.content,
        id: Math.floor(Math.random() * 1000)
    })
    return res.status(200).json({
        success: true
    })
})

// reading a specific blog
app.get('/blogs/:id', (req, res) => {
    const result = blogList.filter((blog) =>
        (blog.id == req.params.id))
    res.status(200).json({
        data: result,
        success: true
    })

})


// running the server
app.listen(port, () => {
    console.log(`server started on port ${port}`);
})