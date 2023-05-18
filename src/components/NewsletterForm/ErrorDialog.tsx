"use client";

import { Dialog } from "@headlessui/react";

interface ErrorDialogProps {
  isOpen: boolean;
  message: string;
  onClose: VoidFunction;
}

// @TODO REMEMEBR TO USE TRANSLATIONS by USING ERROR CODES AND A SWITCH TO DISPLAY THE MESSAGE IN THE RIGHT LANGUAGE

export const ErrorDialog: React.FC<ErrorDialogProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
          <Dialog.Title>Something went wrong</Dialog.Title>
          <Dialog.Description>
            We couldn't subscribe you to our newsletter. Please try again later
          </Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
