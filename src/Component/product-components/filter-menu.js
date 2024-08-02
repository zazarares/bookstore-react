import React from 'react';
import DropDownFilterText from "./drop-down-filter-text";

class FilterMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleFilterChange = (value) => {
        console.log(value)
        this.setState({ filterValue: {author:value} },()=>{
            if(value==="")
                this.props.onFilterChange("");
            else
                this.props.onFilterChange({author:value});})
    };
    handleFilterChangeName = (value) => {
        console.log(value)
        this.setState({ filterValue: ("&name=" + value) },()=>{
            if(value==="")
                this.props.onFilterChange("");
            else
                this.props.onFilterChange("&name=" + value);})
    };
    render() {
        return (
            <div>
              <DropDownFilterText field={"author"} onFilterChange={this.handleFilterChange}/>
              <DropDownFilterText field={"name"} onFilterChange={this.handleFilterChangeName}/>
              <DropDownFilterText field={"year"} onFilterChange={this.handleFilterChange}/>
              <DropDownFilterText field={"price"} onFilterChange={this.handleFilterChange}/>
              <DropDownFilterText field={"genre"} onFilterChange={this.handleFilterChange}/>
            </div>
        );
    }
}

export default FilterMenu;