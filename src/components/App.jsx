import Cartao from './Cartao.jsx'
import Creditos from './Creditos.jsx'

function App() {
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
                <i className="pi pi-map-marker mr-2"></i>
                RolêRadar
            </h1>
            <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>

            <Creditos />

            <Cartao cabecalho="Teste">
                <p>Conteúdo do cartão</p>
            </Cartao>

            <footer style={{textAlign: 'center', marginTop: '40px'}}>
                 <p>RolêRadar © {obterAno()}</p>
            </footer>
            
        </div>
        
        

    )
}

export default App