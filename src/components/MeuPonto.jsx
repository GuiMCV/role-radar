import React, { Component } from 'react'
import { Button } from '@primereact/ui/button'
import { GEOAPIFY_KEY } from '../utils/chaves'
import { Refresh } from '@primeicons/react/refresh';

export default class MeuPonto extends Component {
  state = {
    agora: Date.now()
  }

  timer = null

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ agora: Date.now() })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { latitude, longitude, horarioLocalizacao, onAtualizar } = this.props
    const { agora } = this.state
    const decorrido = Math.floor((agora - horarioLocalizacao) / 1000)
    const latFormatada = Number(latitude).toFixed(4)
    const lonFormatada = Number(longitude).toFixed(4)
    const hemisferio = latitude >= 0 ? 'Hemisfério Norte' : 'Hemisfério Sul'
    const urlMapa = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=300&center=lonlat:${longitude},${latitude}&zoom=16&marker=lonlat:${longitude},${latitude};color:%23d32f2f;size:48&apiKey=${GEOAPIFY_KEY}`
    return (
      <div className="text-center">
        <img 
          src={urlMapa} 
          alt="Mapa da localização" 
          className="img-fluid rounded mb-3" 
          style={{ maxHeight: '300px', width: '100%', objectFit: 'cover' }}
        />
        <div className="mb-3">
          <p className="m-1"><strong>Latitude:</strong> {latFormatada}</p>
          <p className="m-1"><strong>Longitude:</strong> {lonFormatada}</p>
          <p className="m-1"><strong>Hemisfério:</strong> {hemisferio}</p>
          <p className="text-muted m-1">Localização obtida há {decorrido} s</p>
        </div>
        <Button 
            onClick={onAtualizar} 
            style={{ backgroundColor: "#4F46E5", color: "#FFFFFF", borderColor: "#4F46E5" }}>
            Atualizar localização
            <Refresh/>
        </Button>
      </div>
    )
  }
}