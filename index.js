const fs = require('fs');
const { JSDOM } = require('jsdom');

const transformHtml = (html) => {
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const paragraphs = document.querySelectorAll('p[id]');

  let outputHtml = '<dl class="help-description-list">';

  paragraphs.forEach(paragraph => {
    const id = paragraph.id;
    const parts = paragraph.innerHTML.split(/\s-\s/)
    const dt = paragraph.querySelector('strong');
    const dtSidenote = parts[0].match(/\(([\s\S]+?)\)/)?.[0]

    outputHtml += `<div class="help-definition-container"><dt id="${id}">${dt.textContent}`;
    if (dtSidenote) {
      outputHtml += ` <span class="dt-sidenote">${dtSidenote}</span>`;
    }
    outputHtml += '</dt><dd><span aria-hidden="true"> - </span>';

    outputHtml += `<p class="inline">${parts[1]}</p>`;

    let nextElement = paragraph.nextElementSibling;

    while (nextElement && !nextElement?.id) {
      outputHtml += nextElement.outerHTML;
      nextElement = nextElement.nextElementSibling;
    }

    outputHtml += '</dd></div>';
  });

  outputHtml += '</dl>';

  outputHtml.replace(/--/, '-')

  return outputHtml;
};

// Read from input.html
fs.readFile('input.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Transform the HTML
  const outputHtml = transformHtml(data);

  // Write to output.html
  fs.writeFile('output.html', outputHtml, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Transformation successful. Check output.html.');
    }
  });
});
