 // const generateDaysArray = [...Array(31)];

 export const generateDaysArray = (quantity) => {
     let days = [];
     for (let i = 1; i <= quantity; i++) {
         days.push(i);
     }
     return days;
 }
