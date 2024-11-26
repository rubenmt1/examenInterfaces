class Controlador {
    constructor(modelo, vista, laberinto) {
        this.modelo = modelo;
        this.vista = vista;
        this.laberinto = laberinto;

        // Configura el reconocimiento de gestos
        this.vista.onCaptura((gesto) => this.gestionarMovimiento(gesto));

        // Simulación de teclas para pruebas
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowUp":
                    this.laberinto.moverJugador("arriba");
                    break;
                case "ArrowDown":
                    this.laberinto.moverJugador("abajo");
                    break;
                case "ArrowLeft":
                    this.laberinto.moverJugador("izquierda");
                    break;
                case "ArrowRight":
                    this.laberinto.moverJugador("derecha");
                    break;
            }
        });
    }

    // Gestiona el movimiento en función del gesto
    gestionarMovimiento(gesto) {
        switch (gesto) {
            case "Uno":
                this.laberinto.moverJugador("arriba");
                break;
            case "Dos":
                this.laberinto.moverJugador("abajo");
                break;
            case "Tres":
                this.laberinto.moverJugador("izquierda");
                break;
            case "Cuatro":
                this.laberinto.moverJugador("derecha");
                break;
            default:
                console.log("Gestos no reconocidos.");
                break;
        }
    }
}

// Inicializa el controlador
document.addEventListener("DOMContentLoaded", () => {
    const laberinto = new Laberinto(); // Inicializa el laberinto
    const vista = new Vista(); // Inicializa la vista
    const modelo = new Modelo(laberinto); // Carga el modelo
    new Controlador(modelo, vista, laberinto); // Pasa todo al controlador
});
