import React, { PureComponent } from 'react';
import PropTypes from 'react-proptypes';

import Task from './Task';

class TaskGroup extends PureComponent {
  render() {
    return (
      <div id="task-group">
        <div className="list-header">
          <h1>{this.props.name}</h1>
          <button type="button" className="link" onClick={() => this.props.viewAllGroups()}>
            ALL GROUPS
          </button>
        </div>
        <div className="ui divided items">
          {this.props.tasks.map(({id, task, completedAt}) => (
            <Task
              key={id}
              id={id}
              description={task}
              completedAt={completedAt}
              isLocked={this.props.isTaskLocked(id)}
              toggleCompletion={this.props.toggleCompletion}
            />
          ))}
        </div>
      </div>
    );
  }
}

TaskGroup.propTypes = {
  name: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      task: PropTypes.string.isRequired,
      completedAt: PropTypes.string,
    })
  ).isRequired,
  viewAllGroups: PropTypes.func.isRequired,
  isTaskLocked: PropTypes.func.isRequired,
  toggleCompletion: PropTypes.func.isRequired,
};

export default TaskGroup;
