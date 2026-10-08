import React, { Component } from 'react'

export default class Loading extends Component {
  static defaultProps = {
    mensagem: 'Carregando...'
  }

  render() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center m-4">
        <i className="pi pi-spin pi-spinner mb-2" style={{ fontSize: '2rem' }}></i>
        <p>{this.props.mensagem}</p>
      </div>
    )
  }
}