// ----- ВЫДВИЖЕНИЕ И ЗАКРЫТИЕ БУРГЕР-МЕНЮ ----- //

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


// ----- СТИЛИЗАЦИЯ ПОЛЗУНКА ----- //
document.querySelectorAll('.parametr-skill input').forEach(elem => {
    elem.style.background = `linear-gradient(to right, #211932 ${elem.value}%, #D6D6D6 ${elem.value}%)`
})

// ----- Работа карусели в секции Clients & Reviews ----- //

// Определение элементов
const firstClient = document.querySelector(".clients__carousel__client");
const leftArrow = document.querySelector(".clients__carousel__arrow_left")
const rightArrow = document.querySelector(".clients__carousel__arrow_right")
const clientBlock = document.querySelector('.clients__carousel__clients-block');
const radios = document.querySelectorAll('.clients__carousel__radio-block input');

// Определяем номер клиента, отоброжаемого на слайдере
let clientNumber = 1;

// Функция для движения карусели
function carouselMove(side) {
    if (side === 'left') {
        if (clientNumber > 1) {
            clientNumber --;
        }
    } else if (side === 'right') {
        if (clientNumber < 3) {
            clientNumber ++;
        }
    }

    // Меняем стиль первого клиента для передвижения слайдера
    firstClient.className = `clients__carousel__client clients__carousel__client_${clientNumber}-client`;
}

// Вешаем обработчики событий на стрелки слайдера
leftArrow.addEventListener('click', () => {carouselMove('left')});
rightArrow.addEventListener('click', () => {carouselMove('right')});

// Пишем функционал для перелистывания слайдера пальцем на мобильных устройствах
// Опрежеляем начальную и конечную точки касания
let points = {
    startPoint: null,
    finishPoint: null
}

// Функция для обработки конца касания
function setFinishPoint(e) {
    // Запись координаты конца касания
    points.finishPoint = e.changedTouches[0].clientX;
    // Определение расстояния между точками начала и конча касания
    let pointsDifference = points.startPoint - points.finishPoint

    // Изменение отоброжаемого клиента в зависимости от направления перелистывания
    if (Math.abs(pointsDifference) >= 20) {
        if (pointsDifference < 0) {
            if (clientNumber > 1) {
                clientNumber--;
            }
        } else {
            if (clientNumber < 3) {
                clientNumber ++;
            }
        }
    }

    // Изменение класса первого клиента для движения слайдера
    firstClient.className = `clients__carousel__client clients__carousel__client_${clientNumber}-client`;
    // Изменение цвета радиокнопок в зависимости от отображаемого клиента
    radios.forEach(item => {
        if (item.value == clientNumber) {
            item.checked = true;
        } else {
            item.checked = false;
        }
    })
}

// Обработчики на события начала и конца касания
clientBlock.addEventListener('touchstart', e => points.startPoint = e.changedTouches[0].clientX);
clientBlock.addEventListener('touchend', e => {setFinishPoint(e)});