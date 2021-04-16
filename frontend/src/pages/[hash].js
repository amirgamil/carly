
//Statically generate card URLs that have already been created, pre-render page from props returned
export async function getServerSideProps(context) {
    //sort this out - load data directly from the MongoDB database
    //don't fetch! This is run on the server :)
    const res = await fetch("127.0.0.1:8998/api/" + encodeURIComponent(context.params.hash));
    const data = await res.json();

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
            <h2>{letter.person}</h2> 
            <div className ="wrapper block">
                <div className="image wrapper block">
                    <img className = "img" src={letter.image} />
                </div> 
                <p style= {{ whiteSpace: "pre-line"}}>
                  {letter.message}
                </p>
            </div>
        </div>
    )
}
