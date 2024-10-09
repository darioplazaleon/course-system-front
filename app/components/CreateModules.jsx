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
import { createModule } from "../actions/course-actions";
import { useEffect, useState } from "react";

const initialState = {
  message: "",
};

export default function CreateModules({ addModule }) {
  const [state, formAction] = useFormState(createModule, initialState);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state?.module) {
      addModule(state.module.title);
      setOpen(false);
    }
  }, [state.module]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="w-32 h-12 bg-blue-500 rounded">
            Create module
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create module</DialogTitle>
            <DialogDescription>Create a title for the module</DialogDescription>
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
                {state?.errors?.title && (
                  <p aria-live="polite" className="text-red-500">
                    {state.errors.title[0]}
                  </p>
                )}
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
    </>
  );
}
