// Seleccionar todas las celdas de la tabla
const cells = document.querySelectorAll('table td');

// Iterar sobre todas las celdas y agregar la clase correspondiente
cells.forEach(cell => {
  const value = cell.textContent.trim();
  if (value === 'Condiciones favorables con aire muy húmedo y viento calmado' || value === 'Condiciones favorables con aire húmedo y viento calmado' || value === 'Condiciones favorables con aire húmedo y viento moderado' || value === 'Condiciones favorables con aire seco y viento moderado') {
    cell.classList.add('bg-success');
  } else if (value === 'Condiciones favorables con aire muy húmedo y viento moderado' || value === 'Condiciones favorables con aire seco y viento calmado') {
    cell.classList.add('bg-info');
  } else if (value === 'Condición no favorable') {
    cell.classList.add('bg-warning');
  } else if (value === 'Condición no favorable') {
    cell.classList.add('bg-danger');
  }
});
