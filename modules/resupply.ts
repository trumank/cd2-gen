import { ModuleBase } from "./base.ts";
import { ValueNumber } from "../values/mod.ts";

export interface Resupply extends ModuleBase {
  Cost?: ValueNumber;
  StartingNitra?: ValueNumber;
}
