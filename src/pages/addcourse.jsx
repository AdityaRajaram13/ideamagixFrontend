import React, { useState } from 'react';
import {  toast } from 'react-toastify';

const AddCourse = () => {
    const [name, setName] = useState('');
    const [level, setLevel] = useState(''); // State for the selected level
    const [description, setDescription] = useState('');
    const [imageDataUrl, setImageDataUrl] = useState('');


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImageDataUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('token');
        console.log("token",token);
          const response = await fetch('https://timetutor-backend.vercel.app/api/admin/courses', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                  name,
                  level,
                  description,
                  image: imageDataUrl,
              }),
          });
          const data = await response.json();
          toast.success("Course added successfully");
      } catch (error) {
          toast.error(data.message);
          console.error('Error creating course:', error);
      }
  };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-md border-2 mt-[20px] shadow-md">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 border-b-2 border-gray-300 pb-2">ADD COURSE</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Course Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        placeholder="Enter course name"
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="level">Level:</label>
                    <select
                        id="level"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        required 
                    >
                        <option value="">Select level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        placeholder="Enter description"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleFileChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300" onClick={handleSubmit}>Add Course</button>
            </form>
        </div>
    );
};

export default AddCourse;
