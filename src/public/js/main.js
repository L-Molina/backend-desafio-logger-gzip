const socket = io.connect();

// renderProducts
function renderProducts() {
  fetch('http://localhost:8080/lista-productos')
  .then(response => response.json())
  .then(data => {    
    const html = data.map((el, index) => {   
        return(
          `<tr>
            <td>${el.title}</td>
            <td>${el.price}</td>
            <td><img src="${el.thumbnail}" class="productImage"></td>                  
          </tr>`
        )
    }).join(" ");
    document.getElementById('tbodyList').innerHTML = html;
  });  
}

// renderMessages
function renderMessages(data) {
  const html = data.map((el, index) => {
      return(`<div>
          <p class="emailMensaje">${el.email}</p>
          <p class="fechaMensaje">[${el.fecha}]:</p>
          <p class="mensajeMensaje">${el.mensaje}</p> </div>`)
  }).join(" ");
  document.getElementById('mensajes').innerHTML = html;
}

// addMessage
function addMessage(e) {
  const mensaje = {
      email: document.getElementById('mail').value,
      fecha: `${(new Date).toLocaleDateString()} - ${(new Date).toLocaleTimeString()}`,      
      mensaje: document.getElementById('mensaje').value
  };    
  socket.emit('new-message', mensaje);
  return false;
}

socket.on('productos', function() { renderProducts(); });
socket.on('messages', function(data) { renderMessages(data); });