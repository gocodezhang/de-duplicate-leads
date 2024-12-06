# de-duplicate-leads

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#how-to-run-the-program">How To Run The Program</a>
      <ul>
        <li>Approach #1 - Run the program in CLI interactively</li>
        <li>Approach #2 - Run the test file in CLI</li>
      </ul>
    </li>
    <li><a href="#deduplicate-algorithm-walkthrough">De-duplicate Algorithm Walkthrough</a></li>
    <li>
      <a href="#space-and-time-complexity">Space And Time Complexity</a>
      <ul>
        <li><a href="#other-considerations">Other Considerations</a></li>
      </ul>
    </li>
    <li><a href="#change-log-format">Change Log Format</a></li>
  </ol>
</details>

## How To Run The Program

**Note:** Please make sure to install `Node.js` with version >= `v22.1.0` before proceed. See this [link](https://nodejs.org/en/download/package-manager) to install `Node.js`.

### Approach #1 - Run the program in CLI interactively

- Run below command to open Node CLI environment

```sh
npm run initalize
```

- The CLI environment has been loaded with function `deDuplicateStable`. Please call the function to run de-duplicate process and note below as an example

```sh
const data =
  {
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
    ],
  }
deDuplicateStable(data)
```

- Sample output from above function call

```sh
==================================== change log start =======================================
2024-12-06T07:41:12.932Z: Reconciled duplicated records with id = jkj238238jdsnfsj23
_id: jkj238238jdsnfsj23
email: foo@bar.com -> foo1@bar.com
firstName: John
lastName: Smith
address: 123 Street St -> 888 Mayberry St
entryDate: 2014-05-07T17:30:20+00:00 -> 2014-05-07T17:32:20+00:00

==================================== change log end =======================================
{
  leads: [
    {
      _id: 'jkj238238jdsnfsj23',
      email: 'foo1@bar.com',
      firstName: 'John',
      lastName: 'Smith',
      address: '888 Mayberry St',
      entryDate: '2014-05-07T17:32:20+00:00'
    }
  ]
}
```

### Approach #2 - Run the test file in CLI

- Run below command to run test cases

```sh
npm run test
```

- You can update test cases directly in `test.js`

## Deduplicate Algorithm Walkthrough

- **Step 1** - Create a `keyMap` where `key = _id or email` and `value = Array of records`. Then add records with the same `_id` or `email` into the corresponding array
- **Step 2** - Sort every array in `keyMap` so that the last record is the most preferrable based on rules
- **Step 3** - Reconcile sorted arrays in the `keyMap` (e.g A record is the most preferrable under `_id = 2` but its `email = foo@bar.com` is duplicated with another record)
- **Step 4** - Build the final output and print change log in the console based on reconciled `keyMap`

## Space And Time Complexity

- Time Complexity: `O(nlogn)`
  - While creating `keykeyMap` and reconciling `keyMap` should be in `O(n)`, but sort all arrys in `keyMap` could take up to `O(nlogn)`. (e.g when all records have same `_id`)
  - For reconciling `keyMap`, while there is a nested `while` loop, the `while` loop will at most run `O(2n)` for the entire outer loop. So it is a `O(n)` operation.
- Space Complexity: `O(n)`

### Other Considerations

1. `Array.sort` is a stable sort in javascript which maintain the original order of records if two records are equal. Hence `customSort` function only need to sort based on `entryDate`
2. When adding records into `keyMap`, an extra property is added to store the `index` in the original array. So that the record original position can be accessed in constant time.
   - Most importantly, `keyMap` store "entire change logs" **where in every array the last record is the final reconciled one and all previous records are ones converted into the final reconciled one**
   - With `index` and the output, the original input can be restored.
3. There could be record A which can be reconciled into two records (B with same `_id` and C with same `email`). In the current algorithm, the record with the same `_id` (e.g B) is proritized when creating change logs.
4. For "step 4 - build the final output", it could be more time efficient to build directly via `keyMap` given some records could be reconciled. But choosing to iterate through the original array in order to preserve the order in the output.

## Change Log Format

Change log has below format

- title - contains current timestemp and the reason being reconciled
- all below fields - `->` indicated the field's value changed `from value A -> to value B`. If there is no `->`, it means the value is not changed.
  - \_id
  - email
  - firstName
  - lastName
  - address
  - entryDate

```==================================== change log start =======================================
2024-12-06T06:40:54.713Z: Reconciled duplicated records with id = jkj238238jdsnfsj23
_id: jkj238238jdsnfsj23
email: foo@bar.com -> bill@bar.com
firstName: John
lastName: Smith
address: 123 Street St -> 888 Mayberry St
entryDate: 2014-05-07T17:30:20+00:00 -> 2014-05-07T17:33:20+00:00

2024-12-06T06:40:54.716Z: Reconciled duplicated records with email = mae@bar.com
_id: edu45238jdsnfsj23 -> belr28238jdsnfsj23
email: mae@bar.com
firstName: Ted -> Tallulah
lastName: Masters -> Smith
address: 44 North Hampton St -> 123 Water St
entryDate: 2014-05-07T17:31:20+00:00 -> 2014-05-07T17:33:20+00:00

==================================== change log end =======================================
```
