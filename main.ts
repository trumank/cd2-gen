import * as Pools from "./modules/pools.ts";
import * as DifficultySetting from "./modules/difficulty_setting.ts";
import * as Enemies from "./modules/enemies.ts";
import * as WaveSpawners from "./modules/wave_spawners.ts";
import * as Caps from "./modules/caps.ts";
import * as Resupply from "./modules/resupply.ts";
import * as EscortMule from "./modules/escort_mule.ts";
import * as Watchers from "./modules/watchers.ts";
import { ASTNode, parse } from "./util/exp.ts";

export interface Difficulty {
  Name: string;
  Description?: string;
  Pools?: Pools.Pools;
  DifficultySetting?: DifficultySetting.DifficultySetting;
  Enemies?: Enemies.Enemies;
  EnemiesNoSync?: Enemies.Enemies;
  WaveSpawners?: WaveSpawners.WaveSpawners;
  Caps?: Caps.Caps;
  Resupply?: Resupply.Resupply;
  EscortMule?: EscortMule.EscortMule;
  Watchers?: Watchers.Watchers;
}

interface MutateRandomChoice<T> {
  Mutate: "RandomChoice";
  // TODO check same length?
  Choices: T[];
  Weights?: ValueNumber[];
}
interface MutateRandomChoicePerMission<T> {
  Mutate: "RandomChoicePerMission";
  // TODO check same length?
  Choices: T[];
  Weights?: ValueNumber[];
}

interface MutateIfFloat<T> {
  Mutate: "IfFloat";
  Value: ValueNumber;
  // TODO require exactly 1 of the following
  ">="?: ValueNumber;
  "<="?: ValueNumber;
  ">"?: ValueNumber;
  "<"?: ValueNumber;
  "=="?: ValueNumber;
  Then: T;
  Else: T;
}

interface MutateIf<T> {
  Mutate: "If";
  Condition: ValueBoolean;
  Then: T;
  Else: T;
}

export type ValueNumber =
  | number
  | {
    Mutate: "Add" | "Subtract" | "Multiply" | "Divide";
    A: ValueNumber;
    B: ValueNumber;
  }
  | {
    Mutate: "TimeDelta";
    InitialValue: ValueNumber;
    RateOfChange: ValueNumber;
  }
  | { Mutate: "ResuppliesCalled" }
  | { Mutate: "EnemyCount"; ED: string }
  | {
    Mutate: "EnemyCooldown";
    EDs: ValueList;
    CooldownTime: ValueNumber;
    ValueDuringCooldown: ValueNumber;
    DefaultValue: ValueNumber;
  }
  | MutateRandomChoice<ValueNumber>
  | MutateRandomChoicePerMission<ValueNumber>
  | MutateIf<ValueNumber>
  | MutateIfFloat<ValueNumber>;
export type ValueBoolean =
  | boolean
  | { Mutate: "DuringDread" }
  | { Mutate: "DuringMission"; StartingAt: ValueNumber }
  | MutateRandomChoice<ValueBoolean>
  | MutateRandomChoicePerMission<ValueBoolean>
  | MutateIf<ValueBoolean>
  | MutateIfFloat<ValueBoolean>;
export type ValueString =
  | string
  | MutateRandomChoice<ValueString>
  | MutateRandomChoicePerMission<ValueString>
  | MutateIf<ValueString>
  | MutateIfFloat<ValueString>;
export type ValueList = (
  | string
  | MutateRandomChoice<ValueList>
  | MutateRandomChoicePerMission<ValueList>
  | MutateIf<ValueList>
  | MutateIfFloat<ValueList>
)[];

function exp(exp: string): ValueNumber {
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

function generate(): Difficulty {
  return {
    Name: "My generated difficulty",
    Resupply: {
      Cost: 0,
      StartingNitra: 10,
    },
    Watchers: {
      Values: {
        Test: {
          Float: exp("4 / (6 + ResuppliesCalled()) * TimeDelta(1, 4)"),
        },
      },
    },
    DifficultySetting: {},
  };
}

console.log(JSON.stringify(generate(), null, 2));
