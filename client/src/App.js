import React, { Suspense, lazy } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

function App() {
	const api_regex = /^\/api\/.*/;
	// if using "/api/" in the pathname, don't use React Router
	if (api_regex.test(window.location.pathname)) {
		return <div />; // must return at least an empty div
	} else {
		return (
			<div>
				<Suspense fallback={<div>Loading...</div>}>
					<Switch>
						<Route exact path="/about">
							<About />
						</Route>
						<Route exact path="/">
							<Home />
						</Route>
					</Switch>
				</Suspense>
			</div>
		);
	}
}

export default App;
