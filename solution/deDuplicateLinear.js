function deDuplicateLinear(data) {
  const { leads } = data;

  const idsMap = new Map();
  const emailsMap = new Map();

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    const { _id, email } = lead;

    // set the record to the lead if key doesn't exist or prevLead has smaller or equal date
    if (
      !idsMap.has(_id) ||
      compareDate(idsMap.get(_id).entryDate, lead.entryDate) <= 0
    ) {
      idsMap.set(_id, lead);
    }
    if (
      !emailsMap.has(email) ||
      compareDate(emailsMap.get(email).entryDate, lead.entryDate) <= 0
    ) {
      emailsMap.set(email, lead);
    }
  }

  // go through the leads and add the unique records
  const result = [];

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    const { _id, email } = lead;

    // push into final result if the lead is winning both id and email
    if (idsMap.get(_id) === emailsMap.get(email) && lead === idsMap.get(_id)) {
      result.push(lead);
    }
  }

  return result;
}

function compareDate(a, b) {
  const dateA = new Date(a);
  const dateB = new Date(b);

  return dateA.getTime() - dateB.getTime();
}

module.exports = {
  deDuplicateLinear,
};
