
import styled from 'styled-components';
import Title from '../components/Title';
import Content from '../components/Content' ;
import UploadImage from '../components/UploadImage';



export default function Card() {

    async function generateCard(title, message, image) {
        //some 
    }

    return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", 
    padding: "1em"}}>
        <h1>Pick the title</h1>
        <Title placeholderTxt="Enter the title of the page to display"/>
        <h1>What's the message?</h1>
        <p>Enter it exactly as you want it to appear on the website card (including linebreaks and spaces)</p>
        <Content /> 
        <h1>Enter an image address</h1>
        <p>Unfortunately, we don't support directly uploading images, but any image link (google drive etc.) works!</p>
        <Title placeholderTxt="Enter an image address"/>
        <button>
            Submit
        </button>
    </div>
    )
}
