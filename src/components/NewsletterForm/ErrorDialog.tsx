"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { XMarkIcon } from "@/icons/XMark";
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
    cta: string;
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
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 data-enter:ease-out data-leave:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 data-enter:ease-out data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:data-closed:translate-y-0 sm:data-closed:scale-95"
          >
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <XMarkIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-red-600"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  {messages.title}
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{getErorMessage()}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full mt-5 sm:mt-6">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg h-10 w-1/2 bg-black text-white px-12"
              >
                {messages.cta}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
