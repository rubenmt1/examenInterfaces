class Laberinto {
    constructor() {
        this.posicionJugador = "B"; // Posición inicial del jugador
        this.celdas = {
            A: { abajo: "D", derecha: "B" },
            B: { izquierda: "A", derecha: "C", abajo: "E" },
            C: { izquierda: "B", abajo: "F" },
            D: { arriba: "A", abajo: "G", derecha: "E" },
            E: { izquierda: "D", derecha: "F", arriba: "B", abajo: "H" },
            F: { izquierda: "E", arriba: "C", abajo: "I" },
            G: { arriba: "D", derecha: "H" },
            H: { izquierda: "G", arriba: "E", derecha: "I" },
            I: { izquierda: "H", arriba: "F" }
        };
        this.celdaTrampa = "H"; // Posición de la trampa
        this.celdaSalida = "C"; // Posición de la salida

        this.inicializarJugador();
    }

    inicializarJugador() {
        const jugador = document.querySelector(".jugador");
        const celdaInicial = document.getElementById(`celda${this.posicionJugador}`);
        celdaInicial.appendChild(jugador); // Coloca al jugador en la celda inicial
    }

    moverJugador(direccion) {
        const celdaActual = this.celdas[this.posicionJugador];
        const nuevaPosicion = celdaActual[direccion];

        if (!nuevaPosicion) {
            console.log("Movimiento no válido");
            return;
        }

        // Actualiza la posición del jugador
        this.posicionJugador = nuevaPosicion;
        const jugador = document.querySelector(".jugador");
        const nuevaCelda = document.getElementById(`celda${nuevaPosicion}`);
        nuevaCelda.appendChild(jugador);

        // Verifica si cae en una trampa o llega a la salida
        this.verificarEstado();
    }

    verificarEstado() {
        if (this.posicionJugador === this.celdaTrampa) {
            alert("¡Has caído en una trampa! Fin del juego.");
            this.reiniciarJuego();
        } else if (this.posicionJugador === this.celdaSalida) {
            alert("¡Has llegado a la salida! ¡Felicidades!");
            this.reiniciarJuego();
        }
    }

    reiniciarJuego() {
        this.posicionJugador = "B";
        this.inicializarJugador();
    }
}

// Evento principal
document.addEventListener("DOMContentLoaded", () => {
    const laberinto = new Laberinto();

    // Simulación de controles de teclado para pruebas
    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":
                laberinto.moverJugador("arriba");
                break;
            case "ArrowDown":
                laberinto.moverJugador("abajo");
                break;
            case "ArrowLeft":
                laberinto.moverJugador("izquierda");
                break;
            case "ArrowRight":
                laberinto.moverJugador("derecha");
                break;
        }
    });
});
