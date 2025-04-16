let data = [];
let sortColumn = null;
let sortAsc = true;

const form = document.getElementById('dataForm');
const tableBody = document.querySelector('#dataTable tbody');
const searchInput = document.getElementById('search');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const age = document.getElementById('age').value.trim();
  const city = document.getElementById('city').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !age || !city || !email) return alert('Minden mező kötelező!');
  if (name.length > 30 || city.length > 30 || email.length > 30) return alert('Mezők max. 30 karakter hosszúak lehetnek!');

  data.push({ name, age, city, email });
  form.reset();
  renderTable();
});

function renderTable() {
  let filteredData = data.filter(row =>
    Object.values(row).some(val =>
      val.toLowerCase().includes(searchInput.value.toLowerCase())
    )
  );

  if (sortColumn) {
    filteredData.sort((a, b) => {
      let valA = a[sortColumn].toLowerCase();
      let valB = b[sortColumn].toLowerCase();
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }

  tableBody.innerHTML = '';
  filteredData.forEach((row, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.name}</td>
      <td>${row.age}</td>
      <td>${row.city}</td>
      <td>${row.email}</td>
      <td>
        <button onclick="editRow(${index})">✏️</button>
        <button onclick="deleteRow(${index})">🗑️</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

function deleteRow(index) {
  data.splice(index, 1);
  renderTable();
}

function editRow(index) {
  const item = data[index];
  document.getElementById('name').value = item.name;
  document.getElementById('age').value = item.age;
  document.getElementById('city').value = item.city;
  document.getElementById('email').value = item.email;
  data.splice(index, 1);
}

document.querySelectorAll('#dataTable th[data-col]').forEach(th => {
  th.addEventListener('click', () => {
    const col = th.getAttribute('data-col');
    if (sortColumn === col) {
      sortAsc = !sortAsc;
    } else {
      sortColumn = col;
      sortAsc = true;
    }
    renderTable();
  });
});

searchInput.addEventListener('input', renderTable);
renderTable();
