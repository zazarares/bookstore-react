import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../Styles/home-styles/home-display.css';

import React from 'react';
import Slider from 'react-slick';

const Slideshow = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true
    };

    return (
        <div className="slideshow">
            <Slider {...settings} >
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`slide ${index}`} className="img-fluid" />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Slideshow;