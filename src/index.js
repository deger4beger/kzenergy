import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import AppContainer from './AppContainer';

import './i18n';

ReactDOM.render(
	<HashRouter>
		<Suspense fallback={<div className="loading">Loading...</div>}>
			<AppContainer />
    	</Suspense>
	</HashRouter>,
document.getElementById('root')
)


