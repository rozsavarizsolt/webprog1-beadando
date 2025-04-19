
let chart;

window.addEventListener('DOMContentLoaded', () => {
  const table = document.getElementById('chartTable');
  const rows = table.querySelectorAll('tbody tr');

  rows.forEach((row, index) => {
    row.addEventListener('click', () => {
      const values = Array.from(row.querySelectorAll('td')).map(td => parseFloat(td.textContent));
      drawChart(values, `Év ${index + 1}`);
    });
  });
});

function drawChart(data, label) {
  const ctx = document.getElementById('chartCanvas').getContext('2d');
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jún', 'Júl', 'Aug', 'Szept', 'Okt', 'Nov', 'Dec'];

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: `${label} havi középhőmérsékletek (°C)`,
        data: data,
        borderWidth: 2,
        fill: false,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'Hőmérséklet (°C)'
          }
        }
      }
    }
  });
}
