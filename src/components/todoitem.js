import React from 'react';

class TodoItem extends React.Component {

    constructor(props){
        super(props);
        this.changeCompleted = this.changeCompleted.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.saveOrCancel = this.saveOrCancel.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);

        this.editHandler = React.createRef();

        this.state = {
            edit : false,
            tempText : this.props.text
        };
    }

    changeCompleted(event){
        this.props.changeCompleted(event.target.value, event.target.checked);
    }

    edit(event){
        this.setState({
            edit : true
        }, () => {
            this.editHandler.current.focus();
        });
    }

    delete(event){
        this.props.delete(this.props.id);
    }

    saveOrCancel(event){
        if (['Enter', 'Escape', 'Esc'].includes(event.key)){
            this.setState({
                edit : false
            });
        }
        if (event.key === 'Enter'){
            this.props.changeText(this.props.id, this.state.tempText);
        }
    }

    handleTextChange(event){
        if (event.target.name === 'edit-handler'){
            this.setState({
                tempText : event.target.value
            });
        }
    }

    render(){
        let textDisplay;
        if (this.state.edit){
            textDisplay = (
                <input className="edit-handler" type="text" name="edit-handler" value={this.state.tempText}
                    ref={this.editHandler} onChange={this.handleTextChange} onKeyDown={this.saveOrCancel} />
            );
        }
        else {
            textDisplay = <span className="text">{this.props.text}</span>;
        }

        return (
            <li className="item">
                <label>
                    <input className="completed" type="checkbox" name="completed" value={this.props.id}
                        checked={this.props.completed} onChange={this.changeCompleted} />
                    {textDisplay}
                </label>
                <span className="delete" onClick={this.delete}>X</span>
                <button className="edit" onClick={this.edit}>Edit</button>
            </li>
        );
    }

}

export default TodoItem;
