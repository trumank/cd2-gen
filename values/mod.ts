export type Resource = "Gold"; // TODO fill out

/**
 * Count of a resource that has been deposited into the team depository. Any resource can be referenced by the name as it appears in the in-game UI.
 *
 * @example
 * ```json
 * {
 *   "Mutate": "DepositedResource",
 *   "Resource": "Nitra"
 * }
 * ```
 */
export interface MutateDepositedResource {
  Mutate: "DepositedResource";
  Resource: Resource;
}

/**
 * For a resource, the sum of that resource in players' inventories, not desposited.
 *
 * @example
 * ```json
 * {
 *   "Mutate": "HeldResource",
 *   "Resource": "Apoca Bloom"
 * }
 * ```
 */
export interface MutateHeldResource {
  Mutate: "HeldResource";
  Resource: Resource;
}

/**
 * Sum of a resource held in players inventories and the group depot. Any resource can be referenced by the name as it appears in the in-game UI.
 *
 * @example
 * ```json
 * {
 *   "Mutate": "TotalResource",
 *   "Resource": "Morkite"
 * }
 * ```
 */
export interface MutateTotalResource {
  Mutate: "TotalResource";
  Resource: Resource;
}

/**
 * This is a boolean value which reflects whether an enemy descriptor is available. This is intended to allow a difficulty to fall back to a different descriptor if the desired descriptor isn't available, e.g. if MEV is not available.
 *
 * @example
 * ```json
 * {
 *   "Mutate": "If",
 *   "Condition": {
 *     "Mutate": "DescriptorExists",
 *     "ED": "ED_MEV_Enemy"
 *   },
 *   "Then": ["ED_MEV_Enemy"],
 *   "Else": ["ED_Backup"]
 * }
 * ```
 */
export interface MutateDescriptorExists {
  Mutate: "DescriptorExists";
  ED: string;
}

/**
 * Count number of Enemies that have died this mission. Optionally, this can get the deaths of a specific enemy descriptor.
 *
 * Despawned enemies because of caps are likely counted. If your difficulty despawns significant amounts of enemies, this number might not match expectations.
 *
 * @example
 * Count of all enemy pawns:
 * ```json
 * {
 *     "Mutate": "EnemiesKilled"
 * }
 * ```
 *
 * @example
 * Count of enemies that have died with a specific descriptor:
 * ```json
 * {
 *     "Mutate": "EnemiesKilled",
 *     "ED": "ED_Spider_Grunt"
 * }
 * ```
 */
export interface MutateEnemiesKilled {
  Mutate: "EnemiesKilled";
  ED?: string;
}

/**
 * EnemyCount
 *
 * Count number of Enemies currently alive on the map. Optionally, this can get the count of a specific enemy descriptor.
 *
 * It's possible for this monitor to drift slightly from the actual count if base game events don't fire, but it should always correct.
 *
 * @example
 * Count of all enemy pawns:
 * ```json
 * {
 *   "Mutate": "EnemyCount"
 * }
 * ```
 *
 * @example
 * Count of enemies with a specific descriptor:
 * ```json
 * {
 *   "Mutate": "EnemyCount",
 *   "ED": "ED_Spider_Grunt"
 * }
 * ```
 */
export interface MutateEnemyCount {
  Mutate: "EnemyCount";
  ED?: string;
}

export interface MutateEnemyCooldown {
  Mutate: "EnemyCooldown";
  EDs: ValueList;
  CooldownTime: ValueNumber;
  ValueDuringCooldown: ValueNumber;
  DefaultValue: ValueNumber;
}

/**
 * Check a boolean condition, "Condition", and select either "Then" or "Else".
 *
 * @example
 * Remove a fast bulk from the pool during a defense objective.
 * ```json
 * {
 *   "Mutate": "If",
 *   "Condition": {"Mutate": "DuringDefend"},
 *   "Then": [],
 *   "Else": ["ED_Fast_Bulk"]
 * }
 * ```
 */
export interface MutateIf<T> {
  Mutate: "If";
  Condition: ValueBoolean;
  Then: T;
  Else: T;
}

