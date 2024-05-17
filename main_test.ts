import { assertEquals } from "jsr:@std/assert";
import { Difficulty } from "./difficulty.ts";
import { exp } from "./util/mod.ts";
import { EnemyDescriptorList } from "./modules/enemies.ts";
import { ValueNumber } from "./values/mod.ts";
import { parse } from "./util/exp.ts";

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

Deno.test(function generateDifficulty() {
  const difficulty: Difficulty = {
    "Name": "Tutorial - Grouped Cooldown",
    "Pools": {
      "EnemyPool": {
        "Clear": true,
        "Add": [
          "ED_Spider_Grunt",
          {
            "Mutate": "RandomChoice",
            "Choices": [["ED_Opp1"], ["ED_Opp2"], ["ED_Opp3"]],
          },
        ],
      },
    },
    "DifficultySetting": {
      "BaseHazard": "Hazard 5",
      "EnemyDiversity": 1,
    },
    "Enemies": {
      "ED_Opp1": {
        "Base": "ED_Spider_ShieldTank",
        "DifficultyRating": 50,
        "UsesSpawnRarityModifiers": false,
        "MaxSpawnCount": 1,
        "DisplayName": "ED_Opp1",
        "Rarity": {
          "Mutate": "EnemyCooldown",
          "EDs": ["ED_Opp1", "ED_Opp2", "ED_Opp3"],
          "CooldownTime": 60,
          "ValueDuringCooldown": 1000,
          "DefaultValue": 1,
        },
      },
      "ED_Opp2": {
        "Base": "ED_Spider_ShieldTank",
        "DifficultyRating": 50,
        "UsesSpawnRarityModifiers": false,
        "MaxSpawnCount": 1,
        "DisplayName": "ED_Opp2",
        "Rarity": {
          "Mutate": "EnemyCooldown",
          "EDs": ["ED_Opp1", "ED_Opp2", "ED_Opp3"],
          "CooldownTime": 60,
          "ValueDuringCooldown": 1000,
          "DefaultValue": 1,
        },
      },
      "ED_Opp3": {
        "Base": "ED_Spider_ShieldTank",
        "DifficultyRating": 50,
        "UsesSpawnRarityModifiers": false,
        "MaxSpawnCount": 1,
        "DisplayName": "ED_Opp3",
        "Rarity": {
          "Mutate": "EnemyCooldown",
          "EDs": ["ED_Opp1", "ED_Opp2", "ED_Opp3"],
          "CooldownTime": 60,
          "ValueDuringCooldown": 1000,
          "DefaultValue": 1,
        },
      },
    },
    "WaveSpawners": [
      {
        "Enabled": true,
        "Interval": 3,
        "Difficulty": 50,
      },
    ],
  };

  function generateDifficulty(): Difficulty {
    const names = ["ED_Opp1", "ED_Opp2", "ED_Opp3"];
    function ed(name: string): EnemyDescriptorList {
      return {
        [name]: {
          Base: "ED_Spider_ShieldTank",
          DifficultyRating: 50,
          UsesSpawnRarityModifiers: false,
          MaxSpawnCount: 1,
          DisplayName: name,
          Rarity: {
            Mutate: "EnemyCooldown",
            EDs: names,
            CooldownTime: 60,
            ValueDuringCooldown: 1000,
            DefaultValue: 1,
          },
        },
      };
    }
    const eds = Object.fromEntries(
      names.map((name) => Object.entries(ed(name))).flat(),
    );
    return {
      Name: "Tutorial - Grouped Cooldown",
      Pools: {
        EnemyPool: {
          Clear: true,
          Add: [
            "ED_Spider_Grunt",
            {
              Mutate: "RandomChoice",
              Choices: Object.keys(eds).map((name) => [name]),
            },
          ],
        },
      },
      DifficultySetting: {
        BaseHazard: "Hazard 5",
        EnemyDiversity: 1,
      },
      Enemies: eds,
      WaveSpawners: [
        {
          Enabled: true,
          Interval: 3,
          Difficulty: 50,
        },
      ],
    };
  }

  assertEquals(difficulty, generateDifficulty());
});

Deno.test(function expression() {
  const value: ValueNumber = exp(
    "4 / (6 + ResuppliesCalled()) * TimeDelta(1, 4)",
  );

  assertEquals(value, {
    Mutate: "Multiply",
    A: {
      Mutate: "Divide",
      A: 4,
      B: { Mutate: "Add", A: 6, B: { Mutate: "ResuppliesCalled" } },
    },
    B: { Mutate: "TimeDelta", InitialValue: 1, RateOfChange: 4 },
  });
});
