import { items } from './data/items.js';

const searchInput = document.querySelector('.header__search-input');
const searchIcon = document.querySelector('.header__search-icon');
const search = document.querySelector('.header__search');
const list = document.querySelector('.search-result__list');
const burgerButton = document.querySelector('.header__burger-button');
const burgerMenu = document.querySelector('.burger-menu');
const burgerMenuList = document.querySelector('.burger-menu__list');
const burgerButtonCLose = document.querySelector('.burger-menu__close-button');
const burgerMenuLinks = document.querySelectorAll('.burger-menu__link');

// === Поиск ===
const handleSearchClick = (event) => {
    if (event.target === searchInput) {
        return;
    }
    searchInput.classList.toggle('active');
    search.classList.toggle('active');
    searchIcon.classList.toggle('active');
    searchInput.focus();
};

const handleDocumentClick = (event) => {
    if (!event.target.closest('.header__search')) {
        searchInput.classList.remove('active');
        search.classList.remove('active');
        searchIcon.classList.remove('active');
    }
};

const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
        searchInput.classList.remove('active');
        search.classList.remove('active');
        searchIcon.classList.remove('active');
        searchInput.blur();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    search.addEventListener('click', handleSearchClick);
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleEnterKey);
});

// === Бургер меню ===
const toggleClasses = () => {
    burgerButton.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    burgerMenuList.classList.toggle('active');
};

const handleBurgerButtonCLick = () => {
    toggleClasses()
    document.body.classList.toggle('no-scroll', burgerMenu.classList.contains('active'));
};

const handleClickOutsideMenu = (event) => {
    if (!burgerMenuList.contains(event.target)) {
        toggleClasses()
        document.body.classList.toggle(
            'no-scroll',
            burgerMenu.classList.contains('active')
        );
    }
};

const handkeCloseBurgerMenu = () => {
    toggleClasses()
    document.body.classList.toggle('no-scroll', burgerMenu.classList.contains('active'));
};

document.addEventListener('DOMContentLoaded', () => {
    burgerMenu.addEventListener('click', handleClickOutsideMenu);
    burgerButton.addEventListener('click', handleBurgerButtonCLick);
    burgerButtonCLose.addEventListener('click', handkeCloseBurgerMenu);
    burgerMenuLinks.forEach((link) => {
        link.addEventListener('click', handkeCloseBurgerMenu);
    });
});

// === Рендер карточек ===
items.forEach((item) => {
    const listItem = document.createElement('div');
    listItem.classList.add('search-result__item');
    listItem.innerHTML = `
    <div class="search-result__item">
        <div class="search-result__top">
            <img src=${item.src} alt=${item.title} />
            <div class="search-result__details-button-container">
                <button class="search-result__details-button">Подробнее</button>
            </div>
        </div>
        <h2>${item.title}</h2>
        <div class="search-result__bottom">
            <span class="search-result__price">${item.price}</span>
            ${
                'promotion' in item
                    ? `<span class="search-result__promotion-price">${item.promotion}</span>`
                    : ''
            } 
        </div>
    </div>`;
    list.append(listItem);
});
