import React, {useEffect} from 'react';
import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import bookSelectedFilterStorage from "../../../storage/book-stores/book-selected-filter-storage";
import { Slider } from '@mui/material';
import BookPaginationStorage from "../../../storage/book-stores/book-pagination-storage";

const SliderFilter = ({ field, min, max }) => {

    const pageStore=BookPaginationStorage();

    const selectedFilterStore=bookSelectedFilterStorage()

    const [value, setValue] = React.useState([min, max]);

    useEffect(() => {
        setValue([selectedFilterStore.getCheckedFields("min"+field),selectedFilterStore.getCheckedFields("max"+field)]);
    }, [selectedFilterStore.filter]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const handleChangeCommited = () => {
        selectedFilterStore.updateRange(field,value[0],value[1]);
        pageStore.setPage(1);

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
            </Dropdown.Item>
        </DropdownButton>
    );
};

export default SliderFilter;
