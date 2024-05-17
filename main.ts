import { exp } from "./util/mod.ts";
import { Difficulty } from "./difficulty.ts";

function generate(): Difficulty {
  const variable = exp("4 / (6 + ResuppliesCalled()) * TimeDelta(1, 4)");

  return {
    Name: "My generated difficulty",
    Resupply: {
      Cost: variable,
      StartingNitra: 10,
    },
    Watchers: {
      Values: {
        Test: {
          Float: variable,
        },
      },
    },
    DifficultySetting: {
      EnemyDamageModifier: [variable, variable, variable, variable],
    },
  };
}

const difficulty = generate();

console.log(Deno.inspect(difficulty, { depth: Infinity, colors: true }));
