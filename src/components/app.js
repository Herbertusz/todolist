/**
 * Main component
 */

import React from 'react';

import TodoList from './todolist';
import AddItem from './additem';
import Filters from './filters';

class App extends React.Component {

    /**
     * Read the state from localStorage or set initial
     * @param {Object} props
     */
    constructor(props){
        super(props);
        this.changeItemCompleted = this.changeItemCompleted.bind(this);
        this.changeItemText = this.changeItemText.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        /**
         * 'todos' structure:
         * todos = [
         *     {
         *         id : Number,
         *         text : String,
         *         completed : Boolean
         *     },
         *     ...
         * ]
         */
        const todos = localStorage.getItem('todos');
        this.state = {
            todos : todos ? JSON.parse(todos) : []
        };
    }

    /**
     * Store the state in localStorage
     */
    componentDidUpdate(){
        localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }

    /**
     * Change the completed state of an item
     * @param {Number|String} id - item identifier
     * @param {Boolean} completed - completed state
     */
    changeItemCompleted(id, completed){
        const todoIndex = this.state.todos.findIndex(item => item.id === Number(id));
        const todos = [...this.state.todos];
        todos[todoIndex].completed = completed;
        this.setState({todos});
    }

    /**
     * Change the text of an item
     * @param {Number|String} id - item identifier
     * @param {String} text - item text
     */
    changeItemText(id, text){
        const todoIndex = this.state.todos.findIndex(item => item.id === Number(id));
        const todos = [...this.state.todos];
        todos[todoIndex].text = text;
        this.setState({todos});
    }

    /**
     * Add new item to the list
     * @param {String} text - item text
     */
    addItem(text){
        const maxId = this.state.todos.reduce((acc, curr) => Math.max(acc, curr.id), 0);
        const newTodo = {
            id : maxId + 1,
            text : text,
            completed : false
        };
        this.setState(prevState => ({
            todos : [...prevState.todos, newTodo]
        }));
    }

    /**
     * Delete an item from the list
     * @param {Number|String} id - item identifier
     */
    deleteItem(id){
        const todos = [...this.state.todos].filter(item => item.id !== Number(id));
        this.setState({todos});
    }

    render(){
        return (
            <section className="main">
                <h1>TODO</h1>
                <Filters />
                <TodoList todos={this.state.todos} deleteItem={this.deleteItem}
                    changeItemCompleted={this.changeItemCompleted} changeItemText={this.changeItemText} />
                <AddItem addItem={this.addItem} />
            </section>
        );
    }

}

export default App;
