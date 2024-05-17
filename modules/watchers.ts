import { ValueBoolean, ValueNumber } from "../values/mod.ts";

export interface Watchers {
  Values: {
    [key: string]: {
      Boolean: ValueBoolean;
    } | {
      Float: ValueNumber;
    };
  };
}
