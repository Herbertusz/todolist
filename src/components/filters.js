/**
 * Filter component
 */

import React from 'react';

import {VisibilityFilters} from '../redux/actions.js';

class Filters extends React.Component {

    /**
     * @param {Object} props
     */
    constructor(props){
        super(props);
        this.changeFilter = this.changeFilter.bind(this);
    }

    changeFilter(event){
        console.log(event.target.dataset.filter);
    }

    render(){
        return (
            <div className="filters">
                <a onClick={this.changeFilter} data-filter={VisibilityFilters.SHOW_ALL} className="active">All</a>
                <a onClick={this.changeFilter} data-filter={VisibilityFilters.SHOW_ACTIVE}>Active</a>
                <a onClick={this.changeFilter} data-filter={VisibilityFilters.SHOW_COMPLETED}>Completed</a>
            </div>
        );
    }

}

export default Filters;
