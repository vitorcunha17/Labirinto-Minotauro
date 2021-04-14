import React from 'react';

function Bloco({ bloco, atual, ultimaDirecao }) {
  return (
    <div
      style={{
        width: 25,
        height: 25,
        background: 'lightgray',
        display: 'inline-block',
        borderTop: `2px solid ${!bloco.Cima ? 'black' : 'lightgray'}`,
        borderRight: `2px solid ${!bloco.Direita ? 'black' : 'lightgray'}`,
        borderBottom: `2px solid ${!bloco.Baixo ? 'black' : 'lightgray'}`,
        borderLeft: `2px solid ${!bloco.Esquerda ? 'black' : 'lightgray'}`,
        position: 'relative',
      }}
      className={'bloco'}
    >
      {atual && <div className={'personagem ' + ultimaDirecao} />}
    </div>
  );
}

export default Bloco;
