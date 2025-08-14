import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FiShield,
    FiCloud,
    FiLock,
    FiActivity,
    FiDatabase,
    FiGlobe,
    FiArrowRight
} from "react-icons/fi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../assets/landing1.jpg'
import img2 from '../assets/landing2.jpg'
import img3 from '../assets/landing3.jpg'

const Home = () => {
    const [showLogin, setShowLogin] = useState(false);

    const heroSlides = [
        {
            image: img1,
            title: "Secure Your Digital Life with",
            highlight: "INFOLOCK",
            description: "The most trusted platform for secure document storage and sharing. Military-grade encryption with effortless usability."
        },
        {
            image: img2,
            title: "Enterprise-Grade",
            highlight: "Security",
            description: "End-to-end encryption with zero-knowledge architecture ensures your data remains private."
        },
        {
            image: img3,
            title: "Access Your Files",
            highlight: "Anywhere",
            description: "Secure cloud infrastructure with fast, reliable access from anywhere in the world."
        }
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        fade: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        cssEase: 'linear'
    };

    // Close login modal with ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setShowLogin(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <div className="overflow-x-hidden font-outfit mx-10 my-10 rounded-xl">
            {/* Hero Carousel Section */}
            <section className="relative w-full">
                <Slider {...sliderSettings}>
                    {heroSlides.map((slide, index) => (
                        <div key={index} className="relative h-[75vh] min-h-[550px] w-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="h-full w-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
                            <div className="absolute inset-0 flex items-center px-[5%]">
                                <div className="text-white w-full max-w-6xl mx-auto">
                                    <div className="space-y-8 max-w-2xl">
                                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-outfit leading-tight tracking-tight drop-shadow-lg">
                                            {slide.title}{" "}
                                            <span className="font-bold bg-clip-text ">
                                                {slide.highlight}
                                            </span>
                                        </h1>
                                        <p className="text-lg sm:text-xl text-gray-200 font-outfit drop-shadow-md">
                                            {slide.description}
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                                <Link
                                                    to="/signup"
                                                    className="px-8 py-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold text-lg shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 flex items-center gap-2"
                                                >
                                                    Get Started Free <FiArrowRight />
                                                </Link>
                                            </motion.div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </section>

            {/* Features Section */}
            <div className="w-full py-20 px-[5%]">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-center mb-16 font-bold text-4xl bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent font-playfair">
                        Why Choose INFOLOCK?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <FiShield size={40} className="text-blue-500" />,
                                title: "Military-Grade Security",
                                description: "End-to-end encryption with zero-knowledge architecture ensures your data remains private."
                            },
                            {
                                icon: <FiCloud size={40} className="text-blue-500" />,
                                title: "Cloud Sync",
                                description: "Access your files from any device, anywhere with our secure cloud infrastructure."
                            },
                            {
                                icon: <FiLock size={40} className="text-blue-500" />,
                                title: "Permission Control",
                                description: "Granular sharing permissions for complete control over your documents."
                            },
                            {
                                icon: <FiActivity size={40} className="text-blue-500" />,
                                title: "Activity Monitoring",
                                description: "Real-time alerts and detailed audit logs for all file activities."
                            },
                            {
                                icon: <FiDatabase size={40} className="text-blue-500" />,
                                title: "Unlimited Storage",
                                description: "Store all your important documents without worrying about space."
                            },
                            {
                                icon: <FiGlobe size={40} className="text-blue-500" />,
                                title: "Global Access",
                                description: "Fast, reliable access from anywhere in the world with our distributed servers."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                            >
                                <div className="mb-5 p-3 bg-blue-50 rounded-full w-max">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-3 font-playfair">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="w-full py-20 px-[5%] bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
                            Ready to Secure Your Documents?
                        </h3>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Join thousands of professionals who trust INFOLOCK with their sensitive data.
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-block"
                        >
                            <Link
                                to="/dashboard"
                                className="inline-flex items-center px-12 py-4 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300"
                            >
                                Start Your Free Trial <FiArrowRight className="ml-2" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Login Modal */}
            {showLogin && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    onClick={() => setShowLogin(false)}
                >
                    <div
                        className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1 className="text-gray-900 text-3xl mt-10 font-medium">Login</h1>
                        <p className="text-gray-500 text-sm mt-2">
                            Please sign in to continue
                        </p>
                        <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280" />
                            </svg>
                            <input
                                type="email"
                                placeholder="Email id"
                                className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>
                        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <svg width="13" height="17" viewBox="0 0 13 17" fill="none">
                                <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280" />
                            </svg>
                            <input
                                type="password"
                                placeholder="Password"
                                className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>
                        <div className="mt-5 text-left text-indigo-500">
                            <a className="text-sm" href="#">Forgot password?</a>
                        </div>
                        <button
                            type="submit"
                            className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
                        >
                            Login
                        </button>
                        <p className="text-gray-500 text-sm mt-3 mb-11">
                            Don’t have an account? <a className="text-indigo-500" href="#">Sign up</a>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