/**
 * Choose one value or another based on a comparison of two float values.
 *
 * The two floats are specified by `Value` and the operator to be used e.g. `>=` if the comparison was to be greater than or equal. If the condition is true the `Then` value is used, else the `Else` condition is used.
 *
 * Valid operators are: `==`, `>=`, `>`, `<=`, `<`
 * @example
 * In this example, as long as the team has called less than 2 resupplies the value is 40. After the team has called their second resupply, the value is 80.
 * ```json
 * {
 *     "Mutate": "IfFloat",
 *     "Value": {"Mutate": "ResuppliesCalled"},
 *     "<": 2,
 *     "Then": 40,
 *     "Else": 80
 * }
 * ```
 */
export interface MutateIfFloat<T> {
  Mutate: "IfFloat";
  Value: ValueNumber;
  // TODO require exactly 1 of the following
  "=="?: ValueNumber;
  ">="?: ValueNumber;
  ">"?: ValueNumber;
  "<="?: ValueNumber;
  "<"?: ValueNumber;
  Then: T;
  Else: T;
}

export interface MutateAdd {
  Mutate: "Add";
  A: ValueNumber;
  B: ValueNumber;
}

export interface MutateSubtract {
  Mutate: "Subtract";
  A: ValueNumber;
  B: ValueNumber;
}

export interface MutateMultiply {
  Mutate: "Multiply";
  A: ValueNumber;
  B: ValueNumber;
}

export interface MutateDivide {
  Mutate: "Divide";
  A: ValueNumber;
  B: ValueNumber;
}

export interface MutatePow {
  Mutate: "Divide";
  A: ValueNumber;
  B: ValueNumber;
}

/**
 * Constrain a float (number) to fall within a range. This range is inclusive. If only a min or only a max is specified, the value will only be clamped in that direction.
 *
 * @example
 * ```json
 * {
 *     "Mutate": "Clamp",
 *     "Value": 90,
 *     "Min": 0,
 *     "Max": 100
 * }
 * ```
 */
export interface MutateClamp {
  Mutate: "Clamp";
  Value: ValueNumber;
  Min: ValueNumber;
  Max: ValueNumber;
}

/**
 * Change the value based on the mission biome. If a value isn't set for a biome it will use the 'Default' value. A 'Default' must be set unless a value is specified for all biomes. If a biome is not recognized and no default is specified, the value for CrystallineCaverns will be used.
 *
 * ## Biome Names and Aliases
 * | Official Name              | Alias 1                  | Alias 2            |
 * | -------------------------- | ------------------------ | ------------------ |
 * | BIOME_AzureWeald           | AzureWeald               |                    |
 * | BIOME_CrystalCaves         | CrystalCave              | CrystallineCaverns |
 * | BIOME_FungusBogs           | FungusBogs               |                    |
 * | BIOME_HollowBough          | HollowBough              |                    |
 * | BIOME_IceCaves             | IceCaves                 | GlacialStrata      |
 * | BIOME_MagmaCaves           | MagmaCaves               | MagmaCore          |
 * | BIOME_SandblastedCorridors | SandblastedCorridors     | Sandblasted        |
 * | BIOME_RadioactiveZone      | RadioactiveExclusionZone | REZ                |
 * | BIOME_SaltCaves            | SaltCaves                | SaltPits           |
 *
 * @example
 * ```json
 * {
 *     "Mutate": "ByBiome",
 *     "Default": false,
 *     "SaltPits": true,
 *     "REZ": true
 * }
 * ```
 */
export interface MutateByBiome<T> {
  Mutate: "ByBiome";
  Default?: T;
  BIOME_AzureWeald?: T;
  BIOME_CrystalCaves?: T;
  BIOME_FungusBogs?: T;
  BIOME_HollowBough?: T;
  BIOME_IceCaves?: T;
  BIOME_MagmaCaves?: T;
  BIOME_SandblastedCorridors?: T;
  BIOME_RadioactiveZone?: T;
  BIOME_SaltCaves?: T;
  AzureWeald?: T;
  CrystalCave?: T;
  CrystallineCaverns?: T;
  FungusBogs?: T;
  HollowBough?: T;
  IceCaves?: T;
  GlacialStrata?: T;
  MagmaCaves?: T;
  MagmaCore?: T;
  SandblastedCorridors?: T;
  Sandblasted?: T;
  RadioactiveExclusionZone?: T;
  REZ?: T;
  SaltCaves?: T;
  SaltPits?: T;
}

