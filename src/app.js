const {addNewVisitor, listVisitors, deleteVisitor, updateVisitor, viewVisitor, deleteAllVisitors} = require('./db');
const express = require('express');
const path = require('path')

const app = express();
const port = 9005;

app.use(express.urlencoded());
app.use(express.json());
app.use('/single-page-app', express.static('public'));

app.get('/single-page-app', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

//add visitor
app.post('/addNewVisitor', async(req, res) => {
    console.log(JSON.stringify(req.body));
    let visitor_name = req.body.visitor_name;
    let visitor_age = req.body.visitor_age;
    let date_of_visit = req.body.date_of_visit;
    let time_of_visit = req.body.time_of_visit;
    let assistant = req.body.assistant;
    let comments = req.body.comments;

    const newVisitor = await addNewVisitor(visitor_name,visitor_age,date_of_visit,time_of_visit,assistant,comments);
    res.send(JSON.stringify(newVisitor));
    res.status(200).end();
});

app.get('/listVisitors', async(req, res) =>{
    const allVisitors = await listVisitors();

    res.send(JSON.stringify(allVisitors));
    res.status(200).end();
})

app.delete('/deleteVisitor/:id', async(req, res) => {
    const delVisitor = await deleteVisitor(req.params.id);

    res.send(JSON.stringify(delVisitor));
    res.status(200).endend();
})

app.put('/updateVisitor/:id', async(req, res) => {
    console.log(JSON.stringify(req.body));
    const id = req.params.id;
    const visitor_name = req.body.visitor_name;
    const visitor_age = req.body.visitor_age;
    const date_of_visit = req.body.date_of_visit;
    const time_of_visit = req.body.time_of_visit;
    const assistant = req.body.assistant;
    const comments = req.body.comments;

    const update = await updateVisitor(id,visitor_name,visitor_age,date_of_visit,time_of_visit,assistant,comments);
    res.send(JSON.stringify(update));
    res.status(200).end();
})

app.get('/viewVisitor/:id', async(req, res) => {
    const view = await viewVisitor(req.params.id);

    res.send(JSON.stringify(view));
    res.status(200).end();
})

app.delete('/deleteAllVisitors', async(req, res) => {
    const deleteAll = await deleteAllVisitors();

    res.send(JSON.stringify(deleteAll));
    res.status(200).end();
})
    
const server = app.listen(port, () => {
    console.log(`server listening at ${port}.`)
});

module.exports = server;