



const Info = () => {
    return (
        <section style={{width: "100%", padding: "1em"}}>
            <h1 className="cp"style={{fontSize: "2em"}}>How it works</h1>
            <p style={{fontSize: "1.5em"}}>
                To create a letter, it's as easy as filling in the information below.
                <br/><br/>
                The generated letter is a "digital card" in that it will live on the web at a URL that can be 
                accessed on the browser and shared easily across all devices.
                <br/><br/>
                If you would like to have several different cards from different people on the same page
                like <a href="">this</a>, click on the add another person in the make card section. These can be addressed
                to the same person, or just a collection of different cards.
                <br/><br/>
                As of right now, we don't directly support uploading images from your device but any image addess 
                (including a link to an uploaded photo) will work! We also offer some defualts for ideas :)


            </p>
            <h1 className="cp"style={{fontSize: "2em"}}>Use cases</h1>
            <ul style={{fontSize: "1.5em"}}>
                <li>Create a birthday letter for a family or friend</li>
                <li>Creating a thank you wall for a teacher, family or friend</li>
                <li>Collecting some different short stories or pieces of writing</li>
            </ul>
            <p style={{fontSize: "1.5em"}}>... many more, get creative!</p>
        </section>
    )
};


export default Info;