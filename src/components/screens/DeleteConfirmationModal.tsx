import React from 'react';
import { Trash2 } from 'lucide-react';
import { StatusBar } from '../common/Header';

interface DeleteConfirmationModalProps {
  itemName?: string;
  onConfirmDelete: () => void;
  onCancel: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  itemName = 'this item',
  onConfirmDelete,
  onCancel,
}) => {
  return (
    <div className="w-full h-full bg-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none">
      <StatusBar dark={false} />

      {/* Center Dialog */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Coral/Red Trash Badge */}
        <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 mb-5 border border-rose-200 shadow-sm">
          <Trash2 className="w-9 h-9 stroke-[1.8]" />
        </div>

        <h2 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">Delete Item</h2>
        <p className="text-xs text-slate-500 max-w-[240px] leading-relaxed">
          Are you sure you want to delete <span className="font-semibold text-slate-800">{itemName}</span> from your wardrobe?
        </p>
      </div>

      {/* Buttons */}
      <div className="p-6 space-y-2.5">
        <button
          onClick={onConfirmDelete}
          className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-semibold rounded-2xl text-sm shadow-md shadow-rose-600/25 transition-all text-center"
        >
          Delete
        </button>
        <button
          onClick={onCancel}
          className="w-full py-3 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-colors text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
