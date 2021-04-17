import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styled from 'styled-components';
import Card from '../components/Card.js'
import Intro from '../components/Intro.js'

const Container = styled.form`
  max-width: 800px;
  width: calc(100% - 2em);
  margin: 0 auto;
`;


export default function Home() {
  return (
    <>
      <Header />
      <Intro />
      <Container>
        <Card />
      </Container>
      <Footer />
    </>
  )
}
