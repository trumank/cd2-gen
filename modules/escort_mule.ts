import { ModuleBase } from "./base.ts";
import { ValueNumber } from "../values/mod.ts";

export interface ModuleEscortMule extends ModuleBase {
  FriendlyFireModifier?: ValueNumber;
  BigHitDamageModifier?: ValueNumber;
  BigHitDamageReductionThreshold?: ValueNumber;
  NeutralDamageModifier?: ValueNumber;
}
