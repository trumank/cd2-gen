import {
  Caps,
  Darkness,
  DifficultySetting,
  Enemies,
  EscortMule,
  Mule,
  Pools,
  Resupply,
  Watchers,
  WaveSpawners,
} from "./modules/mod.ts";

export interface Difficulty {
  Name: string;
  Description?: string;
  Pools?: Pools;
  DifficultySetting?: DifficultySetting;
  Enemies?: Enemies;
  EnemiesNoSync?: Enemies;
  WaveSpawners?: WaveSpawners;
  Caps?: Caps;
  Resupply?: Resupply;
  EscortMule?: EscortMule;
  Watchers?: Watchers;
  Mule?: Mule;
  Darkness?: Darkness;
}
