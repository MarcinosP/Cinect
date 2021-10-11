import AsyncComponent from '../../components/async-component';

export const AuthSignUpPage = () => {
    return(
        <>
            <AsyncComponent component={ () => import( './content' ) } />  
        </>
    )
}
