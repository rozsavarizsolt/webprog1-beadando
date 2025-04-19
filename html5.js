// Web Storage
function saveStorage() {
  const value = document.getElementById("storageInput").value;
  localStorage.setItem("demo", value);
  document.getElementById("storageResult").textContent = "Mentett érték: " + localStorage.getItem("demo");
}

// Geolocation
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      document.getElementById("locationResult").textContent = `Szélesség: ${latitude}, Hosszúság: ${longitude}`;
    }, () => {
      document.getElementById("locationResult").textContent = "Helymeghatározás sikertelen.";
    });
  } else {
    document.getElementById("locationResult").textContent = "A böngésző nem támogatja a Geolocation API-t.";
  }
}

// Canvas
window.addEventListener("load", () => {
  const canvas = document.getElementById("myCanvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(10, 10, 100, 50);
  }
});

// Drag and Drop
function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const dragged = document.getElementById(data);
  ev.target.appendChild(dragged);
}

// Web Worker
let worker;
function startWorker() {
  if (typeof(Worker) !== "undefined") {
    if (!worker) {
      worker = new Worker(URL.createObjectURL(new Blob([`
        self.onmessage = function(e) {
          let result = 0;
          for (let i = 0; i <= 1e7; i++) result += i;
          postMessage("Számítás kész: " + result);
        }
      `])));
      worker.onmessage = function(e) {
        document.getElementById("workerResult").textContent = e.data;
      };
    }
    worker.postMessage("start");
  } else {
    document.getElementById("workerResult").textContent = "A böngésző nem támogatja a Workert.";
  }
}

// Server-Sent Events
function startSSE() {
  if (!!window.EventSource) {
    const source = new EventSource("https://stream.wikimedia.org/v2/stream/recentchange"); // nyilvános SSE
    source.onmessage = function(event) {
      const data = JSON.parse(event.data);
      const div = document.getElementById("sseOutput");
      div.innerHTML = `<p><strong>${data.user}</strong>: ${data.title}</p>` + div.innerHTML;
    };
  } else {
    document.getElementById("sseOutput").textContent = "A böngésző nem támogatja az SSE-t.";
  }
}
