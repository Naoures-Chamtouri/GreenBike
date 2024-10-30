
import { useAuth } from '../../context/AuthContext';
import Avatar from '@mui/material/Avatar';

const DropdownUser = () => {
 
const {user}=useAuth();
  return (
    <div className="flex items-center gap-4">
      <span className="hidden text-right lg:block">
        <span className="block text-sm font-medium text-black dark:text-white">
          {user ? user.nomUtilisateur : ''}
        </span>
      </span>

      <span className="h-12 w-12 rounded-full">
        <Avatar
          sx={{ width: 45, height: 45 }}
          src={user && user && user.image?.path ? user.image?.path : undefined}
          alt={user ? `${user.nomUtilisateur} avatar` : 'avatar'}
        ></Avatar>
      </span>
    </div>
  );
};

export default DropdownUser;
