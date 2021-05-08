
import img from '../../public/image.gif'
import drive from '../../public/drive.gif'

const Info = () => {
    return (
        <section style={{width: "100%", padding: "1em"}}>
            <h1 className="cp infoTitle">How it works</h1>
            <p className="infoText">
                To create a letter, it's as easy as filling in the information below.
                <br/><br/>
                The generated letter is a "digital card" in that it will live on the web at a URL that can be 
                accessed on the browser and shared easily across all devices.
                <br/><br/>
                If you would like to have several different cards from different people on the same page
                like <a href="https://carly.amirbolous.com/166989a">this</a>, click on the + button in the make card section. These can be addressed
                to the same person, or just a collection of different cards. 
                <br/><br/>

            </p>
            <h1 className="cp infoTitle">Use cases</h1>
            <ul className="infoText">
                <li>Creating any kind of letter (birthday, Christmas, wedding etc.) for a family or friend</li>
                <li>Creating a thank you wall for a teacher, family or friend</li>
                <li>Collecting some different short stories or pieces of writing</li>
                <li>Showcasing the work of different students in the same class</li>
            </ul>
            <p className="infoText">... many more, get creative!</p>

            <h1 className="cp infoTitle">Adding images</h1>
            <p className="infoText">To add images, there are two options. One, you can find any image online and copy its image address
            like this</p>
            {/*Code will be duplicated to reduce dependencies, otherwise need to install webpack file loader*/}
            <div className="center-horiz">
                <div className="block wrapper" style={{display: "grid"}}>
                    <img className="gif" src = {img}/>
                </div>
            </div>
            
            <p className="infoText">Or, you can upload custom photos to Google Drive and get the image address from there like this
            (make sure to open the image in a new window!)</p>
            <div className="center-horiz">
                <div className="block wrapper" style={{display: "grid"}}>
                    <img className="gif" src = {drive}/>
                </div>
            </div>

            <h1 className="cp infoTitle">Support the project</h1>
            <p className="infoText">If you found this project useful, consider supporting it <a 
            href="https://www.buymeacoffee.com/amirbolous">here</a> to keep it free, forever, for everyone :)</p>

        </section>
    )
};


export default Info;