import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface PolicyDialogProps {
  title: string;
  content: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PolicyDialog({ title, content, open, onOpenChange }: PolicyDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg focus:outline-none overflow-y-auto">
          <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
            {title}
          </Dialog.Title>
          <div className="text-gray-600 space-y-4">
            {content}
          </div>
          <Dialog.Close className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
            <X className="h-5 w-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}