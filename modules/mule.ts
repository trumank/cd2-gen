import { ModuleBase } from "./base.ts";
import { ValueNumber } from "../values/mod.ts";

export interface ModuleMule extends ModuleBase {
  Scale?: ValueNumber;
  TimeDilation?: ValueNumber;
}
