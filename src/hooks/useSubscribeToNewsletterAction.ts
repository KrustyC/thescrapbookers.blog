"use client";

import { useState, useTransition } from "react";
import { subscribeToNewsletterAction } from "actions/subscribe-to-newsletter-action";

type FormData = {
  email: string;
};

type UseSubscribeToNewsletterActionReturn = [
  {
    isSuccess: boolean;
    isPending: boolean;
    error?: string;
  },
  {
    onSubscribe: (data: FormData) => Promise<void>;
  }
];

export const useSubscribeToNewsletterAction =
  (): UseSubscribeToNewsletterActionReturn => {
    const [isSuccess, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [isPending, startTransaction] = useTransition();

    const onSubscribe = async (data: FormData) => {
      setError(undefined);

      startTransaction(async () => {
        const { success, error } = await subscribeToNewsletterAction(data);

        if (success) {
          setSuccess(true);
          return;
        }

        if (error) {
          setError(error);
        }
      });
    };

    return [
      {
        isSuccess,
        isPending,
        error,
      },
      {
        onSubscribe,
      },
    ];
  };
