const API_URL = "https://retoolapi.dev/CSZS98rz315/adatok";

function loadData() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("dataContainer");
      container.innerHTML = data.map(d => `
        <div>ID: ${d.id}, Név: ${d.name}, Magasság: ${d.height}, Súly: ${d.weight}</div>
      `).join("");

      const heights = data.map(d => Number(d.height)).filter(n => !isNaN(n));
      const sum = heights.reduce((a, b) => a + b, 0);
      const avg = (sum / heights.length).toFixed(2);
      const max = Math.max(...heights);
      document.getElementById("stats").innerHTML = `
        <p>Összeg: ${sum}</p>
        <p>Átlag: ${avg}</p>
        <p>Legnagyobb: ${max}</p>
      `;
    });
}

function validate(name, height, weight) {
  if (!name || !height || !weight) return "Minden mező kötelező!";
  if (name.length > 30 || height.length > 30 || weight.length > 30) return "Max. 30 karakter!";
  return null;
}

document.getElementById("createForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("createName").value.trim();
  const height = document.getElementById("createHeight").value.trim();
  const weight = document.getElementById("createWeight").value.trim();
  const error = validate(name, height, weight);
  if (error) return document.getElementById("createResult").textContent = error;

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, height, weight })
  }).then(res => res.ok ? "Sikeres létrehozás!" : "Hiba történt!")
    .then(msg => document.getElementById("createResult").textContent = msg);
});

function getDataForId() {
  const id = document.getElementById("updateId").value.trim();
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("updateName").value = data.name || "";
      document.getElementById("updateHeight").value = data.height || "";
      document.getElementById("updateWeight").value = data.weight || "";
    });
}

document.getElementById("updateForm").addEventListener("submit", e => {
  e.preventDefault();
  const id = document.getElementById("updateId").value.trim();
  const name = document.getElementById("updateName").value.trim();
  const height = document.getElementById("updateHeight").value.trim();
  const weight = document.getElementById("updateWeight").value.trim();
  const error = validate(name, height, weight);
  if (error) return document.getElementById("updateResult").textContent = error;

  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, height, weight })
  }).then(res => res.ok ? "Sikeres frissítés!" : "Hiba frissítéskor!")
    .then(msg => document.getElementById("updateResult").textContent = msg);
});

function deleteData() {
  const id = document.getElementById("deleteId").value.trim();
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(res => res.ok ? "Sikeres törlés!" : "Hiba történt!")
    .then(msg => document.getElementById("deleteResult").textContent = msg);
}
