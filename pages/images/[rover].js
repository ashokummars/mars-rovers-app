import fetch from 'isomorphic-unfetch';

import React from 'react';

import App from 'next/app';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { connect } from 'react-redux';

import RoverDetails from '../../components/roverDetails';
import NoImages from '../../components/noimages';
import Pagination from '../../components/pagination';
import Layout from '../../components/layout';
import Error from '../../components/error';
import Spinner from '../../components/spinner';
import NoInternet from '../../components/nointernet';

import { getRoversImagesAsync, loading } from '../../actions';

class Images extends React.Component{

	constructor( props ){
		super( props );
		this.state = {
			images: []
		}

		const { rover, camera, martianSol, limit } = this.props.router.query;

		this.props.loading();
		this.props.getRoversImagesAsync(rover, camera, martianSol, limit);
	}

	componentDidMount() {
  		this.setState({ 
  			online: navigator.onLine 
  		})
	}
	
	render = () => {

		if( !this.state.online ){
    		return (
    			<NoInternet/>
    		)
    	}

		if( this.props.loadingStatus ){
    		return(
    			<Spinner/>
    		)
    	}

		
		if( !this.props.success ){
			return(<Error errorMessage={ this.props.errorMessage } />);
		}

		let page = this.props && this.props.router && this.props.router.query.page;
		page = isNaN( page ) ? 1 : parseInt( page );
		const photos = this.props.photos || [];
		const batchRecords = photos.slice( ( page-1 )*10, ((page-1)*10)+10) || [];


		return(
			<div className="nasa-imagery-search-app">
				
				<RoverDetails name={ this.props.router.query.rover } total_pictures={ photos.length }/>

				<div className="gallery">
					{
						batchRecords.map( ( photo, index ) => (
							
							<div className="gallery-div" key={ photo.id }>
								<picture>
									<source srcSet={ photo.img_src.replace("http://", "https://") } className="gallery-img"/>
									<img src={ photo.img_src.replace("http://", "https://") } key={ photo.id } className="gallery-img"/>
								</picture>
							</div>
							
						))
					}
				</div>

				{
					this.props && this.props.photos.length === 0 ? <NoImages/> : ''
				}

				{ this.props.photos.length > 10 ?
					<Pagination resultsSize={ this.props.photos.length } 
						roverName = { this.props.router.query.rover } 
						status = { this.props.router.query.status } 
						camera = { this.props.router.query.camera }
						martianSol = { this.props.router.query.martianSol }
						currentPage = { this.props.router.query.page }
						pagesToDisplay = { 5 }/>
					: ''
				}

				<style jsx>{`
					div.gallery{
						display: grid;
					    grid-template-columns: repeat(4, 1fr);
					    grid-gap: 15px;
					}

					img{
						width: 100%;
						height: 100%;
						display: block;
					}

					@media (max-width: 768px){
						div.gallery{
							grid-template-columns: repeat(2, 1fr);
					    }
					}

					@media (max-width: 768px){
						div.gallery{
							grid-template-columns: repeat(2, 1fr);
					    }
					}

					@media (max-width: 480px){
						div.gallery{
							grid-template-columns: repeat(1, 1fr);
					    }
					}
				`}
				</style>
			</div>
		)
	}


	static async getInitialProps( context ){

		const { rover, camera, martianSol, limit } = context.query;

		context.store.dispatch(getRoversImagesAsync(rover, camera, martianSol, limit));

		
		return {};
	}
}

const mapStateToProps = state => {
	return { 
		photos: state.roverImages || [], 
		success: state.success || '',
		loadingStatus: state.loading 
	};
};

const mapDispatchToProps = (dispatch) => {
	return{
		getRoversImagesAsync: (rover, camera, martianSol, limit) => dispatch(getRoversImagesAsync(rover, camera, martianSol, limit)),
		loading: () => dispatch(loading())
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Images));

