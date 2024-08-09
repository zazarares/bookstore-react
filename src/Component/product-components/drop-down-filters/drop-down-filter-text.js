import React, {useState} from 'react';
import { DropdownButton, Dropdown, ButtonGroup, FormControl } from 'react-bootstrap';
import bookSelectedFilterStorage from '../../../storage/book-stores/book-selected-filter-storage';
import BookPaginationStorage from "../../../storage/book-stores/book-pagination-storage";
const DropDownFilterText = ({ field }) => {
    const { update } = bookSelectedFilterStorage(state => ({
        update: state.update
    }));
    const pageStore=BookPaginationStorage();
    const [textValue, setTextValue] = useState("");

    const handleTextChange = (event) => {
        const textValue = event.target.value;
        setTextValue(textValue);
        update(field, textValue);
        pageStore.setPage(1);
    };

    const letopen = (event) => {
        event.stopPropagation();
    };

    return (
        <DropdownButton
            as={ButtonGroup}
            key={field}
            id={`dropdown-variants-${field}`}
            variant={field}
            title={field}
        >
            <Dropdown.Item as="div">
                {field}:
                <FormControl
                    type="text"
                    placeholder="Enter text"
                    value={textValue}
                    onClick={letopen}
                    onChange={handleTextChange}
                />
            </Dropdown.Item>
        </DropdownButton>
    );
};

export default DropDownFilterText;
