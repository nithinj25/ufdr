import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose?: () => void;
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(() => onClose && onClose(), 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed right-4 bottom-4 px-4 py-2 rounded shadow-lg ${type === 'error' ? 'bg-red-500/90' : 'bg-green-500/90'} text-white`}>
      {message}
    </div>
  );
}
