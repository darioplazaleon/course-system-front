"use server";

import { z } from "zod";
import { backUri } from "../security/Security";
import { error } from "console";
import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const userRegisterSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

const userLoginschema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string({ message: "Password is required" }),
});

export const createUser = async (prevState, formData) => {
  const validatedFields = userRegisterSchema.safeParse({
    name: formData.get("name"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const newUser = validatedFields.data;

  try {
    const response = await fetch(`${backUri}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    redirect("/login?register=success");
  } catch {
    return { error: error.message };
  }
};

export const loginUser = async (prevState, formData) => {
  const validatedFields = userLoginschema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const loginData = validatedFields.data;

  try {
    const response = await fetch(`${backUri}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    cookies().set("token", data.token, {
      sameSite: "None",
      secure: true,
    });
    revalidatePath("/");
  } catch (error) {
    return { error: error.message};
  }
  redirect("/")
};
