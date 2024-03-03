import React, { useState, useEffect } from 'react';
import {  toast } from 'react-toastify';
import Loader from '../components/Loader';

const addschedule = () => {
  const [instructorId, setInstructorId] = useState('');
  const [date, setDate] = useState('');
  const [batch, setBatch] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const today = new Date().toISOString().split('T')[0];
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [isLoadingInstructors, setIsLoadingInstructors] = useState(true);

  useEffect(() => {
    fetchCourses();
    fetchInstructors();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://ideamagix-three.vercel.app/api/admin/all-course', {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        }
      })
      const data = await response.json();
      setCourses(data.courses);
    } catch (error) {
      toast.error('Error fetching courses:', error);
    }finally {
      setIsLoadingCourses(false);
    }
  };

  const fetchInstructors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://ideamagix-three.vercel.app/api/admin/instructors', {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        }
      });
      const data = await response.json();
      setInstructors(data.instructors);
    } catch (error) {
      toast.error('Error fetching instructors:', error);
    }finally {
      setIsLoadingInstructors(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/courses/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          instructorId,
          date,
          batch,
          courseId
        })
      });
      if (response.ok) {
        const data = await response.json();
        toast.success("Schedule added successfully");
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error adding lecture:', error);
      toast.error("An error occurred while adding the lecture");
    }
  };

  return (
 <>
 {isLoadingCourses || isLoadingInstructors ? (
     <Loader/>
    ) : (
    <div className="w-full max-w-md mx-auto border-2">
      <form onSubmit={handleSubmit} className="bg-white shadow-md border-2 rounded px-8 pt-6 pb-8 mb-4 mt-[20px]">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 border-b-2 border-gray-300 pb-2">ADD COURSE</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course">
            Select Course:
          </label>
          <select id="course" value={courseId} onChange={(e) => setCourseId(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course._id} value={course._id}>{course.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructor" >Select Instructor:</label>
          <select value={instructorId} onChange={(e) => setInstructorId(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Select Instructor</option>
            {instructors.map(instructor => (
              <option key={instructor._id} value={instructor._id}>{instructor.username}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Date:
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min={today}
          />        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="batch">
            Select Batch:
          </label>
          <select id="batch" value={batch} onChange={(e) => setBatch(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Select Batch</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Lecture
        </button>
      </form>
    </div>
    )}
</>
  );
};

export default addschedule;
