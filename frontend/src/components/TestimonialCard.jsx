// src/components/TestimonialCard.jsx
import React from "react";

const TestimonialCard = () => {
    return (
        <div className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg">
            {/* Background Image */}
            <img
                src="/assets/testimonial-bg.png"
                alt="Success Stories"
                className="w-full h-full object-cover min-h-[400px]"
            />

            {/* Text Overlay */}
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-between p-8 text-white">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold">#stories, real impact!</h2>
                    <p className="text-xl font-medium">Check out why learners love GUVI &</p>

                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-0.5 bg-white"></div>
                        <p className="font-semibold">we are changing lives</p>
                    </div>
                </div>

                <div className="my-4 w-full h-px bg-white"></div>

                <button className="self-start px-6 py-2 bg-transparent border-2 border-white rounded-full font-medium hover:bg-white hover:text-black transition-colors">
                    Read More
                </button>

                <div className="my-4 w-full h-px bg-white"></div>

                <div className="space-y-2">
                    <p className="font-medium">Vinitha G</p>
                    <p className="text-sm">Node Js developer</p>
                </div>

                <div className="mt-4">
                    <p className="font-medium">Prabhakaran</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;