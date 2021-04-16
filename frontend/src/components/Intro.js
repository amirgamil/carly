import ViewLetter from '../pages/[hash].js'

export default function Intro() {
    const tempData = {
        person: "Riley",
        message: `Dear Molly, 
                  Thanks for being the best friend I could ask for. 
                  
                  You're always there for me and make me feel special. I'm incredibly grateful that
                  
                  I get the chance to know and laugh with you.
                  
                  Best,

                  Riley`,
        image: "https://www.ctvsh.com/sites/default/files/styles/large/public/golden-retriever-dog-breed-info.jpg?itok=KV7Ojj-C",
    }
    return (
        <>
            <section style={{margin: "0 auto", width: "100%", textAlign: "center", padding: "1em"}}>
                <h1 style = {{fontSize: "3em"}}>Generate a beautiful card that can be shared in seconds</h1>
                <h2 style={{fontSize: "2em", position: "relative"}}>
                    Open it in your browser!
                </h2>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <button className="block" style={{fontSize: "1em"}}>
                        Make one
                    </button>
                    <button className="block" style={{fontSize: "1em"}}>
                        See an example
                    </button>
                </div>
            </section>   
            <ViewLetter style={{padding: "1em"}} letter = {tempData}/>
        </>
    )
}