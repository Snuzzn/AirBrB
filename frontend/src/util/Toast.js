import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const displayToast = (msg, status) => {
  const toastSettings = {
    autoClose: 2000,
    pauseOnHover: false,
    position: 'top-center',
  };
  if (status === 'success') toast.success(msg, toastSettings);
  else if (status === 'error') toast.error(msg, toastSettings);
};
