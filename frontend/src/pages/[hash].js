import getLetter from '../https/getLetter'
import styled from 'styled-components'
import Letter from '../components/Letter'
import Footer from '../components/Footer'
import { useState } from 'react';
import { useRouter } from 'next/router'

//Generate card URLs by making a request to the server, pre-render page from props returned
export async function getServerSideProps(ctx) {
    //Query api to check the database for the backend
    const data = await getLetter(encodeURIComponent(ctx.params.hash));
    if (!data) {
        return {
            notFound: true,
        }
    } else if (data.status === 401) {
        //Means the letter requires a password, so we need to render it as such
        return {
            props: {
                authenticated: false,
            }
        }
    }
    console.log({
        props: { data }, //will be passed into page component as props
    });
    return {
        props: { data, authenticated: true }, //will be passed into page component as props
    }
}

const Main = styled.div`
    --fg: #010100;
    --bg: #f9f2e3;
    background: var(--bg);
    color: var(--fg);
    min-height: 100vh;
    width: 100%;
    font-family: 'Handlee', cursive;
`;

const ViewLetter = ({ data, authenticated }) => {
    const [isAuthenticated, setAuthenticated] = useState(authenticated);
    const [password, setPassword] = useState('');
    const [clientData, setClientData] = useState(data)
    const router = useRouter();
    const hash = router.query;

    const tryAuthenticating = () => {
        getLetter(hash.hash, password)
               .then(data => {
                   console.log(data);
                   if (data.success === true) {
                       //need to set client data before we set authenticated which upon the rerender would still have 
                       //undefined data
                        setClientData(data);
                        setAuthenticated(true);
                    } else {
                        alert("wrong password");
                   }
               }).catch(exception => {
                    console.log("error authenticating with a password " + exception);
               });
    }

    if (isAuthenticated) {
        return (
            <Main>
                <Letter template = {false} data={clientData}/>
                <Footer />
            </Main>
        )
    } else {
        return (
            <div className="modal">
                <div className="block wrapper modal-content">
                    <h3 style={{marginBottom: "20px"}}>Ooops, there's a gift on the other side!</h3>
                    <input style={{marginBottom: "20px"}} placeholder="Enter the password" type="password" value={password} 
                           onChange={(evt) => setPassword(evt.target.value)}/>
                    <button className="block" onClick={(evt) => tryAuthenticating()}>
                        Submit
                    </button>
                </div>
            </div>
        )
    }
}

export default ViewLetter