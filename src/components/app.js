import React from 'react';

import TodoItem from './todoitem';
import AddItem from './additem';

class App extends React.Component {

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

    componentDidUpdate(prevProps, prevState){
        localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }

    changeItemCompleted(id, completed){
        const todoIndex = this.state.todos.findIndex(item => item.id === Number(id));
        const todos = [...this.state.todos];
        todos[todoIndex].completed = completed;
        this.setState({todos});
    }

    changeItemText(id, text){
        const todoIndex = this.state.todos.findIndex(item => item.id === Number(id));
        const todos = [...this.state.todos];
        todos[todoIndex].text = text;
        this.setState({todos});
    }

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

    deleteItem(id){
        const todos = [...this.state.todos].filter(item => item.id !== Number(id));
        this.setState({todos});
    }

    render(){
        const elements = this.state.todos.map(item => (
            <TodoItem key={item.id} {...item} changeCompleted={this.changeItemCompleted}
                changeText={this.changeItemText} delete={this.deleteItem} />
        ));
        return (
            <section className="main">
                <h1>TODO</h1>
                <ul className="list">
                    {elements}
                </ul>
                <AddItem addItem={this.addItem} />
            </section>
        );
    }

}

export default App;
