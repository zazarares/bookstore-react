import React from 'react';
import HomeDisplay from "./Component/home-components/home-display";
import CategoryContainer from "./Component/home-components/category-container";
class Home extends React.Component {
    render(){
        const images=[
            'https://wallpapersmug.com/download/1366x768/f12332/books.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVsH9oOayyWWmE15jGRgk7mDEHHsdCPOw1Tg&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdFPGsG49p3iMsAWBpDxv5B-1XKH2EVTtD0Q&s'
        ]
        return(
            <div>
            <HomeDisplay images={images}/>
            <CategoryContainer/>
            </div>
    );
    }

}
export default Home;