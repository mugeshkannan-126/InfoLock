import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
    const images = [
        {
            src: "https://via.placeholder.com/1400x500/1e293b/ffffff?text=First+Slide",
            title: "Disaster Management",
            description: "Stay safe with real-time updates."
        },
        {
            src: "https://via.placeholder.com/1400x500/0f766e/ffffff?text=Second+Slide",
            title: "Volunteer Mapping",
            description: "Connect volunteers to those in need."
        },
        {
            src: "https://via.placeholder.com/1400x500/b91c1c/ffffff?text=Third+Slide",
            title: "Stakeholder Support",
            description: "Coordinate resources efficiently."
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    return (
        <div className="w-full">
            <Slider {...settings}>
                {images.map((img, index) => (
                    <div key={index} className="relative">
                        <img
                            src={img.src}
                            alt={img.title}
                            className="w-full h-[500px] object-cover"
                        />
                        {/* Text overlay aligned to LEFT corner */}
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-start p-8 bg-black/30 text-white">
                            <h2 className="text-4xl font-bold font-outfit mb-2">{img.title}</h2>
                            <p className="text-lg font-outfit">{img.description}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageSlider;
