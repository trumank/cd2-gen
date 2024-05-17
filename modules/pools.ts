import { ValueList, ValueNumber } from "../values/mod.ts";
import { ModuleBase } from "./base.ts";

export interface Pool extends ModuleBase {
  Clear?: boolean;
  Add?: ValueList;
  Remove?: ValueList;
}

export interface Range {
  Min: ValueNumber;
  Max: ValueNumber;
}

export interface Pools {
  MinPoolSize?: ValueNumber;
  DisruptiveEnemyPoolCount?: Range;
  StationaryEnemyCount?: Range;
  EnemyPool?: Pool;
  StationaryPool?: Pool;
  CommonEnemies?: Pool;
  SpecialEnemies?: Pool;
  DisruptiveEnemies?: Pool;
}
