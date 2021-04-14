import React from 'react';
import Bloco from './sala';

function Mapa({ mapa, posicaoAtual, ultimaDirecao }) {
  return (
    <div>
      {mapa.map((line, i) => {
        return (
          <div key={i} style={{ margin: 0, padding: 0, height: 29 }}>
            {line.map((bloco, k) => (
              <Bloco
                bloco={bloco}
                key={i + k}
                atual={i === posicaoAtual[0] && k === posicaoAtual[1]}
                ultimaDirecao={ultimaDirecao}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Mapa;
