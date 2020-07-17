export default ({
    
    timeout

}) => {
 
    if( !timeout ) {

        throw new Error( 'missing delay timeout' );
    }
    
    return new Promise( resolve => setTimeout( resolve, timeout ) );
};



