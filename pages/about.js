import Link from 'next/link';

const About = ( ) => (
	
	<div className="nasa-imagery-search-app">
		
		<div>This application is designed to view the images captured by NASA&apos;s satellite. </div>
		<div>The satellite has 3 Rovers namingly Curiosity, Opportunity and Spirit</div>
		<div>Each Rover has one or more cameras</div>
		<div>Images can be searched and viewed based on combination of Rover, Cameras and Martian Sol</div>
		<style jsx>{`
			div{
				margin: 10px 0;
			}
		`}
		</style>
	</div>

)

export default About;