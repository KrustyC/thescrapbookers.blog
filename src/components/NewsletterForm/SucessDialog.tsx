"use client";

import { Dialog } from "@headlessui/react";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: VoidFunction;
  messages: {
    title: string;
    message: string;
  };
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({
  isOpen,
  onClose,
  messages,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
          <Dialog.Title>{messages.title}</Dialog.Title>

          <Dialog.Description>{messages.message}</Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
