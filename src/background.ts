// background.js
chrome.storage.local.set({ someData: 'value' }, () => {
  console.log('Datos guardados en storage');
});

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

const blockUrl = async (url: string) => {
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
    console.log({ shouldBlock });
    if (shouldBlock) {
      // Crear una regla de bloqueo
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
          {
            id: 1,
            priority: 1,
            action: {
              type: 'block',
            },
            condition: {
              urlFilter: url,
              resourceTypes: [
                'main_frame' as chrome.declarativeNetRequest.ResourceType,
              ],
            },
          },
        ],
        removeRuleIds: [1], // Elimina las reglas previas, si es necesario
      });

      // Enviar un mensaje al content script para mostrar un bloque de pantalla con el mensaje "Hello Danfelogar"
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0]?.id;
        console.log({ tabId });
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
    }
  } catch (error) {
    console.error('Error en la API:', error);
  }
};

// Reemplazamos el onBeforeRequest por la lógica de declarativeNetRequest
chrome.webNavigation.onBeforeNavigate.addListener(
  async (details) => {
    await blockUrl(details.url); // Evaluar y bloquear si es necesario
  },
  { url: [{ hostContains: '' }] }
);
