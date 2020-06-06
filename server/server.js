const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./modules/pool.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('server/public'));

app.get('/', (req, res) => res.send('Welcome to pg tester'));

// test to check if DB is connected successful
app.get('/dbtest', (req, res) => {
    pool.query("Select 1;")
        .then(() => res.send('Database Connected Successfully!'))
        .catch((error) => res.send(`Error Connecting to Database: ${error}`));
});


//////////////////////////////////////////////////////////////////////////////


// GET route to send task items
app.get('/list', (req, res) => {
    // go get all of the items from the to do list and order them by status.
    let queryText = `SELECT * FROM "to-do" ORDER BY "status";`;
    pool.query(queryText)
    .then((result) => {
        console.log('Retrieving tasks successful.');
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error in making query: ${queryText}`);
        res.sendStatus(500);
    });
});


// POST route to add a task item to the list
/*
{
    "id": 1,   //we are ignoring this tho because DB is taking care of it!
    "task": 'Empty the dishwasher.',
    "status": 'Complete!'
}
*/
app.post('/list', (req, res) => {
    const list = req.body;
    const taskParam = list.task;
    const statusParam = list.status;
    console.log(`${taskParam} ${statusParam}`);

    const queryText = `
        INSERT INTO "to-do" ("task", "status")
        VALUES ($1, $2);`
    pool.query(queryText, [taskParam, statusParam])
        .then(function(result) {
            console.log('Yay, task has been added.');
            res.sendStatus(201); //good to go and task created
        }).catch(function(error) {
            console.log('Sorry, error with query: ', error);
            res.sendStatus(500); //server error
        });
});


// PUT --> update status to "complete"
app.put('/list/:id/:status', (req, res) => {
    const taskId = req.params.id;
    const status = req.params.status;
    let queryText = `UPDATE "to-do" SET "status"=$1 WHERE id=$2;`
    console.log(req.params);
    // if (status === undefined) { LEFT OFF HERE!!!!!!!
    //     status = "incomplete";
    // }
    pool.query(queryText, [status, taskId])
    .then((result) => {
        console.log('Success, status updated.');
        res.sendStatus(200) // A OK!
    }).catch((error) => {
        console.log(`Error in making query: ${queryText}`);
        res.sendStatus(500); // Mehhh.  Server Error.
    });
});


// DELETE --> delete the task
app.delete('/list/:id', (req, res) => {
    const taskId = req.params.id;
    let queryText = `DELETE FROM "to-do" WHERE id=$1;`;
    pool.query(queryText, [taskId])
    .then((result) => {
        console.log('Task successfully deleted.');
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error with deleting task: ${queryText}`);
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});