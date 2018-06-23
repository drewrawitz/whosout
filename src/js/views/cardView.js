import { elements } from './base';

export const renderResults = (cards) => {
  const list = [];

  cards.forEach((card) => {
    const onlineStatus = card.presence === 'active' ? 'online' : 'offline';
    const memberTitle = card.profile.title
      ? `<p class="member__title">${card.profile.title}`
      : '';
    const markup = `
      <li class="card card--online-${onlineStatus}">
        <section class="card__content">
          <div class="member">
            <img
              class="member__image"
              alt=${card.real_name}
              src=${card.profile.image_512}
            />
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

  const html = list.join('');
  return html;
};

export const renderWrapper = (count, data) => {
  let layout;
  const lengths = [4, 9, 12, 16, 20, 25, 30, 36, 42, 49, 56, 64, 72, 81];

  lengths.forEach((length) => {
    if (count <= length) {
      layout = `cards--layout-max-${length}`;
    }
  });

  const markup = `
    <ol class="js-cards-wrapper cards ${layout}">
      ${renderResults(data)}
    </ol>
  `;

  elements.appWrapper.innerHTML = markup;
};
