// append the trello api key to the end off all trello requests
exports.append_trello_api_key = () => {

  return `?token=${process.env.TRELLO_API_APP_TOKEN}&key=${process.env.TRELLO_API_APP_KEY}`;
}
