// ----- ВЫДВИЖЕНИЕ И ЗАКРЫТИЕ БУРГЕР-МЕНЮ   //

// Определение элементов
const body = document.querySelector('body');
const burgerBtn = document.querySelector('.header__burger-btn');
const bodySubstrate = document.querySelector('.body-substrate');
const burgerMenuCross = document.querySelector('.aside__nav__cross');
const burgerMenu = document.querySelector('.welcome-section__aside__nav');
const burgerMenuItems = document.querySelectorAll('.welcome-section__aside__nav ul li a');

// Функция выдвижения и задвижения бургер-меню
function burgerMenuToggle(action) {
    if (action === 'on') {
        burgerMenu.style.marginRight = '0';
        bodySubstrate.style.display = 'block';
        body.style.overflow = 'hidden';
    } else if (action === 'off') {
        burgerMenu.style.marginRight = '-100%';
        bodySubstrate.style.display = 'none';
        body.style.overflow = 'visible';
    }
}

// Вешаем обработчик событий на бургер-кнопку
burgerBtn.addEventListener('click', () => burgerMenuToggle('on'));

// Вешаем обработчик союытий на крестик и подложку
[burgerMenuCross, bodySubstrate].forEach(elem => elem.addEventListener('click', () => burgerMenuToggle('off')));

// Вешаем обработчики событий на элементы бургер-меню
burgerMenuItems.forEach(item => {
    item.addEventListener('click', () => burgerMenuToggle('off'))
});