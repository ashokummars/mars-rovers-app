export function loading(){
	return{
		type: 'LOADING'
	}
}



function saveRovers(rovers, status, errorMessage = ""){
	return{
		type: 'ROVERS',
		data: {
			rovers: rovers, 
			success: status,
			errorMessage: errorMessage
		}
	}
}


export function getRoversAsync(){
  console.log("#########");
  return async dispatch => {
    const res = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=adO1eHxyqLrNXlJuTS1wvVTHMh7iDZ9bz6geRvYp', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }})

    const response = await res.json();

    if( response.error ){
    	dispatch(saveRovers(null, false, response.error.message ))
    	return;
    }

    dispatch(saveRovers(response.rovers, true, null ))

    
  }
}

function saveRoverImages(roverImages, status, errorMessage = ""){
	return{
		type: 'ROVER_IMAGES',
		data: {
			roverImages: roverImages, 
			success: status,
			errorMessage: errorMessage
		}
	}
}


export function getRoversImagesAsync(rover, camera, martianSol){
  console.log("#########");
  return async dispatch => {
    let url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?';
	if( camera ){
		url += '&camera='+camera;
	}
	if( martianSol ) {
		url += '&sol=' + martianSol;
	}

	const res = await fetch( url + '&api_key=adO1eHxyqLrNXlJuTS1wvVTHMh7iDZ9bz6geRvYp' );

    const response = await res.json();
	if( response.error ){
		dispatch(saveRoverImages(null, false, response.error.message ))
    	return;
	}
	console.log( url );
	console.log(response);
	dispatch(saveRoverImages(response.photos, true, null ))

    
  }
}