/**
 * Change the value based on the Deep Dive stage. If a value isn't set for a stage, it will use the 'Default' value. A 'Default' must be set.
 *
 * @example
 * ```json
 * {
 *   "Mutate": "ByDDStage",
 *   "Default": 1.2,
 *   "Stage1": 1.0,
 *   "Stage2": 1.2,
 *   "Stage3": 1.45
 * }
 * ```
 */
export interface MutateByDDStage<T> {
  Mutate: "ByDDStage";
  Default: T;
  Stage1?: T;
  Stage2?: T;
  Stage3?: T;
}

/**
 * Change the value based on mission type. If a value isn't set for a mission type it will use the 'Default' value. A 'Default' must be set unless a value is specified for all mission types.
 * Supported mission types
 *
 * - Egg
 * - Elimination
 * - Escort
 * - Mining
 * - PE
 * - Refinery
 * - Sabotage
 * - Salvage
 *
 * @example
 * ```json
 * {
 *   "Mutate": "ByMissionType",
 *   "Default": 60,
 *   "Egg": 70,
 *   "PE": 80
 * }
 * ```
 */
export interface MutateByMissionType<T> {
  Mutate: "ByMissionType";
  Default?: T;
  Egg?: T;
  Elimination?: T;
  Escort?: T;
  Mining?: T;
  PE?: T;
  Refinery?: T;
  Sabotage?: T;
  Salvage?: T;
}

export interface MutateDuringDefend {
  Mutate: "DuringDefend";
}

export interface MutateDuringDread {
  Mutate: "DuringDread";
}

export interface MutateDuringEncounter {
  Mutate: "DuringEncounter";
}

export interface MutateDuringExtraction {
  Mutate: "DuringExtraction";
}

export interface MutateDuringGenericSwarm {
  Mutate: "DuringGenericSwarm";
}

/**
 * This is true during a mission, or true during a specific window of time during a mission if times are specified. If specified, `StartingAt` determines the elapsed mission time in seconds when this becomes true. If specified, `StoppingAfter` determines the elapsed mission time in seconds after which this is false.
 *
 * @example
 * Only add stalkers and elite guards to the pool after 240 seconds have elapsed in the mission.
 * ```json
 * {
 *   "Mutate": "If",
 *   "Condition": {"Mutate": "DuringMission", "StartingAfter": 240},
 *   "Then": ["ED_Spider_Stalker", "ED_Spider_Grunt_Guard_Elite"],
 *   "Else": []
 * }
 * ```
 */
export interface MutateDuringMission {
  Mutate: "DuringMission";
  StartingAt?: ValueNumber;
  StoppingAfter?: ValueNumber;
}

/**
 * Change the value based on the number of players in game. A solo game gets the first position in the list; two players get the second spot and so on. The last value in the list is used if there are more players than there are values in the list.
 *
 * @example
 * ```json
 * {
 *   "Mutate": "ByPlayerCount",
 *   "Values": [
 *     80,
 *     120,
 *     180,
 *     180
 *   ]
 * }
 * ```
 * ### *Note on Implicit Player Count Control*
 * *Values that expect a float can be automatically controlled by player count by placing an array as the value. e.g. `"Resupply": {"Cost": [80, 60, 40]}` would set the cost of resupplies to 80 in solo, 60 in duo, and 40 three or more players.*
 */
export interface MutateByPlayerCount<T> {
  Mutate: "ByPlayerCount";
  Values: T[];
}

/**
 * Average percent ammo left for the team, 1 when all teammates have 100% of their ammo and 0 when all teammates are at 0% ammo. This works the same way as the 4 bars under the dwarves names in the UI.
 *
 * @example
 * ```json
 * {
 *   "Mutate": "DwarvesAmmo"
 * }
 * ```
 */
