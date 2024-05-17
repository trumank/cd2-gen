import { ValueNumber } from "../values/mod.ts";
import { ModuleBase } from "./base.ts";

export interface Mule extends ModuleBase {
  Scale?: ValueNumber;
  TimeDilation?: ValueNumber;
}
