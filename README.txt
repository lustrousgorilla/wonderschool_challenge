This challenge includes three steps: 1. build a front-end react UI for a basic Task List, 2. design a database schema to store the task list data, and 3. document an API for a front-end to talk to the back-end.

SCORING CRITERIA

As an engineering team we focus on clear conventions, best practices, and code quality.
We'll look for clear structure and naming, thoughtful organization of files and components,
and keeping things simple. We're also kind of picky about bugs, so we'll test the react app to
make sure everything aligns to the above criteria.

Please do not write any code for a back-end or anything out of scope of the questions.
Stay focused on front-end react code, API documentation, and database schema.

This is your chance to lay out a project as you think it should be done, so focus on doing it
"the right way" rather than throwing in all the bells and whistles.


1. Build the UI for a grouped task list with task dependencies

* Build a task list UI in React using included design and SVG assets
* The top level should show a list of task groups w/ # of tasks inside
* Clicking a group should display the list of all tasks for that group
* Tasks remain locked until all dependent tasks are complete
* Clicking a task should mark it as complete or incomplete, unless the task is locked
* Keep it simple and focus on building well-designed React components. Don't worry about talking to an API, tests, or state management libraries
* Use the data below to populate the UI

Task Payload to Use for UI:
[
  {
    id: 1,
    group: "Purchases",
    task: "Go to the bank",
    dependencyIds: [],
    completedAt: null,
  },
  {
    id: 2,
    group: "Purchases",
    task: "Buy hammer",
    dependencyIds: [1],
    completedAt: null,
  },
  {
    id: 3,
    group: "Purchases",
    task: "Buy wood",
    dependencyIds: [1],
    completedAt: null,
  },
  {
    id: 4,
    group: "Purchases",
    task: "Buy nails",
    dependencyIds: [1],
    completedAt: null,
  },
  {
    id: 5,
    group: "Purchases",
    task: "Buy paint",
    dependencyIds: [1],
    completedAt: null,
  },
  {
    id: 6,
    group: "Build Airplane",
    task: "Hammer nails into wood",
    dependencyIds: [2, 3, 4],
    completedAt: null,
  },
  {
    id: 7,
    group: "Build Airplane",
    task: "Paint wings",
    dependencyIds: [5, 6],
    completedAt: null,
  },
  {
    id: 8,
    group: "Build Airplane",
    task: "Have a snack",
    dependencyIds: [],
    completedAt: null,
  }
]

2. Design the SQL database schema to store all required task list data.

* Schema should define all tables, columns, and constraints
* Schema should be written in SQL
* Feel free to add any additional commentary as to why certain decisions were made

3. Document an HTTP API for checking and unchecking a Task

* API should only be documented, no need to implement anything in code
* Include URL, request payload format, and response payload format for success and errors
* No need to get fancy w/ formatting or overly descriptive
* Don’t feel constrained by the payload in question 1 - design what you think is a good API
