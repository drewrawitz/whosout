import '../css/index.css';
import Members from './models/Members';
import * as cardView from './views/cardView';

const state = {};

/**
 * Member Controller
 */
const MemberController = async () => {
  state.members = new Members();

  try {
    // Slack API call to get members
    await state.members.getMembers();

    // Store the data
    const { data, count } = state.members;

    // Render the results to the UI
    cardView.renderResults(count, data);
  } catch (err) {
    console.log('Something wrong...', err);
  }
};

MemberController();
