const { default: axios } = require('axios');
const { append_trello_api_key } = require('../../tools/append_trello_api_key');

class Checklist {
  constructor (checklistId) {
    this.id = checklistId;
    this.name = null;
    this.checklistItems = null;
  }

  get_checklist = async () => {
    return new Promise(async (resolve, reject) => {

      if (!this.id) {
        reject('no checklist ID provided');
      }

      const response = await axios({
        method: 'GET',
        url: `${process.env.TRELLO_API_URL}/1/checklists/${this.id}${append_trello_api_key()}`,
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(r => r.data)
        .catch(e => {
          throw new Error('failed to get')
        })

      // set checklist metadata to this
      this.name = response.name;
      // return just incase
      resolve(response);

    })
  }

  get_check_items = async () => {
    return new Promise(async (resolve, reject) => {

      if (!this.id) {
        reject('no checklist ID provided');
      }

      const response = await axios({
        method: 'GET',
        url: `${process.env.TRELLO_API_URL}/1/checklists/${this.id}/checkItems${append_trello_api_key()}`,
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(r => r.data)
        .then(r => {
          return r.map(checkItem => {
            return {
              checklistName: this.name,
              ...checkItem
            }
          })
        })
        .catch(e => {
          console.log(e)
          throw new Error('failed to get')
        })

      // set checklistItems to this
      this.checklistItems = response;
      // return just incase
      resolve(response);

    })
  }

}

module.exports = Checklist;
