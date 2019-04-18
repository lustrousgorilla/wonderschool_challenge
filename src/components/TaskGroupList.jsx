import React, { PureComponent } from 'react';
import PropTypes from 'react-proptypes';

import { ReactComponent as Group } from '../assets/Group.svg';

class TaskGroupList extends PureComponent {
  taskGroup(group, tasks) {
    const completedCount = tasks.filter(task => task.completedAt).length;
    return (
      <div key={group} className="action item" onClick={() => this.props.viewGroup(group)}>
        <div className="svg-container">
          <Group />
        </div>
        <div className="middle aligned content">
          <div className="group">{group}</div>
          <div className="completion-status">
            {`${completedCount} OF ${tasks.length} TASKS COMPLETE`}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div id="task-group-list">
        <h1>Things To Do</h1>
        <div className="ui divided items">
          {this.props.taskGroups.map(({ group, tasks }) => this.taskGroup(group, tasks))}
        </div>
      </div>
    );
  }
}

TaskGroupList.propTypes = {
  taskGroups: PropTypes.arrayOf(
    PropTypes.shape({
      group: PropTypes.string.isRequired,
      tasks: PropTypes.arrayOf(
        PropTypes.shape({ completedAt: PropTypes.string })
      ),
    })
  ).isRequired,
  viewGroup: PropTypes.func.isRequired,
};

export default TaskGroupList;
