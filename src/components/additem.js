import React from 'react';

class AddItem extends React.Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            input : ''
        };
    }

    handleSubmit(event){
        if (
            this.state.input !== '' && (
                event.key === 'Enter' ||
                (event.target.name === 'add-button' && event.type === 'click')
            )
        ){
            this.props.addItem(this.state.input);
            this.setState({
                input : ''
            });
        }
    }

    handleChange(event){
        if (event.target.name === 'add-input'){
            this.setState({
                input : event.target.value
            });
        }
    }

    render(){
        return (
            <div className="add-container">
                <input className="add-input" name="add-input" value={this.state.input} placeholder="New item"
                    onKeyDown={this.handleSubmit} onChange={this.handleChange} />
                <button className="add-button" name="add-button" onClick={this.handleSubmit}>Add</button>
            </div>
        );
    }

}

export default AddItem;
