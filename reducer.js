const reducer = (state = {}, action) => {
    switch (action.type) {
        
        case 'LOADING':
            return {
                ...state, 
                loading: true
            };
        case 'ROVERS':
            return {
                ...state, 
                rovers: action.data.rovers, 
                success: action.data.success, 
                errorMessage: action.data.errorMessage, 
                loading: false
            };
        case "ROVER_IMAGES":
            console.log("PHOTOS&&&&&&");
            console.log(action);
            return {
                ...state,
                roverImages: action.data.roverImages,
                success: action.data.success, 
                errorMessage: action.data.errorMessage, 
                loading: false
            }
        default:
            return state;
    }
};

export default reducer;