const fs = require('fs')
const { JSDOM } = require('jsdom')

const normalizeHTMLTree = (html) => {
  const dom = new JSDOM(html)
  const { document } = dom.window

  let normalizedText = document.body.textContent
  normalizedText = normalizedText
    .replace(/\s+/g, ' ')
    .trim()

  return normalizedText
}

const [file1, file2] = process.argv.slice(2)

if (!file1 || !file2) {
  console.log('Usage: node compareHtmlTextContent.js tree1.html tree2.html')
  process.exit(1)
}

const html1 = fs.readFileSync(file1, 'utf-8')
const html2 = fs.readFileSync(file2, 'utf-8')

const normalized1 = normalizeHTMLTree(html1)
const normalized2 = normalizeHTMLTree(html2)

// fs.writeFile('outputTree1.html', normalized1, (err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('Transformation successful. Check outputTree1.html.');
//   }
// });

// fs.writeFile('outputTree2.html', normalized2, (err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('Transformation successful. Check outputTree2.html.');
//   }
// });

console.log(normalized1 === normalized2)
