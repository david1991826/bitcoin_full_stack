export default ({
    
    text,
    maxAmount = 69,
    allowedNumberOfDecimals = 8,
    
})=> {

    const textAsNumber = Number( text );

    if(
        Number.isNaN( textAsNumber ) ||
        (textAsNumber > maxAmount) ||
        text.startsWith( '00' ) ||
        (
            (text.length > 1) &&
            text.startsWith( '0' ) &&
            text[1] !== ( '.' )
        )
    ) {

        return false;
    }
    
    const periodSplitText = text.split( '.' );

    if(
        (periodSplitText.length === 2) &&
        periodSplitText[1].length > allowedNumberOfDecimals
    ) {

        return false;
    }
    
    return true;
};
