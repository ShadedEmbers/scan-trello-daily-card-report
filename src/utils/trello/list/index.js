const { default: axios } = require('axios');
const { append_trello_api_key } = require('../../tools/append_trello_api_key');

class List {
  constructor (listId) {
    this.id = listId;
    this.cards = null;
  }


  get_cards = async () => {
    return new Promise(async (resolve, reject) => {

      if (!this.id) {
        reject('no list ID provided');
      }

      const response = await axios({
        method: 'GET',
        url: `${process.env.TRELLO_API_URL}/1/lists/${this.id}/cards${append_trello_api_key()}`,
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(r => r.data)
        .catch(e => {
          console.log(e)
          throw new Error('failed to get')
        })

      // set card list to this
      this.cards = response;

      // return just incase
      resolve(response);

    })
  }

}

module.exports = List;
