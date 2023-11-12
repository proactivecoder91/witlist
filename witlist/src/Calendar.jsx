import React, { useState } from "react";
import "./Calendar.css";
import TodoList from "./TodoList";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    month: currentMonth.getMonth(),
    year: currentMonth.getFullYear(),
    day: null,
  });

  const generateCalendar = (onDayClick) => {
    const year = selectedDate.year || currentMonth.getFullYear();
    const month = selectedDate.month || currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const calendar = [];
    let dayCounter = 1;

    for (let i = 0; i < startDay; i++) {
      calendar.push(<div key={`prev-${i}`} className="empty-day" />);
    }

    for (let i = 1; i <= totalDays; i++) {
      calendar.push(
        <div
          key={`day-${i}`}
          className={`day ${i === selectedDate.day ? "selected-day" : ""}`}
          onClick={() => onDayClick && onDayClick(i)}
        >
          {i}
        </div>
      );
      dayCounter++;
    }

    while (dayCounter <= 42) {
      calendar.push(<div key={`next-${dayCounter}`} className="empty-day" />);
      dayCounter++;
    }

    return calendar;
  };

  const goToMonth = (offset) => {
    setCurrentMonth((prevMonth) => {
      const newDate = new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth() + offset,
        1
      );
      setSelectedDate({
        month: newDate.getMonth(),
        year: newDate.getFullYear(),
        day: null,
      });
      return newDate;
    });
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleDropdownChange = (event) => {
    const { name, value } = event.target;
    setSelectedDate((prevDate) => ({
      ...prevDate,
      [name]: parseInt(value, 10),
    }));
    setShowDropdown(false);
  };

  const handleDayClick = (day) => {
    setSelectedDate({
      month: currentMonth.getMonth(),
      year: currentMonth.getFullYear(),
      day,
    });
  };

  return (
    <div>
      <div className="calendar-header">
        <button onClick={() => goToMonth(-1)}>&lt; Prev</button>
        <div className="dropdown">
          <div onClick={toggleDropdown} className="selected-value">
            {new Date(selectedDate.year, selectedDate.month, 1).toLocaleString(
              "en-US",
              {
                month: "long",
              }
            )}
          </div>
          {showDropdown && (
            <select
              value={selectedDate.month}
              onChange={handleDropdownChange}
              name="month"
            >
              {Array.from({ length: 12 }, (_, index) => (
                <option key={index} value={index}>
                  {new Date(2000, index, 1).toLocaleString("en-US", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="dropdown">
          <div onClick={toggleDropdown} className="selected-value">
            {selectedDate.year}
          </div>
          {showDropdown && (
            <select
              value={selectedDate.year}
              onChange={handleDropdownChange}
              name="year"
            >
              {Array.from({ length: 10 }, (_, index) => (
                <option
                  key={index}
                  value={currentMonth.getFullYear() - 5 + index}
                >
                  {currentMonth.getFullYear() - 5 + index}
                </option>
              ))}
            </select>
          )}
        </div>
        <button onClick={() => goToMonth(1)}>Next &gt;</button>
      </div>
      <div className="calendar">
        <div className="day-header">Sun</div>
        <div className="day-header">Mon</div>
        <div className="day-header">Tue</div>
        <div className="day-header">Wed</div>
        <div className="day-header">Thu</div>
        <div className="day-header">Fri</div>
        <div className="day-header">Sat</div>
        {generateCalendar(handleDayClick)}
      </div>
      {selectedDate.day && (
        <TodoList
          selectedDate={
            new Date(selectedDate.year, selectedDate.month, selectedDate.day)
          }
        />
      )}
    </div>
  );
};

export default Calendar;
