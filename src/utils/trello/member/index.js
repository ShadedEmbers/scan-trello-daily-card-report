const { default: axios } = require('axios');
const { append_trello_api_key } = require('../../tools/append_trello_api_key');

class Member {
  constructor (memberId) {
    this.id = memberId;
    this.fullName = null;
  }

  get_member = async ( ) => {
    return new Promise(async (resolve, reject) => {
  
      if (!this.id) {
        reject(new Error('no boardId'))
      }
  
      const response = await axios({
        method: 'GET',
        url: `${process.env.TRELLO_API_URL}/1/members/${this.id}${append_trello_api_key()}`,
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(r => r.data)
        .catch(e => {
          reject('failed to get');
        })
  
      this.fullName = response.fullName;
      
      resolve(response);
    }) 
  }

}

module.exports = Member;