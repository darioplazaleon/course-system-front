"use client";

import { useFormState } from "react-dom";
import { loginUser } from "../actions/user-actions";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

const initialState = {
  message: "",
};

export default function LoginPage() {
  const [state, formAction] = useFormState(loginUser, initialState);

  const searchParams = useSearchParams();
  const registerSuccess = searchParams.has("register");

  useEffect(() => {
    if (registerSuccess) {
      toast.success("Account created successfully. Please log in.");
    }
  }, [registerSuccess]);

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <section className="w-full h-full flex flex-col justify-center items-center gap-10">
        <h1 className="text-3xl text-white font-bold">
          Log in to your Courselint account
        </h1>
        {registerSuccess && (
          <p className="text-green-500 font-bold">
            Account created successfully. Please log in.
          </p>
        )}
        <form
          action={formAction}
          className="bg-white w-3/12 h-3/5 flex flex-col items-center justify-center gap-8 rounded-lg"
        >
          <div className="flex flex-col gap-2 w-4/6">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="jhon@example.com"
              required
              className="rounded-lg pl-2 h-14 border-black border"
            />
            {state?.errors?.email && (
              <p aria-live="polite" className="text-red-500">
                {state.errors.email[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-4/6">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              required
              className="rounded-lg pl-2 h-14 border-black border"
            />
            {state?.errors?.password && (
              <p aria-live="polite" className="text-red-500">
                {state.errors.password[0]}
              </p>
            )}
          </div>
          {state?.error && (
            <p aria-live="polite" className="text-red-500 text-center font-bold">
              {state.error}
            </p>
          )}
          <button
            type="submit"
            className="w-28 h-12 bg-gray-800 text-white rounded-lg mt-4"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
}
