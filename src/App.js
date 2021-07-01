import { Route, Switch, Redirect } from "react-router-dom"
import { NotFound } from './components/NotFound/NotFound';
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import HomePage from "./pages/Homepage/Homepage"
import Registration from "./pages/Registration/Registration"
import Login from "./pages/Login/Login"
import Game from "./pages/Game/Game"
import './App.css'

const App = ({setLanguage, lang}) => {
    return (
        <>
            <Header
                setLanguage={setLanguage}
                lang={lang}
            />
            <div className={"wrapper"}>
                <div className={"mainBlock"}>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/homepage"/>
                        </Route>
                        <Route path="/homepage" render={() =>
                            <HomePage />}/>
                        <Route path="/registration" render={() =>
                            <Registration />}/>
                        <Route path="/login" render={() =>
                            <Login />}/>
                        <Route path="/game/:gameMode/:length?" render={() =>
                            <Game />}/>
                        <Route path="*" render={() =>
                            <NotFound />}/>
                    </Switch>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default App
