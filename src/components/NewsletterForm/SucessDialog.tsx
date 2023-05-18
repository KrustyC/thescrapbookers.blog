"use client";

import { Dialog } from "@headlessui/react";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

// @TODO REMEMEBR TO USE TRANSLATIONS

export const SuccessDialog: React.FC<SuccessDialogProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
          <Dialog.Title>Thanks for subscribing</Dialog.Title>

          <Dialog.Description>
            Thanks for subscribing! We promise we will not spam you with tons of
            emails.
          </Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
