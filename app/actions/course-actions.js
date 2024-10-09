"use server";

import { z } from "zod";
import { backUri } from "../security/Security";

const moduleSchema = z.object({
  title: z.string().min(3, {
    message: "Title is required and must be at least 3 characters long",
  }).max(100, {
    message: "Title must be less than 100 characters long",
  }),
});

const lessonSchema = z.object({
  title: z.string().min(3, {
    message: "Title is required and must be at least 3 characters long",
  }).max(100, {
    message: "Title must be less than 100 characters long",
  }),
  video: z.string().min(10, {
    message: "Content is required and must be at least 10 characters long",
  }),
});


export const createModule = async (prevState, formData) => {
  const validatedFields = moduleSchema.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const newModule = validatedFields.data;

  return {
    module: newModule,
  };
};

export const createLesson = async (prevState, formData) => {
  const validatedFields = lessonSchema.safeParse({
    title: formData.get("title"),
    video: formData.get("video"),
  });

  if (!validatedFields.success) {
    console.log(prevState)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const newLesson = validatedFields.data;

  console.log(newLesson)
  return {
    lesson: newLesson,
  };
}