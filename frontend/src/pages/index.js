import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styled from 'styled-components';
import Title from '../components/Title';
import Content from '../components/Content' ;
import UploadImage from '../components/UploadImage';

const Container = styled.form`
  width: calc(100% - 2em);
  margin: 0 auto;
`;


export default function Home() {
  return (
    <Container>
      <Header />
      <div style={{height: "175px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
        <Title />
        <Content />
        <UploadImage />
      </div>
      

      <Footer />
    </Container>
  )
}
