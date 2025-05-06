//sets up client side socket (the one the server is interacting with)
var socket = io();
//gets the messages from the form
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', (event) => {
    //prevents the form from submitting when the page is refreshed
    event.preventDefault();
    //if the form is submitted and the input is not empty
    if(input.value) {
        socket.emit('chat message', input.value);
        input.value = "";
    }
})
//gets the messages from the other socket and adds it to a list element
socket.on('chat message', (message) => {
    var item = document.createElement('li');
    item.textContent = message;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})