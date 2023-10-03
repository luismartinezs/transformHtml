const fs = require('fs');
const { JSDOM } = require('jsdom');
const path = require('path')

const getFilePath = fileName => path.join(__dirname, fileName)

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

function isEven(value) {
  if (value % 2 == 0)
    return true;
  else
    return false;
}

const transformHtml = (html) => {
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const paragraphs = document.querySelectorAll('p');

  const listContent = [...paragraphs].reduce((acc, el, idx) => {
    const isHeading = isEven(idx)
    if (isHeading) {
      acc.push([el])
    } else {
      acc[acc.length - 1].push(el)
    }
    return acc
  }, [])

  let outputHtml = '<ol>';

  listContent.forEach(([heading, content]) => {
    const numberlessHeading = heading.innerHTML.replace(/\d+\./, '').trim()
    const textContent = content.innerHTML
    outputHtml += `<li>${capitalize(numberlessHeading)}<br>${textContent}</li>`
  })

  outputHtml += '</ol>';

  return outputHtml;
};

// Read from input.html
fs.readFile(getFilePath('input.html'), 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Transform the HTML
  const outputHtml = transformHtml(data);

  // Write to output.html
  fs.writeFile(getFilePath('output.html'), outputHtml, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Transformation successful. Check output.html.');
    }
  });
});
