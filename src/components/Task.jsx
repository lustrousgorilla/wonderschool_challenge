import React, { PureComponent } from 'react';
import PropTypes from 'react-proptypes';

import { ReactComponent as Completed } from '../assets/Completed.svg';
import { ReactComponent as Incomplete } from '../assets/Incomplete.svg';
import { ReactComponent as Locked } from '../assets/Locked.svg';

class Task extends PureComponent {
  completionStatus() {
    if (this.props.isLocked) {
      return <Locked />;
    } else if (this.props.completedAt) {
      return <Completed />;
    } else {
      return <Incomplete />;
    }
  }

  description() {
    if (this.props.isLocked) {
      return <span className="description locked">{this.props.description}</span>
    } else if (this.props.completedAt) {
      return <span className="description completed">{this.props.description}</span>
    } else {
      return <span className="description incomplete">{this.props.description}</span>
    }
  }

  toggleCompletion() {
    if (!this.props.isLocked) {
      this.props.toggleCompletion(this.props.id);
    }
  }

  render() {
    return (
      <div className="task action item" onClick={() => this.toggleCompletion()}>
        <div className="svg-container">
          {this.completionStatus()}
        </div>
        <div className="middle aligned content">
          {this.description()}
        </div>
      </div>
    );
  }
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  completedAt: PropTypes.string,
  isLocked: PropTypes.bool.isRequired,
  toggleCompletion: PropTypes.func.isRequired,
};

export default Task;
