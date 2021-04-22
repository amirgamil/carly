import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styled from 'styled-components';
import Intro from '../components/Intro.js'
import Text from '../components/Text'
import PopUp from '../components/PopUp'
import { useReducer, useState } from 'react'
import createLetter from '../https/createLetter'
import Info from '../components/Info'
import Entry from '../components/Entry';
const Container = styled.form`
  max-width: 800px;
  width: calc(100% - 2em);
  margin: 0 auto;
`;

const OptionContainer = styled.div`
    width: 100%;
    margin: 0 auto;
`;

//reducer takes (state, action) but we destructure action into the 4 values we need
const reducer = (cardStore, {operation, key, value, indexModify}) => {
  switch (operation) {
    case "add":
      return [...cardStore, {name: "", msg: "", imgAdd: ""}];
    case "remove":
      return cardStore.filter((_, index) => index !== key);
    case "update":
      //need to destructure state to create a new copy so that React picks up the change to rerender!
      let newCardStore = [...cardStore]
      newCardStore.forEach((data, index) => {
        if (index === indexModify) {
          data[key] = value;
        } 
        return data;
      });
      return newCardStore;
    default:
      return cardStore;
  }
};

export default function Home() {
  const [titleLetter, setTitleLetter] = useState('');
  //Card store is an array of objects {"name": _, "msg": , "img":}
  //useReducer takes (reducer, initialState)
  const [cardStore, dispatch] = useReducer(reducer, [{name: "test", msg: "", imgAdd: ""}] );
  // const [msg, setMsgLetter] = useState(['']);
  // const [imgAdd, setImgAdd] = useState(['']);
  const [newURL, setNewURL] = useState('');
  const [popUp, togglePopUp] = useState(false);
  const [password, setPassword] = useState('');
  const [expiry, setExpiry] = useState('day');
  const [numPeople, setNumPeople] = useState(1);


  function getExpiryDate() {
    var d = new Date();
    if (expiry === "day") {
      d.setDate(d.getDate() + 1);
    } else if (expiry === "week") {
      d.setWeek(d.getWeek() + 1);
    } else if (expiry === "mofnth") {
      d.setMonth(d.getMonth() + 1);
    } else if (expiry === "year") {
      d.setFullYear(d.getFullYear() + 1);
    } else if (expiry === "week") {
      d.setFullYear(d.getFullYear() + 5);
    }
    return d.toISOString();
  }

  function generateCard() {
      
      //prevent resubmission
      if (!newURL) {
        createLetter({
          title: titleLetter,
          message: msg, 
          person: nameLetter,
          image: imgAdd, 
          expiry: getExpiryDate(), 
          password: password,
        })
        .then(res => res.json())
        .then(data => {
            setNewURL("http://localhost:3000/" + data.hash);
            togglePopUp(true);
        }).catch(exception => {
            console.log("Uh oh, error trying to save card to db " + exception);
        });
      }
      
      
  }

  //general handler used to modify the different values in each of the cards
  //key is the type of variable being changed (name, img, msg), newContent is what to update this with and index is which card
  //newContent needs to get passed up (to this component the parent) from child
  function updateField(key, newContent, index) {
    dispatch({operation: "add", key: key, value: newContent, indexModify: index})
  }

  function decreaseNumberCards() {
    const len = cardStore.length;
    if (len >= 2) {
      dispatch({operation: "remove", key: cardStore.length - 1})
    }
  }

  return (
    <>
      <Header />
      <Intro />
      {popUp ? <PopUp url = {newURL} toggle = {togglePopUp}/> : null}
      <Container>
        <Info />
          <div className="" style={{marginTop: "3em", display: "flex", 
        flexDirection: "column", justifyContent: "space-between", 
        padding: "1em"}}>
            <h1 className="cp">Let's make a letter!</h1>
            <OptionContainer>
                <h1 className="option">Pick the title</h1>
                <Text placeholderTxt="Enter the title of the page to display" value={titleLetter} onchange = {setTitleLetter}/>
                {console.log("hi")}
                {cardStore.map((_, i) => {
                  return <Entry key={i.toString()} index={i} nameLetter={cardStore[i].name} msg={cardStore[i].msg} 
                  imgAdd={cardStore[i].imgAdd} dispatch={dispatch} />
                  })}
            </OptionContainer>
            <OptionContainer>
              <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <span className="block" style = {{width: "fit-content" ,marginTop: "20px", fontSize: "1.3em", backgroundColor: "red"}} 
                      onClick={() => dispatch({operation: "add"})}>
                  +
                </span>
                <span className="block" style = {{width: "fit-content" ,marginTop: "20px", fontSize: "1.3em"}} 
                      onClick={() => decreaseNumberCards()}>
                  -
                </span>
                
              </div>
              
            </OptionContainer>
            
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "100%"}}>
              <div>
                <label>password</label>
                <input placeholder = "Enter a password if you'd like" type="password" 
                       value={password} onChange={(evt) => setPassword(evt.target.value)}/>
              </div>
              <div>
                <label style={{paddingBottom: "10px"}} >expiry</label>
                <br />  
                <select name="expiry" id="expiry" onChange={(evt) => setExpiry(evt.target.value)}>
                  <option value="day">1 day</option>
                  <option value="week">1 week</option>
                  <option value="month">1 month</option>
                  <option value="year">1 year</option>
                  <option value="years">5 years</option>
                </select>
              </div>
               
            </div>
            <br/>
            <span className="block" style = {{width: "fit-content" ,marginTop: "20px", fontSize: "1.3em", margin: "0 auto"}} onClick={generateCard}>
                Create
              </span>
            
        </div>
        <hr style={{borderBottom: "4px dotted black", border: "0px", padding: "20px", display: "block"}}></hr>
      </Container>
      <Footer />
    </>
  )
}
