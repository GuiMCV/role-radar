import React from 'react'
import Cartao from './Cartao'

const formatarDistancia = (distancia) => {
  if (distancia < 1000) {
    return `a ${Math.round(distancia)} m`
  }
  const km = (distancia / 1000).toFixed(1).replace('.', ',')
  return `a ${km} km`
}

export default function Lugar({ numero, nome, endereco, distancia }) {
  const estiloCirculo = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    flexShrink: 0
  }

  return (
    <Cartao cabecalho={formatarDistancia(distancia)}>
      <div className="flex align-items-center gap-3">
        <div style={estiloCirculo}>{numero}</div>
        <div>
          <div className="font-bold text-lg">{nome || 'Sem nome'}</div>
          <div className="text-color-secondary text-sm">{endereco}</div>
        </div>
      </div>
    </Cartao>
  )
}