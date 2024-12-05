import { deDuplicate, deDuplicateStable } from "./solution/deDuplicate.js";
import {
  testCase1,
  testCase2,
  testCase3,
  testCase4,
  testCase5,
} from "./mockData/leads.js";

console.log(deDuplicate(testCase5));
console.log(deDuplicateStable(testCase5));

// const map = new Map();

// testData.leads.forEach((element) => {
//   if (!map.has(element._id)) {
//     map.set(element._id, 0);
//   }
//   map.set(element._id, map.get(element._id) + 1);

//   if (!map.has(element.email)) {
//     map.set(element.email, 0);
//   }
//   map.set(element.email, map.get(element.email) + 1);
// });

// map.forEach((value, key) => {
//   if (value > 1) {
//     console.log(key);
//     console.log(value);
//   }
// });
