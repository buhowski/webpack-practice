import React from "react";

class GalleryModal extends React.Component {

	render () {
		const {activeSlide, modalData, prev, next, hasPrev, hasNext, closeModal} = this.props;

		if (activeSlide === null) {
			return null
		}

		return (
			<div className="gallery-modal d-flex-c-c pos-abs">
				<div className="overlay pos-abs" onClick={closeModal}></div>
				{modalData.map(({bigImg}, i) => {
					return (
						<img className="slide-item" data-active={i === activeSlide} src={bigImg} alt={'picture ' + i} key={i}/>
					)
				})}
				{hasPrev && <span className='arrow modal-prev' onClick={prev}></span>}
				{hasNext && <span className='arrow modal-next' onClick={next}></span>}
			</div>
		)
	}
}

export default GalleryModal;