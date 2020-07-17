'use strict';

const fs = require( 'fs' );

const computerUserName = process.env.COMPUTER_USER_NAME || 'ec2-user';

const reportPath = `/home/${ computerUserName }/currentWithdrawReports.txt`;

const writeReportToFile = Object.freeze( ({

    withdrawReport

}) => {

    const stream = fs.createWriteStream(
        
        reportPath,
        {
            flags: 'a'
        }
    );

    stream.write(
        `==--==--==--==--==--==--==--==--==--==--==--==--==\n` +
        `Withdraw Occurred - ${ (new Date()).toLocaleString() }\n` +
        `${ JSON.stringify( withdrawReport, null, 4 ) },\n` +
        `==--==--==--==--==--==--==--==--==--==--==--==--==\n`
    );

    stream.end();
});


module.exports = Object.freeze( ({

    withdrawReport

}) => {

    console.log( 'running safeWriteReportToFile' );

    try {

        writeReportToFile({ withdrawReport });

        console.log( 'safeWriteReportToFile executed successfully' );
    }
    catch( err ) {

        console.log(
            'an error occur in writing safeWriteReportToFile:', err
        );
    }
});
