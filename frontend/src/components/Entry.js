import styled from 'styled-components';
import Content from '../components/Content'
import Text from '../components/Text'

const OptionContainer = styled.div`
width: 100%;
margin: 0 auto;
`;


const Entry = ({index, nameLetter, msg, imgAdd, dispatch}) => {
    //no way to break this code up since we need to get data from child component and can't pass in
    //callback with methods already set
    const updateNameData = (value) => {
        dispatch({operation: "update", key: "name", value: value, indexModify: index})
    } 

    const updateMsgData = (value) => {
        dispatch({operation: "update", key: "msg", value: value, indexModify: index})
    } 
    const updateImgAdd = (value) => {
        dispatch({operation: "update", key: "imgAdd", value: value, indexModify: index})
    } 

    return (
        <OptionContainer>
            <h2>Card {index + 1}</h2>
            <div className="block wrapper" style={{padding: "0 1em 2em 1em"}}>
                <OptionContainer>
                    <h1 className="option">Who's this from?</h1>
                    <p>Enter your name to display at the top of your letter</p>
                    <Text key={"name" + index} placeholderTxt="Enter your name" value={nameLetter} onchange = {updateNameData}/>
                </OptionContainer>
                <OptionContainer>
                    <h1 className="option">What's the message?</h1>
                    <p>Enter it exactly as you want it to appear on the website card (including linebreaks and spaces)</p>
                    <Content placeholderTxt="Enter your message" content = {msg} onchange={updateMsgData}/> 
                </OptionContainer>
                <OptionContainer>
                    <h1 className="option">Enter an image address</h1>
                    <p>Unfortunately, we don't support directly uploading images, but any image link (google drive etc.) works!</p>
                    <Text key={"name" + index} placeholderTxt="Enter an image address" value={imgAdd} onchange = {updateImgAdd}/>
                </OptionContainer>
            </div>
        </OptionContainer>
    )
}


export default Entry;