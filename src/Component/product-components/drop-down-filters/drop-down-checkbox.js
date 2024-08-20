import React, {useEffect, useState} from 'react';
import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import useBookSelectedFilterStorage from '../../../storage/book-stores/book-selected-filter-storage';
import Form from 'react-bootstrap/Form';
import useBookPaginationStorage from "../../../storage/book-stores/book-pagination-storage";

const DropDownCheckBox = ({ field, data }) => {
    const bookSelectedFilterStorage = useBookSelectedFilterStorage();
    const bookPaginationStorage=useBookPaginationStorage();
    const [checkList, setCheckList] = useState([]);

    useEffect(()=>{
        setCheckList(bookSelectedFilterStorage.getCheckedFields(field))},
        [bookSelectedFilterStorage.filterCount])

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
        bookSelectedFilterStorage.update(field, updatedCheckList);
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
