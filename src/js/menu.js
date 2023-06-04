const body = document.querySelector('body');
const menuButton = document.querySelector('[data-js-menu-button]');
const menu = document.querySelector('[data-js-menu]');
const overlay = document.querySelector('.overlay');
let menuActive = false;

if (menuButton && menu && body) {
    menu.style.display = 'none';
    // Toggle menu if button clicked
    menuButton.addEventListener('click', () => {
        toggleMenu();
    });
    // Toggle menu if overlay clicked when menu is open
    overlay.addEventListener('click', () => {
        toggleMenu();
    });
}

function toggleMenu() {
    if (!menuActive) {
        body.classList.add('menu-active');
        menuButton.classList.add('top-bar__button--active');
        menu.style.display = 'block';
        menu.setAttribute('aria-hidden', false);
        menuButton.setAttribute('aria-label', 'Close menu');
    } else {
        body.classList.remove('menu-active');
        menuButton.classList.remove('top-bar__button--active');
        menu.setAttribute('aria-hidden', true);
        menuButton.setAttribute('aria-label', 'Open menu');
        // Have timeout to hide display
        setTimeout(() => {
            menu.style.display = 'none';
        }, 300);
    }

    menuActive = !menuActive;
}
