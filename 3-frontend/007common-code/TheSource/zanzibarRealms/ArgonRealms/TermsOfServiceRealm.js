import ArgonInformation from './ArgonInformation';
import { createElement as e } from 'react';


export default ({

    websiteName,
    websiteAbbreviation,
    supportEmail

}) => {

    const AE = websiteAbbreviation;
    const upperCaseWebsiteName = websiteName.toUpperCase();

    return e(
        ArgonInformation,
        {
            title: 'Terms of Service',
            lastUpdatedDate: 'July 1st 2020',
            titleContentsAndMore: [
                {
                    contents: (
                        `PLEASE READ THE TERMS OF SERVICE CAREFULLY.
                        YOU AGREE TO BE BOUND BY THE ENTIRE TERMS OF SERVICE
                        WHEN YOU CLICK "AGREE TO THE TERMS OF SERVICE" OR
                        BY USING ${ upperCaseWebsiteName } SERVICES.`
                    )
                },
                {
                    title: '1. Abbreviations and Equivalent Terms',
                    contents: (
                        `The following terms in this document
                        have their abbreviations and their equivalent
                        meanings listed as follows:

                        TERMS OF SERVICE: is equivalent to "TOS"
                        THE USER: is equivalent to "you", the "customer", or your "company" that uses ${ websiteName } services
                        ${ upperCaseWebsiteName }: (in reference to the company, not only to the website) is equivalent to "${ AE }", "us", or "we". 
                        USER ACCOUNT: a user "account" is equivalent.`
                    )
                },
                {
                    title: '2. Customer Agreement',
                    contents: (
                        `In you using ${ AE } services,
                        you are above 18 years of age and
                        are legally allowed in your jurisdiction
                        to make a binding agreement.
                        Also in using ${ AE } services, you agree with and
                        are fully capable of fulfilling the terms set
                        forth in this TOS. In the case where these
                        terms are violated, you agree to be liable to us.`
                    )
                },
                {
                    title: '3. Scope',
                    contents: (
                        `The terms set forth in this document
                        are the Terms of Service for ${ websiteName },
                        an organization subject to international regulations.
                        The terms apply to any users of ${ AE } services,
                        or anybody who accesses ${ AE } services in any way,
                        that includes via API, website, VR/AR experience,
                        app, video game console, AI home assistant,
                        or any other relevant technology.
                        The terms apply to anyone regardless
                        if they are paying customers or if they are just
                        accessing the publicly available services.`
                    )
                },
                {
                    title: '4. Changes to the Terms of Service',
                    contents: (
                        `In order to best serve our customers,
                        ${ AE } may modify the TOS at any time.
                        If material changes are made to the TOS,
                        you will be notified by email and/or as
                        required by regulations. The changes will take at
                        least fifteen (15) days to take place unless
                        it is legally necessary for those changes to
                        take place at a sooner or at a later time.
                        The last material update is indicated at the
                        top in the "Last Updated" section.
                        If you do not agree to the updated version,
                        you must cease to use ${ AE } as soon as the new TOS
                        is considered valid. By continuing to use ${ AE }
                        when the new TOS becomes valid, that indicates
                        that you accept the new TOS and agree to be bound
                        by its terms.`
                    )
                },
                {
                    title: `5. ${ websiteName } Accounts`,
                    contents: (
                        `To use the core ${ AE } services,
                        which includes the ability to receive
                        and to send cryptocurrency, you must create an account.
                        After the account has been created,
                        verification information is required to be provided.
                        The required information is personally
                        identifiable information that indicates that you are
                        in agreement with the terms set forth in this
                        ${ websiteName } Terms of Service document and
                        in the ${ websiteName } Privacy Policy.
                        The specific information that's required
                        is dependant on the region and time.
                        The information will be requested upon the
                        verification process (see the Privacy Policy
                        for more details on how your data is stored).
                        When your account has been verified,
                        requests to receive and withdraw cryptocurrency,
                        and other available operations, can be made. ` +
                        `While accessing ${ AE } services,
                        to create a user, you will need to provide authentication information such as
                        email and password. The account is what grants access
                        to your cryptocurrency and your personal information,
                        it is your responsibility for keeping this authentication info secure.
                        If you lose access to your authentication information, please contact ${ supportEmail }
                        to lock your account and to prevent any further actions with that account.`
                    )
                },
                {
                    title: '6. Privacy Policy',
                    contents: (
                        `${ AE } uses secure and ethical methodologies
                        in storing and managing your data.
                        Your personally identifiable information will
                        be kept secure and it will not be sold or shared.
                        For more information on how ${ AE } manages its data,
                        see the ${ websiteName } Privacy Policy.`
                    )
                },
                {
                    title: '7. General Terms',
                    contents: (
                        `${ AE } is NOT responsible for lost or stolen
                        account information or cryptocurrency.
                        This implies ${ AE } is NOT responsible
                        for lost or stolen cryptocurrency as a result
                        of lost or stolen account info.
                        
                        There is a fee in withdrawing cryptocurrency
                        from ${ websiteName }.
                        That fee is proportional to the cryptocurrency network
                        and goes towards the cryptocurrency network and towards ${ AE }.
                        
                        ${ AE } is a technology company that provides several
                        different internet based services which are
                        constantly evolving. As a result,
                        certain ${ AE } technologies may be updated
                        or deleted discontinuing the services provided by
                        those technologies. ${ AE } will use its discretion to
                        notify users of any changes in the services.`
                    )
                },
                {
                    title: '8. Unacceptable Use or Conduct',
                    contents: (
                        `1) using ${ websiteName } to finance anything
                        illegal is strictly against the ${ websiteName } Terms of Service.
                        If there is any suspected or discovered
                        criminal activity being facilitated by ${ AE },
                        it will immediately be investigated by ${ AE } and it will be
                        reported to the appropriate authorities.
                        2) any suspected activity related to
                        money laundering will be reported to the appropriate authorities
                        3) providing false or inaccurate information
                        4) abusing ${ AE } technology through hacking
                        or other malicious interactions with ${ AE } and its technology
                        5) disrupting others' user experience`
                    )
                },
                {
                    title: '9. Intellectual Property',
                    contents: (
                        `${ AE } retains all rights, interest,
                        and title in the services provided by ${ AE } and
                        its underlying technology.
                        In providing feedback to ${ AE }, you agree your feedback
                        is non-confidential and ${ AE } will own your feedback.
                        This applies to feedback in any form
                        whether through email, or posted on ${ AE } services elsewhere.`
                    )
                },
                {
                    title: '10. Third-Party Content',
                    contents: (
                        `In using ${ AE } services, we may provide access
                        to third-party content through ${ AE } content
                        (e.g. links to Twitter pages).
                        The usage of that third-party
                        content including the data you share while interacting
                        with that content is entirely between you and
                        that third-party and ${ AE } is not legally tied to
                        those third-parties in any way. ${ AE } does not endorse
                        or represent any third-party companies in any way
                        and does not provide any warranties
                        associated with them.
                        Use this third-party content at your own risk.`
                    )
                },
                {
                    title: '11. Non-Advisory',
                    contents: (
                        `${ AE } is not a business advisor in any way.
                        ${ AE } will give no monetary or legal advice.
                        All information provided by ${ AE } is for
                        informational purposes only.
                        You are solely responsible for the way you use your account.`
                    )
                },
                {
                    title: '12. Limitation Of Liability',
                    contents: (
                        `IN NO EVENT SHALL WE, OUR SERVICE PROVIDERS,
                        OUR SUBCONTRACTORS, OR OUR
                        LICENSORS BE LIABLE FOR ANY PUNITIVE,
                        SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR INDIRECT DAMAGES
                        (ALSO THIS INCLUDES LOSS OF GOODWILL,
                        LOSS OF USE, LOST PROFITS, OR LOSS OF DATA,
                        WITH NO LIMITATION), RESULTING FROM OR IN ASSOCIATION
                        WITH THESE TERMS OF SERVICE, OR THE OPERATION
                        OF ${ upperCaseWebsiteName } SERVICES,
                        YOUR VIEWING OF, USAGE OF, ACCESS TO,
                        ERROR IN ACCESSING, OR INABILITY TO ACCESS DATA,
                        SOFTWARE, LINKED CONTENT, INFORMATION,
                        OR OTHER SERVICES OBTAINED THROUGH THE ${ upperCaseWebsiteName }
                        SERVICES, OR THE ACT OF ANY OTHER
                        BUSINESS USING OR INTERACTING WITH OUR SERVICES,
                        WHETHER OR NOT WE, OUR SERVICE PROVIDERS,
                        OUR SUBCONTRACTORS, OR OUR LICENSORS HAVE BEEN MADE
                        AWARE OF OR HAVE BEEN ADVISED OF THE POSSIBILITY OF
                        SUCH DAMAGES, AN ALSO WHETHER SUCH LIABILITY WAS
                        A RESULT OF ANY CLAIM BASED UPON BREACH OF WARRANTY,
                        BREACH OF CONTRACT, TORT, NEGLIGENCE,
                        PRODUCT LIABILITY OR OTHERWISE.`
                    )
                },
                {
                    title: '13. Indemnification',
                    contents: (
                        `In using ${ AE } services, you agree to indemnify,
                        defend and hold us, our consultants,
                        employees, subsidiaries, partners, affiliates,
                        and licensors, free from harm against any damages,
                        liabilities, claims, costs, losses,
                        and expenses (this includes attorney fees
                        and fees for any other services or professionals used)
                        that resulted from or is in any way related to
                        your usage of ${ AE } services, you violating any
                        individual's rights, or you violating the TOS.`
                    )
                },
                {
                    title: '14. Arbitration',
                    contents: (
                        `You and ${ AE } agree to arbitrate any
                        legal dispute that occurs as a result of using
                        ${ AE } services or any dispute regarding the TOS.
                        ARBITRATION PREVENTS YOU FROM SUING IN COURT AND
                        HAVING A JURY TRIAL. YOU AND ${ AE } WILL NOT INITIATE 
                        CLASS ACTION, CLASS ARBITRATION OR REPRESENTATIVE
                        ACTION OR PROCEEDING AGAINST EACH OTHER.
                        You and ${ AE } will maintain confidentiality of
                        any arbitration proceedings, judgments and awards,
                        including, but not limited to all 
                        associated with the arbitration and any information
                        related to the dispute in question. Any claim resulting
                        from or associated with the TOS must be filed within one
                        (1) year after the claim arose.
                        If the claim is not filed within that time period,
                        the claim is permanently barred.`
                    )
                },
                {
                    title: '15. No Waiver',
                    contents: (
                        `None of the terms in this TOS will be
                        waived in the case of us failing to
                        exercise or enforce any of the terms in the TOS.
                        Failure to exercise any right does
                        not constitute a waiver of that right.`
                    )
                },
                {
                    title: '16. Contact',
                    contents: (
                        `For any questions, complaints,
                        suggestions, comments, or compliments
                        about this Terms of Service or any other aspect of
                        ${ websiteName } services,
                        please don't hesitate to contact us
                        through email at ${ supportEmail }.`
                    )
                },
            ]
        }
    );
};
