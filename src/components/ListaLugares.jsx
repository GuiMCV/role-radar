import React from 'react'
import Lugar from './Lugar'

export default function ListaLugares({ lugares }) {
  return (
    <div>
      {lugares.map((lugar, index) => (
        <Lugar
          key={lugar.properties.place_id}
          numero={index + 1}
          nome={lugar.properties.name}
          endereco={lugar.properties.address_line2}
          distancia={lugar.properties.distance}
        />
      ))}
    </div>
  )
}