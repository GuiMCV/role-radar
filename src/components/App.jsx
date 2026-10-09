import React, { Component } from 'react'
import Creditos from './Creditos.jsx'
import Loading from './Loading.jsx'
import Cartao from './Cartao.jsx'
import MeuPonto from './MeuPonto.jsx'
import geoapifyClient from '../utils/geoapifyClient'
import { Button } from '@primereact/ui/button'
import { MapMarker } from '@primeicons/react'
import Busca from './Busca.jsx'

export default class App extends Component {
  state = {
    latitude: null,
    longitude: null,
    horarioLocalizacao: null,
    mensagemDeErro: null
  }

  obterLocalizacao = () => {
    window.navigator.geolocation.getCurrentPosition(
      (posicao) => {
        this.setState({
          latitude: posicao.coords.latitude,
          longitude: posicao.coords.longitude,
          horarioLocalizacao: Date.now(),
          mensagemDeErro: null
        })
      },
      (erro) => {
        console.log('MeuPonto removido')
        this.setState({
          mensagemDeErro: 'Não foi possível obter sua localização. Libere o acesso no navegador e atualize a página.'
        })
      }
    )
  }

  onBuscaRealizada = (categoria, raio) => {
    const { longitude, latitude } = this.state
    geoapifyClient.get('/places', {
      params: {
        categories: categoria,
        filter: `circle:${longitude},${latitude},${raio}`,
        bias: `proximity:${longitude},${latitude}`,
        limit: 20
      }
    })
    .then((resposta) => {
      console.log('Lugares encontrados:', resposta.data.features)
    })
    .catch((erro) => {
      console.log('Erro na busca:', erro)
    })
  }

  componentDidMount() {
    this.obterLocalizacao()
  }

  renderizarConteudo = () => {
    if (this.state.mensagemDeErro) {
      return <p className="text-center text-danger mt-3">{this.state.mensagemDeErro}</p>
    }
    if (!this.state.latitude) {
      return <Loading mensagem="Aguardando permissão de localização..." />
    }
    return (
        <>
            <Cartao cabecalho="Você está aqui">
                <MeuPonto
                latitude={this.state.latitude}
                longitude={this.state.longitude}
                horarioLocalizacao={this.state.horarioLocalizacao}
                onAtualizar={this.obterLocalizacao}
                />
            </Cartao>
            
            <Cartao cabecalho="O que você procura?">
                <Busca onBuscaRealizada={this.onBuscaRealizada} />
            </Cartao>
        </>
    )
  }

  render() {
    const estiloSubtitulo = {
      color: '#444444',
      fontSize: '1.2rem',
      textAlign: 'center' 
    }

    const obterAno = () => { 
      return new Date().getFullYear() 
    }

    return (
      <div>
        <h1 className="titulo">
          <MapMarker size={32} />
          RolêRadar
        </h1>
        <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>

        <Creditos />

        {this.renderizarConteudo()}

        <footer style={{ textAlign: 'center', marginTop: '40px' }}>
          <p>RolêRadar © {obterAno()}</p>
        </footer>
      </div>
    )
  }
}

