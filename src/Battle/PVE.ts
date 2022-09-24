import Fighter, { SimpleFighter } from '../Fighter';
import Battle from './Battle';
import getRandomInt from '../utils';

export default class PVE extends Battle {
  private _player: Fighter;
  private _opponent: SimpleFighter[];

  constructor(player: Fighter, opponent: SimpleFighter[]) {
    super(player);
    this._player = player;
    this._opponent = opponent;
  }

  enemyQuantity(): number {
    const quantity = this._opponent.length;
    return quantity;
  }

  attackPlayer(): void {
    if (this.enemyQuantity() === 1) this._player.attack(this._opponent[0]);
    const opponentIndex = getRandomInt(0, this._opponent.length - 1);
    this._player.attack(this._opponent[opponentIndex]);
  }

  attackMonster(): void {
    const opponentIndex = getRandomInt(0, this._opponent.length - 1);
    this._opponent[opponentIndex].attack(this._player);
  }

  fight(): number {
    let lifePlayer = this._player.lifePoints;
    let lifeOpponent = this._opponent.map((op) => op.lifePoints);
    let someOppenetIsAlive = lifeOpponent.some((op) => op >= 0);

    do {
      this.attackPlayer();
      lifeOpponent = this._opponent.map((op) => op.lifePoints);
      someOppenetIsAlive = lifeOpponent.some((op) => op >= 0);
      if (someOppenetIsAlive) {
        this.attackMonster();
        lifePlayer = this._player.lifePoints;
      }
    } while (lifePlayer >= 0 && someOppenetIsAlive);

    return super.fight();
  }
}