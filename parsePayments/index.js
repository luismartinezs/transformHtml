const rawData = `Sep 29 2023	Payment from XXX.
$2,300.00 USD`;

const lines = rawData.trim().split('\n');

let formattedLines = [];

function pad(num) {
  return ('0' + num).slice(-2);
}

for (let i = 0; i < lines.length; i += 2) {
  const [month, day, year] = lines[i].split(/\s+/);
  const amount = lines[i + 1];
  const newDate = new Date(year + month + day);
  const oneMonthLater = new Date(newDate);
  oneMonthLater.setMonth(newDate.getMonth() + 1);

  formattedLines.push([
    `1001${pad(newDate.getDate())}${pad(newDate.getMonth() + 1)}${String(newDate.getFullYear()).slice(2)}`, // Your placeholder id
    `${newDate.getMonth() + 1}/${newDate.getDate()}/${String(newDate.getFullYear()).slice(2)}`,
    `${oneMonthLater.getMonth() + 1}/${oneMonthLater.getDate()}/${String(oneMonthLater.getFullYear()).slice(2)}`,
    '',
    '',
    '',
    '',
    amount.replace('$', '').replace(',', '').replace('.00 USD', '')
  ].join(', '));
}

console.log(formattedLines.reverse().join('\n'));