import getLetter from '../https/getLetter'
//Generate card URLs by making a request to the server, pre-render page from props returned
export async function getServerSideProps(ctx) {
    //Query api to check the database for the backend
    const data = await getLetter(encodeURIComponent(ctx.params.hash));
    if (!data) {
        console.log("oops doodzy");
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
const ViewLetter = ({ template, data }) => {
    console.log(data);
    return (
        <div className="letterCard">
            <h2 className="person">{data.person}</h2> 
            <div className ="wrapper block main">
                <div className="image wrapper block">
                    <img className = "img" src={data.image} />
                </div> 
                <p style= {{ whiteSpace: "pre-line", marginTop: "15px"}}>
                  {data.message}
                </p>
            </div>
        </div>
    )
}

export default ViewLetter