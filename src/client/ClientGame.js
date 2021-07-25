import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';
import gameObjects from '../configs/gameObjects.json';

import levelCfg from '../configs/world.json';
import sprites from '../configs/sprites';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      gameObjects,
      player: null,
    });

    this.engine = this.createEngine();
    this.map = this.createWorld();
    this.initEngine();
  }

  setPlayer(player) {
    this.player = player;
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId));
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => {
        if (keydown) {
          this.player.moveByCellCoord(-1, 0, (cell) => cell.findObjectsByType('grass').length);
        }
      },
      ArrowRight: (keydown) => {
        if (keydown) {
          this.player.moveByCellCoord(1, 0, (cell) => cell.findObjectsByType('grass').length);
        }
      },
      ArrowDown: (keydown) => {
        if (keydown) {
          this.player.moveByCellCoord(0, 1, (cell) => cell.findObjectsByType('grass').length);
        }
      },
      ArrowUp: (keydown) => {
        if (keydown) {
          this.player.moveByCellCoord(0, -1, (cell) => cell.findObjectsByType('grass').length);
        }
      },
    });
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, time) => {
        this.map.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
    }
  }
}

export default ClientGame;
