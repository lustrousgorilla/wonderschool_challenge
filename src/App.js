import React, { Component } from 'react';
import { map, groupBy, sortBy, find, every, partition } from 'lodash';

import Api from './api';
import TaskGroupList from './components/TaskGroupList.jsx';
import TaskGroup from './components/TaskGroup.jsx';

import './stylesheets/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null,
      tasks: [],
    };
  }

  componentDidMount() {
    const tasks = Api.fetchTasks();
    this.setState({ tasks: sortBy(tasks, 'id') });
  }

  taskGroups() {
    return map(groupBy(this.state.tasks, 'group'), (tasks, group) => ({ group, tasks }));
  }

  getTask(id) {
    return find(this.state.tasks, task => task.id === id);
  }

  getGroupTasks(group) {
    return groupBy(this.state.tasks, 'group')[group];
  }

  lockDependentTasks(id) {
    const [completedDependentTasks, otherTasks] = partition(this.state.tasks, task => (
      task.dependencyIds.includes(id) && task.completedAt
    ));
    const updatedTasks = map(completedDependentTasks, task => ({ ...task, completedAt: null }));
    this.setState({ tasks: sortBy(updatedTasks.concat(otherTasks), 'id') });
  }

  viewGroup(name) {
    this.setState({ selectedGroup: name });
  }

  viewAllGroups() {
    this.viewGroup(null);
  }

  isTaskLocked(id) {
    const ids = this.getTask(id).dependencyIds;
    const dependencies = this.state.tasks.filter(task => ids.includes(task.id));
    return !every(map(dependencies, task => task.completedAt));
  }

  toggleCompletion(id) {
    let task = this.getTask(id);
    if (task.completedAt) {
      task = { ...task, completedAt: null };
    } else {
      task = { ...task, completedAt: (new Date()).toISOString() };
    }
    const tasks = sortBy(this.state.tasks.filter(task => task.id !== id).concat([task]), 'id');
    this.setState({ tasks }, () => {
      if (!task.completedAt) {
        this.lockDependentTasks(task.id);
      }
    });
  }

  render() {
    return (
      <div id="app">
        <div className="ui container">
        {this.state.selectedGroup ?
          <TaskGroup
            name={this.state.selectedGroup}
            tasks={this.getGroupTasks(this.state.selectedGroup)}
            toggleCompletion={id => this.toggleCompletion(id)}
            viewAllGroups={() => this.viewAllGroups()}
            isTaskLocked={id => this.isTaskLocked(id)}
          /> :
          <TaskGroupList
            taskGroups={this.taskGroups()}
            viewGroup={group => this.viewGroup(group)}
          />
        }
        </div>
      </div>
    );
  }
}

export default App;
