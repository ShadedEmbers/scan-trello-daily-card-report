require('dotenv').config()
const { List, Checklist, Member } = require('./utils/trello');
const trello = require('./utils/trello');
const { updateSpreadSheet } = require('./utils/google');
const fs = require('fs');
const Row = require('./utils/google/Row');

(async () => {

  // create a new trello board instance
  const board = new trello.Board(process.env.TARGET_BOARD);
  // populate the boards lists
  await board.get_lists()
    .catch(e => {
      throw new Error('unable to set lists');
    });

  // try to find the list with the information wanted
  const wantedList = board.lists.find(list => list.name === 'Daily Call');
  if (!wantedList) {
    throw new Error('unable to find list');
  }

  // create a new instance of that list
  const list = new List(wantedList.id);
  // get the cards on the list
  await list.get_cards();

  // pull the first card in the list
  const wantedCard = list.cards[0];
  
  // get the checklists on the card
  const checklists = await Promise.all(wantedCard.idChecklists.map(async listId => {
    const checklist = new Checklist(listId);
    await checklist.get_checklist();
    await checklist.get_check_items();

    return checklist;
  }))

  const acceptedLists = [
    'critical',
    'stage'
  ];

  const filteredChecklists = checklists.filter(checklist => acceptedLists.find(accepted => checklist.name.toLowerCase().split(' ').find(str => str === accepted)))
    .map(checklist => checklist.checklistItems.sort((a, b) => {
      if(a.pos > b.pos) return 1;
      if(a.pos < b.pos) return -1;
      return 0;
    }))

  // format the data in the list to work better as a CSV
  const allCheckItems = [ ].concat(...filteredChecklists);

    let currentList = '';
    let listSection = 'uncategorised';
  
  for (let i = 0; i < allCheckItems.length; i++) {
    const item = allCheckItems[i];

    if (currentList !== item.checklistName) {
      currentList = item.checklistName;
      listSection = 'uncategorised';

      console.log('new list:', `**${item.checklistName}**`)
    };

    if (item.name.includes('---')) {
      const current = item.name.split('**');
      console.log(current[1])
      listSection = current[1];
      continue;
    }

    item.section = listSection;
  
  }
  
  // fs.writeFileSync('./output-json.json', JSON.stringify(
  //   allCheckItems
  //     // .filter(checklistItem => checklistItem.name.toLowerCase() === 'xxxxxx')
  //     .filter(checklistItem => !checklistItem.name.includes('---'))
  // ));

  const rows = allCheckItems
    .filter(checklistItem => !checklistItem.name.includes('---'))
    .map(row => new Row({ ...row }));

  let currentChecklistName = '';
  let currentSections = [ ];
  const checklistSections = [ ];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    if (row.checklistName !== currentChecklistName) {
      currentChecklistName = row.checklistName;
    }

    if (row.section !== currentSection) {
      currentSections.push(row.section);
    }



    
  }

  
  // update spreadsheet
  updateSpreadSheet('Sheet3!A1:A2', rows.map(row => row.toRow()))

})()