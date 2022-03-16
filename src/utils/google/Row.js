// {
//   "checklistName": "Stage 7 - Sales Follow Up",
//   "idChecklist": "6231b0dfa15e741fff3b35a4",
//   "state": "incomplete",
//   "id": "6231b0dfa15e741fff3b35a9",
//   "name": "**Beabloo Lost Deals Analysis** In Progress",
//   "nameData": {
//     "emoji": {}
//   },
//   "pos": 1377572.2192382812,
//   "due": null,
//   "idMember": "5889ea1b4a0f3557bc869e94",
//   "section": "uncategorised"
// },

class Row {
  constructor ({ checklistName, state, name, idMember, section, due, idChecklist }) {
    this.name = name;
    this.state = state;
    this.checklistName = checklistName;
    this.idMember = idMember;
    this.section = section; 
    this.due = due;
    this.idChecklist = idChecklist;
  }

  toRow = () => {
    return [
      this.checklistName,
      this.section,
      this.name,
      this.idMember,
      this.due,
      this.state,

    ]
  }
}

module.exports = Row;