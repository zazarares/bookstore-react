import React, { useState } from 'react';
import BookPaginationStorage from "../../../storage/book-stores/book-pagination-storage";
import bookSelectedFilterStorage from "../../../storage/book-stores/book-selected-filter-storage";

const SelectorComponent = (options,type,initialValue) => {
    const [selectedOption, setSelectedOption] = useState(initialValue); // Default selected value
    const BookPaginationStore=BookPaginationStorage();
    const bookSelectedFilterStore = bookSelectedFilterStorage();

    const handleChange = (event) => {
        setSelectedOption(event.target.value); // Update the state with the selected value
        console.log(type);
        switch(type.type)
        {
            case "elementsPerPage":
                BookPaginationStore.setLimit(Number(event.target.value))
                break;
            default:
                bookSelectedFilterStore.update(type.type, selectedOption);

        }

    };

    return (
        <div>
            <label htmlFor="option-selector">Elements per page:</label>
            <select
                id="option-selector"
                value={selectedOption}
                onChange={handleChange}
            >
                {options.options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectorComponent;
