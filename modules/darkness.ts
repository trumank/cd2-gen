import { ModuleBase } from "./base.ts";
import { ValueBoolean, ValueNumber } from "../values/mod.ts";

export interface Darkness extends ModuleBase {
  FlashlightStrength?: ValueNumber;
  PlayerIllumination?: ValueNumber;
  FlareProductionTime?: ValueNumber;
  FlareMax?: ValueNumber;
  FlareStrength?: ValueNumber;
  FlareDuration?: ValueNumber;
  EnvironmentalLight?: ValueNumber;
  DisableFog?: ValueBoolean;
  FlareGunStrength?: ValueNumber;
  FlareGunDuration?: ValueNumber;
}
