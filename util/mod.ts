import { ASTNode, parse } from "./exp.ts";
import { ValueNumber } from "../values/mod.ts";

export function exp(exp: string): ValueNumber {
  function convert(node: ASTNode): ValueNumber {
    switch (node.type) {
      case "BinaryOperation": {
        const ops: Record<string, "Add" | "Subtract" | "Multiply" | "Divide"> =
          {
            "+": "Add",
            "-": "Subtract",
            "*": "Multiply",
            "/": "Divide",
          };
        return {
          Mutate: ops[node.value],
          A: convert(node.left),
          B: convert(node.right),
        };
      }
      case "FunctionCall":
        switch (node.value) {
          case "ResuppliesCalled":
            return { Mutate: "ResuppliesCalled" };
          case "TimeDelta":
            return {
              Mutate: "TimeDelta",
              InitialValue: convert(node.args[0]),
              RateOfChange: convert(node.args[1]),
            };
          default:
            throw new Error(`unknown function ${node.value}`);
        }
      case "Number":
        return node.value;
    }
  }

  return convert(parse(exp));
}
