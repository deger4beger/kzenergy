import { useHistory } from "react-router-dom"
import GoogleLogin from "react-google-login"
import { observer } from 'mobx-react-lite';

const GoogleLog = ({auth}) => {
    const history = useHistory()

    const responseSuccess = (response) => {
        auth.auth({token: response.tokenObj.id_token}, history)
    }

    const responseError = (error) => {
        console.log(error)
    }

    return (
        <>
            <GoogleLogin
                clientId="454639115091-p02rrdr4rf155jdibedbk2d6ef6mbr2u.apps.googleusercontent.com"
                // render={renderProps => (

                // )}
                onSuccess={responseSuccess}
                onFailure={responseError}
                cookiePolicy={'single_host_origin'}
                disabled={auth.loading}
            />
        </>
    )
}

export default observer(GoogleLog)













