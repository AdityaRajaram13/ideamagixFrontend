import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../utils/authcontext';
import Login from '../pages/login';
import Instructor from '../pages/InstructorSchedule';
import Addcourse from '../pages/addcourse';
import Addschedule from '../pages/addschedule';
import Adminshowlec from '../pages/adminshowlec';
import Layout from '../layout.js/Layout';

const Routing = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
         {!user && (
          <>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        </>
        )}
        {user && user.role === 'admin' && (
          <>
            <Route path="/admin/addcourse" element={<Addcourse />} />
            <Route path="/admin/addschedule" element={<Addschedule />} />
            <Route path="/admin/dashboard" element={<Adminshowlec />} />
            <Route path="/login" element={<Navigate to="/admin/dashboard" />} />
          </>
        )}
        {user && user.role === 'instructor' && (
          <>
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/admin/dashboard"  element={<Navigate to="/instructor" />} />
          <Route path="/login" element={<Navigate to="/instructor"/>} />
          </>
        )}   
      </Route>
    </Routes>
  );
};

export default Routing;

