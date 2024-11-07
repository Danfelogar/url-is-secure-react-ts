// content.js
chrome.storage.local.get(['someData'], (result) => {
  console.log('Datos recuperados:', result.someData);
});

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === 'SHOW_WARNING') {
//     // Cargar el contenido del archivo dialogWarning.html
//     fetch(chrome.runtime.getURL('dialogWarning.html'))
//       .then((response) => response.text())
//       .then((htmlContent) => {
//         // Inyectar el contenido HTML en el cuerpo de la página actual
//         document.body.innerHTML = htmlContent;

//         // Insertar el mensaje dinámico en el div con id="message"
//         const messageElement = document.getElementById('message');
//         const maliciousTotalElement = document.getElementById('maliciousTotal');
//         const suspiciousTotalElement =
//           document.getElementById('suspiciousTotal');
//         const harmlessTotalElement = document.getElementById('harmlessTotal');
//         const undetectedTotalElement =
//           document.getElementById('undetectedTotal');
//         if (messageElement) {
//           messageElement.innerHTML = message.message; // Inserta el mensaje dinámico
//         } else if (maliciousTotalElement) {
//           maliciousTotalElement.innerHTML = message.maliciousTotal;
//         } else if (suspiciousTotalElement) {
//           suspiciousTotalElement.innerHTML = message.suspiciousTotal;
//         } else if (harmlessTotalElement) {
//           harmlessTotalElement.innerHTML = message.harmlessTotal;
//         } else if (undetectedTotalElement) {
//           undetectedTotalElement.innerHTML = message.undetectedTotal;
//         }
//       })
//       .catch((error) => {
//         console.error('Error al cargar el contenido del archivo HTML:', error);
//       });
//   }
// });

// content.ts

// Escuchar el mensaje del background para mostrar el WarningDialog
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SHOW_WARNING') {
    // Inyectar el componente de advertencia en el DOM
    showWarningDialog(message.urlDescription);
  }
});

function showWarningDialog(urlDescription: string) {
  // Crear un div que cubra toda la pantalla
  const div = document.createElement('div');
  div.id = 'warning-dialog-root';
  div.style.position = 'fixed';
  div.style.top = '0';
  div.style.left = '0';
  div.style.width = '100vw';
  div.style.height = '100vh';
  div.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
  div.style.display = 'flex';
  div.style.justifyContent = 'center';
  div.style.alignItems = 'center';
  div.style.zIndex = '9999';
  div.style.color = 'white';
  div.style.fontSize = '20px';
  div.style.textAlign = 'center';

  // Agregar un mensaje simple con la URL
  div.innerHTML = `
    <div>
      <p><strong>¡Alerta!</strong> La URL es sospechosa:</p>
      <p><strong>${urlDescription}</strong></p>
    </div>
  `;

  // Reemplazar todo el contenido de la página con este div
  document.body.innerHTML = ''; // Elimina todo el contenido anterior
  document.body.appendChild(div); // Agrega el nuevo contenido
}
