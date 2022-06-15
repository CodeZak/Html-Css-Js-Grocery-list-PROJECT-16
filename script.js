const input = document.querySelector("input[type='text']");
const submit = document.querySelector("input.submit");
const edit = document.querySelector(".edit");
const clearItems = document.querySelector(".clear_items");
const alert_messages = document.querySelectorAll("span");
function show_message(message) {
    alert_messages.forEach(function (msg) {
        if (msg.classList.contains(`${message}`)) {
            msg.classList.add("show_message");
            setTimeout(remove_msg, 1000);
            function remove_msg() {
                msg.classList.remove("show_message");
            }
        }
    });
}

function remove_clear() {
    setTimeout(removeClear, 500);
    function removeClear() {
        clearItems.classList.remove("show_clear");
    }
}

function submit_edit(x, y) {
    if (x === "add" && y === "remove") {
        submit.classList.add("show_submit");
        edit.classList.remove("show_edit");
    } else if (x === "remove" && y === "add") {
        submit.classList.remove("show_submit");
        edit.classList.add("show_edit");
    }
}

function clear_items_f() {
    if (items.length !== 0) {
        clearItems.classList.add("show_clear");
        clearItems.addEventListener("click", function () {
            items = [];
            itemsContent([]);
            submit_edit("add", "remove");
            input.value = "";
            remove_clear();
            show_message("empty_list");
            window.localStorage.clear();
        });
    }
}
var x = "";
const section = document.querySelector("section");
// default listing
let items = [];
for (let index = 0; index < window.localStorage.length; index++) {
    items.push(window.localStorage.getItem(`${index}`));
    clear_items_f();
}
itemsContent(items);
// Add content to section [Function]
function itemsContent(array) {
    window.localStorage.clear();
    console.log("list : " + array);
    let content = array
        .map(function (box, index) {
            contentHtml = ` <div class="box">
            <span id="${index}"> ${box} </span>
            <i class="fa-solid fa-pen-to-square edit_icon"></i>
            <i class="fa-solid fa-trash delete"></i>
        </div>`;
            window.localStorage.setItem(`${index}`, box);
            return contentHtml;
        })
        .join("");
    section.innerHTML = content;
}
// filling in the items list when submit button is clicked and add it to section
submit.addEventListener("click", function () {
    if (input.value === "") {
        show_message("enter_value");
    } else {
        items.push(input.value);
        itemsContent(items);
        input.value = "";
        show_message("item_added");
        clear_items_f();
    }
});

// edit and remove elements from items list
section.addEventListener("click", function (e) {
    /// Edit items - Part ONE
    if (e.target.classList[2] === "edit_icon") {
        submit_edit("remove", "add");
        let a = items.filter(function (item, index) {
            return e.target.parentElement.children[0].innerText === item;
        });
        input.value = a[0];

        // Delete items
    } else if (e.target.classList[2] === "delete") {
        console.log("delete clicked");
        console.log(e.target.parentElement.children[0].innerText);
        items = items.filter(function (item, index) {
            if (
                parseInt(index) ===
                parseInt(e.target.parentElement.children[0].getAttribute("id"))
            ) {
                window.localStorage.removeItem(index);
            }

            return !(
                parseInt(index) ===
                parseInt(e.target.parentElement.children[0].getAttribute("id"))
            );
        });

        itemsContent(items);
        submit_edit("add", "remove");
        input.value = "";
        if (items.length === 0) {
            remove_clear();
            window.localStorage.clear();
        }
        show_message("item_removed");
    }

    x = e.target.parentElement.children[0].getAttribute("id");
});
// Edit items - Part TWO
edit.addEventListener("click", function () {
    submit_edit("add", "remove");
    items = items.map(function (item, index) {
        if (parseInt(index) === parseInt(x)) {
            return input.value;
        } else {
            return item;
        }
    });
    itemsContent(items);
    input.value = "";
    show_message("value_changed");
});
