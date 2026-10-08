import React from 'react'
import 'primeflex/primeflex.css'

const Cartao = ({cabecalho, children}) => {
  return (
        <div className="border-1 border-round border-300 p-3 mb-3 bg-white">
            <div className="text-sm text-500 mb-2 font-semibold">
                {cabecalho}
            </div>
            {children}
        </div>
  )
}

export default Cartao