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
    player.playerName = this.cfg.name;
    this.player = player;
  }

  getWorld() {
    return this.map;
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId), this);
  }

  movePlayerTo(arrow) {
    const dir = {
      left: [-1, 0],
      right: [1, 0],
      up: [0, -1],
      down: [0, 1],
    };

    const { player } = this;

    if (player && player.motionProgress === 1) {
      const canMovie = player.moveByCellCoord(...dir[arrow], (cell) => cell.findObjectsByType('grass').length);

      if (canMovie) {
        player.setState(arrow);
        player.once('motion-stopped', () => player.setState('main'));
      }
    }
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => keydown && this.movePlayerTo('left'),
      ArrowUp: (keydown) => keydown && this.movePlayerTo('up'),
      ArrowRight: (keydown) => keydown && this.movePlayerTo('right'),
      ArrowDown: (keydown) => keydown && this.movePlayerTo('down'),
    });
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, time) => {
        this.engine.camera.focusAtGameObject(this.player);
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
