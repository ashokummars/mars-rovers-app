import Header from './Header';

const styles = {
	margin: "40px 10px"
}

const Layout = ( props ) => (
	<>
		<Header/>
		<div style={ styles }>
			{ props.children }
		</div>
	</>
)

export default Layout;