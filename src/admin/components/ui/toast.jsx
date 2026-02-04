import { createContext, useContext, useState } from 'react';
import { cn } from '../../lib/utils';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
	const [toasts, setToasts] = useState([]);

	const addToast = (message, variant = 'success') => {
		const id = Date.now();
		setToasts((prev) => [...prev, { id, message, variant }]);
		setTimeout(() => removeToast(id), 3000);
	};

	const removeToast = (id) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	};

	return (
		<ToastContext.Provider value={{ addToast }}>
			{children}
			<div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
				{toasts.map((toast) => (
					<div
						key={toast.id}
						className={cn(
							'px-4 py-3 rounded-lg shadow-lg animate-slide-up',
							toast.variant === 'success' && 'bg-green-500 text-white',
							toast.variant === 'error' && 'bg-destructive text-white',
							toast.variant === 'info' && 'bg-primary text-white'
						)}
					>
						{toast.message}
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error('useToast must be used within ToastProvider');
	}
	return context;
};
