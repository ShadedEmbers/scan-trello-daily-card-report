const fs = require('fs');
const readline = require('readline');
const path = require('path')
const { google } = require('googleapis');

const scopes = [
  'https://www.googleapis.com/auth/spreadsheets'
];

const spreadsheetId = process.env.SPREADSHEET_ID;

exports.updateSpreadSheet = async (range, values) => {

  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../../../application_credentials.json'),
    scopes: scopes
  });

  const client = await auth.getClient();

  const gSheets = google.sheets({ version: 'v4', auth: client });

  await gSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    valueInputOption: 'USER_ENTERED',
    range: range,
    resource: {
      values: values
    }
  })

}
