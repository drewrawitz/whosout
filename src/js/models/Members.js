import axios from 'axios';
import { token } from '../config';

export default class Members {
  async getMembers() {
    try {
      const res = await axios(
        `https://slack.com/api/users.list?token=${token}&presence=true`,
      );
      const { members } = res.data;
      const filteredMembers = members.filter(
        item => !item.deleted
          && !item.is_bot
          && !item.is_restricted
          && item.name !== 'slackbot'
          && item.name !== 'subscriptions',
      );

      this.data = filteredMembers;
      this.count = filteredMembers.length;
    } catch (error) {
      console.log(`Something went wrong: ${error}`);
    }
  }
}
