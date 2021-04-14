import React from 'react';
import './index.css';

function Jogo({ mapa, salaAtual, onPortaClick, getPosicaoRelativaPorta }) {
  return (
    <div class="sala-container">
      <div className="sala">
        {salaAtual && salaAtual.Esquerda && (
          <div
            className={`porta porta-${getPosicaoRelativaPorta('esquerda')}`}
            onClick={() => onPortaClick('esquerda')}
          />
        )}
        {salaAtual && salaAtual.Direita && (
          <div
            className={`porta porta-${getPosicaoRelativaPorta('direita')}`}
            onClick={() => onPortaClick('direita')}
          />
        )}
        {salaAtual && salaAtual.Cima && (
          <div
            className={`porta porta-${getPosicaoRelativaPorta('cima')}`}
            onClick={() => onPortaClick('cima')}
          />
        )}
        {salaAtual.Baixo && (
          <div
            className={`porta porta-${getPosicaoRelativaPorta('baixo')}`}
            onClick={() => onPortaClick('baixo')}
          />
        )}
      </div>
    </div>
  );
}

export default Jogo;
