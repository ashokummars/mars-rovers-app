import Link from 'next/link';
import { useRouter } from 'next/router';

import About from '../pages/about';

const Header = ( ) => {
	const router = useRouter();


	return(
		<>
			<div className="nasa-imagery-search-app">
				{ router.pathname === "/" ? '' : 
					<Link href="/">
						<a className="back">Back</a>
					</Link>
				}

				<span> Nasa Rover Images App </span>

				{ router.pathname === "/about" ? '' : 
					<Link href="/about" as={`/images`}>
						<a className="about">About</a>
					</Link>
				}
			</div>

			<style jsx>{`
				div{
					position: relative;
					height: 40px;
				}

				a{
					margin: 0 20px;
				}

				span{
					font-weight: bold;
    				size: 16px;
				}

			`}
			</style>
		</>
	)
}

export default Header;