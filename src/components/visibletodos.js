import React from 'react';
import {connect} from 'react-redux';

import {toggleTodo} from '../redux/actions.js';
import TodoList from './todolist';

const getVisibleTodos = function(todos, filter){
    if (filter === 'SHOW_COMPLETED'){
        return todos.filter(item => item.completed);
    }
    else if (filter === 'SHOW_ACTIVE'){
        return todos.filter(item => !item.completed);
    }
    else {
        return todos;
    }
};

const mapStateToProps = function(state){
    return {
        todos : getVisibleTodos(state.todos, state.visibilityFilter)
    };
};

const mapDispatchToProps = function(dispatch){
    return {
        onTodoClick : function(id){
            dispatch(toggleTodo(id));
        }
    };
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;
