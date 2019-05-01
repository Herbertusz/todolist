/**
 * TodoList component
 */

import React from 'react';

import TodoItem from './todoitem';

class TodoList extends React.Component {

    /**
     * @param {Object} props
     */
    constructor(props){
        super(props);
    }

    render(){
        const elements = this.props.todos.map(item => (
            <TodoItem key={item.id} {...item} changeCompleted={this.props.changeItemCompleted}
                changeText={this.props.changeItemText} delete={this.props.deleteItem} />
        ));
        return (
            <ul className="list">
                {elements}
            </ul>
        );
    }

}

export default TodoList;
