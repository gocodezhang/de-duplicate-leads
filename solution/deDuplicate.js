export function deDuplicate(data) {
  const { leads } = data;
  // go through the data and find duplicate based on id and email
  const idMap = new Map();
  const emailMap = new Map();

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    const { _id, email } = lead;
    if (!idMap.has(_id)) {
      idMap.set(_id, []);
    }
    const arrayWithSameId = idMap.get(_id);
    arrayWithSameId.push(lead);

    if (!emailMap.has(email)) {
      emailMap.set(email, []);
    }
    const arrayWithSameEmail = emailMap.get(email);
    arrayWithSameEmail.push(lead);
  }

  // sort
  for (const value of idMap.values()) {
    value.sort(customSort);
  }

  for (const value of emailMap.values()) {
    value.sort(customSort);
  }

  // cleanup
  for (const [key, records] of idMap) {
    let last = records[records.length - 1];
    let recordsWithSameEmail = emailMap.get(last.email);

    while (
      last &&
      recordsWithSameEmail.length &&
      last !== recordsWithSameEmail[recordsWithSameEmail.length - 1]
    ) {
      records.pop();
      last = records.length ? records[records.length - 1] : null;
      if (last !== null) {
        recordsWithSameEmail = emailMap.get(last.email);
      }
    }
  }

  for (const [key, records] of emailMap) {
    let last = records[records.length - 1];
    let recordsWithSameId = idMap.get(last._id);

    while (
      last &&
      recordsWithSameId.length &&
      last !== recordsWithSameId[recordsWithSameId.length - 1]
    ) {
      records.pop();
      last = records.length ? records[records.length - 1] : null;
      if (last !== null) {
        recordsWithSameId = idMap.get(last._id);
      }
    }
  }

  // build result
  const result = [];
  for (const [key, value] of idMap) {
    if (value.length) {
      result.push(value[value.length - 1]);
    }
  }

  for (const [key, records] of emailMap) {
    if (records.length) {
      const last = records[records.length - 1];
      const recordsWithSameId = idMap.get(last._id);
      if (
        recordsWithSameId.length === 0 ||
        last !== recordsWithSameId[recordsWithSameId.length - 1]
      ) {
        result.push(last);
      }
    }
  }

  return result;
}

const idPrefix = "___id";
const emailPrefix = "email";

export function deDuplicateStable(data) {
  const { leads } = data;
  // go through the data and find duplicate based on id and email
  const keyMap = new Map();

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    const { _id, email } = lead;
    const idKey = `${idPrefix}${_id}`;
    if (!keyMap.has(idKey)) {
      keyMap.set(idKey, []);
    }
    const arrayWithSameId = keyMap.get(idKey);
    arrayWithSameId.push(lead);

    const emailKey = `${emailPrefix}${email}`;
    if (!keyMap.has(emailKey)) {
      keyMap.set(emailKey, []);
    }
    const arrayWithSameEmail = keyMap.get(emailKey);
    arrayWithSameEmail.push(lead);
  }

  // sort
  for (const records of keyMap.values()) {
    records.sort(customSort);
  }

  // cleanup
  for (const [key, records] of keyMap) {
    const isIdKey = key.substring(0, 5) === idPrefix ? true : false;
    let last = records[records.length - 1];
    let recordsWithSameIdenity = isIdKey
      ? keyMap.get(`${emailPrefix}${last.email}`)
      : keyMap.get(`${idPrefix}${last._id}`);

    while (
      last &&
      recordsWithSameIdenity.length &&
      last !== recordsWithSameIdenity[recordsWithSameIdenity.length - 1]
    ) {
      records.pop();
      last = records.length ? records[records.length - 1] : null;
      if (last !== null) {
        recordsWithSameIdenity = isIdKey
          ? keyMap.get(`${emailPrefix}${last.email}`)
          : keyMap.get(`${idPrefix}${last._id}`);
      }
    }
  }

  // build result
  const result = [];
  const set = new Set();

  // go through the leads instead of keyMap to maintain the original order of records
  for (const lead of leads) {
    const { _id, email } = lead;
    const leadsWithSameId = keyMap.get(`${idPrefix}${lead._id}`);
    const leadsWithSameEmail = keyMap.get(`${emailPrefix}${lead.email}`);
    if (
      !set.has(_id) &&
      !set.has(email) &&
      ((leadsWithSameId.length &&
        lead === leadsWithSameId[leadsWithSameId.length - 1]) ||
        (leadsWithSameEmail.length &&
          lead === leadsWithSameEmail[leadsWithSameEmail.length - 1]))
    ) {
      result.push(lead);
      set.add(_id);
      set.add(email);
    }
  }

  return result;
}

function customSort(a, b) {
  const dateA = new Date(a.entryDate);
  const dateB = new Date(b.entryDate);

  return dateA.getTime() - dateB.getTime();
}
