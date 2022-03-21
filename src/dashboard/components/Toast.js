import { toast } from 'react-toastify';

function Toast(message, type) {
    const options = {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
    };

    if ('success' === type) {
        return toast.success(message, options);
    } else if ('error' === type) {
        return toast.error(message, options);
    } else {
        return toast.info(message, options);
    }
}

export default Toast;
