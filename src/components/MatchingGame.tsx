"use client";

import React, { useState, useEffect } from "react";

interface MatchingGameProps {
  data: { [country: string]: string };
}

interface Option {
  name: string;
  type: string;
  matched: boolean;
}

interface SelectedOption {
  index: number;
  name: string;
}

const MatchingGame: React.FC<MatchingGameProps> = ({ data }) => {
  const [arr, setArr] = useState<Array<Option>>([]);
  const [selected, setSelected] = useState<Array<SelectedOption>>([]);

  useEffect(() => {
    const countries = Object.keys(data).map((country) => ({
      name: country,
      type: "country",
      matched: false,
    }));

    const capitals = Object.values(data).map((capital) => ({
      name: capital,
      type: "capital",
      matched: false,
    }));

    const shuffled = [...countries, ...capitals];
    for (let i = shuffled.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setArr(shuffled);
  }, [data]);

  const handleOptionClick = (index: number) => {
    if (selected.length === 2 || arr[index].matched) return;

    const newSelection = [...selected, { index, name: arr[index].name }];
    setSelected(newSelection);

    if (newSelection.length === 2) {
      const [first, second] = newSelection;
      const isMatch =
        (data[first.name] === second.name ||
          data[second.name] === first.name) &&
        arr[first.index].type !== arr[second.index].type;

      setTimeout(() => {
        if (isMatch) {
          setArr((prevArr) =>
            prevArr.map((ar, i) => i === first.index || i === second.index ? { ...ar, matched: true } : ar)
          );
        }
        setSelected([]);
      }, 1000);
    }
  };

  const isSelected = (index: number) => {
    for (let i = 0; i < selected.length; i++) {
      if (selected[i].index === index) {
        return true;
      }
    }
    return false;
  };

  const allMatched = arr.every((ar) => ar.matched);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-3xl font-bold m-4 md:m-8 md:mb-12">
        Country-Capital Matching Game
      </h1>
      <div className="flex flex-wrap md:grid grid-cols-7 m-4 mb-0 gap-4">
        {arr.map((ar, index) => (
          <button
            key={index}
            className={`p-4 rounded border-2 text-center ${
              ar.matched
                ? "opacity-0"
                : isSelected(index)
                ? selected.length === 2
                  ? data[selected[0].name] === selected[1].name ||
                    data[selected[1].name] === selected[0].name
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-blue-500"
                : "border-gray-600"
            }`}
            onClick={() => {
              if (!ar.matched) handleOptionClick(index);
            }}
          >
            {ar.name}
          </button>
        ))}
      </div>
      {allMatched && (
        <p className="text-2xl text-green-500">Congratulations!</p>
      )}
    </div>
  );
};

export default MatchingGame;
