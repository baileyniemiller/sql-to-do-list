$(document).ready(readyNow);

function readyNow() {
    console.log('JQ is ready!');
    $('.addTask').on('click', addTask);
    $('.listTable').on('click', '.complete', completeTask);
    $('.listTable').on('click', '.delete', deleteTask);
    getListData();
}

// GET begin getListData --> grabbing the data from the database to append to a table
function getListData() {
    $.ajax({
        type: 'GET',
        url: '/list'
    }).then(function (response) {
        // empty table and input
        $('#listTableBody').empty();
        $('.taskIn').val('');
        // background color back to yellow
        $('body').css('background-color', 'lightgoldenrodyellow');
        // looping through the list and adding each item to a table
        for (let i=0; i<response.length; i++) {
            let list = response[i];
            $('#listTableBody').append(`
            <tr>
                <td>${list.task}</td>
                <td>${list.status}</td>
                <td><button  class="complete" id="taskComplete" data-id="${list.id}" data-status="${list.status}"></button></td>
                <td><button class="delete" data-id="${list.id}"></button></td>
            </tr>`
            );
        }
    }).catch(function(error) { 
        console.log('Error in GET', error);
    });
}
// end GET


// POST begin addTask --> allow a user to add a new task
function addTask() {
    // declare new task as the input value
    const taskTitle = $('.taskIn').val();
    // create object to send
    const newTask = {
        task: taskTitle,
        status: "Incomplete"
    }
    console.log(newTask);
    $.ajax({
        method: 'POST',
        url: '/list',
        data: newTask
    }).then(function (response) {
        console.log('Yay, task added!');
        getListData();
    }).catch(function (response) {
        console.log('Sorry, error in adding task.');
    });
}
// end POST


// PUT begin completeTask --> allow the task to be updated to complete
function completeTask(event) {
    // declare the target
    const element = event.target;
    let taskId = $(element).data("id");
    let taskStatus = $(element).data("status");
    console.log($(element).data());
    taskStatus = "Complete!"; // when the element is clicked, change the status to complete
    $('body').css('background-color', '#a0e06c'); // also change the background to green
    $.ajax({
        type: 'PUT',
        url: "/list/" + taskId + "/" + taskStatus //complete or incomplete
    }).then((result) => {
        getListData();
        console.log('Woohoo, task complete!');
        alert('Way to go!');
    }).catch((error) => {
        console.log('Error completing task.');
    });
}
// end PUT


//DELETE begin deleteTask --> when the right button is clicked,
// that item should be deleted
function deleteTask() {
    const element = event.target;
    let taskId = $(element).data("id"); // grabbing the id off the specific button
    $.ajax({
        type: 'DELETE',
        url: "/list/" + taskId,
    }).then((result) => {
        $(element).parent().parent().remove(); // deleting the whole row
        console.log('Task removed.');
    }).catch((error) => {
        console.log('Error removing task.');
    });
}
// end DELETE


// appending to cards...might attempt later
// $('.cardRow').append(taskCard)
// $('.cardTitle').append(`${list.task}`);
// $('.cardText').append(`${list.status}`);
// $('.cardBody').append(`<button class="complete">Complete Task</button>`);
// $('.cardBody').append(`<button class="delete">Remove Task</button>`);