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
  if (name.length > 30 || city.length > 30 || email.length > 30) return alert('Max 30 karakter!');
  data.push({ name, age, city, email });
  form.reset();
  renderTable();
});
function renderTable() {
  let filtered = data.filter(row => Object.values(row).some(val => val.toLowerCase().includes(searchInput.value.toLowerCase())));
  if (sortColumn) filtered.sort((a, b) => sortAsc ? a[sortColumn].localeCompare(b[sortColumn]) : b[sortColumn].localeCompare(a[sortColumn]));
  tableBody.innerHTML = '';
  filtered.forEach((row, i) => {
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.name}</td><td>${row.age}</td><td>${row.city}</td><td>${row.email}</td><td><button onclick="editRow(${i})">✏</button><button onclick="deleteRow(${i})">🗑</button></td>`;
    tableBody.appendChild(tr);
  });
}
function deleteRow(i) { data.splice(i, 1); renderTable(); }
function editRow(i) {
  const row = data[i];
  document.getElementById('name').value = row.name;
  document.getElementById('age').value = row.age;
  document.getElementById('city').value = row.city;
  document.getElementById('email').value = row.email;
  data.splice(i, 1);
  renderTable();
}
document.querySelectorAll('#dataTable th[data-col]').forEach(th => {
  th.onclick = () => {
    const col = th.dataset.col;
    sortAsc = sortColumn === col ? !sortAsc : true;
    sortColumn = col;
    renderTable();
  };
});
searchInput.addEventListener('input', renderTable);
renderTable();