import ArgonInformation from './ArgonInformation';
import { createElement as e } from 'react';


export default ({

    websiteName,
    websiteAbbreviation,
    supportEmail
    
}) => {

    const AE = websiteAbbreviation;

    return e(
        ArgonInformation,
        {
            title: 'Privacy Policy',
            lastUpdatedDate: 'July 1st 2020',
            titleContentsAndMore: [
                {
                    title: 'Scope',
                    contents: (
                        `This is the Privacy Policy of the technology company ${ websiteName }.
                        ${ websiteName } will be referred to in this document as "${ AE }".
                        "You", "your", the "user", or the "customer" will refer to anyone who uses ${ AE } services.
                        This Privacy Policy describes how ${ AE } handles your data and personally
                        identifiable information when using ${ AE } technology including the ${ websiteName } website,
                        or any other services provided by ${ AE }. ` +
                        `The purpose of this policy is to explain how ${ AE } gathers and uses data ` +
                        `in a way that's compliant with international regulations and how ` +
                        `the data managed by ${ AE } is secure for its customers.`
                    )
                },
                {
                    title: 'Acceptance of Privacy Policy',
                    contents: (
                        `In using the services provided by ${ AE },
                        you are in agreement with the Privacy Policy.
                        If you do not agree to or are unable to agree
                        to the Privacy Policy,
                        you should cease to use ${ AE } and its services immediately.`
                    )
                },
                {
                    title: 'Changes to the Privacy Policy',
                    contents: (
                        `The Privacy Policy of ${ AE } can be modified at ` +
                        `any time. When modified, ` +
                        `the "Last Updated" date at the top of ` +
                        `this Privacy Policy will be updated. ` +
                        `If there are any material changes to the ` +
                        `Privacy Policy, you will be notified by email or as required by law.`
                    )
                },
                {
                    title: 'Data Collection and Usage',
                    contents: (
                        `In order for ${ AE } to provide its services, ` +
                        `data is required to be collected and used in various ways. ` +
                        `Specifically here is the data that is collected by ${ AE } and how it's used:` + 
                        `Your IP address - in order to use the basic services provided by ${ AE },
                        your IP address is collected and is stored when creating an account.
                        Further usage of this account will be tied to the initial sign-up data.
                        Only you have access to your account data.

                        Your email address - your email address is required when signing up to your account
                        to provide an extra layer of access control and security.
                        Your account data is only accessible to you.
                        
                        For further compliance needs, ${ AE } can accept other
                        personal information including but
                        not limited to name, phone number, address,
                        and government issued personal identification documents.
                        This information may be needed to comply
                        with regulations and will not be shared with anyone else
                        without consent from the provider of the information.
                        This information will only be requested upon necessity
                        (e.g. court order) and will not normally be requested.
                        
                        Your usage data,
                        including cryptocurrency deposited,
                        withdrawn and transacted.
                        This also includes other information such as account usage data.
                        This data is kept private to you although
                        it may be anonymized and inspected in order to improve
                        ${ AE } security and overall quality.
                        
                        Anonymized usage data and statistics will be collected.
                        This is a transformed version of ${ AE } data with
                        any personally identifiable information removed.
                        This is used to improve ${ AE } security and quality.
                        Note, as explained
                        in more depth in the "Data Sharing" section,
                        any personally identifiable information will
                        not be shared with any third parties unless
                        under criminal investigation or unless consent has been given.
                        
                        Any volunteered information,
                        or information volunteered after requested from ${ AE }
                        is subject the terms of the Privacy Policy.`
                    )
                },
                {
                    title: 'Data Sharing',
                    contents: (
                        `In order to provide and maintain ${ AE } services,
                        your data may be shared with law enforcement
                        or other third parties upon necessity.
                        It should also be noted that ${ AE } being a company
                        that works with cryptocurrency, cryptocurrency transactions,
                        and the cryptocurrency network,
                        some of the data such as cryptocurrency addresses and
                        cryptocurrency transactions will be publicly viewable
                        through the cryptocurrency network.
                        
                        Below is a summary of what data is shared by ${ AE }:

                        Your data will be shared
                        with third party service providers
                        that are used as a basis for ${ AE }.
                        
                        For example,
                        ${ AE } uses Amazon Web Services and
                        Google Cloud Services to manage ${ AE } data.
                        Any third party service provider used will be
                        properly vetted to ensure any shared data
                        is being handled in an appropriate manner.
                        
                        Your personally identifiable information will
                        not be sold to any third party service providers.
                        
                        In the case of suspected fraud or other
                        illegal activity happening while using ${ AE } services,
                        ${ AE } may share relevant data with
                        legal authorities upon request.
                        
                        Your information may be shared with other ${ AE }
                        users in the case of suspicious or
                        illegal activity in order to prevent any further
                        problematic activity.
                        
                        Your anonymized third party information may be shared
                        with third party services for
                        analysis in order to improve ${ AE } security and services.
                        
                        Any other provided or volunteered
                        information where consent has been given for it to be shared.`
                    )
                },
                {
                    title: 'Data Protection',
                    contents: (
                        `${ AE } uses secure digital and procedural methodologies ` +
                        `in order to keep your data and your cryptocurrency as ` +
                        `secure as possible. ` +
                        `In order to keep your data and your cryptocurrency secure, ` +
                        `${ AE } security is based on highly secure existing ` +
                        `cloud infrastructure including AWS and Google Cloud. ` +
                        `In addition, ${ websiteName } DOES NOT store large ` +
                        `volumes of cryptocurrency. The ${ AE } services themselves ` +
                        `only contain purposefully minute amounts of ` +
                        `cryptocurrency that are needed for the business ` +
                        `computer operation logic.`
                    )
                },
                {
                    title: 'Data Retention and Access',
                    contents: (
                        `${ AE } uses accounts that can store personally
                        identifiable information associated with them.
                        Transactions and other user actions associated with
                        those accounts will be stored indefinitely
                        although the personally identifiable
                        information associated with those accounts and actions
                        are not necessarily stored indefinitely,
                        depending upon user request.
                        
                        Personally identifiable information stored with ${ AE }
                        can be deleted at any time except for
                        any data which is required to be kept by law.

                        If you require access to specific data
                        or have a request to delete certain data,
                        you can contact support at ${ supportEmail }.`
                    )
                },
                {
                    title: 'Third-Party Links',
                    contents: (
                        `${ AE } may have links to third-party websites
                        and other internet based services that are not
                        managed or are affiliated with ${ AE }.
                        ${ AE } is not responsible for any data shared
                        or any other interaction and any resulting
                        consequences of those actions on those
                        third-party entities. Please refer to those
                        companies' own terms and privacy policies in order
                        to understand how those companies deal with your data
                        and your privacy while using their services.`
                    )
                },
                {
                    title: 'Age Restrictions',
                    contents: (
                        `${ AE } is not intended for use by anyone
                        that is under the age of 18.
                        If you are under the age of 18
                        or are using ${ AE } for someone else
                        who is under the age of 18,
                        you are in violation of the Privacy Policy
                        and you must cease to use ${ AE } services immediately.`
                    )
                },
                {
                    title: 'Contact',
                    contents: (
                        `For any questions, complaints,
                        suggestions, comments, or compliments
                        about this Privacy Policy or any other
                        aspect of ${ AE } services, please don't hesitate to
                        contact us through email at ${ supportEmail }.`
                    )
                },
            ]
        }
    );
};
