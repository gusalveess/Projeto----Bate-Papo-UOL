// variáveis globais
let nick = document.querySelector(".nickname")
let chat = document.querySelector(".batepapo")

function enter() {
    nick.classList.toggle("hidden")
    chat.classList.remove("hidden")
}