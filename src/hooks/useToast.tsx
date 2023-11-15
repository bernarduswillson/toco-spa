import { toast, ToastOptions } from 'react-toastify';

const useToast = () => {
  const options: ToastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  };

  const showToast = (message: string, type: 'success' | 'warning' | 'error') => {
    if (type === 'success') {
      toast.success(message , options);
      return;
    }

    if (type === 'warning') {
      toast.warning(message , options);
      return;
    }

    if (type === 'error') {
      toast.error(message , options);
      return;
    }
  }

  return { showToast };
};

export default useToast;