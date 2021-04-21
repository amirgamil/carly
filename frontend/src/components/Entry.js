import styled from 'styled-components';
import Content from '../components/Content'
import Text from '../components/Text'

const OptionContainer = styled.div`
width: 100%;
margin: 0 auto;
`;


const Entry = ({key, nameLetter, setNameLetter, msg, setMsgLetter, imgAdd, setImgAdd}) => {
    return (
        <OptionContainer>
            <h2>Card {key}</h2>
            <div className="block wrapper" style={{padding: "0 1em 2em 1em"}}>
                <OptionContainer>
                    <h1 className="option">Who's this from?</h1>
                    <p>Enter your name to display at the top of your letter</p>
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
            </div>
        </OptionContainer>
    )
}


export default Entry;