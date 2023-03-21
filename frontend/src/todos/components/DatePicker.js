import { Input, Typography } from '@mui/material';
import React, { useRef } from 'react';

/**
 * Date picker component with date selection and to show days remaining for the task
 * @param {*} props todo item and callback for Date change
 * @returns Custom Date picker Component
 */
const DatePicker = (props) => {
    const { todo, onDateChange } = props;
    const dateInputRef = useRef(null);

    const handleChange = (e) => {
        onDateChange(e.target.value);
    };

    const daysToComplete = remainingDays(todo.due)

    return (
        <React.Fragment>
            <Input
                type="date"
                onChange={handleChange}
                ref={dateInputRef}
                value={todo.due}
                style={{
                    margin: "1rem", padding: "1rem"
                }}
            />
            <Typography key={todo} style={{ width: "5rem" }} variant='inherit'>
                {
                todo.done
                    ? "Done"
                    : daysToComplete >= 0
                        ? "Remaining days: " + daysToComplete
                        : "Overdue days: " + daysToComplete
                        }
            </Typography>
        </React.Fragment>
    );
};

export default DatePicker;

/**
 * Converts the date object to string format
 * @param {Date} date Date to be converted to string
 * @returns day in string format "yyyy-mm-dd"
 */
export const convertDate = (date) => {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('-');
}

/**
 * Calculates the difference between provided date and current date
 * @param {string} date Date in string format "yyyy-mm-dd"
 * @returns difference between current day and date passed
 */
export const remainingDays = (date) => {
    const date1 = new Date(date)
    const date2 = new Date()

    return  Math.ceil((date1 - date2) / (1000 * 60 * 60 * 24)); 
}