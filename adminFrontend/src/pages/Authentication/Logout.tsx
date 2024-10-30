
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        
 const response = await axios.post(
   'http://localhost:4000/admin/logout',
   {},
   { withCredentials: true },
 );
 console.log(response);
navigate('/sign-in'); 
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen text-center">
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
