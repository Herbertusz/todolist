import {combineReducers} from 'redux';
import {
    ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters
} from './actions.js';

const todos = function(state = [], action){
    if (action.type === ADD_TODO){
        return [
            ...state.todos,
            {
                text : action.text,
                completed : false
            }
        ];
    }
    if (action.type === TOGGLE_TODO){
        const todoList = todos;
        todoList[action.index].completed = !todoList[action.index].completed;
        return todoList;
    }
    return state;
};

const visibilityFilter = function(state = visibilityFilter.SHOW_ALL, action){
    if (action.type === SET_VISIBILITY_FILTER){
        return action.filter;
    }
    return state;
};

// const todoApp = function(state = {}, action){
//     return {
//         visibilityFilter : visibilityFilter(state.visibilityFilter, action),
//         todos : todos(state.todos, action)
//     };
// };

const todoApp = combineReducers({
    visibilityFilter,
    todos
});

export default todoApp;
