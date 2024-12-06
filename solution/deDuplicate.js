const idPrefix = "___id";
const emailPrefix = "email";

function deDuplicateStable(data) {
  const { leads } = data;
  // Step 1 - go through the leads and find duplicate under the same id and email
  const keyMap = new Map();
  // for each record, add the record under array with same id as well as array with same email
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

  // Step 2 - sort all arrays in keyMap
  for (const records of keyMap.values()) {
    records.sort(customSort);
  }

  // Step 3 - Reconcile the sorted arrays

  // create a array to store info about whether the record exists in same id array and same email array
  const exists = new Array(leads.length);
  for (let i = 0; i < exists.length; i++) {
    const arr = [1, 1]; // arr = [isExistSameIdArray, isExistSameEmailArray]
    exists[i] = arr;
  }
  for (const [key, records] of keyMap) {
    // check if records is sameIdArray or sameEmailArray
    const isIdKey = key.substring(0, 5) === idPrefix ? true : false;
    let last = records[records.length - 1];
    // for last record, find the corresponding array with the other key
    // e.g if records is sameIdArray, find sameEmailArray. vice versa
    let recordsWithSameIdenity = isIdKey
      ? keyMap.get(`${emailPrefix}${last.lead.email}`)
      : keyMap.get(`${idPrefix}${last.lead._id}`);

    // if last record is duplicated based on the other key, it cannot be the final reconciled record
    // hence remove it from records
    while (
      last &&
      recordsWithSameIdenity.length &&
      last !== recordsWithSameIdenity[recordsWithSameIdenity.length - 1]
    ) {
      // update exists array when remove element from records
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

  // Step 4 - build final output and print change logs
  return buildDeduplicatedLeads(leads, keyMap, exists);
}

function buildDeduplicatedLeads(leads, keyMap, exists) {
  // build result
  const result = [];

  // use a set to track records added
  const set = new Set();

  // go through the leads instead of keyMap to maintain the original order of records
  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    const { _id, email } = lead;
    const leadsWithSameId = keyMap.get(`${idPrefix}${lead._id}`);
    const leadsWithSameEmail = keyMap.get(`${emailPrefix}${lead.email}`);

    const isReconciledRecord =
      (leadsWithSameId.length &&
        lead === leadsWithSameId[leadsWithSameId.length - 1].lead) ||
      (leadsWithSameEmail.length &&
        lead === leadsWithSameEmail[leadsWithSameEmail.length - 1].lead);

    if (isReconciledRecord) {
      // add the record into result if it is the final reconciled record
      // and it has not been added
      if (!set.has(_id) && !set.has(email)) {
        result.push(lead);
        set.add(_id);
        set.add(email);
      }
    } else {
      // if it is not the final reconciled record, find its reconciled record and print change log

      const exist = exists[i];
      // target can exist in both but proritize chooing records with same id
      const target = exist[0]
        ? leadsWithSameId[leadsWithSameId.length - 1]
        : leadsWithSameEmail[leadsWithSameEmail.length - 1];

      // build log
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

  // print change log in console
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
