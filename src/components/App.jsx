import React, { Component } from 'react'
import Creditos from './Creditos.jsx'
import Loading from './Loading.jsx'
import Cartao from './Cartao.jsx'
import MeuPonto from './MeuPonto.jsx'
import geoapifyClient from '../utils/geoapifyClient'
import { Button } from '@primereact/ui/button'
import { MapMarker } from '@primeicons/react'
import Busca from './Busca.jsx'
import ListaLugares from './ListaLugares.jsx'
import MapaRadar from './MapaRadar.jsx'

export default class App extends Component {
  state = {
    latitude: null,
    longitude: null,
    horarioLocalizacao: null,
    mensagemDeErro: null,
    lugares: null,
    buscando: false,
    erroBusca: null,
    raioBuscado: null
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

    this.setState ({
      buscando: true,
      erroBusca: null,
      raioBuscado: raio
    })

    geoapifyClient.get('/places', {
      params: {
        categories: categoria,
        filter: `circle:${longitude},${latitude},${raio}`,
        bias: `proximity:${longitude},${latitude}`,
        limit: 20
      }
    })
    .then((resposta) => {
      this.setState({ 
        lugares: resposta.data.features,
        buscando: false
      })
    })
    .catch((erro) => {
      console.log('Erro na busca:', erro)
      this.setState({
        buscando: false, 
        erroBusca: 'Não foi possível consultar os lugares. Tente novamente.'
      })
    })
  }

  componentDidMount() {
    this.obterLocalizacao()
  }

  renderizarColunaDireita = () => {
    const { buscando, erroBusca, lugares, raioBuscado, latitude, longitude } = this.state

    // 1. Durante a busca: exibe indicador de carregamento
    if (buscando) {
      return <Loading mensagem="Procurando lugares..." />
    }

    // 2. Em caso de erro na requisição
    if (erroBusca) {
      return <p className="text-center text-danger mt-3">{erroBusca}</p>
    }

    // 3. Antes de realizar qualquer busca
    if (lugares === null) {
      return null
    }

    // 4. Busca sem resultados
    if (lugares.length === 0) {
      return (
        <p className="text-center mt-3">
          Nenhum lugar encontrado. Tente aumentar o raio.
        </p>
      )
    }

    // 5. Busca com resultados: exibe Resumo, Radar e Lista
    const total = lugares.length
    const textoResumo = total === 1
      ? `1 lugar encontrado em até ${raioBuscado} m`
      : `${total} lugares encontrados em até ${raioBuscado} m`

    return (
      <>
        <p className="font-bold text-lg mb-2">{textoResumo}</p>
        <Cartao cabecalho="Radar">
          <MapaRadar
            latitude={latitude}
            longitude={longitude}
            lugares={lugares}
          />
        </Cartao>
        <ListaLugares lugares={lugares} />
      </>
    )
  }

  renderizarConteudo = () => {
    if (this.state.mensagemDeErro) {
      return <p className="text-center text-danger mt-3">{this.state.mensagemDeErro}</p>
    }
    if (!this.state.latitude) {
      return <Loading mensagem="Aguardando permissão de localização..." />
    }
    return (
      <div className="grid">
        <div className="col-12 md:col-6">
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
        </div>

        <div className="col-12 md:col-6">
          {this.renderizarColunaDireita()}
        </div>
      </div>
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

