"use client";

import { useForm } from "react-hook-form";
import { poppins } from "utils/fonts";
import { useNewsletterSubscribeRequest } from "hooks/useNewsletterSubscribeRequest";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type FormData = {
  email: string;
  firstName?: string;
  lastName?: string;
};

const LoadingSpinner = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-6 h-6 text-sky-300 animate-spin fill-white"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  );
};

export const NewsletterForm: React.FC = ({}) => {
  const {
    handleSubmit,
    register,
    formState: { isValid, isDirty },
  } = useForm<FormData>();

  const { pending, success, error, onSubscribe } =
    useNewsletterSubscribeRequest<FormData>();

  if (success) {
    return (
      <div className="h-12 text-black text-xl flex items-center">
        Thanks for subscribing! Please check your inbox.
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-12 text-black text-xl flex items-center">
        Oops! You are already subscribed, no need to subscribe again :)
      </div>
    );
  }

  return (
    <form
      style={poppins.style}
      className="flex flex-col xl:flex-row gap-6 xl:gap-4"
      onSubmit={handleSubmit(onSubscribe)}
    >
      <input
        className="h-20 xl:h-12 text-2xl xl:text-base px-6 w-full bg-[#7EBDD5] rounded-full border-2 border-white text-white placeholder-current focus:outline-white"
        type="firstName"
        placeholder="First Name"
        {...register("firstName", { required: true })}
      />

      <input
        className="h-20 xl:h-12 text-2xl xl:text-base  px-6 w-full bg-[#7EBDD5] rounded-full border-2 border-white text-white placeholder-current focus:outline-white"
        type="email"
        placeholder="Email"
        {...register("email", {
          required: true,
          pattern: {
            value: EMAIL_REGEX,
            message: "Please enter a valid email",
          },
        })}
      />

      <button
        type="submit"
        className="h-20 xl:h-12 text-2xl xl:text-base rounded-full px-12 border-2 border-white text-[#7EBDD5] bg-white focus:bg-slate-50 placeholder-current focus:outline-white disabled:cursor-not-allowed disabled:opacity-70"
        disabled={!isValid || !isDirty || pending}
      >
        {pending ? <LoadingSpinner /> : "Send"}
      </button>
    </form>
  );
};
