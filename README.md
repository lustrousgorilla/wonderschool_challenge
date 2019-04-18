# Wonderschool Task List Challenge

[Challenge Instructions](https://www.dropbox.com/sh/8icefhbj8w39t20/AAAIuaNcW-1yd_rS36JLmqqoa)

## 1. React UI
#### Start the application: `yarn install`, `yarn run`, and then navigate to `localhost:3000`

Note: the desired behavior is unspecified for the case where a task's dependency is completed, 
the task is completed, and then the dependency is subsequently unchecked. Currently this puts the app
in an invalid state. 

Question: Should unchecking the dependency be disallowed until the task is first unchecked? Or should unchecking the dependency also uncheck and re-lock the task?

## 2. SQL Schema
```SQL
CREATE TABLE task_groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME
);

/* A task may only belong to single task_group. */
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  group_id INTEGER NOT NULL,
  description VARCHAR(255) NOT NULL,
  completed_at DATETIME,
  created_at DATETIME NOT NULL,
  updated_at DATETIME,
  FOREIGN KEY (group_id) REFERENCES task_groups(id)
);

/* Facilitates a many-to-many relationship between tasks and their dependencies. */
CREATE TABLE task_dependencies (
  id SERIAL PRIMARY KEY,
  task_id INTEGER NOT NULL,
  dependency_id INTEGER NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME,
  FOREIGN KEY (task_id) REFERENCES tasks(id),
  FOREIGN KEY (dependency_id) REFERENCES tasks(id)
);

CREATE UNIQUE INDEX task_dependencies_task_id_dependency_id_index ON task_dependencies USING btree (task_id, dependency_id);
```

## 3. API Documentation

#### Base URL: ```https://api.wonderschool.com```

### Endpoints

#### `PATCH /tasks/:task_id`

#### Request Payload Format
| Attribute | Value                    |
| :-        | :-                       |
| "state"   | "complete", "incomplete" |

```JSON
  {
    "state": "complete"
  }
```

#### Response Payload Format
##### Success
###### 200 - OK
```JSON
  {
    "id": 7,
    "description": "Paint wings",
    "group_id": 2,
    "group": "Build Airplane",
    "dependency_ids": [5, 6],
    "state": "complete",
    "completed_at": "2019-04-081T0:00:00.000Z"
  }
```

##### Error
###### 400 - Bad Request
```JSON
  {
    "status": 400,
    "error": "Invalid value for 'state' attribute"
  }
```

###### 403 - Forbidden
```JSON
  {
    "status": 403,
    "error": "Cannot complete, task has incomplete dependencies"
  }
```

###### 404 - Not Found
```JSON
  {
    "status": 404,
    "error": "Task does not exist"
  }
```

