import { createElement as e } from 'react';
import {

    TitlePolygon,
    BlankSpace,
    usefulComponents

} from '../../../TheSource';


// const getStyles = () => {
    
//     return {

//     };
// };


export default ({
    websiteName
}) => {

    // const styles = getStyles();

    return e(

        BlankSpace,
        null,
        e(
            TitlePolygon,
            {
                websiteName
            }
        ),
        e( usefulComponents.FastMessage )
    );
};
