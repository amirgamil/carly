
import styled from 'styled-components';
import Title from '../components/Title';
import Content from '../components/Content' ;
import UploadImage from '../components/UploadImage';



export default function Card() {

    async function generateCard(title, message, image) {
        //some 
    }

    return (
    <div style={{height: "175px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
        <Title />
        <Content /> 
        <UploadImage />
        <button>
            Submit
        </button>
    </div>
    )
}
