const BASE_URL = 'http://gamf.nhely.hu/ajax2/';
const CODE = 'CSZS98rz315';

function loadData() {
  fetch(`${BASE_URL}?op=read&code=${CODE}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('dataContainer');
      const stats = document.getElementById('stats');
      container.innerHTML = '';
      stats.innerHTML = '';

      let total = 0;
      let max = -Infinity;
      let sum = 0;
      const list = data.list;

      list.forEach(row => {
        const div = document.createElement('div');
        div.textContent = `ID: ${row.id} – ${row.name}, ${row.height} cm, ${row.weight} kg`;
        container.appendChild(div);

        const h = parseInt(row.height);
        if (!isNaN(h)) {
          sum += h;
          max = Math.max(max, h);
          total++;
        }
      });

      if (total > 0) {
        stats.innerHTML = `\n        Magasság összeg: ${sum} cm<br>
        Átlag: ${(sum / total).toFixed(2)} cm<br>
        Legnagyobb: ${max} cm`;
      }
    });
}

// Create / Update
const form = document.getElementById('dataForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('id').value.trim();
  const name = document.getElementById('name').value.trim();
  const height = document.getElementById('height').value.trim();
  const weight = document.getElementById('weight').value.trim();

  if (!name || !height || !weight || name.length > 30 || height.length > 30 || weight.length > 30) {
    document.getElementById('result').textContent = 'Hiba: mezők nem lehetnek üresek és max 30 karakter hosszúak lehetnek.';
    return;
  }

  const params = new URLSearchParams({
    name, height, weight, code: CODE
  });

  if (id) params.append('id', id);
  const op = id ? 'update' : 'create';
  params.append('op', op);

  fetch(BASE_URL, {
    method: 'POST',
    body: params
  })
    .then(res => res.text())
    .then(text => {
      document.getElementById('result').textContent = `${op.toUpperCase()} művelet eredménye: ${text}`;
      loadData();
      form.reset();
    });
});

function getDataForId() {
  const id = document.getElementById('id').value.trim();
  if (!id) return alert('Add meg az ID-t!');

  fetch(`${BASE_URL}?op=read&code=${CODE}`)
    .then(res => res.json())
    .then(data => {
      const item = data.list.find(x => x.id === id);
      if (!item) return alert('Nincs ilyen ID.');
      document.getElementById('name').value = item.name;
      document.getElementById('height').value = item.height;
      document.getElementById('weight').value = item.weight;
    });
}

function deleteData() {
  const id = document.getElementById('deleteId').value.trim();
  if (!id) return alert('Add meg a törlendő ID-t!');

  const params = new URLSearchParams({
    op: 'delete',
    id,
    code: CODE
  });

  fetch(BASE_URL, {
    method: 'POST',
    body: params
  })
    .then(res => res.text())
    .then(text => {
      alert(`Törlés eredménye: ${text}`);
      loadData();
    });
}
