"use client";

import { createContext, FC, ReactNode, useContext, useState } from "react";

type InputType = {
  id: string;
  target: string;
  currentText: string;
};

type InputTextContextType = {
  inputs: InputType[];
  addInput: (input: InputType) => void;
  editInputText: (inputId: string, text: string) => void;
  getInputText: (targetId: string) => string;
};

const InputTextContext = createContext<InputTextContextType>({
  addInput: ({ currentText, id, target }) => {},
  getInputText: () => "",
  editInputText: () => {},
  inputs: [],
});

// provider
type InputTextProvider = {
  children: ReactNode;
};

const { Provider } = InputTextContext;
export const InputTextProvider: FC<InputTextProvider> = ({ children }) => {
  const [inputs, setInputs] = useState<InputType[]>([]);

  const addInput = ({ currentText, id, target }: InputType) => {
    if (!target) return;

    // Use the functional form of state update
    setInputs((prevInputs) => {
      const isInputExist = prevInputs.findIndex((input) => input.id === id);
      if (isInputExist !== -1) return prevInputs;

      // Return the new array with the added input
      return [...prevInputs, { currentText, id, target }];
    });
  };

  const getInputText = (targetId: string) =>
    inputs.find((inp) => inp.target === targetId)?.currentText ?? "";

  const editInputText = (inputId: string, text: string) => {
    setInputs((prevInput) =>
      prevInput.map((input) =>
        input.id === inputId ? { ...input, currentText: text } : input
      )
    );
  };

  return (
    <Provider
      value={{
        editInputText,
        addInput,
        getInputText,
        inputs,
      }}
    >
      {children}
    </Provider>
  );
};

const useInputText = () => {
  const context = useContext(InputTextContext);
  if (!context)
    throw new Error(
      "You have to use useInputText hook insite InputTextProvider"
    );

  return context as InputTextContextType;
};

export default useInputText;
