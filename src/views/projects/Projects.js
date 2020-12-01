import React from 'react';
import {Link} from 'react-router-dom';
import projectsData from './projectsData';
import './Projects.scss';

const Projects = () => {
	return (
		<div className="wrapper wrapper-container">
			<h1 className="base-title">Projects</h1>
				<div className="projects-container">
					{projectsData.map(({img, url, name}, i) => {
						return (
							<article className="project d-flex-c" style={{backgroundImage: img}} key={i}>
								<Link className="a project-link" to={{pathname: url}} target="_blank" rel="noopener noreferrer">
									<div className="project-container d-flex">
										<h3 className="project-name">{name}<span>_</span></h3>
									</div>
								</Link>
							</article>
						)
					})}
				</div>
		</div>
	)
}

export default Projects;