import Letter from '../components/Letter'
import Link from 'next/link'

export default function Intro() {
    const tempData = [{
        person: "Riley",
        msg: `Dear Molly, 
        
                  Thanks for being the best friend I could ask for. 
                  
                  You're always there for me and make me feel special. 
                  
                  I'm incredibly grateful that I get to laugh with you every single day.
                  
                  Best,

                  Riley`,
        imgAdd: "https://www.ctvsh.com/sites/default/files/styles/large/public/golden-retriever-dog-breed-info.jpg?itok=KV7Ojj-C",
    }]
    return (
        <>
            <section style={{margin: "0 auto", width: "100%", textAlign: "center", padding: "1em"}}>
                <h1 style = {{fontSize: "3em", padding: "0 20px 0 20px"}}>
                    Generate a <span className="cp">beautiful digital letter</span> for any occasion that can be
                    <span className="cp"> shared in seconds</span></h1>
                <h2 style={{fontSize: "2em", marginTop: "-2em", position: "relative" }}>
                    Open it in your <span className="cp">browser!</span>
                </h2>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <Link href="/#makeLetter" passHref>
                        <a className="block" style={{fontSize: "1em"}}>
                            Make one
                        </a>
                    </Link>
                    {/*TODO: ADD LINK*/}
                    <a href="add link" className="block" style={{fontSize: "1em"}}>
                        See an example
                    </a>
                </div>
            </section>   
            <Letter style={{padding: "1em"}} template = {true} title={""} content = {tempData}/>
        </>
    )
}