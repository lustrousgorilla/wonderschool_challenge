import React, { Component } from 'react';
import { map, groupBy, sortBy, find, every } from 'lodash';

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

  getTasks(group) {
    return groupBy(this.state.tasks, 'group')[group];
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
    const task = this.getTask(id);
    if (task.completedAt) {
      task.completedAt = null;
    } else {
      task.completedAt = (new Date()).toISOString();
    }
    const tasks = sortBy(this.state.tasks.filter(task => task.id !== id).concat([task]), 'id');
    this.setState({ tasks });
  }

  render() {
    return (
      <div id="app">
        <div className="ui container">
        {this.state.selectedGroup ?
          <TaskGroup
            name={this.state.selectedGroup}
            tasks={this.getTasks(this.state.selectedGroup)}
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
