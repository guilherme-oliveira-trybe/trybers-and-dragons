import Fighter from '../Fighter';
import Battle from './Battle';

export default class PVP extends Battle {
  private _player: Fighter;
  private _player2: Fighter;

  constructor(player: Fighter, player2: Fighter) {
    super(player);
    this._player = player;
    this._player2 = player2;
  }

  attackPlayer(): void {
    this._player.attack(this._player2);
  }

  attackPlayer2(): void {
    this._player2.attack(this._player);
  }

  fight(): number {
    let lifePlayer = this._player.lifePoints;
    let lifePlayer2 = this._player2.lifePoints;

    do {
      this.attackPlayer();
      lifePlayer2 = this._player2.lifePoints;
      if (lifePlayer2 !== -1) {
        this.attackPlayer2();
        lifePlayer = this._player.lifePoints;
      }
    } while (lifePlayer >= 0 && lifePlayer2 >= 0);

    return super.fight();
  }
}
