type Result = string | number;
export type Operation = "multiply" | "divide" | "add";

export const calculator = (a: number, b: number, op: Operation): Result => {
  switch (op) {
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    case "add":
      return a + b;
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

try {
  console.log(calculator(1, 5, "divide"));
} catch (e) {
  if (e instanceof Error) {
    console.log(`Something went wrong, error message:  ${e.message}`);
  }
}
