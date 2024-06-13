import styled from "styled-components"
import { useState, useEffect } from 'react';
import ChevronLeft from './chevron-left.svg'
import ChevronRight from './chevron-right.svg'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function daysInMonth(year, month) {
    const newDays = new Date(year, month + 1, 0).getDate();
    return newDays;
  }

const Calendar = () => {
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentDateOfMonth = currentDate.getDate();
const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
const [selectedDate, setSelectedDate] = useState(null);
const [numDaysInMonth, setNumDaysInMonth] = useState(daysInMonth(selectedYear, selectedMonth));

const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
const numRows = Math.ceil((numDaysInMonth + firstDayOfMonth) / 7)

useEffect(() => {
    const newNumDaysInMonth = daysInMonth(selectedYear, selectedMonth);
    setNumDaysInMonth(newNumDaysInMonth);
  }, [selectedYear, selectedMonth]);

const handleChange = (back) => {
    if (back) {
      if (selectedMonth === 0) {
        setSelectedYear(selectedYear - 1);
        setSelectedMonth(11);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else {
      if (selectedMonth === 11) {
        setSelectedYear(selectedYear + 1);
        setSelectedMonth(0);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    }
    setSelectedDate(null);
  };

  const handleDateClick = (value) => {
    if (value === null) {
        
    }
    if (selectedDate === value) {
        setSelectedDate(null)
    } else {
        setSelectedDate(value)
    }
  }
  
 return (
  <CalendarContainer>
    <TopCalendarContainer>
      <HeaderContainer>
        <img src={ChevronLeft} alt='left arrow' width={18} height={18} style={{cursor: 'pointer'}} onClick={() => handleChange(true)} />
        <Header>{months[selectedMonth]} {selectedYear} </Header>
        <img src={ChevronRight} alt='right arrow' width={18} height={18} style={{cursor: 'pointer'}} onClick={() => handleChange(false)} />
      </HeaderContainer>
      <DaysOfWeekContainer>
        {daysOfWeek.map((day, index) => {
          return <div key={index}>{day}</div>
        })}
      </DaysOfWeekContainer>
    </TopCalendarContainer>
    <BottomCalendarContainer>
    <DaysOfMonthContainer>
        {[...Array(numRows).keys()].map((week) => (
            <WeekContainer>
          {[...Array(7).keys()].map((day) => { 
            if ((week * 7) + day + 1 < firstDayOfMonth + 1) {
                return (
                    <DayContainer key={(week * 7) + day + 1} />
                )
            }
            return (
            <DayContainer key={(week * 7) + day + 1} onClick={() => (selectedMonth < currentMonth || (currentMonth === selectedMonth && (week*7+day) < currentDateOfMonth) || selectedYear < currentYear) ? handleDateClick(null) : handleDateClick((week * 7 + day + 1))}
            isSelected={week * 7 + day + 1 === selectedDate}
            isCurrentDay={week*7+day === currentDateOfMonth && currentYear === selectedYear && currentMonth === selectedMonth}
            isPreviousDate={(selectedMonth < currentMonth || (currentMonth === selectedMonth && (week*7+day) < currentDateOfMonth) || selectedYear < currentYear)}
            >
              {(week * 7) + day + 1 <= numDaysInMonth + firstDayOfMonth && (week * 7) + day + 1 - firstDayOfMonth}
            </DayContainer>
          )})}
          </WeekContainer>
        ))}
      </DaysOfMonthContainer>
    </BottomCalendarContainer>
  </CalendarContainer>
 )
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
`
const Header = styled.div`
  font-size: 18px;
`

const DayContainer = styled.div`
  width: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 10px; 
  background-color: ${(props) =>
    props.isSelected ? "#B0B0B0" : props.isCurrentDay ? "#39FF14" : "transparent"};
  border-radius: 50%;

  color: ${(props) => (props.isSelected ? "white" : "black")};
  opacity: ${(props) => (props.isPreviousDate && !props.isSelected ? ".25" : "1")};
  cursor: ${(props) => (props.isPreviousDate ? "" : "pointer")};;
`;

const CalendarContainer = styled.div`
    flex: 1;
`;

const TopCalendarContainer = styled.div`
  background-color: #F5F5F5;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding-top: 24px;
  padding-bottom: 16px;
`;

const DaysOfMonthContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const BottomCalendarContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 20px;
  margin-top: 18px;

`;

const WeekContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-bottom: 16px;
  justify-content: space-between;
`;


const DaysOfWeekContainer = styled.div`
  margin-top: 24px;
  display: flex;
  padding: 0 32px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export default Calendar