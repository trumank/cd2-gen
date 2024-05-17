import { ModuleBase } from "./base.ts";
import { ValueList, ValueNumber } from "../values/mod.ts";

export interface Wave extends ModuleBase {
  Interval: ValueNumber;
  Difficulty: ValueNumber;
  Distance?: ValueNumber;
  Locations?: ValueNumber;
  Enemies?: ValueList;
}

export type ModuleWaveSpawners = Wave[];
