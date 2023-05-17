import express from 'express';
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello GET');
});

app.get('/HOME', (req, res) => {
    res.send("home");
});

app.post('/', (req, res) => {
    res.send('Hello POST!');
});
app.put('/', (req, res) => {
    res.send({
        name: "mohan",
        age: "20"
    });
});
app.delete('/', (req, res) => {
    res.send('Hello DELETE!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});