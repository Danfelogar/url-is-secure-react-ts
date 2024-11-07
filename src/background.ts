// background.js
chrome.storage.local.set({ someData: 'value' }, () => {
  console.log('Datos guardados en storage');
});

chrome.webRequest.onBeforeRequest.addListener(
  async function (details) {
    const url = details.url;
    const cleanUrl = url.replace(/^https?:\/\//, ''); // Elimina el "http://"

    try {
      const data = await urlScanApi(cleanUrl);
      const detection = data.detection;
      const shouldBlock =
        detection.malicious !== 0 ||
        detection.suspicious !== 0 ||
        detection.undetected !== 0 ||
        detection.harmless !== 0 ||
        detection.timeout !== 0;

      if (shouldBlock) {
        // Bloquear la URL
        console.log(`Bloqueando la URL: ${url}`);

        // Enviar un mensaje al content script para mostrar un bloque de pantalla con el mensaje "Hello Danfelogar"
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const tabId = tabs[0]?.id;
          if (tabId !== undefined) {
            chrome.tabs.sendMessage(tabId, {
              type: 'SHOW_WARNING',
              url: url,
              urlDescription: url,
              maliciousTotal: data.detection.malicious,
              suspiciousTotal: data.detection.suspicious,
              harmlessTotal: data.detection.harmless,
              undetectedTotal: data.detection.undetected,
              message: '¡Alerta! La URL está bloqueada o es sospechosa.',
            });
          }
        });

        // Bloquear la solicitud
        return { cancel: true };
      }
    } catch (error) {
      console.error('Error en la API:', error);
    }
  },
  { urls: ['http://*/*', 'https://*/*'] },
  ['blocking']
);

const urlScanApi = async (url: string) => {
  const response = await fetch('http://localhost:8000/api/scan-url/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ original_url: url }),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
