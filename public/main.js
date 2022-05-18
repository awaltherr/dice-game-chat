const socket = io();
const messageForm = document.getElementById('send-container');
const messageContainer = document.getElementById('messages')
const inputMessage = document.getElementById('inputMessage');
const rollDice = document.getElementById('roll');

const userName = prompt('Vänligen skriv ditt användarnamn.')
showMessages('Välkommen! Du är nu ansluten till chatten!')
socket.emit('new-connection', userName)

socket.on('message', data => {
    showMessages(`${data.userName}: ${data.message}`);
});


socket.on('connected', userName => {
    showMessages(`${userName} har anslutit till chatten`);
});

socket.on('disconnected', userName => {
    showMessages(`${userName} har lämnat chatten`);
});

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = inputMessage.value;
    showMessages(`Du: ${message}`)
    socket.emit('send-message', message)
    inputMessage.value = '';
})

rollDice.addEventListener('click', e => {
    e.preventDefault();
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    showMessages(`Du: Du kastade tärningen och fick värdet: ${randomNumber}`)
    socket.emit('send-message', randomNumber);
})

function showMessages(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement);
}