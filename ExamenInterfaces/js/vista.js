class Vista {
    constructor() {
        this.webcamElement = document.getElementById("webcam");
        this.botonCapturar = document.getElementById("capturar");

        this.iniciarWebcam();

        // Configura el botón para capturar una imagen
        this.botonCapturar.addEventListener("click", () => this.capturarImagen());
    }

    // Configura la webcam
    iniciarWebcam() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                this.webcamElement.srcObject = stream;
            })
            .catch((error) => {
                console.error("Error al acceder a la webcam:", error);
            });
    }

    // Captura una imagen para el modelo
    capturarImagen() {
        const canvas = document.createElement("canvas");
        canvas.width = this.webcamElement.videoWidth;
        canvas.height = this.webcamElement.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(this.webcamElement, 0, 0, canvas.width, canvas.height);

        // Llama al callback para procesar la imagen (será manejado en el controlador)
        this.onCapturaCallback(canvas);
    }

    // Método para establecer el callback de captura de imágenes
    onCaptura(callback) {
        this.onCapturaCallback = callback;
    }
}
