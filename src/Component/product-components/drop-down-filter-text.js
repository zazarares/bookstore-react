import React from 'react';
import {DropdownButton, Dropdown, ButtonGroup,FormControl} from 'react-bootstrap';

class DropDownFilterText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handleTextChange = (event) => {
        this.setState({ textValue: event.target.value }, () => {
            this.props.onFilterChange(this.state.textValue)
        });
    }
    letopen=(event)=>
    {
        event.stopPropagation();
    }
    render()
    {
        const {field}=this.props;
        const { textValue } = this.state;
        return(
            <DropdownButton
                as={ButtonGroup}
                key={field}
                id={`dropdown-variants-${"author"}`}
                variant={field}
                title={field}
                onChange={this.letopen}
            >
                <Dropdown.Item as="div" onClick={this.letopen}>Author Name:<FormControl
                    type="text"
                    placeholder="Enter text"
                    defaultValue={""}
                    value={textValue}
                    onChange={this.handleTextChange}
                /></Dropdown.Item>
            </DropdownButton>
        )
    }
}
export default DropDownFilterText;