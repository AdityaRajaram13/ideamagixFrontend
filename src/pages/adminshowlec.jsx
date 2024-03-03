import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';

const adminshowlec = () => {
  const [lectures, setLectures] = useState([]);
  console.log("lectures", lectures);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://timetutor-backend.vercel.app/api/admin/allschedule', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setLectures(data.lectures);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return () => { };
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 border-b-2 border-gray-300 pb-2">Admin Lecture Schedule</h2>
      {isLoading ? (
        <Loader />
      ) : lectures.length === 0 ? (
        <p className='text-5xl font-bold mb-4 text-center text-gray-800 border-b-2 border-gray-300 pb-2'>No lectures available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-400 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Course Name</th>
                <th className="px-4 py-2">Course Description</th>
                <th className="px-4 py-2">Course Level</th>
                <th className="px-4 py-2">Instructor Name</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Batch</th>
              </tr>
            </thead>
            <tbody>
              {lectures.map((lecture) => (
                <tr key={lecture._id} className="border-b border-gray-400">
                  <td className="px-4 py-2 text-center">{lecture.course.name}</td>
                  <td className="px-4 py-2 text-center">{lecture.course.description}</td>
                  <td className="px-4 py-2 text-center">{lecture.course.level}</td>
                  <td className="px-4 py-2 text-center">{lecture.instructor.username}</td>
                  <td className="px-4 py-2 text-center">{new Date(lecture.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-center">{lecture.batch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

  );
};

export default adminshowlec;
