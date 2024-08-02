import React from 'react';
import "../../Styles/home-styles/category.css"
class Category extends React.Component{
    render() {
        return(

            <div className={this.props.class}>
                <h2 className={this.props.titleClass}>{this.props.title}</h2>
                <p id="fantasy"></p>
                <a href="#more" className="show-more-button">Show more→</a>
            </div>);
    }
}
export default Category