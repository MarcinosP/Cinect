import AsyncComponent from '../../components/async-component';

export const AuthSignInPage = () => {
    return(
        <>
            <AsyncComponent component={ () => import( './content' ) } />  
        </>
    )
}
