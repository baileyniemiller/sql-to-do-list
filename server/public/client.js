$(document).ready(readyNow);

function readyNow() {
    console.log('JQ is ready!');
    getListData();
}

// GET
function getListData() {
    $.ajax({
        type: 'GET',
        url: '/list'
    }).then(function (response) {
        for (let i=0; i<response.length; i++) {
            let list = response[i];
            $('#listTableBody').append(`
                <tr>
                    <td>${list.task}</td>
                    <td>${list.status}</td>
                    <td><button class="complete" data-id="${list.id}"> Complete Task </button></td>
                    <td><button class="delete" data-id="${list.id}"> Remove Task </button></td>
                </tr>`
            );
        }
    }).catch(function(error) {
        console.log('Error in GET', error);
    });
}
// end GET


// // POST
// function addTask() {
//     const taskTitle = $('#addTast').val();
//     const currentStatus = $('#addStatus').val();
//     const newTask = {
//         task: taskTitle,
//         status: currentStatus
//     }
//     console.log(newTask);
//     $.ajax({
//         method: 'POST',
//         url: '/list',
//         data: newTask
//     }).then(function (response) {
//         console.log('Yay, task added!');
//         getListData();
//     }).catch(function (response) {
//         console.log('Sorry, error in adding task.');
//     });
// }
// // end POST