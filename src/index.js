import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AppContainer from './AppContainer';

import './i18n';

ReactDOM.render(
	<BrowserRouter>
		<Suspense fallback={<div>Loading...</div>}>
			<AppContainer />
    	</Suspense>
	</BrowserRouter>,
document.getElementById('root')
)


