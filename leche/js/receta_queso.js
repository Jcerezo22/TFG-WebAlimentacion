const milkOptions = document.querySelectorAll('.milk-option');
const milkInfo = document.getElementById('milk-info');

const descriptions = {
  vaca: 'Leche de vaca: clásica y equilibrada.',
  cabra: 'Leche de cabra: más digestiva, textura suave.',
  oveja: 'Leche de oveja: rica en grasa, da queso cremoso.'
};

milkOptions.forEach(option => {
  option.addEventListener('click', () => {
    // Quitar selección previa
    milkOptions.forEach(o => o.classList.remove('selected'));

    // Marcar actual
    option.classList.add('selected');

    // Mostrar info
    const milkType = option.getAttribute('data-milk');
    milkInfo.textContent = descriptions[milkType];
  });
});