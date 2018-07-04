// @flow
import {
  statuses,
  DOMElements,
} from '../helpers';

const getStatusValue = (name, prop) => {
  const obj = statuses.find(status => status.name === name);

  return obj && obj[prop] ? obj[prop] : '';
};

const renderCardClasses = (card) => {
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

const renderCardStatus = (status) => {
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

const renderCard = (cards) => {
  const list = [];

  cards.forEach((card) => {
    const {
      profile,
      real_name: realName,
    } = card;
    const {
      title,
      image_512: image,
      status_text: statusText,
    } = profile;

    const memberTitle = title ? `<p class="member__title">${title}` : '';
    const markup = `
      <li class="card ${renderCardClasses(card)}">
        <section class="card__content">
          <div class="member">
            <img
              class="member__image"
              alt=${realName}
              src=${image}
            />
            ${renderCardStatus(statusText)}
            <div class="member__body">
              <h2 class="member__name">${realName}</h2>
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

export const renderResults = (data: Array < Object >) => {
  let layout: string = '';
  const count: number = data.length;
  const lengths: Array < number > = [4, 9, 12, 16, 20, 25, 30, 36, 42, 49, 56, 64, 72, 81];

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

  DOMElements.dataContainer.innerHTML = markup;
};

export default renderResults;