export interface MutateDwarvesAmmo {
  Mutate: "DwarvesAmmo";
}

/**
 * Float count of the dwarves that are currently down, 0 if no dwarves are currently downed, 4 if all 4 dwarves are down.
 *
 * @example
 * ```json
 * {
 *   "Mutate": "DwarvesDown"
 * }
 * ```
 */
export interface MutateDwarvesDown {
  Mutate: "DwarvesDown";
}

/**
 * Total number of downs for the team during the mission. This might not match the end screen because it will still count downs from disconnected players, and will not over-count downs.
 *
 * @example
 * ```json
 * {
 *   "Mutate": "DwarvesDowns"
 * }
 * ```
 */
export interface MutateDwarvesDowns {
  Mutate: "DwarvesDowns";
}

/**
 * Time in seconds that has elapsed while a dwarf has been down. If multiple dwarves are down, it's the longest time down among the downed dwarves.
 *
 * @example
 * ```json
 * {
 *   "Mutate": "DwarvesDownTime"
 * }
 * ```
 */
export interface MutateDwarvesDownTime {
  Mutate: "DwarvesDownTime";
}

/**
 * Average health, 1 when all teammates are at 100% health and 0 when all teammates are down.
 *
 * @example
 * ```json
 * {
 *   "Mutate": "DwarvesHealth"
 * }
 * ```
 */
export interface MutateDwarvesHealth {
  Mutate: "DwarvesHealth";
}

/**
 * Total number of revives for the team during the mission. This includes IW self-revives.
 *
 * @example
 * ```json
 * {
 *   "Mutate": "DwarvesRevives"
 * }
 * ```
 */
export interface MutateDwarvesRevives {
  Mutate: "DwarvesRevives";
}

/**
 * Average shields, 1 when all teammates are at full shield 0 when all teammates are at 0 shield. Untested on shield disruption.
 *
 * @example
 * ```json
 * {
 *   "Mutate": "DwarvesShield"
 * }
 * ```
 */
export interface MutateDwarvesShield {
  Mutate: "DwarvesShield";
}

/**
 * Float count of the number of IWs the team still has in reserve, 0 when no IWs remain. This will be 0 until dwarves are spawned which happens after the level is setup including encounters and terrain.
 *
 * @example
 * ```json
 * {
 *   "Mutate": "IWsLeft"
 * }
 * ```
 */
export interface MutateIWsLeft {
  Mutate: "IWsLeft";
}

export interface MutateRandomChoice<T> {
  Mutate: "RandomChoice";
  // TODO check same length?
  Choices: T[];
  Weights?: ValueNumber[];
}

/**
 * Choose one of a set of values for each mission. The choice is fixed to the seed of the mission. Subsequent plays of the same seed will use the same value. This mutator can be used with just `Choices`. In that case it will uniformly sample from the choices.
 *
 * Optionally, a second list `Weights` provides weights for weighted sampling of the choices.
 *
 * @example
 * ```json
 * {
 *   "Mutate": "RandomChoicePerMission",
 *   "Choices": [
 *     "bedrock",
 *     "hotrock",
 *     "dirt"
 *   ]
 * }
 * ```
 */
export interface MutateRandomChoicePerMission<T> {
  Mutate: "RandomChoicePerMission";
  // TODO check same length?
  Choices: T[];
  Weights?: ValueNumber[];
}

/**
 * Number of resupplies the team has called during the mission. This should increment almost immediately after a resupply is initiated, before another resupply can be called.
 *
 * @example
 * ```json
 * {
 *   "Mutate": "ResuppliesCalled"
 * }
 * ```
 */
export interface MutateResuppliesCalled {
  Mutate: "ResuppliesCalled";
}

/**
 * The number of uses that have been consumed from resupplies this mission.
 *
 * @example
 * ```json
 * {
 *   "Mutate": "ResupplyUsesConsumed"
 * }
 * ```
 */
export interface MutateResupplyUsesConsumed {
  Mutate: "ResupplyUsesConsumed";
}

