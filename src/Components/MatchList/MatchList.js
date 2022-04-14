import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  width: 250px;
  height: 400%;
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

const UlNone = styled.ul`
    width: 100%;
    list-style: none;
`
const List = styled.li`
    display: flex;
    align-items: center;
    width: 100%;
`

const Image = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
`

const MatchList = (props) => {
    const [matches, setMatches] = useState([])

    
    const getMatchList = async () => {
        await axios.get(
         `https://us-central1-missao-newton.cloudfunctions.net/astroMatch/junior/matches`
        ).then((response) => {
            setMatches(response.data.matches)
        }).catch((error) => {
            alert(error)
        })
      };
      
      useEffect(() => {
        getMatchList();
      }, []);

      const ClearMatches = () => {
          axios.put(`https://us-central1-missao-newton.cloudfunctions.net/astroMatch/junior/clear`
          ).then((res)=>{
              setMatches([])
          })
      }

    return (

    <Container>
      
      <HeaderContainer>
          <HeaderButton onClick={ ClearMatches }> 🗑️ </HeaderButton>
            <h2>ASTROMATCH</h2>
          <HeaderButton onClick={props.goToMatches}> 👩‍❤️‍👨 </HeaderButton>
      </HeaderContainer>

      <div> 
        {matches.map((list) =>{
            return (
                <UlNone key={list.id}>
                    <List>
                        <Image src={list.photo}/>
                        <p>{list.name}</p>
                    </List>
                </UlNone>
            )
        })
        }
      </div>

  </Container>
)}


export default MatchList;