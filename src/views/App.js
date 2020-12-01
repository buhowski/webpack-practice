import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import './App.scss';
import Header from '../components/header/Header';

import Home from './home/Home';
import About from './about/About';
import Projects from './projects/Projects';
import Gallery from './gallery/Gallery';

const routesData = [
	{
		pathTo: '',
		pageComponent: Home
	},
	{
		pathTo: 'about',
		pageComponent: About
	},
	{
		pathTo: 'projects',
		pageComponent: Projects
	},
	{
		pathTo: 'gallery',
		pageComponent: Gallery
	}
];

const App = () => {
	return (
		<BrowserRouter>
			<Route render={({location}) => (
				<TransitionGroup>
					<CSSTransition 
						key={location.key}
						classNames="slide"
						timeout={1700}
					>
						<div id="page" className="page">
							<div className="page-container">
								<Header />
								<Switch location={location}>
									{routesData.map(({pathTo, pageComponent}, i) => {
										return (
											<Route path={`/${pathTo}`} exact component={pageComponent} key={i}/>
										)
									})}
								</Switch>
							</div>
						</div>
					</CSSTransition>
				</TransitionGroup>
			)}/>
		</BrowserRouter>
	);
}

export default App;