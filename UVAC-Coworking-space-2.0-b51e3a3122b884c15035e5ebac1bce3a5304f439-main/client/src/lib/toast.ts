import { toast } from 'react-hot-toast';

export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  switch (type) {
    case 'success':
      return toast.success(message);
    case 'error':
      return toast.error(message);
    case 'info':
    default:
      return toast(message);
  }
};

export default showToast;
