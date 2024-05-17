import { ModuleBase } from "./base.ts";
import { ValueNumber } from "../values/mod.ts";

export interface ModuleCaps extends ModuleBase {
  MaxActiveEnemies?: ValueNumber | ValueNumber[];
  MaxActiveSwarmers?: ValueNumber | ValueNumber[];
  MaxActiveCritters?: ValueNumber | ValueNumber[];
}
