import { useEffect, useRef, useState } from "react";

export const InputNumber = ({
  buttonText,
  onSubmit,
}: {
  buttonText: string;
  onSubmit: (x: number) => void;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  const [value, setValue] = useState(0);
  return (
    <div>
      <div>
        <input
          type="number"
          min={0}
          ref={ref}
          value={value}
          onChange={(event) => setValue(parseInt(event.target.value))}
        ></input>
        <button onClick={() => onSubmit(value)}>{buttonText}</button>
      </div>
    </div>
  );
};

type FizzBuzzState =
  | { _tag: "Input" }
  | { _tag: "started"; startNumber: number };

export const FizzBuzzInternal = ({ startNumber }: { startNumber: number }) => {
  const [value, setValue] = useState(startNumber);
  const divisiableBy3 = value % 3 === 0;
  const divisiableBy5 = value % 5 === 0;
  return (
    <div>
      <button onClick={() => setValue((old) => old + 1)}>+</button>
      <b data-testid="fizzbuzz_text">
        {divisiableBy3 && divisiableBy5
          ? "Fizz Buzz"
          : divisiableBy3
          ? "Fizz"
          : divisiableBy5
          ? "Buzz"
          : value}{" "}
      </b>
      <button onClick={() => setValue((old) => old - 1)}>-</button>
    </div>
  );
};
export const FizzBuzz = () => {
  const [state, setState] = useState<FizzBuzzState>({ _tag: "Input" });
  return (
    <div data-testid="fizzbuzz_container">
      {state._tag === "Input" ? (
        <InputNumber
          onSubmit={(x) => setState({ _tag: "started", startNumber: x })}
          buttonText="start"
        ></InputNumber>
      ) : (
        <FizzBuzzInternal startNumber={state.startNumber}></FizzBuzzInternal>
      )}
    </div>
  );
};
