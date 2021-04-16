import getLetter from '../http/getLetter'
//Generate card URLs by making a request to the server, pre-render page from props returned
export async function getServerSideProps(ctx) {
    //sort this out - load data directly from the MongoDB database
    //don't fetch! This is run on the server :)
    console.log("here")
    const res = await getLetter(encodeURIComponent(ctx.params.hash));
    console.log("success");
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

    return {
        props: { data }, //will be passed into page component as props
    }
}

export default function ViewLetter({ letter }) {
    return (
        <div className="letterCard">
            <h2 className="person">{letter.person}</h2> 
            <div className ="wrapper block main">
                <div className="image wrapper block">
                    <img className = "img" src={letter.image} />
                </div> 
                <p style= {{ whiteSpace: "pre-line", marginTop: "15px"}}>
                  {letter.message}
                </p>
            </div>
        </div>
    )
}
