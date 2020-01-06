import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

class Pagination extends React.Component {
	constructor( props ){
		super( props );

		this.state = {
			startPagination: 1
		}

		this.start = this.start.bind(this);
	}

	componentDidMount(){
		let { currentPage } = this.props;
		currentPage = isNaN( currentPage ) ? 1 : currentPage;
    	this.setState({ 
    		startPagination: +currentPage
    	});
	}

	render(){
		const currentPage = +this.props.currentPage ;
		const paginationBatches = this.batches( this.props.resultsSize, this.props.pageSize, currentPage );
		const paginations = this.activePaginations( paginationBatches, this.props.pagesToDisplay, this.props.resultsSize );
		return(
			<div className="pagination">
				{ paginations.prev.enabled ? 
					<div className="prev pages">
						<a onClick={ this.start } data-start = { paginations.prev.start } className="page">&lt;</a>
					</div>
					: ''
				}
				<div className="pages">
					{ paginations.pages.map( page =>  
						<Link key={ page.page } href={"/images/[rover]?status=" + this.props.router.query.status + "&camera=" + this.props.router.query.camera + "&martianSol=" + this.props.router.query.martianSol + "&page=" + page.page} as={`/images/${ this.props.router.query.rover }?status=${ this.props.router.query.status }&camera=${ this.props.router.query.camera }&martianSol=${ this.props.router.query.martianSol }&page=${ page.page }`}>
							<a className={"page " + (page.active ? 'disabled' : '') }>{ page.page }</a>
						</Link>)
					}
					
				</div>
				{ paginations.next.enabled ? 
					<div className="next pages">
						<a onClick={ this.start } data-start = { paginations.next.start } className="page"> &gt; </a>
					</div>
					: ''
				}

				<style jsx>{`
					div.pages{
	    				overflow-y: scroll;
	    				display: initial;
	    				margin: auto;

	    				background: #3498db;
    					padding: 5px;
					}

					div.pagination{
						display: table;
						padding: 10px 0;
						margin: auto;
					}

					a.page{
					    color: #fff;
					    border-right: 1px solid #fff;
					    padding: 0 10px;
					    text-decoration: none
					}

					a.disabled{
						text-decoration: none;
					    cursor: not-allowed;
					    pointer-events: none;

					    color: #33DDFF;
					    font-weight: bold;
					}

					div.pages a:last-child{
						border-right: unset;
					}

					div.prev, div.next{
						margin: 0 5px;
					}
				`}</style>
				
			</div>
		)
	}

	start( event ) {

		this.setState({
			startPagination: event.target.dataset.start
		})
	}

	batches(resultsSize=0, pageSize=10, currentPage=1 ) {
	
		let obj = {
			pages: []
		};
		let page = 1;
	    for(var i = 0; i < resultsSize; i += pageSize ){
	        obj.pages.push({
	            start: i+1,
	            end: i+10,
	            active: currentPage === page ? true : false,
	            page: page
	        });
	        page++;
	    }
	    return obj;

	}

	activePaginations( batches, pagesToDisplay=5, resultsSize ){

		
		let currentPage = +this.state.startPagination;

		const pageStart = ( ( currentPage / pagesToDisplay ) * pagesToDisplay )- ( currentPage % pagesToDisplay ) ;

		const pages = batches.pages.slice( pageStart , pageStart + pagesToDisplay);

		let pageObj = {
			pages: pages
		}

		const nextEnabled = batches.pages.length > ( pageStart + pagesToDisplay) ? true : false;
		pageObj.next = {
			enabled: nextEnabled,
			start: nextEnabled ? pageStart + pagesToDisplay : ''
		}

		const prevEnabled = ( currentPage - pagesToDisplay) >= 0 ? true : false;
		pageObj.prev = {
			enabled: prevEnabled,
			start: currentPage - pagesToDisplay
		}

		return pageObj;

	}
}


export default withRouter(Pagination);