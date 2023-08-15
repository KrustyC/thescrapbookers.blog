"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useSubscribeToNewsletterAction } from "@/hooks/useSubscribeToNewsletterAction";

import { ErrorDialog } from "./ErrorDialog";
import { SuccessDialog } from "./SucessDialog";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface NewsletterFormProps {
  messages: {
    inputPlaceholder: string;
    inputError: string;
    ctaText: string;
    dialogs: {
      success: {
        title: string;
        message: string;
      };
      error: {
        title: string;
        generic: string;
        userAlreadyExist: string;
      };
    };
  };
}

type FormData = {
  email: string;
};

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ messages }) => {
  const {
    handleSubmit,
    register,
    formState: { isValid, isDirty },
  } = useForm<FormData>();

  const [{ isPending, isSuccess, error }, { onSubscribe }] =
    useSubscribeToNewsletterAction();

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setShowSuccessDialog(true);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (error) {
      setShowErrorDialog(true);
    }
  }, [error]);

  return (
    <>
      <form
        autoComplete="off"
        className="flex flex-col w-full lg:w-auto lg:flex-row lg:justify-end lg:h-16 font-poppins"
        onSubmit={handleSubmit(onSubscribe)}
      >
        <input
          className="h-12 md:h-16 lg:h-full px-6 w-full lg:w-72 mb-4 lg:mb-0 lg:mr-4 md:border-2 md:border-black rounded-full md:rounded-2xl"
          type="email"
          autoComplete="off"
          disabled={isPending || isSuccess}
          placeholder={messages.inputPlaceholder}
          {...register("email", {
            required: true,
            pattern: {
              value: EMAIL_REGEX,
              message: messages.inputError,
            },
          })}
        />

        <button
          type="submit"
          className="rounded-full md:rounded-2xl h-12 md:h-16 lg:h-full w-full lg:w-56 bg-black text-white px-12 lg:ml-4 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isValid || !isDirty || isPending || isSuccess}
        >
          {messages.ctaText}
        </button>
      </form>

      <SuccessDialog
        messages={messages.dialogs.success}
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
      />

      <ErrorDialog
        messages={messages.dialogs.error}
        isOpen={showErrorDialog}
        error={error!}
        onClose={() => setShowErrorDialog(false)}
      />
    </>
  );
};
