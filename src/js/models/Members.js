import axios from 'axios';
import { API_TOKEN } from '../config';
import { customFields } from '../helpers';

export default class Members {
  constructor(filter) {
    this.filter = filter;
    this.allMembers = [];
    this.filteredMembers = [];
    this.currentData = [];
    this.promises = [];
  }

  async filterResults() {
    // eslint-disable-next-line max-len
    const filtered = this.allMembers.filter(member => this.filteredMembers.find(email => member.profile.email === email));

    this.currentData = filtered;
  }

  async generateMembersForDepartments() {
    const key = customFields.dept;

    // If this does not exist in Local Storage, let's fetch it from the API
    if (!localStorage.getItem(this.filter)) {
      this.allMembers.forEach((user) => {
        const url = `https://slack.com/api/users.profile.get?token=${API_TOKEN}&user=${user.id}`;
        this.promises.push(axios.get(url));
      });
    } else {
      // Already exists, let's use what we have stored
      this.filteredMembers = JSON.parse(localStorage.getItem(this.filter));
    }

    await axios
      .all(this.promises)
      .then((results) => {
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
      })
      .then(() => {
        // clear out the promises
        this.promises = [];

        // If this doesn't exist in local storage, let's add it (if there's data)
        if (!localStorage.getItem(this.filter) && this.filteredMembers.length > 0) {
          localStorage.setItem(this.filter, JSON.stringify(this.filteredMembers));
        }
      });
  }

  async getAllMembers() {
    try {
      const res = await axios(`https://slack.com/api/users.list?token=${API_TOKEN}&presence=true`);
      const { members } = res.data;

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
      // eslint-disable-next-line no-console
      console.log(`Something went wrong: ${error}`);
    }
  }
}
