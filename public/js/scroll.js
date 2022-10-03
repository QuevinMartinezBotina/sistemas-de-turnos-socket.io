window.sr = ScrollReveal();

const animar = (clase, duracion, origen, distancia) => {
  sr.reveal(clase, {
    duration: duracion,

    origin: origen,

    distance: distancia,
  });
};

animar(".animation-bottom", 1000, "bottom", "-100px");

animar(".animation-top", 2000, "top", "-100px");

animar(".animation-right", 2000, "right", "-100px");

animar(".animation-left", 2000, "left", "-100px");

animar(".menu", 3000, "left", "-100px");
