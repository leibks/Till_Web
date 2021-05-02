// given date string yyyy-mm-dd, return month name + date (dd)
export const generateMonthName = (date) => {
    const curDate = new Date(date.replaceAll("-", "/"));
    return curDate.toLocaleString('default', { month: 'long',  day: 'numeric'});
}

// given new Date() type, return yyyy-mm-dd
export const generateCalendarFormat = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() < 10 ? "0"+(date.getMonth() + 1).toString() : date.getMonth();
    const day = date.getDate() < 10 ? "0"+date.getDate().toString() : date.getDate();
    const convertedDate = `${year}-${month}-${day}`;
    return convertedDate;
}