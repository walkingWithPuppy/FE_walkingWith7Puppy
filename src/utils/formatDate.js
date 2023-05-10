export const formatDate = (stringDate, timeFormat = 'hh:mm:ss') => {
  const date = new Date(stringDate);
  if (isNaN(date.getTime())) {
    return '';
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');
  
  let timePart = '';
  switch(timeFormat){
    case 'hh:mm:ss':
      timePart = `${hour}:${minute}:${second}`;
      break;
    case 'hh:mm':
      timePart = `${hour}:${minute}`;
      break;
    case 'dd:mm:hh':
      timePart = `${day}:${month}:${hour}`;
      break;
    default:
      throw new Error('Invalid time format');
  }

  return `${year}-${month}-${day} ${timePart}`;
}
