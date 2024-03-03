import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authcontext';
import Loader from '../components/Loader'
import { toast } from 'react-toastify';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const[loading,setLoading] = useState(false)
    const navigate = useNavigate();
    const { login } = useAuth();
   
    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('https://ideamagix-three.vercel.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password,
                })
            });
            const data = await response.json();
            if (data.status === 'success') {
                localStorage.setItem('token',data.token)
                await login(data);
                toast.success('Login Successful', { autoClose: 3000 });
                navigate('/admin/dashboard');
            } else {
                toast.error(data.message, { autoClose: 3000 });
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
        }finally{
            setLoading(false);
        }
    };
    
    

    return (
        <>
        {loading && <Loader btnLoad={false} />}
        <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{ backgroundColor: "#0D0F23" }}>
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow  border-2 border-blue-950" style={{ backgroundColor: "#111536" }}>
        <h1 className="text-3xl font-Inter text-white font-semibold text-center">Sign In</h1>
        <form className="mt-6" onSubmit={handleSignIn}>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full  px-2 mb-4">
              <label htmlFor="displayName" className="text-white font-Inter">Username</label>
              <input
                type="text"
                id="displayName"
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="w-full px-4 py-2 text-white bg-transparent rounded-lg  border-2 border-blue-950  focus:outline-none focus:border-violet-500"
                required 
              />
            </div>
            <div className="w-full px-2 mb-4">
              <label htmlFor="designation" className="text-white font-Inter">Password</label>
              <input
                type="password"
                id="designation"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full px-4 py-2 text-white bg-transparent rounded-lg  border-2 border-blue-950  focus:outline-none focus:border-violet-500"
                required 
             />
            </div>
          </div>
          <div className=" mt-4 flex">
            <button
              type="submit"
              className="font-Inter text-blue-600 hover:bg-gradient-to-b ml-6 from-blue-600 to-violet-500 hover:text-white border border-blue-600 hover:border-blue-600 hover:opacity-75 px-5 w-40 py-2 rounded-full transition-all duration-300"
            >
              Login
            </button>        
        </div>
         
        </form>
      </div>
    </div>
        </>
    );
};

export default Login;
