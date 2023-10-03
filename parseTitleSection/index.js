const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const rootPath = '/home/luis/APP/001-WORK/GIGADB/gigadb-website'
const folderPath = rootPath + '/protected/views';

const updateFile = (filePath) => {
  const fileData = fs.readFileSync(filePath, 'utf8')
  const $ = cheerio.load(fileData)

  $('section.page-title-section').each((index, element) => {
    const section = $(element)
    section.find('.breadcrumb.pull-right').each((i, elem) => {
      const olTag = $(elem)
      olTag.wrap('<nav aria-label="breadcrumb"></nav>')
    })

    // Replace <section> with <div>
    section.replaceWith($('<div/>').addClass('section page-title-section').html(section.html()))
  })

  fs.writeFileSync(filePath, $.html())
}

const readFolder = (folder) => {
  fs.readdirSync(folder).forEach((file) => {
    const filePath = path.join(folder, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      readFolder(filePath)
    } else if (path.extname(file) === '.html') {
      updateFile(filePath)
    }
  })
}

if (folderPath) {
  readFolder(folderPath)
} else {
  console.error('Please provide a valid folder path.')
}
