import React, { Component } from 'react'
import { Button } from '@primereact/ui/button'
import { InputText } from '@primereact/ui/inputtext'
import { Search } from '@primeicons/react/search'

const categorias = [
  { rotulo: 'Cafés', chave: 'catering.cafe' },
  { rotulo: 'Restaurantes', chave: 'catering.restaurant' },
  { rotulo: 'Parques', chave: 'leisure.park' },
  { rotulo: 'Farmácias', chave: 'healthcare.pharmacy' },
  { rotulo: 'Supermercados', chave: 'commercial.supermarket' },
  { rotulo: 'Museus', chave: 'entertainment.museum' }
]

export default class Busca extends Component {
  state = {
    categoria: null,
    raio: '1000',
    erro: null
  }

  static defaultProps = {
    dica: 'Raio em metros (100 a 5000)'
  }

  onFormSubmit = (e) => {
    e.preventDefault()

    if (!this.state.categoria) {
      this.setState({ erro: 'Escolha uma categoria.' })
      return
    }

    const raioNum = Number(this.state.raio)
    if (!Number.isInteger(raioNum) || raioNum < 100 || raioNum > 5000) {
      this.setState({ erro: 'Informe um raio inteiro entre 100 e 5000 metros.' })
      return
    }

    this.setState({ erro: null })
    this.props.onBuscaRealizada(this.state.categoria, raioNum)
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="flex flex-wrap gap-2 mb-3 justify-content-center">
          {categorias.map((cat) => {
            
            const selecionado = this.state.categoria === cat.chave
            return (
                <Button
                    key={cat.chave}
                    className="p-button-rounded"
                    style={{ backgroundColor: "#4F46E5", color: "#FFFFFF", borderColor: "#4F46E5" }}
                    type="button"
                    variant={selecionado ? undefined : "outlined"}
                    onClick={() => this.setState({ categoria: cat.chave })}>
                    {cat.rotulo}
                </Button>
            )
          })}
        </div>

        <div className="p-inputgroup mb-3">
            <InputText
                value={this.state.raio}
                onChange={(e) => this.setState({ raio: e.target.value })}
                placeholder={this.props.dica}>
            </InputText>
        </div>

        <Button className= "w-full"
            style={{ backgroundColor: "#4F46E5", color: "#FFFFFF", borderColor: "#4F46E5" }}>
            <Search/>Buscar
        </Button>
        {this.state.erro && (
          <p className="text-danger mt-2 text-center" style={{ color: 'red' }}>
            {this.state.erro}
          </p>
        )}
      </form>
    )
  }
}