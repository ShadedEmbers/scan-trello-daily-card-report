const { default: axios } = require('axios');
const { append_trello_api_key } = require('../../tools/append_trello_api_key');

class Board {
  constructor (boardId) {
    this.id = boardId;
    this.lists = null;
    this.members = null;
  }

  get_board = async ( ) => {
    return new Promise(async (resolve, reject) => {
  
      if (!this.id) {
        reject(new Error('no boardId'))
      }
  
      const response = await axios({
        method: 'GET',
        url: `${process.env.TRELLO_API_URL}/1/boards/${this.id}${append_trello_api_key()}`,
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(r => r.data)
        .catch(e => {
          console.log(e)
          reject('failed to get');
        })
  
      
      resolve(response);
    }) 
  }

  get_lists = async () => {
    return new Promise(async (resolve, reject) => {
  
      if (!this.id) {
        reject(new Error('no boardId'))
      }
  
      const response = await axios({
        method: 'GET',
        url: `${process.env.TRELLO_API_URL}/1/boards/${this.id}/lists${append_trello_api_key()}`,
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(r => r.data)
        .catch(e => {
          console.log(e)
          throw new Error('failed to get')
        })
  
      // set lists to this  
      this.lists = response;

      // also return just in case
      resolve(response);
    }) 
  }

  get_members = async () => {
    return new Promise(async (resolve, reject) => {
  
      if (!this.id) {
        reject(new Error('no boardId'))
      }
  
      const response = await axios({
        method: 'GET',
        url: `${process.env.TRELLO_API_URL}/1/boards/${this.id}/memberships${append_trello_api_key()}`,
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(r => r.data)
        .catch(e => {
          console.log(e)
          throw new Error('failed to get')
        })
  
      // set lists to this  
      this.members = response;

      // also return just in case
      resolve(response);
    }) 
  }

}

module.exports = Board;