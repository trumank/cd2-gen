import { ValueList, ValueNumber } from "../main.ts";
import { ModuleBase } from "./base.ts";

export interface Wave extends ModuleBase {
  Interval: ValueNumber;
  Difficulty: ValueNumber;
  Distance?: ValueNumber;
  Locations?: ValueNumber;
  Enemies?: ValueList;
}

export type WaveSpawners = Wave[];