/**
 * The count among all supply pods of uses left on a resupply. By default, resupplies start with 4 uses.
 *
 * *Caveat: The counts goes up immediately when a resupply is called, before it lands*
 *
 * @example
 * ```json
 * {
 *   "Mutate": "ResupplyUsesLeft"
 * }
 * ```
 */
export interface MutateResupplyUsesLeft {
  Mutate: "ResupplyUsesLeft";
}

export interface MutateAccumulate {
  Mutate: "Accumulate";
  Value: ValueNumber;
  Initial: ValueNumber;
  Min: ValueNumber;
  Max: ValueNumber;
}

export interface MutateDelta {
  Mutate: "Delta";
  // TODO
}

/**
 * Change a value over time. Time matches the mission clock in the escape menu in-game, including starting before players receive control of their dwarves.
 * The value is determined by `InitialValue + RateOfChange * Max(0, Time - StartDelay)`
 *
 * Parameters
 * - `InitialValue` - Value at time 0 and up until `StartDelay`
 * - `StartDelay` - Time in seconds to stay at the `InitialValue` before changing.
 * - `RateOfChange` - Rate per second to change the value.
 *
 * @example
 * ```json
 * {
 *   "Mutate": "TimeDelta",
 *   "InitialValue": 3.1,
 *   "RateOfChange": 0.0033,
 *   "StartDelay": 400
 * }
 * ```
 */
export interface MutateTimeDelta {
  Mutate: "TimeDelta";
  InitialValue: ValueNumber;
  RateOfChange: ValueNumber;
}

export type ValueNumber =
  | number
  | MutateDepositedResource
  | MutateHeldResource
  | MutateTotalResource
  | MutateEnemiesKilled
  | MutateEnemyCount
  | MutateEnemyCooldown
  | MutateAdd
  | MutateSubtract
  | MutateMultiply
  | MutateDivide
  | MutatePow
  | MutateClamp
  | MutateDwarvesAmmo
  | MutateDwarvesDown
  | MutateDwarvesDowns
  | MutateDwarvesDownTime
  | MutateDwarvesHealth
  | MutateDwarvesRevives
  | MutateDwarvesShield
  | MutateIWsLeft
  | MutateResuppliesCalled
  | MutateResupplyUsesConsumed
  | MutateResupplyUsesLeft
  | MutateAccumulate
  | MutateDelta
  | MutateTimeDelta
  | MutateIf<ValueNumber>
  | MutateIfFloat<ValueNumber>
  | MutateByBiome<ValueNumber>
  | MutateByDDStage<ValueNumber>
  | MutateByMissionType<ValueNumber>
  | MutateByPlayerCount<ValueNumber>
  | MutateRandomChoice<ValueNumber>
  | MutateRandomChoicePerMission<ValueNumber>;

export type ValueBoolean =
  | boolean
  | MutateDescriptorExists
  | MutateDuringDefend
  | MutateDuringDread
  | MutateDuringEncounter
  | MutateDuringExtraction
  | MutateDuringGenericSwarm
  | MutateDuringMission
  | MutateIf<ValueBoolean>
  | MutateIfFloat<ValueBoolean>
  | MutateByBiome<ValueBoolean>
  | MutateByDDStage<ValueBoolean>
  | MutateByMissionType<ValueBoolean>
  | MutateByPlayerCount<ValueBoolean>
  | MutateRandomChoice<ValueBoolean>
  | MutateRandomChoicePerMission<ValueBoolean>;

export type ValueString =
  | string
  | MutateIf<ValueString>
  | MutateIfFloat<ValueString>
  | MutateByBiome<ValueString>
  | MutateByDDStage<ValueString>
  | MutateByMissionType<ValueString>
  | MutateByPlayerCount<ValueString>
  | MutateRandomChoice<ValueString>
  | MutateRandomChoicePerMission<ValueString>;

export type ValueList = (
  | string
  | MutateIf<ValueList>
  | MutateIfFloat<ValueList>
  | MutateByBiome<ValueList>
  | MutateByDDStage<ValueList>
  | MutateByMissionType<ValueList>
  | MutateByPlayerCount<ValueList>
  | MutateRandomChoice<ValueList>
  | MutateRandomChoicePerMission<ValueList>
)[];
