import ArgonInformation from './ArgonInformation';
import { createElement as e } from 'react';


export default ({

    websiteName,
    websiteAbbreviation,
    supportEmail

}) => {

    const upperCaseWebsiteName = websiteName.toUpperCase();

    return e(
        ArgonInformation,
        {
            title: 'Terms of Service',
            lastUpdatedDate: 'July 1st 2020',
            titleContentsAndMore: [
                {
                    contents: (
                        `HERE ARE THE TERMS FOR ${ upperCaseWebsiteName }.`
                    )
                },
                {
                    title: '1. Super Cool First Terms Section',
                    contents: (
                        `Here are the terms some cool terms:
                        ${ websiteName }, ${ websiteAbbreviation }, 
                        ${ supportEmail }. Here is some text.
                        The terms for this site is literally this text, wow!`
                    )
                },
                {
                    title: '2. The Crazy Awesome Second Terms Section',
                    contents: (
                        `This is the second terms section.
                        This is a fun section too.
                        A lot of cool things can be put here.
                        You can put important business terminology
                        and conditions to make sure your business
                        is compliant with the people of the world!😁`
                    )
                }
            ]
        }
    );
};
