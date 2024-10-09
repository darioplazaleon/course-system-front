import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { useFormState } from "react-dom";
import { createLesson } from "../actions/course-actions";
import { useEffect } from "react";

const initialState = {
  message: "",
};

export default function CreateLesson({ addLesson, moduleIndex }) {
  const [state, formAction] = useFormState(createLesson, initialState);

  useEffect(() => {
    if (state?.lesson) {
      addLesson(moduleIndex, state.lesson);
    }
  }, [state.lesson]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-36 h-12 bg-blue-500 text-white rounded">
          Create Lesson
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create lesson</DialogTitle>
          <DialogDescription>Create a lesson for the module</DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <form action={formAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-bold">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="rounded border border-black pl-2 h-12"
                placeholder="Module title..."
              />
            </div>
            {state?.errors?.title && (
              <p aria-live="polite" className="text-red-500">
                {state.errors.title[0]}
              </p>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-bold">
                Video
              </label>
              <input
                type="text"
                name="video"
                id="video"
                className="rounded border border-black pl-2 h-12"
                placeholder="Video link"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="w-20 h-12 bg-green-500 text-white rounded"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
