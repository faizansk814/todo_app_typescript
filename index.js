"use strict";
// const formel = document.querySelector('form') as HTMLFormElement;
const idinp = document.getElementById('inp');
const btnel = document.getElementById('btn');
const boxel = document.getElementById('box');
const edid = document.getElementById('edid');
const taskinp = document.getElementById('edtask');
const editbtn = document.getElementById('btnedit');
btnel.addEventListener('click', () => {
    console.log(idinp.value);
    let obj = {
        task: idinp.value,
    };
    fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })
        .then((res) => {
        return res.json();
    })
        .then((data) => {
        console.log(data);
        fetchandRender();
    })
        .catch((err) => {
        console.log(err);
    });
});
editbtn.addEventListener('click', () => {
    let obj = {
        id: parseInt(edid.value),
        task: taskinp.value
    };
    fetch(`http://localhost:3000/data/${edid.value}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
        .then((res) => {
        return res.json();
    })
        .then((data) => {
        console.log(data);
        fetchandRender();
    })
        .catch((err) => {
        console.log(err);
    });
});
fetchandRender();
function fetchandRender() {
    fetch("http://localhost:3000/data")
        .then((res) => {
        return res.json();
    })
        .then((data) => {
        console.log(data);
        Display(data);
        Delete();
        Update();
    })
        .catch((err) => {
        console.log(err);
    });
}
function Display(data) {
    console.log(data);
    boxel.innerHTML += `
    ${data.map((el) => (`
        <div class="w-full space-y-4">
            <div class="bg-gray-200 p-4 rounded-md flex items-center justify-between">
                <div class="w-1/12">ID:${el.id}</div>
                <div class="w-3/12">${el.task}</div>
                <div class="w-2/12">
                    <button class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 edit" data-id='${el.id}'>Edit</button>
                </div>
                <div class="w-2/12">
                    <button class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 delete" data-id='${el.id}'>Delete</button>
                </div>
                <div class="w-2/12">
                    <button class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 complete" data-id='${el.id}'>Complete</button>
                </div>
            </div>
        </div><br> 
    `)).join("")}
  `;
}
function Delete() {
    let alldeletebuttons = document.querySelectorAll(".delete");
    for (let btn of alldeletebuttons) {
        btn.addEventListener('click', (e) => {
            let id = e.target.dataset.id;
            fetch(`http://localhost:3000/data/${id}`, {
                method: "DELETE"
            })
                .then((res) => {
                return res.json();
            })
                .then((data) => {
                console.log(data);
                fetchandRender();
            })
                .catch((err) => {
                console.log(err);
            });
        });
    }
}
function Update() {
    let alldeletebuttons = document.querySelectorAll(".edit");
    for (let btn of alldeletebuttons) {
        btn.addEventListener('click', (e) => {
            let id = e.target.dataset.id;
            fetch(`http://localhost:3000/data/${id}`)
                .then((res) => {
                return res.json();
            })
                .then((data) => {
                console.log(data);
                edid.value = data.id;
                taskinp.value = data.task;
            })
                .catch((err) => {
                console.log(err);
            });
        });
    }
}
