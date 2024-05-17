import { ModuleBase } from "./base.ts";
import { ValueNumber } from "../values/mod.ts";

export interface EscortMule extends ModuleBase {
  FriendlyFireModifier?: ValueNumber;
  BigHitDamageModifier?: ValueNumber;
  BigHitDamageReductionThreshold?: ValueNumber;
  NeutralDamageModifier?: ValueNumber;
}
