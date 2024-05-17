import {
  ModuleCaps,
  ModuleDarkness,
  ModuleDifficultySetting,
  ModuleEnemies,
  ModuleEscortMule,
  ModuleMule,
  ModulePools,
  ModuleResupply,
  ModuleWatchers,
  ModuleWaveSpawners,
} from "./modules/mod.ts";

export interface Difficulty {
  Name: string;
  Description?: string;
  Pools?: ModulePools;
  DifficultySetting?: ModuleDifficultySetting;
  Enemies?: ModuleEnemies;
  EnemiesNoSync?: ModuleEnemies;
  WaveSpawners?: ModuleWaveSpawners;
  Caps?: ModuleCaps;
  Resupply?: ModuleResupply;
  EscortMule?: ModuleEscortMule;
  Watchers?: ModuleWatchers;
  Mule?: ModuleMule;
  Darkness?: ModuleDarkness;
}
