import React from 'react';
import { sliderData } from "./slider-data";

import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/bundle";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import './slider.css';

import { Pagination, Navigation } from "swiper";

const Slider = () => {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper">
                {sliderData.map((slide, index) => {
                    const { image, heading, desc } = slide;
                    return (
                        <SwiperSlide>
                            <div key={index} className="sliderBox">
                                <>
                                    <img src={image} alt="slide" />
                                    <div className="content">
                                        <h2>{heading}</h2>
                                        <p>{desc}</p>
                                        <hr />
                                        <a href="#product" className="--btn --btn-primary">Shop Now</a>
                                    </div>
                                </>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    )
}

export default Slider