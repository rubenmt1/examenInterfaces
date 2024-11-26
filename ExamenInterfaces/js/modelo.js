class Modelo {
    constructor(laberinto) {
        this.laberinto = laberinto; // Referencia al laberinto para mover al jugador
        this.model = null; // Modelo de Teachable Machine
        this.webcamElement = document.createElement("video"); // Elemento de la webcam
        this.prediccionActual = null; // Última predicción realizada

        this.iniciarWebcam();
        this.cargarModelo();
    }

    async cargarModelo() {
        try {
            const modelURL = "resources/model/model.json";
            const metadataURL = "resources/model/metadata.json";
            // Cargar el modelo de Teachable Machine usando `tmImage`
            this.model = await tmImage.load(modelURL, metadataURL);
            console.log("Modelo cargado correctamente.");
            this.iniciarPrediccion(); // Inicia las predicciones una vez cargado
        } catch (error) {
            console.error("Error al cargar el modelo:", error);
        }
    }

    iniciarWebcam() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                this.webcamElement.srcObject = stream;
                this.webcamElement.play();

                // Configurar estilo para mostrar la webcam encima del laberinto
                this.webcamElement.style.position = "absolute";
                this.webcamElement.style.top = "20px";
                this.webcamElement.style.left = "50%";
                this.webcamElement.style.transform = "translateX(-50%)";
                this.webcamElement.style.zIndex = "10";
            })
            .catch((error) => {
                console.error("Error al acceder a la webcam:", error);
            });
    }

    iniciarPrediccion() {
        setInterval(async () => {
            if (!this.model) return;

            const predictions = await this.model.predict(this.webcamElement);
            const mejorPrediccion = predictions.reduce((a, b) =>
                a.probability > b.probability ? a : b
            );

            if (mejorPrediccion.probability > 0.8 && this.prediccionActual !== mejorPrediccion.className) {
                this.prediccionActual = mejorPrediccion.className;
                console.log(`Predicción: ${this.prediccionActual}`);
                this.moverPorPrediccion(this.prediccionActual);
            }
        }, 1000); // Predice cada segundo
    }

    moverPorPrediccion(prediccion) {
        switch (prediccion) {
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

// Integración principal
document.addEventListener("DOMContentLoaded", () => {
    const laberinto = new Laberinto(); // Asegúrate de inicializar la instancia de Laberinto aquí
    const modelo = new Modelo(laberinto); // Pasa la instancia de laberinto al modelo
});
