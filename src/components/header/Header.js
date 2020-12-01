import React from 'react';
import {NavLink} from 'react-router-dom';
import MediaQuery from 'react-responsive';
import Socials from '../socials/Socials';
import './Header.scss';

const linksData = [
	{
		pageLink: 'about',
		pageName: 'About Me'
	},
	{
		pageLink: 'projects',
		pageName: 'Projects'
	},
	{
		pageLink: 'gallery',
		pageName: 'Gallery'
	}
];
const Header = () => {
	const [menuOpen, setMenuOpen] = React.useState(false);
	const navLinkItems = linksData.map(({pageLink, pageName}, i) => {
		return (
			<li className="nav-item d-flex" key={i}>
				<NavLink className="a nav-link" to={`${pageLink}`} exact>{pageName}</NavLink>
			</li>
		)
	});
	const LogoNavLink = () => {
		return (
			<div className="logo d-flex">
				<NavLink className="a logo-link" to="/" exact>
					<span className="tag-color">&lt;</span><span>Buhowski</span><span className="tag-color">/&gt;</span>
				</NavLink>
			</div>
		)
	};

	return (
		<header className={`header d-flex-c${menuOpen ? ' header-overflow' : ''}`}>
			<div className="wrapper">
				<MediaQuery minWidth={769}>
					<div className="d-flex-c-b">
						<LogoNavLink />
						<nav>
							<ul className="nav d-flex-c">
								{navLinkItems}
							</ul>
						</nav>
					</div>
				</MediaQuery>
				<MediaQuery maxWidth={768}>
					<LogoNavLink />
					<div className='mobile-menu-btn' onClick={() => {setMenuOpen(o => !o)}}>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<nav className={`pos-abs mobile-menu${menuOpen ? ' open' : ''}`}>
						<div className="d-flex-c-c">
							<div>
								<ul className="nav">
									{navLinkItems}
								</ul>
								<Socials />
							</div>
						</div>
					</nav>
				</MediaQuery>
			</div>
		</header>
	)
}

export default Header;