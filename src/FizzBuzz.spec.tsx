import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { FizzBuzz, FizzBuzzInternal, InputNumber } from "./FizzBuzz";
import exp from "constants";
describe("FizzBuzz", () => {
  describe("Input", () => {
    it("shoul show a button a number input and have focused ", () => {
      render(
        <InputNumber onSubmit={() => {}} buttonText="submit"></InputNumber>
      );
      const textBox = screen.getByRole("spinbutton");

      expect(textBox).toBeVisible();
      expect(textBox).toHaveAttribute("min", "0");
      expect(textBox).toHaveFocus();

      const button = screen.getByRole("button", { name: /submit/i });
      expect(button).toBeVisible();
    });

    it("when button click it shoud return a number", () => {
      const submitFn = jest.fn();
      render(
        <InputNumber onSubmit={submitFn} buttonText="submit"></InputNumber>
      );
      const textBox = screen.getByRole("spinbutton");
      act(() => {
        userEvent.type(textBox, "6");
      });

      const button = screen.getByRole("button", { name: /submit/i });
      fireEvent.click(button);

      expect(submitFn).toHaveBeenCalled();
      expect(submitFn).toHaveBeenCalledWith(6);
    });
  });

  describe("start fizzbuzz", () => {
    it("should show 1 after start", () => {
      render(<FizzBuzz></FizzBuzz>);
      const startButton = screen.getByRole("button", { name: /start/i });
      const textInput = screen.getByRole("spinbutton");

      act(() => {
        userEvent.type(textInput, "1");
      });

      fireEvent.click(startButton);
      const startButton_ = screen.queryAllByRole("button", { name: /start/i });
      expect(startButton_).toBeNull;

      const text = screen.getByText("1");
    });
  });

  describe("FizzBuzz Internall", () => {
    const clickPlus = (plus: HTMLElement, repeat: number) => {
      for (let i = 0; i < repeat; i++) {
        fireEvent.click(plus);
      }
    };
    const renderAndreturnInput = (startNumber: number) => {
      render(<FizzBuzzInternal startNumber={startNumber}></FizzBuzzInternal>);

      const plus = screen.getByRole("button", { name: "+" });
      const mins = screen.getByRole("button", { name: "-" });
      const text = screen.getByTestId("fizzbuzz_text");

      return { plus, mins, text };
    };
    it("shoud show two buttons", () => {
      const { mins, plus, text } = renderAndreturnInput(1);
      expect(plus).toBeVisible();
      expect(mins).toBeVisible();
      expect(text).toHaveTextContent("1");
    });
    it("should incremnet and decrement with plus and minus", () => {
      const { mins, plus, text } = renderAndreturnInput(1);
      fireEvent.click(plus);
      expect(text).toHaveTextContent("2");
      fireEvent.click(mins);
      expect(text).toHaveTextContent("1");
    });
    it("should show for 3 and 9", () => {
      const { mins, plus, text } = renderAndreturnInput(1);

      clickPlus(plus, 2);
      expect(text).toHaveTextContent("Fizz");
      clickPlus(plus, 6);
      expect(text).toHaveTextContent("Fizz");
    });
    it("should show for 5 and 10", () => {
      const { mins, plus, text } = renderAndreturnInput(1);

      clickPlus(plus, 4);
      expect(text).toHaveTextContent("Buzz");
      clickPlus(plus, 5);
      expect(text).toHaveTextContent("Buzz");
    });
    it("should show Fizz Buzz for 15", () => {
      const { mins, plus, text } = renderAndreturnInput(1);

      clickPlus(plus, 14);
      expect(text).toHaveTextContent("Fizz Buzz");
    });
  });
  describe("Snapshot testing", () => {
    it("should be ok", () => {
      render(<FizzBuzz></FizzBuzz>);

      const div = screen.getByTestId("fizzbuzz_container");
      expect(div).toMatchSnapshot();
    });
  });
});
