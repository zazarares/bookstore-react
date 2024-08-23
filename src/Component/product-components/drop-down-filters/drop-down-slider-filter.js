import React, {useEffect} from 'react';
import {ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import useBookSelectedFilterStorage from "../../../storage/book-stores/book-selected-filter-storage";
import {Slider} from '@mui/material';
import useBookPaginationStorage from "../../../storage/book-stores/book-pagination-storage";
import {capitalizeFirstLetter} from "../../../utils";

const SliderFilter = ({field, min, max}) => {

    const bookPaginationStorage = useBookPaginationStorage();

    const bookSelectedFilterStorage = useBookSelectedFilterStorage()

    const [value, setValue] = React.useState([min, max]);

    useEffect(() => {
        setValue([bookSelectedFilterStorage.getCheckedFields("min" + capitalizeFirstLetter(field)), bookSelectedFilterStorage.getCheckedFields("max" + capitalizeFirstLetter(field))]);
    }, [bookSelectedFilterStorage.filter]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeCommited = () => {
        bookSelectedFilterStorage.updateRange(field, value[0], value[1]);
        bookPaginationStorage.setPage(1);

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
                <Slider
                    value={value}
                    onChange={handleChange}
                    onChangeCommitted={handleChangeCommited}
                    valueLabelDisplay="auto"
                    min={min}
                    max={max}
                />
                <div>{value[0]}-{value[1]}</div>
            </Dropdown.Item>
        </DropdownButton>
    );
};

export default SliderFilter;
