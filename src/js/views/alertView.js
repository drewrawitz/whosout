import IconAlertTriangle from '../../svg/alert-triangle.svg';
import IconAlertCircle from '../../svg/alert-circle.svg';
import { DOMElements } from '../helpers';

export const displayAlert = (msg, type) => {
  const modifierClass = `c-alert--${type}` || '';
  let icon;

  switch (type) {
    case 'error':
      icon = IconAlertTriangle;
      break;
    default:
      icon = IconAlertCircle;
  }

  const markup = `
    <div class="c-alert ${modifierClass}">
      ${icon}
      <span>${msg}</span>
    </div>
  `;

  DOMElements.appWrapper.innerHTML = markup;
};

export default displayAlert;
