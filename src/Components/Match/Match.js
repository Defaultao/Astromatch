import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  width: 150px;
  height: 700%;
  
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;

h2 {
  display: inline-block;
  font-weight: bold;
  background: linear-gradient(to bottom, #FF5C00 57%, #000000 43%);
  background-clip: text;
  font-family: 'Source Code Pro', monospace;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 15px;
}
`
const HeaderButton = styled.button`
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 20px;
  border-radius: 50%;
`

const P = styled.p`
  font-size: 7px;
  font-family: Space Meatball;
  text-align: center;
  padding: 0 2px;
`

const DivImage = styled.div`
  overflow: hidden;
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Image = styled.img`
  width: 100%;
  max-height: 300px;
  margin: auto;
`

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
`

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 50%;
`


function Match(props) {
  const [person, setPerson] = useState({});


const getPerson = async () => {
  await axios.get(
   `https://us-central1-missao-newton.cloudfunctions.net/astroMatch/junior/person`
  ).then((response) => {
      setPerson(response.data.profile)
  }).catch((error) => {
      console.log(error)
  })
};

useEffect(() => {
  getPerson();
}, []);

const matchPerson = (choice) => {
  const body = {
    id: `${person.id}`,
    choice: choice,
  };

  axios.post(
    `https://us-central1-missao-newton.cloudfunctions.net/astroMatch/junior/choose-person`, body
  ).then(() =>{
      getPerson();
  })
  .catch ((error) =>{
      getPerson();
      console.log(error);
  });
};


return (
  <Container>
      
      <HeaderContainer>
          <h2>ASTROMATCH</h2>
          <HeaderButton onClick={props.goToMatchesList}> 👩‍❤️‍👨 </HeaderButton>
      </HeaderContainer>
    
      <DivImage>
        <Image src={person.photo}/>
      </DivImage>

        <P>{person.name}, {person.age}</P>
        <P>{person.bio}</P>

      <ButtonContainer>
        <Button onClick={() => matchPerson(false)}> ⛈️ </Button>
        <Button onClick={() => matchPerson(true)}> 🔥 </Button>
      </ButtonContainer>

  </Container>
  );
}

export default Match;
