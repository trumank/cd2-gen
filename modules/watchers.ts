import { ModuleBase } from "./base.ts";
import { ValueBoolean, ValueNumber } from "../values/mod.ts";

export interface Watchers extends ModuleBase {
  Values: {
    [key: string]: {
      Boolean: ValueBoolean;
    } | {
      Float: ValueNumber;
    };
  };
}
