import React from 'react';
import Category from './category';
import "../../Styles/home-styles/category-container.css"
class CategoryContainer extends React.Component {
    render() {
        return(<div className="category-container">
            <h1>Browse by category</h1>
                <Category class="category fantasy" titleClass="fantasy-title" title={"Fantasy"}></Category>
                <Category class="category history" titleClass="history-title" title={"History"}></Category>
                <Category class="category sci-fi" titleClass="sci-fi-title" title={"Sci-Fi"}></Category>
                <Category class="category marine-biology" titleClass="marine-biology-title" title={"Marine Biology"}></Category>
            </div>
        )
    }
}
export default CategoryContainer;