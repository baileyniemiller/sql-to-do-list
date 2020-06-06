## Specific Components
* Display to-do list
    --> ul
* Allow a user to create a task
    --> inputs
* When that task is created it should be added to the database.
* ul should refresh to show all tasks
* Each task will have an option to complete or delete
    --> two buttons
    --> if complete, add css to show that
* Database should also know wether it's complete or not (kind of like status from the book one!)
* Deleting should remove from ul and database

## Where to begin?
Let's start by setting up the project.  We will need:

* Server Folder
    --> server.js
* Modules Folder
    --> pool.js
* Public Folder
    --> client.js
    --> jquery.js
    --> index.html
    --> style.css
* Routes Folder if needed
* npm init --yes
* npm install express
* npm install pg
* Forgot a .gitignore...will remember for next time :P

We should be good to go!

## We will need to create a database.
Database name: weekend-to-do-app
Table name: to-do
"id": serial primary key
"task": VARCHAR(500) NOT NULL
"status": VARCHAR(30) DEFAULT "Incomplete" NOT NULL

## Nice, looks good. Now let's start with the backend.
In server.js we will need:
* GET route to send back the to-do list.  Path: /list
* POST route to add a list item.          Path: /list
    {
        "id":     1 (DB will take care of this)
        "task":   "Do the dishes."
        "status": "Complete!" 
    }
* PUT to update an item to complete.      Path: /list/:id/status
* DELETE to delete a list item.           Path: /list/:id

### Make sure everything is working in postman!!

## YAY the worst part is over.  Haha.  Frontend time.
In client.js we will need:
* GET --> we want to get the list and append to ul
* POST --> allow a user to add a new task.
    newTask = {
        "task": (this will be the value of this input)
        (I'm not sure if I might want status here or not...I think not...
        because it will be default to incomplete.)
    }
* PUT --> allow a user to "check off" a task item and update to complete!
* DELETE --> obviously...delete a task from the face of the earth
(all with ajax calls!)

## Have some fun with css :)
