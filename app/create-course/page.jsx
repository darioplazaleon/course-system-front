"use client";

import { useEffect, useState } from "react";

import CreateModules from "@/app/components/CreateModules";
import CreateLesson from "@/app/components/CreateLesson";

function Step1({ nextStep }) {
  return (
    <section className="w-full flex flex-col items-center justify-center text-white">
      <h2 className="font-bold">Step 1: Course information</h2>
      <div className="w-2/5 relative">
        <form action="" className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-bold text-xl">
              Title
            </label>
            <input
              type="text"
              className="h-14 rounded text-black pl-2"
              name="title"
              placeholder="IT course..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-bold text-xl">
              Description
            </label>
            <input
              type="text"
              className="h-14 rounded text-black pl-2"
              name="description"
              placeholder="Many technologies..."
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              onClick={nextStep}
              className="w-24 h-10 bg-green-500 text-black rounded"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Step2({ prevStep, nextStep }) {
  const [modules, setModules] = useState([]);

  const addModule = (module) => {
    console.log(module);
    setModules((prevModules) => [
      ...prevModules,
      { name: module, lessons: [] },
    ]);
  };

  const addLesson = (moduleIndex, lesson) => {
    setModules((prevModules) => {
      const newModules = [...prevModules];
      newModules[moduleIndex] = {
        ...newModules[moduleIndex],
        lessons: [...newModules[moduleIndex].lessons, lesson],
      };
      return newModules;
    });
  };

  return (
    <section className="w-full min-h-4/6 text-white flex flex-col items-center justify-center gap-10">
      <h2 className="font-bold text-xl">Step 2: Course modules & lessons</h2>
      <div className="w-full h-full ml-10 flex gap-4">
        {modules.map((module, index) => (
          <div
            key={index}
            className="bg-white h-auto w-40 rounded flex flex-col items-center gap-4"
          >
            <p className="font-bold text-black">{module.name}</p>
            {module.lessons.map((lesson, index) => (
              <div key={index} className="h-14 bg-gray-700 text-white rounded w-11/12">
                <p className="font-bold text-center">{lesson.title}</p>
              </div>
            ))}
            <CreateLesson addLesson={addLesson} moduleIndex={index} />
          </div>
        ))}
        <CreateModules addModule={addModule} />
      </div>
    </section>
  );
}

function Step3({ modules, prevStep }) {}

export default function CreateCoursePage() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <main className="w-full h-auto flex flex-col items-center justify-center gap-10">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold h-20">Create a course</h1>
        <span>Step {step} of 3</span>
      </div>
      {step === 1 && <Step1 nextStep={nextStep} />}
      {step === 2 && <Step2 prevStep={prevStep} nextStep={nextStep} />}
      {step === 3 && <Step3 prevStep={prevStep} />}
    </main>
  );
}
