let qrcode;
let currentQRValue = "";

const TRACKING_LINK = 'https://www.effectivegatecpm.com/kau893xd?key=bb010d844348311e3ab8272d6c89898a';

function initQR() {
    qrcode = new QRCode(document.getElementById("qrcode"), {
        width: 200,
        height: 200
    });
    generateQR("Zafiro Pixel");
}

function generateQR(text) {
    const input = document.getElementById("qr-input");
    const userInput = text || input.value.trim();
    const errorDiv = document.getElementById("error-message");
    const downloadBtn = document.getElementById("download-btn");

    // Abrir enlace de tracking
    window.open(TRACKING_LINK, '_blank');

    if (userInput === "") {
        errorDiv.textContent = "❌ Por favor, ingresa un texto o URL";
        errorDiv.classList.add('show');
        downloadBtn.style.display = "none";
        return;
    }

    errorDiv.classList.remove('show');
    qrcode.clear();
    qrcode.makeCode(userInput);
    currentQRValue = userInput;
    downloadBtn.style.display = "block";
}

function downloadQR() {
    const canvas = document.querySelector("#qrcode canvas");
    if (!canvas) {
        alert("No hay ningún QR generado");
        return;
    }
    
    // Abrir enlace de tracking
    window.open(TRACKING_LINK, '_blank');

    const link = document.createElement("a");
    link.download = `qr-${currentQRValue.substring(0, 20)}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    initQR();

    const input = document.getElementById("qr-input");
    const generateBtn = document.getElementById("generate-btn");
    const downloadBtn = document.getElementById("download-btn");

    generateBtn.addEventListener("click", () => generateQR());
    downloadBtn.addEventListener("click", downloadQR);

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            generateQR();
        }
    });
});