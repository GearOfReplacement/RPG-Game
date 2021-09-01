import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';
import gameObjects from '../configs/gameObjects.json';

import levelCfg from '../configs/world.json';
import sprites from '../configs/sprites';
import ClientApi from './ClientApi';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      gameObjects: cfg.gameObjects,
      player: null,
      players: {},
      api: new ClientApi({
        game: this,
        ...cfg.apiCfg,
      }),
      spawnPoint: [],
    });

    this.api.connect();
    this.engine = this.createEngine();
    this.map = this.createWorld();
    this.initEngine();
  }

  setPlayer(player) {
    this.player = player;
  }

  getWorld() {
    return this.map;
  }

  createWorld() {
    return new ClientWorld(this, this.engine, this.cfg.world);
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId), this);
  }

  movePlayerTo(arrow) {
    this.api.move(arrow);
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
    this.engine.loadSprites(this.cfg.sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, time) => {
        this.player && this.engine.camera.focusAtGameObject(this.player);
        this.map.render(time);
      });
      this.engine.start();
      this.initKeys();
      this.engine.focus();
      this.api.join(this.cfg.playerName);
    });
  }

  createPlayer({ id, col, row, layer, skin, name }) {
    if (!this.players[id]) {
      const cell = this.map.cellAt(col, row);
      const playerObj = cell.createGameObject(
        {
          class: 'player',
          type: skin,
          playerId: id,
          playerName: name,
        },
        layer,
      );

      cell.addGameObject(playerObj);
      this.players[id] = playerObj;
    }

    return this.players[id];
  }

  createCurrentPlayer(playerCfg) {
    const playerObj = this.createPlayer(playerCfg);
    this.setPlayer(playerObj);
  }

  setPlayers(playersList) {
    playersList.forEach((player) => this.createPlayer(player));
  }

  addSpawnPoint(spawnPoint) {
    this.spawnPoint.push(spawnPoint);
  }

  getPlayerById(id) {
    return this.players[id];
  }

  removePlayerById(id) {
    const player = this.getPlayerById(id);

    if (player) {
      player.detouch();
      delete this.players[id];
    }
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
    }
  }
}

export default ClientGame;
