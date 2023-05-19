"use client";

import { Dialog } from "@headlessui/react";

import {
  NEWSLETTER_SUBSCIRBE_ERRORS,
  NewsletterSubscribeErroCode,
} from "@/utils/error-codes";

interface ErrorDialogProps {
  isOpen: boolean;
  error: NewsletterSubscribeErroCode;
  onClose: VoidFunction;
  messages: {
    title: string;
    generic: string;
    userAlreadyExist: string;
  };
}

export const ErrorDialog: React.FC<ErrorDialogProps> = ({
  isOpen,
  error,
  onClose,
  messages,
}) => {
  const getErorMessage = () => {
    switch (error) {
      case NEWSLETTER_SUBSCIRBE_ERRORS.USER_ALREADY_EXISTS:
        return messages.userAlreadyExist;
      default:
        return messages.generic;
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
          <Dialog.Title>{messages.title}</Dialog.Title>
          <Dialog.Description>{getErorMessage()}</Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
