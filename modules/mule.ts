import { ModuleBase } from "./base.ts";
import { ValueNumber } from "../values/mod.ts";

export interface Mule extends ModuleBase {
  Scale?: ValueNumber;
  TimeDilation?: ValueNumber;
}
