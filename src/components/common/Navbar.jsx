import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/authcontext";
import Hamburger from 'hamburger-react';

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isNavbarBlurred, setNavbarBlurred] = useState(false);
    const user = useAuth();
    const { logout } = useAuth();
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };




    return (
        <nav
            className={` py-4 px-8 ${isNavbarBlurred
                ? "bg-[rgba(255,255,255,0.1)] "
                : "bg-[rgba(7,28,46)]"
                }`}
        >
            <div className="flex items-center space-x-2 text-white text-lg font-bold font-sans">
                <div className="hidden lg:flex items-center space-x-2 text-white text-lg font-bold font-sans">
                    <img src="https://www.shutterstock.com/shutterstock/photos/2278726727/display_1500/stock-vector-minimalistic-circular-logo-sample-vector-2278726727.jpg" alt="GetShortLink Logo" className="h-12" />
                </div>

                <div className="block lg:hidden">
                    <Hamburger
                        toggled={isMobileMenuOpen}
                        toggle={toggleMobileMenu}
                        color="#4FD1C5"
                        className="m-2 z-[70]"
                    />
                </div>
                <div className="hidden lg:flex space-x-5 items-center">
                    <div className="space-x-10 mb-1 font-Montserrat flex items-center">
                        {user.user && user.user.role === 'admin' && (
                            <>
                                <Link to="/admin/dashboard" className="text-white text-[20px]">
                                    Dashboard
                                </Link>
                                <Link to="/admin/addcourse" className="text-white text-[20px]">
                                    Add Course
                                </Link>
                                <Link to="/admin/addschedule" className="text-white text-[20px]">
                                    Schedule
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-white text-[20px] px-6 py-2.5 font-Montserrat bg-opacity-50 bg-[rgba(255,255,255,0.1)] backdrop-blur-lg  rounded-lg hover:bg-opacity-75 transition duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                        {user.user && user.user.role === 'instructor' && (
                            <>
                                <button
                                    onClick={logout}
                                    className="text-white text-[20px] px-6 py-2.5 font-Montserrat bg-opacity-50 bg-[rgba(255,255,255,0.1)] backdrop-blur-lg  rounded-lg hover:bg-opacity-75 transition duration-300"
                                >
                                    Logout
                                </button>

                                <span className="text-white ml-4">Hello, {user.user.username}</span>
                            </>
                        )}
                    </div>

                    <div className="h-14 bg-[#3f4340] w-px mx-4"></div>

                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="lg:hidden flex flex-col justify-center items-center mt-2 space-y-2">
                    <div className="md:hidden flex items-center space-x-2 text-white text-lg font-bold font-sans">
                        <img src="https://www.shutterstock.com/shutterstock/photos/2278726727/display_1500/stock-vector-minimalistic-circular-logo-sample-vector-2278726727.jpg" alt="GetShortLink Logo" className="h-12" />
                    </div>
                    {user.user && user.user.role === 'admin' && (
                        <>
                            <Link to="/admin/dashboard" className="text-white text-[20px]">
                                Dashboard
                            </Link>
                            <Link to="/admin/addcourse" className="text-white text-[20px]">
                                Add Course
                            </Link>
                            <Link to="/admin/addschedule" className="text-white text-[20px]">
                                Schedule
                            </Link>
                        </>
                    )}
                    {user.user && user.user.role === 'instructor' && (
                        <>
                            <span className="text-white ml-4">Hello, {user.user.username}</span>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};
export default Navbar;
