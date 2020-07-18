import ArgonInformation from './ArgonInformation';
import { createElement as e } from 'react';


export default ({

    websiteName,
    websiteAbbreviation,
    supportEmail
    
}) => {

    return e(
        ArgonInformation,
        {
            title: 'Privacy Policy',
            lastUpdatedDate: 'July 1st 2020',
            titleContentsAndMore: [
                {
                    title: '1. Super Cool First Privacy Section',
                    contents: (
                        `Here are the terms,
                        some cool terms related to privacy:
                        ${ websiteName }, ${ websiteAbbreviation }, 
                        ${ supportEmail }. Here is some text.
                        The privacy policy for this
                        site is literally this text, wow!`
                    )
                },
                {
                    title: '2. The Crazy Awesome Privacy Policy Second Section',
                    contents: (
                        `This is the second privacy policy section.
                        This is a fun section too.
                        A lot of cool things can be put here.
                        You can put important business terminology
                        and conditions to make sure your business
                        is privacy-policy friendly with
                        the people of the world!😁`
                    )
                }
            ]
        }
    );
};
