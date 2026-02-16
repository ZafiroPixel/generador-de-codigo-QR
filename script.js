let qrcode;
let currentQRValue = "";
let currentLanguage = 'es'; // idioma por defecto

const TRACKING_LINK = 'https://www.effectivegatecpm.com/kau893xd?key=bb010d844348311e3ab8272d6c89898a';

// Objeto de traducciones
const translations = {
    es: {
        index_title: "Generador de Código QR Zafiro Pixel",
        about_title: "Acerca de Zafiro Pixel",
        subtitle: "Introduce un texto o URL para generar tu código.",
        input_placeholder: "Ej. https://zafiropixel.com",
        generate: "Generar Código",
        download: "Descargar QR",
        nav_home: "Inicio",
        nav_about: "Nosotros",
        footer_home: "Inicio",
        footer_about: "Nosotros",
        error_empty: "❌ Por favor, ingresa un texto o URL"
    },
    en: {
        index_title: "Zafiro Pixel QR Code Generator",
        about_title: "About Zafiro Pixel",
        subtitle: "Enter text or URL to generate your code.",
        input_placeholder: "e.g. https://zafiropixel.com",
        generate: "Generate Code",
        download: "Download QR",
        nav_home: "Home",
        nav_about: "About",
        footer_home: "Home",
        footer_about: "About",
        error_empty: "❌ Please enter text or URL"
    },
    zh: {
        index_title: "Zafiro Pixel 二维码生成器",
        about_title: "关于 Zafiro Pixel",
        subtitle: "输入文本或网址以生成二维码。",
        input_placeholder: "例如：https://zafiropixel.com",
        generate: "生成代码",
        download: "下载二维码",
        nav_home: "首页",
        nav_about: "关于",
        footer_home: "首页",
        footer_about: "关于",
        error_empty: "❌ 请输入文本或网址"
    },
    hi: {
        index_title: "Zafiro Pixel क्यूआर कोड जनरेटर",
        about_title: "Zafiro Pixel के बारे में",
        subtitle: "अपना कोड बनाने के लिए टेक्स्ट या URL दर्ज करें।",
        input_placeholder: "उदा. https://zafiropixel.com",
        generate: "कोड बनाएं",
        download: "क्यूआर डाउनलोड करें",
        nav_home: "होम",
        nav_about: "हमारे बारे में",
        footer_home: "होम",
        footer_about: "हमारे बारे में",
        error_empty: "❌ कृपया टेक्स्ट या URL दर्ज करें"
    }
};

// Función para aplicar el idioma
function updateLanguage(lang) {
    currentLanguage = lang;
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    // Placeholders
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
    // Guardar preferencia
    localStorage.setItem('preferred-language', lang);
}

// Función para obtener texto traducido (para mensajes dinámicos)
function t(key) {
    return translations[currentLanguage]?.[key] || translations.es[key] || key;
}

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
        errorDiv.textContent = t('error_empty');
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
    
    window.open(TRACKING_LINK, '_blank');

    const link = document.createElement("a");
    link.download = `qr-${currentQRValue.substring(0, 20)}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    initQR();

    // Recuperar idioma guardado o usar español
    const savedLang = localStorage.getItem('preferred-language') || 'es';
    const langSelect = document.getElementById("language-select");
    if (langSelect) {
        langSelect.value = savedLang;
        updateLanguage(savedLang);
        langSelect.addEventListener("change", (e) => updateLanguage(e.target.value));
    } else {
        updateLanguage('es');
    }

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
