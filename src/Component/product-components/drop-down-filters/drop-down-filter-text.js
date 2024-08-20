import React, {useEffect, useState} from 'react';
import { DropdownButton, Dropdown, ButtonGroup, FormControl } from 'react-bootstrap';
import useBookSelectedFilterStorage from '../../../storage/book-stores/book-selected-filter-storage';
import useBookPaginationStorage from "../../../storage/book-stores/book-pagination-storage";
const DropDownFilterText = ({ field }) => {
    const { update } = useBookSelectedFilterStorage(state => ({
        update: state.update
    }));
    const bookSelectedFilterStorage = useBookSelectedFilterStorage();
    const bookPaginationStorage=useBookPaginationStorage();
    const [textValue, setTextValue] = useState("");

    useEffect(() => {
        setTextValue(bookSelectedFilterStorage.filter.name);
    }, [bookSelectedFilterStorage]);

    const handleTextChange = (event) => {
        const textValue = event.target.value;
        setTextValue(textValue);
        update(field, textValue);
        bookPaginationStorage.setPage(1);
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
