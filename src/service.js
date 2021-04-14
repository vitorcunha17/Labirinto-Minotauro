export const size = 20;

class Bloco {
  cima;
  baixo;
  esquerda;
  direita;

  constructor(cima, baixo, esquerda, direita) {
    this.baixo = baixo;
    this.cima = cima;
    this.esquerda = esquerda;
    this.direita = direita;
  }

  checarSemPorta() {
    return this.cima || this.baixo || this.esquerda || this.direita;
  }
}

class Mapa {
  criarMapa() {
    var Mapa = [];
    for (var i = 0; i < size; i++) {
      Mapa[i] = [];
      for (var k = 0; k < size; k++) {
        Mapa[i][k] = undefined;
      }
    }

    for (let i = 0; i < size; i++) {
      for (let k = 0; k < size; k++) {
        let cima = false;
        let baixo = false;
        let esquerda = false;
        let direita = false;

        if (i !== 0) cima = Object.assign({}, Mapa[i - 1][k]).baixo;

        if (k !== 0) esquerda = Object.assign({}, Mapa[i][k - 1]).direita;

        if (k !== size - 1) direita = Math.random() > 0.5;

        if (i !== size - 1) baixo = Math.random() > 0.5;

        Mapa[i][k] = new Bloco(cima, baixo, esquerda, direita);
      }
    }

    return Mapa;
  }
}

export default Mapa;
