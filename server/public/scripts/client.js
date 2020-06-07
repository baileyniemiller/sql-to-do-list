$(document).ready(readyNow);

function readyNow() {
    console.log('JQ is ready!');
    $('.addTask').on('click', addTask);
    $('.listTable').on('click', '.complete', completeTask);
    $('.listTable').on('click', '.delete', deleteTask);
    getListData();
}

// GET
function getListData() {
    $.ajax({
        type: 'GET',
        url: '/list'
    }).then(function (response) {
        $('#listTableBody').empty();
        $('.taskIn').val('');
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


// POST
function addTask() {
    const taskTitle = $('.taskIn').val();
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


// PUT
function completeTask(event) {
    const element = event.target;
    let taskId = $(element).data("id");
    let taskStatus = $(element).data("status");
    console.log($(element).data());
    taskStatus = "Complete!";
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


//DELETE
function deleteTask() {
    const element = event.target;
    let taskId = $(element).data("id"); // grabbing the id off the specific button
    $.ajax({
        type: 'DELETE',
        url: "/list/" + taskId,
    }).then((result) => {
        $(element).parent().parent().remove();
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

// $('#listTableBody').append(`
//             <tr>
//                 <td>${list.task}</td>
//                 <td>${list.status}</td>
//                 <td><button class="complete" id="taskComplete" data-id="${list.id}" data-status="${list.status}"></button></td>
//                 <td><button class="delete" data-id="${list.id}"></button></td>
//             </tr>`
// );