import { parse } from "./util/exp.ts";
import { assertEquals } from "jsr:@std/assert";

Deno.test(function simpleExp() {
  assertEquals(parse("(5 + 8)"), {
    type: "BinaryOperation",
    value: "+",
    left: { type: "Number", value: 5 },
    right: { type: "Number", value: 8 },
  });
});

Deno.test(function complexExp() {
  assertEquals(parse("((5 + 8) / 3)"), {
    type: "BinaryOperation",
    value: "/",
    left: {
      type: "BinaryOperation",
      value: "+",
      left: { type: "Number", value: 5 },
      right: { type: "Number", value: 8 },
    },
    right: { type: "Number", value: 3 },
  });
});

Deno.test(function fnCallExp() {
  assertEquals(parse("(xyz(5 + 8) / 3)"), {
    type: "BinaryOperation",
    value: "/",
    left: {
      type: "FunctionCall",
      value: "xyz",
      args: [{
        type: "BinaryOperation",
        value: "+",
        left: { type: "Number", value: 5 },
        right: { type: "Number", value: 8 },
      }],
    },
    right: { type: "Number", value: 3 },
  });
});
