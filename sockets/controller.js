const ticketControl = require("../models/ticket-control");

const ticketsControl = new ticketControl();

const socketController = (socket) => {
  //console.log("Cliente conectado", socket.id);

  socket.emit("ultimo-ticket", ticketsControl.ultimo);
  socket.emit("estado-actual", ticketsControl.ultimos4);

  //TODO: Emitir tikets pendientes
  socket.emit("tickets-pendientes", ticketsControl.tickets.length);

  socket.on("disconnect", () => {
    //Fconsole.log("Cliente desconectado");
  });

  socket.on("siguiente-ticket", (payload, callback) => {
    const siguiente = ticketsControl.siguiente();
    callback(siguiente);
    socket.broadcast.emit("tickets-pendientes", ticketsControl.tickets.length);

    //socket.broadcast.emit("siguiente-ticket", siguiente);
  });

  socket.on("atender-ticket", ({ escritorio }, callback) => {
    if (!escritorio) {
      return callback({
        ok: false,
        msg: "El escritorio es obligatorio",
      });
    }

    const ticket = ticketsControl.atenderTicket(escritorio);

    //TODO: Notificar cambios en los ultimos 4
    socket.broadcast.emit("estado-actual", ticketsControl.ultimos4);

    //TODO: Emitir tikets pendientes
    socket.emit("tickets-pendientes", ticketsControl.tickets.length);
    socket.broadcast.emit("tickets-pendientes", ticketsControl.tickets.length);

    if (!ticket) {
      return callback({
        ok: false,
        msg: "Ya no hay tickets pendientes",
      });
    } else {
      callback({
        ok: true,
        ticket,
      });
    }
  });
};

module.exports = {
  socketController,
};
