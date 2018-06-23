export const LOADING_CLASS = 'is-loading';

export const statuses = [
  { name: 'In a meeting', color: 'red', emoji: '🗓' },
  { name: 'Working remotely', color: 'blue', emoji: '🏠' },
  { name: 'Vacationing', color: 'green', emoji: '🌴' },
];

export const customFields = {
  dept: 'XfB2QXEFQW',
};

export const DOMElements = {
  appWrapper: document.getElementById('js-app-container'),
  cardsWrapper: document.querySelector('.js-cards-wrapper'),
};

export const addLoadingClass = (el) => {
  el.classList.add(LOADING_CLASS);
};

export const removeLoadingClass = (el) => {
  el.classList.remove(LOADING_CLASS);
};
