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
    const queryText = `SELECT * FROM "to-do" ORDER BY "task";`;
    pool.query(queryText)
    .then((result) => {
        console.log('Retrieving tasks successful.');
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error in making query: ${queryText}`);
        res.sendStatus(500);
    });
});
// end GET


// POST route to add a task item to the list
/*
{
    "id": 1,   //we are ignoring this tho because DB is taking care of it!
    "task": 'Empty the dishwasher.',
    "status": 'Incomplete' (default)
}
*/
app.post('/list', (req, res) => {
    const list = req.body;
    const taskParam = list.task;
    // const statusParam = list.status;
    console.log(`${taskParam}`);
    // insert whatever the text is into the task
    const queryText = `
        INSERT INTO "to-do" ("task")
        VALUES ($1);`
    pool.query(queryText, [taskParam])
        .then(function(result) {
            console.log('Yay, task has been added.');
            res.sendStatus(201); //good to go and task created
        }).catch(function(error) {
            console.log('Sorry, error with query: ', error);
            res.sendStatus(500); //server error
        });
});
// end POST


// PUT --> update status to "complete"
app.put('/list/:id/:status', (req, res) => {
    const taskId = req.params.id;
    const taskStatus = req.params.status;
    // const status = req.params.status;
    // update the status to complete where the button was clicked of that specific id
    const queryText = `UPDATE "to-do" SET "status"=$1 WHERE id=$2;`;
    console.log(req.params);
    pool.query(queryText, [taskStatus, taskId])
    .then((result) => {
        console.log('Success, status updated.');
        res.sendStatus(200) // A OK!
    }).catch((error) => {
        console.log(`Error in making query: ${queryText}`);
        res.sendStatus(500); // Mehhh.  Server Error.
    });
});
// end PUT


// DELETE --> delete the task
app.delete('/list/:id', (req, res) => {
    const taskId = req.params.id;
    // delete the whole item where the specific id is whatever was clicked
    const queryText = `DELETE FROM "to-do" WHERE id=$1;`;
    pool.query(queryText, [taskId])
    .then((result) => {
        console.log('Task successfully deleted.');
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error with deleting task: ${queryText}`);
    });
});
// end DELETE


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});