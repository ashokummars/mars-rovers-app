import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

import RoverDetails from '../components/roverDetails';
import Layout from '../components/layout';
import Error from '../components/error';
import Spinner from '../components/spinner';
import NoInternet from '../components/nointernet';
import { getRoversAsync, loading } from '../actions';

class Rover extends React.Component {
	constructor( props ){
		super( props );

		this.state = {
			rover: '',
			roverName: '',
			camera: '',
			martianSol: ''
		}

		this.onRoverChange = this.onRoverChange.bind( this );
		this.onCameraChange = this.onCameraChange.bind( this );
		this.onMartianSolChange = this.onMartianSolChange.bind( this );

		this.props.loading();
		this.props.getRoversAsync();
	}

	componentDidMount() {
  		this.setState({ 
  			online: navigator.onLine 
  		})
	}

    render() {
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

        if( !this.props.success ) {
			return (
				<Error errorMessage={ this.props.errorMessage }/>
			)
		}

		const selectedRover = this.state.rover ? this.props.rovers[ this.state.rover ] : {};

		return(
			<div className="nasa-imagery-search-app">
				<div className="nasa-imagery-search">

					
					<div>
						<div className="row">
							<span>Select Rover</span>
							<span>
								<select onChange={ this.onRoverChange }>
								<option>Please Choose</option>
								{
									this.props.rovers.map( ( rover, index ) => (
										
										<option value={ index } key={ index }>{ rover.name }</option>
										
									))
								}
								</select>
							</span>
						</div>

						{ this.state.rover && this.state.rover.length > 0 ? 
							<>
								<div className="row">
									<span> Select Camera </span>
									<span>
										<select onChange={ this.onCameraChange }>
											<option>Please Choose</option>
											{
												this.props.rovers[ this.state.rover ].cameras.map(  c  => 

													<option value={ c.name } key={ c.name }>{ c.full_name }</option>
												
											 	) 
											}
										</select>
									</span>
								</div>

								<div className="row">
									<span>Enter Martial Sol</span>
									<span>
										<input type="text" onChange={ this.onMartianSolChange }/>
									</span>
								</div>


								<div className="row">
									<span>
										<Link href={"/images/[rover]?status=" + selectedRover.status + "&camera=" + this.state.camera + "&martianSol=" + this.state.martianSol + "&page=1" } as={`/images/${ this.state.roverName }?status=${ selectedRover.status }&camera=${ this.state.camera }&martianSol=${ this.state.martianSol }&page=1`}>
										{/*<Link href={{ pathname: `/images/${ this.state.roverName }`, query: { status: `${ selectedRover.status }`, camera: `${ this.state.camera }`, martianSol: `${ this.state.martianSol }` }}}>*/}
											<a className="button">Submit</a>
										</Link>
									</span>
								</div>
							</>

							: '' }
						</div>
					
					{ this.state.rover && this.state.rover.length > 0 ? <RoverDetails name={ selectedRover.name } launch_date={ selectedRover.launch_date } landing_date={ selectedRover.landing_date } status={ selectedRover.status } total_photos={ selectedRover.total_photos }/> : '' }

				</div>
				<style jsx>{`
					div.row{
						margin: 20px 0
					}
					div.row span:first-child{
						font-weight: bold;
						width: 150px;
						display: inline-block;
					}

					div.nasa-imagery-search{
						display: grid;
					    grid-template-columns: 1fr 200px;
					    grid-gap: 15px;
					}


					@media (max-width: 768px){
						div.nasa-imagery-search{
							grid-template-columns: repeat(1, 1fr);
					    }
					}

					a.button{
						border-radius: 5px;
					    color: #fff;
					    background: #3498db;
					    padding: 10px;
					    margin: 2em 0;
					    text-decoration: none
					}
					
				`}
				</style>
			</div>

		)
		
    }

    onRoverChange( event ){

		this.setState({
			...this.state,
			rover: event.target.value,
			roverName: this.props.rovers[ event.target.value ].name
		})
	}

	onCameraChange( event ){

		this.setState({
			...this.state,
			camera: event.target.value
		})
	}

	onMartianSolChange( event ) {
		this.setState({
			...this.state,
			martianSol: event.target.value
		})
	} 
}

const mapStateToProps = state => {
	return { 
		rovers: state.rovers || [], 
		success: state.success || '',
		loadingStatus: state.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return{
		getRoversAsync: () => dispatch(getRoversAsync()),
		loading: () => dispatch(loading())
	}
	
}
//export default connect(state => state)(Rover);
export default connect(mapStateToProps, mapDispatchToProps)(Rover);

