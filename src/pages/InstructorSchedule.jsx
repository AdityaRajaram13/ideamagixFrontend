import React, { useState, useEffect } from 'react';

function InstructorSchedule() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // assuming you store the JWT token in localStorage
        const response = await fetch('https://ideamagix-three.vercel.app/api/my-lectures', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 

          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setLectures(data.instructorLectures);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
    <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 border-b-2 border-gray-300 pb-2">Instructor Lecture Schedule</h2>
    {loading ? (
      <p className="text-center text-gray-600">Loading...</p>
    ) : lectures.length === 0 ? (
      <p className="text-center text-gray-600">No lectures scheduled</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 ">Course Name</th>
              <th className="px-4 py-2">Level</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Batch</th>
            </tr>
          </thead>
          <tbody>
            {lectures.map(lecture => (
              <tr key={lecture._id} className="border-b border-gray-300">
                <td className="px-4 py-2 text-center">{lecture.course.name}</td>
                <td className="px-4 py-2 text-center">{lecture.course.level}</td>
                <td className="px-4 py-2 text-center">{lecture.course.description}</td>
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
}

export default InstructorSchedule;
