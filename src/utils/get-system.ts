import os from "os";

export const getSystem = () => {
    const systemPlatform = os.platform(); // "win32", "linux", "darwin" (macOS)

    let executablePath = "";

    if (systemPlatform === "linux") {
        return executablePath = "/usr/bin/google-chrome";  // Caminho correto para o Linux
    } else if (systemPlatform === "win32") {
        return executablePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";  // Caminho no Windows
    } else {
        throw new Error("Sistema operacional não suportado");
    }
}