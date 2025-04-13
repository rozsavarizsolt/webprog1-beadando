let chart;

window.addEventListener('DOMContentLoaded', () => {
  const table = document.getElementById('chartTable');
  const rows = table.querySelectorAll('tr');

  rows.forEach((row, index) => {
    row.addEventListener('click', () => {
      const values = Array.from(row.querySelectorAll('td')).map(td => parseFloat(td.textContent));
      drawChart(values, index + 1);
    });
  });
});

function drawChart(data, rowIndex) {
  const ctx = document.getElementById('chartCanvas').getContext('2d');
  const labels = data.map((_, i) => `Oszlop ${i + 1}`);

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: `${rowIndex}. sor adatai`,
        data: data,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
