import React from 'react';
import { Switch  } from 'react-router-dom';
import Route from './Route';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Test from '../pages/Test';
import CadastroInstituicao from '../pages/CadastroInstituicao';
import CardPet from '../pages/CardPet';
import CadastroPet from '../pages/CadastroPet';


const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/home" exact component={Home} isPrivate/>
        <Route path="/test" exact component={Test} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/dashboard" exact component={Dashboard} isPrivate />

        {/*Necessario voltar telas a seguir para private */}
        <Route path="/cadastroInstituicao" exact component={CadastroInstituicao}  isPrivate/>
        <Route path="/cadastroPet" exact component={CadastroPet}  isPrivate/>
        <Route path="/cardPet/:id" exact component={CardPet} isPrivate />
    </Switch>
);

export default Routes;
