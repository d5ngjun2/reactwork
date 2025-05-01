import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultOption = {
  position: 'top-right',
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: 'light',
};

let activeToastId = null;

export const PerformToast = ({ msg, type }) => {
  if (activeToastId && toast.isActive(activeToastId)) return;

  activeToastId = nanoid();

  const options = {
    ...defaultOption,
    toastId: activeToastId,
  };

  switch (type) {
    case 'error':
      return toast.error(msg, options);
    case 'success':
      return toast.success(msg, options);
    case 'warning':
      return toast.warn(msg, options);
    default:
      return;
  }
};
