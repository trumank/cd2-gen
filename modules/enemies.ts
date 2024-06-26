import { ModuleBase } from "./base.ts";
import {
  ValueBoolean,
  ValueList,
  ValueNumber,
  ValueString,
} from "../values/mod.ts";

export type ModuleEnemies = ModuleBase & EnemyDescriptorList;

export interface EnemyDescriptorList {
  [key: string]: EnemyDescriptor;
}

export interface EnemyDescriptor {
  Base?: string;
  DifficultyRating?: ValueNumber;
  UsesSpawnRarityModifiers?: ValueBoolean;
  SpawnRarityModifiers?: {
    Rarity: ValueNumber;
    Duration: ValueNumber;
  };
  MaxSpawnCount?: ValueNumber;
  IdealSpawnSize?: ValueNumber;
  DisplayName?: ValueString;
  Rarity?: ValueNumber;
  SpawnSpread?: ValueNumber;
  CanBeUsedForConstantPressure?: ValueBoolean;
  CanBeUsedInEncounters?: ValueBoolean;
  MinSpawnCount?: ValueNumber;
  SpawnAmountModifier?: ValueNumber;
  UsesVeteranLarge?: ValueBoolean;
  VeteranClasses?: ValueList;
  HealthMultiplier?: ValueNumber;
  WeakpointHP?: ValueNumber;
  Materials?: string[];
  Scale?: ValueNumber;
  Elite?: ValueBoolean;
  ShowHealthBar?: ValueBoolean;
  TimeDilation?: ValueNumber;
  Movement?: EnemyMovement;
  Resistances?: EnemyResistances;
  Temperature?: EnemyTemperature;
  CaveLeech?: EnemyCaveLeech;
}

export interface EnemyMovement {
  MaxPawnSpeed?: ValueNumber;
  StrafeSpeed?: ValueNumber;
  MaxStrafeDistance?: ValueNumber;
  AlignDirectionSpeed?: ValueNumber;
  MaxAcceleration?: ValueNumber;
  MaxBrakingDeceleration?: ValueNumber;
  AlignToTargetMinRequiredAngle?: ValueNumber;
}

export interface EnemyResistances {
  InvulnerableToNonDefinedResistances?: ValueBoolean;
  DamageMultiplier?: ValueNumber;
  KineticDamageMultiplier?: ValueNumber;
  ExplosionDamageMultiplier?: ValueNumber;
  FireDamageMultiplier?: ValueNumber;
  CorrosiveDamageMultiplier?: ValueNumber;
  ElectricDamageMultiplier?: ValueNumber;
  ColdDamageMultiplier?: ValueNumber;
  RadiationDamageMultiplier?: ValueNumber;
  PoisonDamageMultiplier?: ValueNumber;
  PiercingDamageMultiplier?: ValueNumber;
  PhysicalDamageMultiplier?: ValueNumber;
}

export interface EnemyTemperature {
  TemperatureChangeScale?: ValueNumber;
  DieIfFrozen?: ValueBoolean;
}

export interface EnemyCaveLeech {
  BiteDamage?: ValueNumber;
  MaxDistanceXY?: ValueNumber;
  GrapDelay?: ValueNumber;
  BitesPerSecond?: ValueNumber;
  TentacleSpeed?: ValueNumber;
  TentacleRetractSpeed?: ValueNumber;
  TentaclePullSpeed?: ValueNumber;
  TentacleDropPlayerSpeed?: ValueNumber;
  TentacleDropGroundDistance?: ValueNumber;
  MaxDropPlayerDuration?: ValueNumber;
}
