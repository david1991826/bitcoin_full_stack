export default async ({

    message

}) => {

    return await navigator.clipboard.writeText( message );
};