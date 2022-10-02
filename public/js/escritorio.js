//*referencias
const lblEscritorio = document.querySelector("h1");
const lblTicket = document.querySelector("small");
const searchParams = new URLSearchParams(window.location.search);
const btnAtender = document.querySelector("button");
const divAlerta = document.querySelector(".alert");
const lblPendientes = document.querySelector("#lblPendientes");

if (!searchParams.has("escritorio")) {
  /* Redirecting the user to the index.html page if the user does not have a desk number. */
  window.location = "index.html";
  throw new Error("El escritorio es obligatorio");
}

const escritorio = searchParams.get("escritorio");
lblEscritorio.innerText = escritorio;

divAlerta.style.display = "none";

const socket = io();

socket.on("connect", () => {
  // console.log('Conectado');

  btnAtender.disabled = false;
});

socket.on("disconnect", () => {
  // console.log('Desconectado del servidor');

  btnAtender.disabled = true;
});

socket.on("ultimo-ticket", (ultimo) => {
  //lblNuevoTicket.innerText = "Ultimo ticket " + ultimo;
});

socket.on("enviar-mensaje", (payload) => {
  console.log(payload);
});

btnAtender.addEventListener("click", () => {
  socket.emit("atender-ticket", { escritorio }, ({ ok, ticket }) => {
    if (!ok) {
      lblTicket.innerText = "Nadie";
      return (divAlerta.style.display = "");
    }

    lblTicket.innerText = "Ticket " + ticket.numero;
  });
});

//* Escuchar tickets pendientes
socket.on("tickets-pendientes", (payload) => {
  lblPendientes.innerText = payload;
});

/* socket.on("tickets-pendientes-actualiza", (payload) => {
  lblPendientes.innerText = payload;
}); */
