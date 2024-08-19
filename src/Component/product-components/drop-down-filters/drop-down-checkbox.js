import React, {useEffect, useState} from 'react';
import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import bookSelectedFilterStorage from '../../../storage/book-stores/book-selected-filter-storage';
import Form from 'react-bootstrap/Form';
import BookPaginationStorage from "../../../storage/book-stores/book-pagination-storage";

const DropDownCheckBox = ({ field, data }) => {
    const filterStore = bookSelectedFilterStorage();
    const pageStore=BookPaginationStorage();
    const [checkList, setCheckList] = useState([]);

    useEffect(()=>{
        setCheckList(filterStore.getCheckedFields(field))},
        [filterStore.filterCount])

    const handleCheckBoxChange = (event, item) => {
        let updatedCheckList;

        if (event.target.checked) {
            if(checkList===[])
                setCheckList(item)
            else
                updatedCheckList = [...checkList, item._id];
        } else {
            updatedCheckList = checkList.filter(i => i !== item._id);
        }
        setCheckList(updatedCheckList);
        filterStore.update(field, updatedCheckList);
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
                <Form>
                    {data.map((item,index) => (
                        <div key={index} className="mb-3">
                            <Form.Check // prettier-ignore
                                type={"checkbox"}
                                id={`default-checkbox`}
                                label={item._id + ` (${item.count}) `}
                                checked={checkList.includes(item._id)}
                                onChange={(e)=>handleCheckBoxChange(e,item)}
                            />
                        </div>
                    ))}
                </Form>
            </Dropdown.Item>
        </DropdownButton>
    );
};

export default DropDownCheckBox;
