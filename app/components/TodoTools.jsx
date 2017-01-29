import React, {PureComponent} from 'react';
import classnames from 'classnames';
import * as FILTER from '../reducers/filterVars';
 
export default class TodoTools extends PureComponent {
	getAttributes(newFilter) {
		const {filter, changeFilter} = this.props;
		return {
			className: classnames({selected : filter === newFilter}),
			onClick: (e) => (e.preventDefault(), changeFilter(newFilter))
		};
	}
	
	render() {
		const {clearCompleted, nbActiveItems = 0} = this.props;
		
		return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{nbActiveItems}</strong>
        </span>
        <ul className="filters">
          <li>
            <a href="#" {...this.getAttributes(FILTER.ALL)}>
              All
            </a>
          </li>
          <li>
            <a href="#" {...this.getAttributes(FILTER.ACTIVE)}>
              Active
            </a>
          </li>
          <li>
            <a href="#" {...this.getAttributes(FILTER.COMPLETED)}>
              Completed
            </a>
          </li>
        </ul>
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
		);
	}
}
