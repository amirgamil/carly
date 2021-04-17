import getLetter from '../https/getLetter'
import styled from 'styled-components'
import Letter from '../components/Letter'
import Footer from '../components/Footer'

//Generate card URLs by making a request to the server, pre-render page from props returned
export async function getServerSideProps(ctx) {
    //Query api to check the database for the backend
    const data = await getLetter(encodeURIComponent(ctx.params.hash));
    if (!data) {
        return {
            notFound: true,
        }
        //eventually add this to take you to a page
        // return {
        //     redirect: {
        //       destination: '/',
        //       permanent: false,
        //     },
        // }
    }
    console.log({
        props: { data }, //will be passed into page component as props
    });
    return {
        props: { template: false, data }, //will be passed into page component as props
    }
}

const Main = styled.div`
    --fg: #010100;
    --bg: #f9f2e3;
    background: var(--bg);
    color: var(--fg);
    min-height: 100vh;
    width: 100%;
`;

const ViewLetter = ({ data }) => {
    return (
        <Main>
            <Letter template = {false} data={data}/>
            <Footer />
        </Main>
    )
}

export default ViewLetter