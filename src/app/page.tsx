"use client"

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [number, setNumber] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [undo, setUndo] = useState<(() => void)[]>([]);
  const [redo, setRedo] = useState<(() => void)[]>([]);

  const addNumber = (): void => {
    if (number + 1 <= 150) {
      setUndo([...undo, subtractNumber]);
      setNumber(number + 1);

    } else {
      setErrorMsg("Number should not be more than 150");
    }
  };

  const subtractNumber = (): void => {
    if (number - 1 >= 0) {
      setUndo([...undo, addNumber]);
      setNumber(number - 1);

    } else {
      setErrorMsg("Number should not be less than 0");
    }
  };

  const undoNumber = () => {
    if (undo.length === 0) {
      setErrorMsg("Now, you can't apply undo.");

    } else {
      const lastAction = undo.pop();
      if (lastAction) {
        lastAction();
        setRedo([...redo, lastAction]);
      }
      setUndo([...undo]);
    }
  };

  const redoNumber = () => {
    if (redo.length === 0) {
      setErrorMsg("Now, you can't apply redo.");

    } else {
      const lastRedoAction = redo.pop();
      if (lastRedoAction) {
        lastRedoAction();
      }
      setRedo([...redo]);
    }
  };

  useEffect(() => {
    setErrorMsg("");
  }, [number]);

  return (
    <main className=" h-screen w-screen place-content-center dark:text-white bg-slate-500">
      <div className=" text-center p-3 m-3 flex flex-col border border-white w-5/6 h-auto rounded-md">
        <div className="p-1 m-1 w-full bg-gray-200 rounded-full dark:bg-gray-700">{/*bg-blue-600*/}
          <div className={`animate-pulse bg-gradient-to-r from-red-500 from-20% via-yellow-300 via-30% to-emerald-500 to-80% text-xs text-blue-100 text-right p-0.5 font-bold leading-none rounded-full `} style={{ width: `${((number / 150) * 100)}%` }}>
            {((number /150) *100).toFixed(2)}%</div>
        </div>
        <p className="text-center text-sm text-red-500 p-3">{errorMsg}</p>

        <div className="text-center">
          <input
            className="h-10 w-20 m-5 pl-2 rounded-md outline-none font-semibold text-center text-2xl text-blue-500"
            type="number"
            placeholder="Enter a number"
            value={number}
//            onChange={(e) => setNumber(Number(e.target.value))}
          />
        </div>

        <div className="flex justify-center p-2">
          <div className="flex justify-center h-auto w-auto mr-3 ">
            <button className="border rounded-md p-3 m-1  hover:bg-gray-400" onClick={addNumber}>
              Add
            </button>
          </div>

          <div className="flex justify-center h-auto w-auto ml-3 ">
            <button className="border rounded-md p-3 m-1  hover:bg-gray-400"  onClick={subtractNumber}>
              Subtract
            </button>
          </div>

        </div>

        <div className="flex justify-center p-2">
          <div className="flex justify-center h-auto w-auto mr-3 ">
            <button className="border rounded-md p-3 m-1  hover:bg-gray-400" onClick={undoNumber}>
              Undo
            </button>
          </div>

          <div className="flex justify-center h-auto w-auto ml-3 ">
            <button className="border rounded-md p-3 m-1  hover:bg-gray-400"  onClick={redoNumber}>
              Redo
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}