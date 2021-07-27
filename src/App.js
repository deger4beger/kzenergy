import { Route, Switch, Redirect } from "react-router-dom"
import { NotFound } from './components/NotFound/NotFound';
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import CornerMenu from "./components/CornerMenu/CornerMenu"
import HomePage from "./pages/Homepage/Homepage"
import Registration from "./pages/Registration/Registration"
import Login from "./pages/Login/Login"
import Work from "./pages/Work/Work"
import Archive from "./pages/Archive/Archive"
import Guide from "./pages/Guide/Guide"
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
                            <Redirect to="/work"/>
                        </Route>
                        <Route path="/homepage" render={() =>
                            <HomePage />}/>
                        <Route path="/registration" render={() =>
                            <Registration />}/>
                        <Route path="/login" render={() =>
                            <Login />}/>
                        <Route path="/work/:scroll?" render={() =>
                            <Work />}/>
                        <Route path="/archive" render={() =>
                            <Archive />}/>
                        <Route path="/guide" render={() =>
                            <Guide />}/>
                        <Route path="*" render={() =>
                            <NotFound />}/>
                    </Switch>
                </div>
            </div>
            <Footer />
            <CornerMenu />
        </>
    )
}

export default App
