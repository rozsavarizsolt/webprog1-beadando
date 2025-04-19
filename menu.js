
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  if (!nav) return;

  const current = window.location.pathname.split('/').pop();

  nav.innerHTML = `
    <ul>
      <li${current === 'index.html' ? ' class="active"' : ''}><a href="index.html">Kezdőlap</a></li>
      <li${current === 'tablazat.html' ? ' class="active"' : ''}><a href="tablazat.html">Táblázat</a></li>
      <li${current === 'html5.html' ? ' class="active"' : ''}><a href="html5.html">HTML5</a></li>
      <li${current === 'chartjs.html' ? ' class="active"' : ''}><a href="chartjs.html">ChartJS</a></li>
      <li${current === 'ajax.html' ? ' class="active"' : ''}><a href="ajax.html">AJAX</a></li>
      <li${current === 'oojs.html' ? ' class="active"' : ''}><a href="oojs.html">OOJS</a></li>
      <li${current === 'react.html' ? ' class="active"' : ''}><a href="react.html">React</a></li>
    </ul>
  `;
});
