const date = new Date();
const day = `${date.getDate()}`.padStart(2, '0');
const month = `${date.getMonth()+1}`.padStart(2, '0');
const year = `${date.getFullYear()}`;
console.log("Node says, Hello ASL!");
console.log(`${day}/${month}/${year}`);
