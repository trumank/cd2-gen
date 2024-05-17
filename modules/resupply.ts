import { ModuleBase } from "./base.ts";
import { ValueNumber } from "../values/mod.ts";

export interface ModuleResupply extends ModuleBase {
  Cost?: ValueNumber;
  StartingNitra?: ValueNumber;
}
