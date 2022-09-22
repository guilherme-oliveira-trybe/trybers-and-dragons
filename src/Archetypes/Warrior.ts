import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Warrior extends Archetype {
  private static _racesInstances = 0;
  private _energyType: EnergyType;

  constructor(name: string) {
    super(name);
    this._energyType = 'stamina';
    Warrior._racesInstances += 1;
  }

  get energyType(): EnergyType {
    return this._energyType;
  }

  static createdArchetypeInstances(): number {
    return this._racesInstances;
  }
}