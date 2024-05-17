import { ValueBoolean, ValueNumber } from "../main.ts";

export interface Watchers {
  Values: {
    [key: string]: {
      Boolean: ValueBoolean;
    } | {
      Float: ValueNumber;
    };
  };
}
