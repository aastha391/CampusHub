import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts } = useApp();
  const icons = { success: <CheckCircle size={16} color="var(--accent-green)" />, error: <AlertCircle size={16} color="var(--accent-red)" />, info: <Info size={16} color="var(--accent-blue)" /> };

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          {icons[t.type]}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
