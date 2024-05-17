import { ValueBoolean, ValueNumber } from "../values/mod.ts";
import { ModuleBase } from "./base.ts";

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
