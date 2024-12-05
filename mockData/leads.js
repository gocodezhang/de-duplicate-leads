// testCase1 - sample data provided from lead.json
export const testCase1 = {
  leads: [
    {
      _id: "jkj238238jdsnfsj23",
      email: "foo@bar.com",
      firstName: "John",
      lastName: "Smith",
      address: "123 Street St",
      entryDate: "2014-05-07T17:30:20+00:00",
    },
    {
      _id: "edu45238jdsnfsj23",
      email: "mae@bar.com",
      firstName: "Ted",
      lastName: "Masters",
      address: "44 North Hampton St",
      entryDate: "2014-05-07T17:31:20+00:00",
    },
    {
      _id: "wabaj238238jdsnfsj23",
      email: "bog@bar.com",
      firstName: "Fran",
      lastName: "Jones",
      address: "8803 Dark St",
      entryDate: "2014-05-07T17:31:20+00:00",
    },
    {
      _id: "jkj238238jdsnfsj23",
      email: "coo@bar.com",
      firstName: "Ted",
      lastName: "Jones",
      address: "456 Neat St",
      entryDate: "2014-05-07T17:32:20+00:00",
    },
    {
      _id: "sel045238jdsnfsj23",
      email: "foo@bar.com",
      firstName: "John",
      lastName: "Smith",
      address: "123 Street St",
      entryDate: "2014-05-07T17:32:20+00:00",
    },
    {
      _id: "qest38238jdsnfsj23",
      email: "foo@bar.com",
      firstName: "John",
      lastName: "Smith",
      address: "123 Street St",
      entryDate: "2014-05-07T17:32:20+00:00",
    },
    {
      _id: "vug789238jdsnfsj23",
      email: "foo1@bar.com",
      firstName: "Blake",
      lastName: "Douglas",
      address: "123 Reach St",
      entryDate: "2014-05-07T17:33:20+00:00",
    },
    {
      _id: "wuj08238jdsnfsj23",
      email: "foo@bar.com",
      firstName: "Micah",
      lastName: "Valmer",
      address: "123 Street St",
      entryDate: "2014-05-07T17:33:20+00:00",
    },
    {
      _id: "belr28238jdsnfsj23",
      email: "mae@bar.com",
      firstName: "Tallulah",
      lastName: "Smith",
      address: "123 Water St",
      entryDate: "2014-05-07T17:33:20+00:00",
    },
    {
      _id: "jkj238238jdsnfsj23",
      email: "bill@bar.com",
      firstName: "John",
      lastName: "Smith",
      address: "888 Mayberry St",
      entryDate: "2014-05-07T17:33:20+00:00",
    },
  ],
};

// testCase2 - multiple records with same id and email
export const testCase2 = {
  leads: [
    {
      _id: "jkj238238jdsnfsj23",
      email: "foo@bar.com",
      firstName: "John",
      lastName: "Smith",
      address: "123 Street St",
      entryDate: "2014-05-07T17:30:20+00:00",
    },
    {
      _id: "jkj238238jdsnfsj23",
      email: "foo@bar.com",
      firstName: "John",
      lastName: "Smith",
      address: "888 Mayberry St",
      entryDate: "2014-05-07T17:33:20+00:00",
    },
  ],
};

// testCase3 - chaining (A duplicate with B, B duplicdate with C)
export const testCase3 = {
  leads: [
    {
      _id: "jkj238238jdsnfsj23",
      email: "foo@bar.com",
      firstName: "John",
      lastName: "Smith",
      address: "123 Street St",
      entryDate: "2014-05-07T17:30:20+00:00",
    },
    {
      _id: "jkj238238jdsnfsj23",
      email: "foo1@bar.com",
      firstName: "John",
      lastName: "Smith",
      address: "888 Mayberry St",
      entryDate: "2014-05-07T17:32:20+00:00",
    },
    {
      _id: "wuj08238jdsnfsj23",
      email: "foo1@bar.com",
      firstName: "Micah",
      lastName: "Valmer",
      address: "123 Street St",
      entryDate: "2014-05-07T17:33:20+00:00",
    },
  ],
};

// testCase4 - loop (A duplicate with B, B duplicdate with C, C duplicate with D, D duplicate with A)
export const testCase4 = {
  leads: [
    {
      _id: "jkj238238jdsnfsj23",
      email: "foo@bar.com",
      firstName: "John",
      lastName: "Smith",
      address: "123 Street St",
      entryDate: "2014-05-07T17:30:20+00:00",
    },
    {
      _id: "jkj238238jdsnfsj23",
      email: "foo1@bar.com",
      firstName: "John",
      lastName: "Smith",
      address: "888 Mayberry St",
      entryDate: "2014-05-07T17:32:20+00:00",
    },
    {
      _id: "wuj08238jdsnfsj23",
      email: "foo1@bar.com",
      firstName: "Micah",
      lastName: "Valmer",
      address: "123 Street St",
      entryDate: "2014-05-07T17:33:20+00:00",
    },
    {
      _id: "wuj08238jdsnfsj23",
      email: "foo@bar.com",
      firstName: "Tallulah",
      lastName: "Smith",
      address: "123 Water St",
      entryDate: "2014-05-07T17:33:20+00:00",
    },
  ],
};

// testCase5 - check if sort is stable
export const testCase5 = {
  leads: [
    {
      _id: "jkj238238jdsnfsj23",
      email: "foo@bar.com",
      firstName: "John",
      lastName: "Smith",
      address: "123 Street St",
      entryDate: "2014-05-07T17:30:20+00:00",
    },
    {
      _id: "jkj238238jdsnfsj23",
      email: "foo1@bar.com",
      firstName: "John",
      lastName: "Smith",
      address: "888 Mayberry St",
      entryDate: "2014-05-07T17:34:20+00:00",
    },
    {
      _id: "jkj238238jdsnfsj23",
      email: "bill@bar.com",
      firstName: "John",
      lastName: "Smith",
      address: "888 Mayberry St",
      entryDate: "2014-05-07T17:34:20+00:00",
    },
    {
      _id: "jkj238238jdsnfsj23",
      email: "mae@bar.com",
      firstName: "Ted",
      lastName: "Masters",
      address: "44 North Hampton St",
      entryDate: "2014-05-07T17:31:20+00:00",
    },
  ],
};
