import React from 'react';
import FilterMenu from "./product-components/filter-menu";
import ProductGrid from "./product-components/product-grid";
class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterValue: '',
            displayType:false,
        };
    }

    handleFilterChange = (value) => {
        console.log(value);
        this.setState({ filterValue: value });
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevState.filterValue !== this.state.filterValue) {
            console.log('filterValue has been updated:', this.state.filterValue);
        }
    }
    changeDisplayType()
    {
        this.setState({ displayType: !this.state.displayType });
    }
    render() {
        return(
            <div>
            <FilterMenu onFilterChange={this.handleFilterChange}/>
{/*
                <button onClick={this.changeDisplayType}>Display Type</button>
*/}
            <ProductGrid filterValue={this.state.filterValue} displayType={this.state.displayType}/>
            </div>
        )
    }
}
export default ProductPage;