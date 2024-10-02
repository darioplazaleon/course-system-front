"use client";

import Link from "next/link";
import { createUser } from "../actions/user-actions";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

export default function SignupPage() {
  const [state, formAction] = useFormState(createUser, initialState);

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <button className="absolute top-0 left-0 m-4 text-white w-36 h-12 font-bold text-2xl">
        <Link href="/">Go Back</Link>
      </button>
      <section className="w-full h-full flex flex-col justify-center items-center gap-10">
        <h1 className="text-3xl text-white font-bold">
          Sign up and start learning
        </h1>
        <form
          action={formAction}
          className="bg-white w-3/12 h-3/5 flex flex-col items-center justify-center gap-8 rounded-lg"
        >
          <div className="flex flex-col gap-2 w-4/6">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              required
              className="rounded-lg pl-2 h-14 border-black border"
            />
            {state?.errors?.name && (
              <p aria-live="polite" className="text-red-500">
                {state.errors.name[0]}
              </p>
            )}
          </div>
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
          <button
            type="submit"
            className="w-28 h-12 bg-gray-800 text-white rounded-lg mt-4"
          >
            Sign up
          </button>
        </form>
      </section>
    </main>
  );
}
