
import styled from 'styled-components';
import Text from './Text';
import Content from '../components/Content' ;
import UploadImage from '../components/UploadImage';
import { useState } from 'react';
import PopUp from '../components/PopUp'

const OptionContainer = styled.div`
    width: 100%;
    margin: 0 auto;
`;

export default function Card() {
    const [titleLetter, setTitleLetter] = useState('');
    const [nameLetter, setNameLetter] = useState('');
    const [msg, setMsgLetter] = useState('');
    const [imgAdd, setImgAdd] = useState('');
    const [newURL, setNewURL] = useState('');
    const [popUp, togglePopUp] = useState(false)

    function generateCard() {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "hash": "",
                "title": titleLetter,
                "message": msg,
                "image": imgAdd,
                "person": nameLetter
            }),
        };
        console.log("hello");
        fetch("http://127.0.0.1:8998/api", requestOptions)
        .then(res => res.json())
        .then(data => {
            setNewURL("localhost:3000/" + data.hash);
            togglePopUp(true);
        }).catch(exception => {
            console.log("Uh oh, error trying to save card to db " + exception);
        });
       
    }

    return (
    <div className="block wrapper" style={{marginTop: "3em", display: "flex", 
    flexDirection: "column", alignItems: "center", justifyContent: "space-between", 
    padding: "1em", backgroundColor: "red"}}>
        <h1 className="block">Make a card!</h1>
        <OptionContainer>
            <h1 className="option">Pick the title</h1>
            <Text placeholderTxt="Enter the title of the page to display" value={titleLetter} onchange = {setTitleLetter}/>
        </OptionContainer>
        <OptionContainer>
            <h1 className="option">Enter your name</h1>
            <p>Enter your name to display at the top of the letter</p>
            <Text placeholderTxt="Enter your name" value={nameLetter} onchange = {setNameLetter}/>
        </OptionContainer>
        <OptionContainer>
            <h1 className="option">What's the message?</h1>
            <p>Enter it exactly as you want it to appear on the website card (including linebreaks and spaces)</p>
            <Content placeholderTxt="Enter your message" content = {msg} onchange={setMsgLetter}/> 
        </OptionContainer>
        <OptionContainer>
            <h1 className="option">Enter an image address</h1>
            <p>Unfortunately, we don't support directly uploading images, but any image link (google drive etc.) works!</p>
            <Text placeholderTxt="Enter an image address" value={imgAdd} onchange = {setImgAdd}/>
        </OptionContainer>
        <span className="block" style = {{marginTop: "20px", fontSize: "1.3em"}} onClick={generateCard}>
            Create
        </span>
        {popUp ? <PopUp url = {newURL} toggle = {togglePopUp}/> : null}
    </div>
    )
}
