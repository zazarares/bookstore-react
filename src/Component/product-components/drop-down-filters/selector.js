import React, { useState } from 'react';
import useBookPaginationStorage from "../../../storage/book-stores/book-pagination-storage";

const SelectorComponent = () => {
    const [selectedOption, setSelectedOption] = useState(6); // Default selected value
    const bookPaginationStore=useBookPaginationStorage();

    const handleChange = (event) => {
        setSelectedOption(Number(event.target.value)); // Update the state with the selected value
        bookPaginationStore.setLimit(Number(event.target.value))
    };

    return (
        <div>
            <label htmlFor="option-selector">Elements per page:</label>
            <select
                id="option-selector"
                value={selectedOption}
                onChange={handleChange}
            >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
            </select>
        </div>
    );
};

export default SelectorComponent;
