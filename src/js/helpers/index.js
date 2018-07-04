// @flow
export const LOADING_CLASS: string = 'is-loading';

export const statuses: Array < Object > = [{
  name: 'In a meeting',
  color: 'red',
  emoji: '🗓',
},
{
  name: 'Working remotely',
  color: 'blue',
  emoji: '🏠',
},
{
  name: 'Vacationing',
  color: 'green',
  emoji: '🌴',
},
];

export const customFields: Object = {
  dept: 'XfB2QXEFQW',
};

export const DOMElements: Object = {
  appWrapper: document.getElementById('js-app-container'),
  dataContainer: document.getElementById('js-data-container'),
  cardsWrapper: document.querySelector('.js-cards-wrapper'),
  refreshIcon: document.querySelector('.js-refresh-app'),
};

export const addLoadingClass = (el: HTMLElement) => {
  el.classList.add(LOADING_CLASS);
};

export const removeLoadingClass = (el: HTMLElement) => {
  el.classList.remove(LOADING_CLASS);
};
