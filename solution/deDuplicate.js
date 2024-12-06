const idPrefix = "___id";
const emailPrefix = "email";

function deDuplicateStable(data) {
  const { leads } = data;
  // go through the data and find duplicate under the same id and email
  const keyMap = new Map();

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    const { _id, email } = lead;
    const leadWithIndex = { lead: lead, index: i };

    const idKey = `${idPrefix}${_id}`;
    if (!keyMap.has(idKey)) {
      keyMap.set(idKey, []);
    }
    const arrayWithSameId = keyMap.get(idKey);
    arrayWithSameId.push(leadWithIndex);

    const emailKey = `${emailPrefix}${email}`;
    if (!keyMap.has(emailKey)) {
      keyMap.set(emailKey, []);
    }
    const arrayWithSameEmail = keyMap.get(emailKey);
    arrayWithSameEmail.push(leadWithIndex);
  }

  // sort all arrays in keyMap
  for (const records of keyMap.values()) {
    records.sort(customSort);
  }

  // cleanup

  // create a exists array to store if the lead got removed in same id array or same email array
  const exists = new Array(leads.length);
  for (let i = 0; i < exists.length; i++) {
    const arr = [1, 1];
    exists[i] = arr;
  }
  for (const [key, records] of keyMap) {
    const isIdKey = key.substring(0, 5) === idPrefix ? true : false;
    let last = records[records.length - 1];
    let recordsWithSameIdenity = isIdKey
      ? keyMap.get(`${emailPrefix}${last.lead.email}`)
      : keyMap.get(`${idPrefix}${last.lead._id}`);

    while (
      last &&
      recordsWithSameIdenity.length &&
      last !== recordsWithSameIdenity[recordsWithSameIdenity.length - 1]
    ) {
      const { index } = records.pop();
      const exist = exists[index];
      if (isIdKey) {
        exist[0] = 0;
      } else {
        exist[1] = 0;
      }
      last = records.length ? records[records.length - 1] : null;
      if (last !== null) {
        recordsWithSameIdenity = isIdKey
          ? keyMap.get(`${emailPrefix}${last.lead.email}`)
          : keyMap.get(`${idPrefix}${last.lead._id}`);
      }
    }
  }

  return buildDeduplicatedLeads(leads, keyMap, exists);
}

function buildDeduplicatedLeads(leads, keyMap, exists) {
  // build result
  const result = [];
  const set = new Set();

  // go through the leads instead of keyMap to maintain the original order of records
  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    const { _id, email } = lead;
    const leadsWithSameId = keyMap.get(`${idPrefix}${lead._id}`);
    const leadsWithSameEmail = keyMap.get(`${emailPrefix}${lead.email}`);

    const isReconcliedRecord =
      (leadsWithSameId.length &&
        lead === leadsWithSameId[leadsWithSameId.length - 1].lead) ||
      (leadsWithSameEmail.length &&
        lead === leadsWithSameEmail[leadsWithSameEmail.length - 1].lead);

    if (isReconcliedRecord) {
      if (!set.has(_id) && !set.has(email)) {
        result.push(lead);
        set.add(_id);
        set.add(email);
      }
    } else {
      const exist = exists[i];
      // target can exist in both but proritize chooing records with same id
      const target = exist[0]
        ? leadsWithSameId[leadsWithSameId.length - 1]
        : leadsWithSameEmail[leadsWithSameEmail.length - 1];

      buildLogAndPrint(lead, target.lead);
    }
  }

  return result;
}

function buildLogAndPrint(source, target) {
  const isDuplicatedId = source._id === target._id;

  const header = isDuplicatedId
    ? `Reconciled duplicated records with id = ${source._id}`
    : `Reconciled duplicated records with email = ${source.email}`;
  const keys = Object.keys(source);

  const detailBuilder = [];
  for (const key of keys) {
    const value =
      source[key] === target[key]
        ? `${source[key]}`
        : `${source[key]} -> ${target[key]}`;
    const changeLine = `${key}: ${value}`;
    detailBuilder.push(changeLine);
  }

  // bold = "\x1b[1m"

  const log = `${new Date().toISOString()}: ${header}\n${detailBuilder.join(
    "\n"
  )}\n`;

  console.log(log);
}

function customSort(a, b) {
  const dateA = new Date(a.lead.entryDate);
  const dateB = new Date(b.lead.entryDate);

  return dateA.getTime() - dateB.getTime();
}

module.exports = {
  deDuplicateStable,
};
