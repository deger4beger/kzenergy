import './App.css'
import { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from "react-router-dom"
import { NotFound } from './components/NotFound/NotFound';
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import CornerMenu from "./components/CornerMenu/CornerMenu"
import Login from "./pages/Login/Login"
import Work from "./pages/Work/Work"
import LeftCornerMenu from './components/LeftCornerMenu/LeftCornerMenu';

const HomePage = lazy(() => import("./pages/Homepage/Homepage"))
const Registration = lazy(() => import("./pages/Registration/Registration"))
const Archive = lazy(() => import("./pages/Archive/Archive"))

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
                        <Route path="/login" render={() =>
                            <Login />}/>
                        <Route path="/work/:scroll?" render={() =>
                            <Work />}/>
                        <Suspense fallback={<div className="loading">Loading...</div>}>
                            <Switch>
                                <Route path="/homepage" render={() =>
                                    <HomePage />}/>
                                <Route path="/registration" render={() =>
                                    <Registration />}/>
                                <Route path="/archive" render={() =>
                                    <Archive />}/>
                                <Route path="*" render={() =>
                                    <NotFound />}/>
                            </Switch>
                        </Suspense>
                    </Switch>
                </div>
            </div>
            <Footer />
            <CornerMenu />
            <LeftCornerMenu />
        </>
    )
}

export default App
