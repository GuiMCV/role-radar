import React from 'react'
import { GEOAPIFY_KEY } from '../utils/chaves'

export default function MapaRadar({ latitude, longitude, lugares }) {
  // 1. Marcador do usuário (vermelho)
  const marcadorUsuario = `lonlat:${longitude},${latitude};color:%23d32f2f;size:48`

  // 2. Marcadores numerados dos lugares encontrados (azuis)
  const marcadoresLugares = lugares.map((lugar, index) => {
    const lon = lugar.properties.lon
    const lat = lugar.properties.lat
    const numero = index + 1
    return `lonlat:${lon},${lat};type:circle;color:%231565c0;size:42;contentsize:28;text:${numero}`
  }).join('|')

  // 3. Junta todos os marcadores
  const marcadores = `${marcadorUsuario}|${marcadoresLugares}`

  // 4. Monta a URL do mapa estático (Geoapify enquadra automaticamente)
  const urlRadar = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&marker=${marcadores}&apiKey=${GEOAPIFY_KEY}`

  return (
    <img
      src={urlRadar}
      alt="Radar com os lugares encontrados"
      className="w-full border-round"
    />
  )
}