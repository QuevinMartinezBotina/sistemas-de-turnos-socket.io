//*Referencias HTML
const lblTicket1 = document.querySelector("#lblTicket1");
const lblEscritorio1 = document.querySelector("#lblEscritorio1");
const lblTicket2 = document.querySelector("#lblTicket2");
const lblEscritorio2 = document.querySelector("#lblEscritorio2");
const lblTicket3 = document.querySelector("#lblTicket3");
const lblEscritorio3 = document.querySelector("#lblEscritorio3");
const lblTicket4 = document.querySelector("#lblTicket4");
const lblEscritorio4 = document.querySelector("#lblEscritorio4");

const socket = io();

socket.on("estado-actual", (payload) => {
  const [ticket1, ticket2, ticket3, ticket4] = payload;

  const audio = new Audio("./audio/new-ticket.mp3");
  audio.play();

  console.log(payload);

  lblTicket1.innerHTML = "ticket " + ticket1.numero;
  lblEscritorio1.innerHTML = ticket1.escritorio;

  lblTicket2.innerHTML = "ticket " + ticket2.numero;
  lblEscritorio2.innerHTML = ticket2.escritorio;

  lblTicket3.innerHTML = "ticket " + ticket3.numero;
  lblEscritorio3.innerHTML = ticket3.escritorio;

  lblTicket4.innerHTML = "ticket " + ticket4.numero;
  lblEscritorio4.innerHTML = ticket4.escritorio;
});


