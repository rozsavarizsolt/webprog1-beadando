
function saveStorage() {
    const value = document.getElementById('storageInput').value;
    localStorage.setItem('savedText', value);
    document.getElementById('storageResult').textContent = 'Mentve: ' + value;
  }

  function getLocation() {
    const output = document.getElementById('locationResult');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        output.textContent = `Szélesség: ${pos.coords.latitude}, Hosszúság: ${pos.coords.longitude}`;
      }, err => {
        output.textContent = 'Hiba: ' + err.message;
      });
    } else {
      output.textContent = 'A böngésző nem támogatja a Geolocation API-t.';
    }
  }
  

  window.addEventListener('load', () => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'lime';
    ctx.fillRect(10, 10, 150, 75);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(10, 10, 150, 75);
  });
  

  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    ev.target.appendChild(document.getElementById(data));
  }
  