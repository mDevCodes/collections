"use client";
import { FormEvent } from "react";

export default function Register() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    console.log(response);
  };
  return (
    <form
      className="flex flex-col mx-auto max-w-md mt-6"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="rounded-md mt-1 text-black p-1 pl-2.5"
        />
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="rounded-md mt-1 text-black p-1 pl-2.5"
        />
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
