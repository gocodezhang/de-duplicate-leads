const { deDuplicateStable } = require("./solution/deDuplicate.js");
const {
  testCase1,
  testCase2,
  testCase3,
  testCase4,
  testCase5,
} = require("./testData/leads.js");

function initializeContext(context) {
  context.deDuplicateStable = deDuplicateStable;
  context.testCase1 = testCase1;
  context.testCase2 = testCase2;
  context.testCase3 = testCase3;
  context.testCase4 = testCase4;
  context.testCase5 = testCase5;
}

const repl = require("node:repl");

console.log(
  "Welcome to duDuplication CLI!\n\nType `deDuplicateStable(leads)`, then define or replace `leads` with your desired input data\nInput Format: { leads: array[record] }"
);

const local = repl.start("> ");

// set initial context
initializeContext(local.context);

// reload context on reset
local.on("reset", initializeContext);
