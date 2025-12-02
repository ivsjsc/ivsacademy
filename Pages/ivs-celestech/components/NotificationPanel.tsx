
import React from 'react';
import { Bell, Check, Trash2, Info, AlertTriangle, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useAppContext } from '../App';
import { NotificationItem } from '../types';

interface Props {
  onClose: () => void;
}

const NotificationPanel: React.FC<Props> = ({ onClose }) => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, trans, language } = useAppContext();

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'alert': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const formatTime = (date: Date) => {
    const diff = Math.floor((new Date().getTime() - date.getTime()) / 60000);
    if (diff < 1) return trans.just_now;
    if (diff < 60) return `${diff} ${trans.min_ago}`;
    return `${Math.floor(diff / 60)} ${trans.hour_ago}`;
  };

  return (
    <div className="absolute top-14 right-2 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-800 z-50 animate-in fade-in slide-in-from-top-2 overflow-hidden flex flex-col max-h-[500px]">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
        <h3 className="font-bold text-primary dark:text-dark-text flex items-center gap-2">
          <Bell className="w-4 h-4" />
          {trans.notifications}
          {notifications.filter(n => !n.isRead).length > 0 && (
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {notifications.filter(n => !n.isRead).length}
            </span>
          )}
        </h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={markAllAsRead}
            className="text-xs text-secondary hover:underline font-medium"
          >
            {trans.mark_all_read}
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full">
            <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="overflow-y-auto flex-1 p-2">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
            <Bell className="w-12 h-12 mb-2 opacity-20" />
            <p className="text-sm">{trans.no_notifications}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((item) => (
              <div 
                key={item.id} 
                onClick={() => markAsRead(item.id)}
                className={`group relative p-3 rounded-lg border transition-all cursor-pointer flex gap-3 ${
                  item.isRead 
                    ? 'bg-white dark:bg-slate-900 border-transparent hover:bg-gray-50 dark:hover:bg-slate-800' 
                    : 'bg-blue-50/40 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/50 hover:border-blue-200 dark:hover:border-blue-800'
                }`}
              >
                <div className="mt-1 flex-shrink-0">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 pr-6">
                  <h4 className={`text-sm font-semibold mb-0.5 ${item.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-primary dark:text-white'}`}>
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {item.message}
                  </p>
                  <span className="text-[10px] text-gray-400 mt-2 block">
                    {formatTime(new Date(item.timestamp))}
                  </span>
                </div>
                
                {/* Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteNotification(item.id); }}
                    className="p-1 hover:bg-red-50 dark:hover:bg-red-900/50 text-gray-400 hover:text-red-500 rounded"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  {!item.isRead && (
                    <button className="p-1 hover:bg-blue-50 dark:hover:bg-blue-900/50 text-blue-500 rounded">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
