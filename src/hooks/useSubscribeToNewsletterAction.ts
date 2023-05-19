"use client";

import { useState, useTransition } from "react";

import { subscribeToNewsletterAction } from "@/actions/subscribe-to-newsletter-action";
import type { NewsletterSubscribeErroCode } from "@/utils/error-codes";

type FormData = {
  email: string;
};

type UseSubscribeToNewsletterActionReturn = [
  {
    isSuccess: boolean;
    isPending: boolean;
    error?: NewsletterSubscribeErroCode;
  },
  {
    onSubscribe: (data: FormData) => Promise<void>;
  }
];

export const useSubscribeToNewsletterAction =
  (): UseSubscribeToNewsletterActionReturn => {
    const [isSuccess, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<
      NewsletterSubscribeErroCode | undefined
    >();
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
