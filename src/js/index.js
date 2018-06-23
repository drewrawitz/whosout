import '../css/index.css';
import Members from './models/Members';
import * as cardView from './views/cardView';

const state = {};

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

/**
 * Check if filtering by department
 */
const dept = getQueryVariable('dept');
const filter = (dept) || '';

/**
 * Member Controller
 */
const MemberController = async () => {
  state.members = new Members(filter);

  try {
    // Slack API call to get members
    await state.members.getAllMembers();

    // If there's a filter, run the necessary functions
    if (filter) {
      await state.members.generateMembersForDepartments();
      await state.members.filterResults();
    }

    // Render the results to the UI
    cardView.renderResults(state.members.currentData);
  } catch (err) {
    console.log('Something wrong...', err);
  }
};

/**
 * Initialize our controller
 */
MemberController(filter);
