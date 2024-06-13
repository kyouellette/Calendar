import logo from './logo.svg';
import styled from 'styled-components';
import './App.css';
import Calendar from './calendar';

function App() {
  return (
    <PageContainer>
    <CalendarContainer>
    <Calendar />
    </CalendarContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-top: 64px;
`;


const CalendarContainer = styled.div`
  width: 400px;
`
export default App;
