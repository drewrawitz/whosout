import axios from 'axios';
import { token } from '../config';

const data = require('../data/departments.json');

/*
 * Read from our local JSON file to grab a list of
 * User ID's that are associated with this specific department
 */
const getUsersInDepartment = (department) => {
  if (data[department]) {
    return data[department];
  }

  return false;
};

export default class Members {
  async getMembers(filter) {
    try {
      const res = await axios(
        `https://slack.com/api/users.list?token=${token}&presence=true`,
      );
      const { members } = res.data;

      let filteredMembers = members.filter(
        item => !item.deleted
          && !item.is_bot
          && !item.is_restricted
          && item.name !== 'slackbot'
          && item.name !== 'subscriptions',
      );

      // If we're filtering by department
      if (filter) {
        const userList = getUsersInDepartment(filter);

        if (userList) {
          filteredMembers = filteredMembers.filter(
            item => userList.indexOf(item.id) !== -1,
          );
        }
      }

      this.data = filteredMembers;
      this.count = filteredMembers.length;
    } catch (error) {
      console.log(`Something went wrong: ${error}`);
    }
  }
}
