import { ModuleBase } from "./base.ts";
import { ValueList, ValueNumber } from "../values/mod.ts";

export interface Pool {
  Clear?: boolean;
  Add?: ValueList;
  Remove?: ValueList;
}

export interface Range {
  Min: ValueNumber;
  Max: ValueNumber;
}

export interface ModulePools extends ModuleBase {
  MinPoolSize?: ValueNumber;
  DisruptiveEnemyPoolCount?: Range;
  StationaryEnemyCount?: Range;
  EnemyPool?: Pool;
  StationaryPool?: Pool;
  CommonEnemies?: Pool;
  SpecialEnemies?: Pool;
  DisruptiveEnemies?: Pool;
}
