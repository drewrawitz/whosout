import axios from 'axios';
import {
  token,
} from '../config';
import {
  customFields,
} from '../helpers';

export default class Members {
  constructor(filter) {
    this.filter = filter;
    this.allMembers = [];
    this.filteredMembers = [];
    this.currentData = [];
    this.promises = [];
  }

  async filterResults() {
    const filtered = this.allMembers.filter(member => this.filteredMembers.find(email => member.profile.email === email));

    this.currentData = filtered;
  }

  async generateMembersForDepartments() {
    const key = customFields.dept;

    this.allMembers.forEach((user) => {
      const url = `https://slack.com/api/users.profile.get?token=${token}&user=${user.id}`;
      this.promises.push(axios.get(url));
    });

    await axios.all(this.promises).then((results) => {
      results.forEach((res) => {
        if (
          res.data.ok
          && res.data.profile
          && res.data.profile.fields
          && res.data.profile.fields[key]
          && res.data.profile.fields[key].value === this.filter
        ) {
          this.filteredMembers.push(res.data.profile.email);
        }
      });
    }).then(() => {
      // clear out the promises
      this.promises = [];
    });
  }

  async getAllMembers() {
    try {
      const res = await axios(
        `https://slack.com/api/users.list?token=${token}&presence=true`,
      );
      const {
        members,
      } = res.data;

      const allMembers = members.filter(
        item => !item.deleted
        && !item.is_bot
        && !item.is_restricted
        && item.name !== 'slackbot'
        && item.name !== 'subscriptions',
      );

      this.allMembers = allMembers;
      this.currentData = allMembers;
    } catch (error) {
      console.log(`Something went wrong: ${error}`);
    }
  }
}
