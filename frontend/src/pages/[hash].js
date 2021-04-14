

function ViewLetter({ letter }) {
    return (
        <div>
            <h2>${letter.person}</h2> 
            <div class ="wrapper block">
                <div class="image wrapper block">
                    {/* <img src = `` /> */}
                </div> 
                <p style= {{ whiteSpace: "pre-line"}}>
                  ${letter.message}
                </p>
            </div>
        </div>
    )
}

//Statically generate card URLs that have already been created, pre-render page from props returned
export async function getStaticProps(context) {
    //sort this out - load data from the MongoDB database
    const res = await fetch("/api/" + encodeURIComponent(context.params.hash));
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