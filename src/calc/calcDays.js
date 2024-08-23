// FUNCTION TO CALCULATE THE DAY OF THE YEAR
const calcDaysByYear = async () => {

    // CALCULATES THE CURRENT DAY OF THE YEAR
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    return dayOfYear;

}

export { calcDaysByYear };