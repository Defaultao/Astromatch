import React, {useState} from 'react';
import styled from 'styled-components';
import Match from './Components/Match/Match';
import MatchList from './Components/MatchList/MatchList';

const Containers = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 50px;
`


function App() {
  const [screen, setScreen] = useState('match')

  const goToMatches = () => {
    setScreen('match')
  }

  const goToMatchesList = () => {
    setScreen('matchList')
  }


  return (
    <Containers>
      { screen === 'match' ? <Match goToMatchesList={goToMatchesList} />  : 
        <MatchList goToMatches={goToMatches}/> }
    </Containers>
  );
}

export default App;
