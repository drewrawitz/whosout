import { elements } from './base';
import { statuses } from '../helpers';

export const getStatusValue = (name, prop) => {
  let obj;
  return (obj = statuses.find(status => status.name === name)) ? obj[prop] : '';
};

export const renderCardClasses = (card) => {
  const classes = [];
  const onlineStatus = card.presence === 'active' ? 'card--online-online' : 'card--online-offline';

  // Add the online status class
  classes.push(onlineStatus);

  // Add the theme class if applicable
  const themeColor = getStatusValue(card.profile.status_text, 'color');
  if (themeColor) {
    classes.push(`card--theme-${themeColor}`);
  }

  return classes.join(' ');
};

export const renderCardStatus = (status) => {
  let statusMarkup = '';

  if (getStatusValue(status, 'name')) {
    const emoji = getStatusValue(status, 'emoji');
    statusMarkup = `
      <div class="member__status">
        <span aria-label="${status}" class="member__emoji" role="img">${emoji}</span>
        <span class="member__status-text">${status}</span>
      </div>
    `;
  }

  return statusMarkup;
};

export const renderCard = (cards) => {
  const list = [];

  cards.forEach((card) => {
    const memberTitle = card.profile.title
      ? `<p class="member__title">${card.profile.title}`
      : '';
    const markup = `
      <li class="card ${renderCardClasses(card)}">
        <section class="card__content">
          <div class="member">
            <img
              class="member__image"
              alt=${card.real_name}
              src=${card.profile.image_512}
            />
            ${renderCardStatus(card.profile.status_text)}
            <div class="member__body">
              <h2 class="member__name">${card.real_name}</h2>
              ${memberTitle}
            </div>
          </div>
        </section>
      </li>
    `;
    list.push(markup);
  });

  return list.join('');
};

export const renderResults = (data) => {
  let layout;
  const count = data.length;
  const lengths = [4, 9, 12, 16, 20, 25, 30, 36, 42, 49, 56, 64, 72, 81];

  for (let i = 0; i < lengths.length; i += 1) {
    if (count <= lengths[i]) {
      layout = `cards--layout-max-${lengths[i]}`;
      break;
    }
  }

  const markup = `
    <ol class="js-cards-wrapper cards ${layout}">
      ${renderCard(data)}
    </ol>
  `;

  elements.appWrapper.innerHTML = markup;
};
