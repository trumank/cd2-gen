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

interface MutateByPlayerCount<T> {
  Mutate: "ByPlayerCount";
  Values: T[];
}

interface MutateIf<T> {
  Mutate: "If";
  Condition: ValueBoolean;
  Then: T;
  Else: T;
}

type Resource = "Gold"; // TODO fill out

export type ValueNumber =
  | number
  | {
    Mutate: "Add" | "Subtract" | "Multiply" | "Divide" | "Pow";
    A: ValueNumber;
    B: ValueNumber;
  }
  | {
    Mutate: "TimeDelta";
    InitialValue: ValueNumber;
    RateOfChange: ValueNumber;
  }
  | {
    Mutate: "Accumulate";
    Value: ValueNumber;
    Initial: ValueNumber;
    Min: ValueNumber;
    Max: ValueNumber;
  }
  | { Mutate: "ResuppliesCalled" }
  | { Mutate: "ResupplyUsesLeft" }
  | { Mutate: "DwarvesDown" }
  | { Mutate: "DwarvesAmmo" }
  | { Mutate: "EnemyCount"; ED: string }
  | { Mutate: "DepositedResource"; Resource: Resource }
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
  | MutateIfFloat<ValueNumber>
  | MutateByPlayerCount<ValueNumber>;
export type ValueBoolean =
  | boolean
  | { Mutate: "DuringDread" }
  | { Mutate: "DuringExtraction" }
  | { Mutate: "DuringMission"; StartingAt: ValueNumber }
  | MutateRandomChoice<ValueBoolean>
  | MutateRandomChoicePerMission<ValueBoolean>
  | MutateIf<ValueBoolean>
  | MutateIfFloat<ValueBoolean>
  | MutateByPlayerCount<ValueBoolean>;
export type ValueString =
  | string
  | MutateRandomChoice<ValueString>
  | MutateRandomChoicePerMission<ValueString>
  | MutateIf<ValueString>
  | MutateIfFloat<ValueString>
  | MutateByPlayerCount<ValueString>;
export type ValueList = (
  | string
  | MutateRandomChoice<ValueList>
  | MutateRandomChoicePerMission<ValueList>
  | MutateIf<ValueList>
  | MutateIfFloat<ValueList>
  | MutateByPlayerCount<ValueList>
)[];
