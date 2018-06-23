import '../css/index.css';
import Slack from './models/Slack';
import * as cardView from './views/cardView';

const state = {};

/**
 * Slack Controller
 */
const controlSlack = async () => {
  state.members = new Slack();

  try {
    // Slack API call to get members
    await state.members.getMembers();

    // Store the data
    const { data, count } = state.members;

    // Render the wrapper
    cardView.renderWrapper(count, data);
  } catch (err) {
    console.log('Something wrong...', err);
  }
};

controlSlack();
