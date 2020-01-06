
const RoverDetails = ( props ) => (
	<div>
		{ props.name ? 
			<div>
				<span>Rover</span>
				<span>{ props.name }</span>
			</div>
			: ''
		}

		{ props.launch_date ? 
			<div>
				<span>Launch Date</span>
				<span>{ props.launch_date }</span>
			</div>
			: ''
		}

		{ props.landing_date ? 
			<div>
				<span>Landing Date</span>
				<span>{ props.landing_date }</span>
			</div>
			: ''
		}

		{ props.status ? 
			<div>
				<span>Status</span>
				<span>{ props.status }</span>
			</div>
			: ''
		}

		{ props.total_photos ? 
			<div>
				<span>Total Photos</span>
				<span>{ props.total_photos }</span>
			</div>
			: ''
		}

		{ props.total_cameras ? 
			<div>
				<span>Total Cameras</span>
				<span>{ props.total_cameras }</span>
			</div>
			: ''
		}

		<style jsx>{`
			div span{
				padding: 5px 0;
			}

			div span:first-child{
				font-weight: bold;
				width: 100px;
				display: inline-block;
			}

			div span:last-child{
				padding-left: 15px;
			}
		`}
		</style>
	</div>
)

export default RoverDetails;