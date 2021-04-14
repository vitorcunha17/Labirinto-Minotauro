import React, { useEffect, useState } from 'react';
import Mapa from '../service';
import Jogo from './jogo';
import Minimapa from './mapa';
import { getMapa } from '../api/services/mapa';

function Labirinto() {
  const [mapa, setMapa] = useState();
  const [loading, setLoading] = useState(true);
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [ultimaDirecao, setUltimaDirecao] = useState('cima');
  const [posicaoAtual, setPosicaoAtual] = useState();
  const [salaAtual, setSalaAtual] = useState();
  const [usosMapa, setUsosMapa] = useState(0);
  const [telaStart, setTelaStart] = useState(true);

  useEffect(() => {
    handleMapa();
  }, []);

  const handleMapa = async () => {
    try {
      const mapa = await getMapa();
      setMapa(mapa.data.Blocos);
      console.log(mapa.data.Blocos);
      const pos = mapa.data.Entrada;
      setPosicaoAtual([pos.PosicaoX, pos.PosicaoY]);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (posicaoAtual) setSalaAtual(mapa[posicaoAtual[0]][posicaoAtual[1]]);
  }, [posicaoAtual]);

  useEffect(() => {
    if (mostrarMapa) {
      setTimeout(() => {
        setMostrarMapa(false);
        setUsosMapa(usosMapa - 1);
      }, 10000);
    }
  }, [mostrarMapa]);

  const onPortaClick = (direcao) => {
    setUltimaDirecao(direcao);
    switch (direcao) {
      case 'cima':
        return setPosicaoAtual([posicaoAtual[0] - 1, posicaoAtual[1]]);
      case 'esquerda':
        return setPosicaoAtual([posicaoAtual[0], posicaoAtual[1] - 1]);
      case 'direita':
        return setPosicaoAtual([posicaoAtual[0], posicaoAtual[1] + 1]);
      case 'baixo':
        return setPosicaoAtual([posicaoAtual[0] + 1, posicaoAtual[1]]);
      default:
        return;
    }
  };

  if (loading) {
    return <div>Carregando mapa...</div>;
  }

  const getPosicaoRelativaPorta = (posicaoAbsulutaPorta) => {
    const posicoes = {
      direita: {
        cima: 'esquerda',
        direita: 'cima',
        baixo: 'direita',
        esquerda: 'baixo',
      },
      baixo: {
        cima: 'baixo',
        direita: 'esquerda',
        baixo: 'cima',
        esquerda: 'direita',
      },
      esquerda: {
        cima: 'direita',
        direita: 'baixo',
        baixo: 'esquerda',
        esquerda: 'cima',
      },
      cima: {
        cima: 'cima',
        direita: 'direita',
        baixo: 'baixo',
        esquerda: 'esquerda',
      },
    };
    return posicoes[ultimaDirecao][posicaoAbsulutaPorta];
  };

  const getVoltarDirecao = () => {
    const direcoes = {
      direita: 'esquerda',
      esquerda: 'direita',
      cima: 'baixo',
      baixo: 'cima',
    };
    return direcoes[ultimaDirecao];
  };

  return (
    <>
      {telaStart === true ? (
        <div className="card-start">
          <br />
          <h1>LABIRINTO DO MINOTAURO</h1>
          <button
            onClick={() => setTelaStart(false)}
            className="button-start"
            disabled={usosMapa === 0 ? true : false}
          >
            INICIAR JOGO
          </button>
          <h3>Selecione o nível de dificuldade:</h3>
          {usosMapa === 0 ? (
            <div className="align-card-nivel">
              <div onClick={() => setUsosMapa(15)} className="card-nivel">
                <h4>FÁCIL</h4>
              </div>
              <div onClick={() => setUsosMapa(10)} className="card-nivel">
                <h4>MÉDIO</h4>
              </div>
              <div onClick={() => setUsosMapa(5)} className="card-nivel">
                <h4>DIFÍCIL</h4>
              </div>
            </div>
          ) : (
            <div>
              <div className="card-nivel-selecionado">
                <h4>
                  NÍVEL SELECIONADO: {usosMapa === 15 && 'FÁCIL'}{' '}
                  {usosMapa === 10 && 'MÉDIO'} {usosMapa === 5 && 'DIFÍCIL'}
                </h4>
              </div>
              <br />
              <div onClick={() => setUsosMapa(0)} className="card-nivel-voltar">
                <h4>SELECIONAR OUTRO NÍVEL</h4>
              </div>
              <br />
            </div>
          )}
        </div>
      ) : (
        <div className="jogo-container">
          <div>
            <br />
            <button
              class="btn btn-mapa"
              onClick={() => setMostrarMapa(true)}
              disabled={usosMapa <= 0}
            >
              Ver Mapa
            </button>
            <br />
            <h3>Usos Restantes = {usosMapa}</h3>
            <Jogo
              mapa={mapa}
              salaAtual={salaAtual}
              onPortaClick={onPortaClick}
              ultimaDirecao={ultimaDirecao}
              getPosicaoRelativaPorta={getPosicaoRelativaPorta}
            />
            <button
              class="btn btn-voltar"
              onClick={() => onPortaClick(getVoltarDirecao())}
              disabled={
                !salaAtual[
                  getVoltarDirecao().charAt(0).toUpperCase() +
                    getVoltarDirecao().slice(1)
                ]
              }
            >
              Descer
            </button>
            {ultimaDirecao} {getPosicaoRelativaPorta('baixo')}
          </div>
          <div className="minimapa">
            {mostrarMapa && (
              <Minimapa
                mapa={mapa}
                posicaoAtual={posicaoAtual}
                ultimaDirecao={ultimaDirecao}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Labirinto;
