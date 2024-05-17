import { ValueNumber } from "../main.ts";
import { ModuleBase } from "./base.ts";

export interface Caps extends ModuleBase {
  MaxActiveEnemies?: ValueNumber | ValueNumber[];
  MaxActiveSwarmers?: ValueNumber | ValueNumber[];
  MaxActiveCritters?: ValueNumber | ValueNumber[];
}
