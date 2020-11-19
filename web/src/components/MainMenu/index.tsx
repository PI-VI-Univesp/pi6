import React , { ButtonHTMLAttributes } from 'react';
import { Menu } from './styles';
import { useHistory, Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';

const MainMenu: React.FC = ({children, ...rest}) => {

    const history = useHistory();
    const linkStyle = {
        color: 'white',
        textDecoration: 'none'
    }
    return(
    <>
    <Menu {...rest} >
            {children}
            <img className="logo" src={logoImg} alt="QueroPet" />
                <h3 className="title">Cadastro</h3>

                <ul>
                    <li><Link style={linkStyle} to='/cadastroInstituicao'>Meu Cadastro</Link></li>
                    <li><Link style={linkStyle} to='/alterarsenha'>Alterar Senha</Link></li>
                </ul>
                <h3>Gestão de Pets</h3>
                <ul>
                    <li><Link style={linkStyle} to='/novoPet'>Adicionar Novo Pet</Link></li>
                    <li><Link style={linkStyle} to='/'>Meus Pets</Link></li>
                    <li><Link style={linkStyle} to='/pedidosadocao'>Pedidos de Adoção</Link></li>
                </ul>
                <button style={{ position: 'absolute', bottom: '0', marginBottom: '10px', backgroundColor: 'none', color: 'black', }} onClick={() => { localStorage.removeItem("@QueroPet:token"); window.location.reload(); }}>
            Sair
        </button>
    </Menu>
    </>
    );}

export default MainMenu;
