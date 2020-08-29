export default key => {
    
    const url = window.location.href;
    
    key = key.replace(/[[\]]/g, '\\$&');
    
    const regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)');
    
    const results = regex.exec( url );
    
    if( !results ) {
        
        return null;
    }

    if( !results[2] ) {

        return '';
    } 

    const value = decodeURIComponent( results[2].replace( /\+/g, ' ' ) );

    return value;
};