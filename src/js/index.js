import '../css/index.css';
import Members from './models/Members';
import * as cardView from './views/cardView';

const state = {};

/**
 * Member Controller
 */
const MemberController = async (filter) => {
  state.members = new Members();

  try {
    // Slack API call to get members
    await state.members.getMembers(filter);

    // Store the data
    const { data, count } = state.members;

    // Render the results to the UI
    cardView.renderResults(count, data);
  } catch (err) {
    console.log('Something wrong...', err);
  }
};

/**
 * Get Query Variables
 */
const getQueryVariable = (variable) => {
  const query = window.location.search.substring(1);
  const vars = query.split('&');

  for (let i = 0; i < vars.length; i += 1) {
    const pair = vars[i].split('=');
    if (pair[0] === variable) {
      return unescape(pair[1]);
    }
  }
  return false;
};

const dept = getQueryVariable('dept');
let filter = '';

if (dept) {
  filter = dept;
}

MemberController(filter);
