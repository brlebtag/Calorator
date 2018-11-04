import React, { Component } from 'react';
import produce from "immer";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peso: 0.0,
      altura: 0.0,
      idade: 18,
      gorduraCorporal: 0,
      sexo: false,
      atividade: 0,
      cunningham: null,
      harrisBenedict: null,
      mifflinStJeor: null,
      simples: null,
    };
  }

  calcularFormulas() {
    const { peso, altura, idade, gorduraCorporal, sexo, atividade } = this.state;

    const ehInvalido = isNaN(peso) ||
      isNaN(altura) ||
      isNaN(idade) ||
      isNaN(gorduraCorporal)||
      isNaN(sexo)||
      isNaN(atividade);

    if (ehInvalido) {
      this.setState(produce(this.state, draft => {
        draft.peso = 0.0;
        draft.altura = 0.0;
        draft.idade = 18;
        draft.cunningham = null;
        draft.harrisBenedict = null;
        draft.mifflinStJeor = null;
        draft.simples = null;
      }));
    } else {
      this.setState(produce(this.state, draft => {
        draft.cunningham = Math.round(this.cunningham(peso, gorduraCorporal) * atividade);
        draft.harrisBenedict = Math.round(this.harrisBenedict(peso, altura, idade, sexo) * atividade);
        draft.mifflinStJeor = Math.round(this.mifflinStJeor(peso, altura, idade, sexo) * atividade);
        draft.simples = Math.round(this.simples(peso) * atividade);
      }));
    }
  }

  cunningham(peso,  gorduraCorporal) {
    return 500 + (22 * (peso - (peso * (gorduraCorporal/100))));
  }

  harrisBenedict(peso, altura, idade, sexo) {
    if (sexo) {
      // Homem
      return 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);
    } else {
      // Mulher
      return 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
    }
  }

  mifflinStJeor(peso, altura, idade, sexo) {
    if (sexo) {
      // Homem
      return 9.99 + (13.397 * peso) + (6.25 * altura) - (4.92  * idade) + 5;
    } else {
      // Mulher
      return 9.99 + (9.247 * peso) + (6.25 * altura) - (4.92 * idade) - 161;
    }
  }

  simples(peso) {
    return peso * 2.2 * 11;
  }

  render() {
    const {
        peso,
        altura,
        idade,
        gorduraCorporal,
        sexo,
        atividade,
        simples,
        cunningham,
        harrisBenedict,
        mifflinStJeor,
    } = this.state;
    return (
      <div className="App">
        <div className="card">
          <h1>Calorator</h1>
          <div className="input-field">
            <label>Peso (Kg):</label>
            <input
              type="number"
              value={peso}
              onChange={e => 
                this.setState(produce(this.state, draft => {
                  draft.peso = parseFloat(e.target.value);
                }))
              }
            />
          </div>
          <div className="input-field">
            <label>Altura (Cm):</label>
            <input
              type="number"
              value={altura}
              onChange={e => 
                this.setState(produce(this.state, draft => {
                  draft.altura = parseInt(e.target.value);
                }))
              }
            />
          </div>
          <div className="input-field">
            <label>Idade:</label>
            <input
              type="number"
              value={idade}
              onChange={e => 
                this.setState(produce(this.state, draft => {
                  draft.idade = parseInt(e.target.value);
                }))
              }
            />
          </div>
          <div className="input-field">
            <label>Gordura Corporal (%):</label>
            <input
              type="number"
              value={gorduraCorporal}
              onChange={e => 
                this.setState(produce(this.state, draft => {
                  draft.gorduraCorporal = parseInt(e.target.value);
                }))
              }
            />
          </div>
          <div className="input-field">
            <label>Sexo:</label>
            <select
              type="number"
              value={sexo}
              onChange={e => 
                this.setState(produce(this.state, draft => {
                  draft.sexo = e.target.value === 'true';
                }))
              }
            >
              <option value="false">Mulher</option>
              <option value="true">Homem</option>
            </select>
          </div>
          <div className="input-field">
            <label>Nivel de Atividade:</label>
            <select
              type="number"
              value={atividade}
              onChange={e => 
                this.setState(produce(this.state, draft => {
                  draft.atividade = parseFloat(e.target.value);
                }))
              }
            >
              <option value="1.2">Sedentário</option>
              <option value="1.25">Exercita-se levemente</option>
              <option value="1.55">Exercita-se Moderadamente</option>
              <option value="1.55">Exercita-se Intensamente</option>
              <option value="1.725">Exercita-se Intensamente</option>
              <option value="1.9">Exercita-se Extremamente Intensamente</option>
            </select>
            <br/><br/>
            <button type="submit" onClick={e => {
              e.preventDefault();
              this.calcularFormulas();
            }}>Calcular</button>
            <br/>
            <br/>
            {
              simples !== null ?
              (
                <div className="resultados">
                  <h2>Resultado</h2>
                  <div className="resultado">
                    <strong>Simples: </strong> {simples}
                  </div>
                  <div className="resultado">
                    <strong>Harris-Benedict: </strong> {harrisBenedict}
                  </div>
                  <div className="resultado">
                    <strong>Cunningham: </strong> {cunningham}
                  </div>
                  <div className="resultado">
                    <strong>Mifflin St Jeor: </strong> {mifflinStJeor}
                  </div>
                  <div className="resultado">
                    <strong>Média: </strong> {Math.round((simples + harrisBenedict + mifflinStJeor + cunningham) / 4)}
                  </div>
                </div>
              )
              : null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
