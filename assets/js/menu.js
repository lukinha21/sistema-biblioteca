function classToggle(event) {
    event.preventDefault();
    const navs = document.querySelectorAll('.Navbar__Items')
    const btnBusca = document.getElementById('btnBusca')
    const brandLink = document.querySelectorAll('.Navbar__Link-brand')
    //const linkBrand = document.querySelector('.Navbar__Link-brand');

    navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
    if (btnBusca.style.display === 'none') {
        // Se for 'none', altera para o estilo padrão (por exemplo, 'block')
        btnBusca.style.display = ''; // Isso restaura o estilo padrão do elemento
    } else {
        // Se não for 'none', altera para 'none'
        btnBusca.style.display = 'none';
    }
    brandLink.classList.toggle('active');
    //linkBrand.classList.toggle('Navbar__ToggleShow');
}

function handleResize() {
    const screenWidth = window.innerWidth;
    const nav = document.querySelector('.Navbar__Items');
    const btnBusca = document.getElementById('btnBusca');

    // Verifica se a largura da tela é maior que um determinado valor (por exemplo, 768 pixels)
    if (screenWidth > 768) {
        nav.classList.remove('Navbar__ToggleShow'); // Garante que a barra de navegação esteja fechada
        btnBusca.style.display = ''; // Garante que o botão de busca esteja visível
    }
}

// Adiciona um manipulador de evento resize para a janela
window.addEventListener('resize', handleResize);

