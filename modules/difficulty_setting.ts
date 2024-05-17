import { ValueNumber } from "../main.ts";
import { ModuleBase } from "./base.ts";

export interface Bin {
  weight: ValueNumber;
  min: ValueNumber;
  max: ValueNumber;
}

type DifficultyFullName =
  | "Hazard 1"
  | "Hazard 2"
  | "Hazard 3"
  | "Hazard 4"
  | "Hazard 5";
type DifficultyShort = "1" | "2" | "3" | "4" | "5";

export interface DifficultySetting extends ModuleBase {
  BaseHazard?: DifficultyFullName | DifficultyShort;
  SpeedModifier?: ValueNumber;
  ExtraLargeEnemyDamageResistance?: ValueNumber | ValueNumber[];
  ExtraLargeEnemyDamageResistanceB?: ValueNumber | ValueNumber[];
  ExtraLargeEnemyDamageResistanceC?: ValueNumber | ValueNumber[];
  ExtraLargeEnemyDamageResistanceD?: ValueNumber | ValueNumber[];
  EnemyDamageResistance?: ValueNumber | ValueNumber[];
  SmallEnemyDamageResistance?: ValueNumber | ValueNumber[];
  EnemyDamageModifier?: ValueNumber | ValueNumber[];
  EnemyCountModifier?: ValueNumber | ValueNumber[];
  EncounterDifficulty?: ValueNumber | Bin[];
  EnemyDiversity?: ValueNumber | Bin[];
  StationaryEnemyDiversity?: ValueNumber | Bin[];
  StationaryDifficulty?: ValueNumber | Bin[];
  EnemyWaveInterval?: ValueNumber | Bin[];
  EnemyNormalWaveInterval?: ValueNumber | Bin[];
  EnemyNormalWaveDifficulty?: ValueNumber | Bin[];
  VeteranNormal?: ValueNumber | Bin[];
  VeteranLarge?: ValueNumber | Bin[];
  EnvironmentalDamageModifier?: ValueNumber;
  PointExtractionScalar?: ValueNumber;
  FriendlyFireModifier?: ValueNumber;
  WaveStartDelayScale?: ValueNumber;
  HealthRegenerationMax?: ValueNumber;
  ReviveHealthRatio?: ValueNumber;
  AttackCooldownModifier?: ValueNumber;
  ProjectileSpeedModifier?: ValueNumber;
}
