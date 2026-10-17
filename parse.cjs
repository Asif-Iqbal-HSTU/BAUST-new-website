const fs = require('fs');
const data = fs.readFileSync('vc_message_parsed.txt', 'utf8');
const startTag = '<div class="entry-content';
const startIndex = data.indexOf(startTag);
if (startIndex !== -1) {
    const endTag = '</div>';
    let cnt = 1;
    let index = data.indexOf('>', startIndex) + 1;
    while (cnt > 0 && index < data.length) {
        if (data.substring(index, index + 4) === '<div') { cnt++; }
        else if (data.substring(index, index + 6) === '</div>') { cnt--; }
        if (cnt > 0) index++;
    }
    const html = data.substring(startIndex, index + endTag.length);
    let text = html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
    // remove empty lines
    text = text.split('\n').map(l => l.trim()).filter(l => l.length > 0).join('\n');
    fs.writeFileSync('extracted.txt', text);
    console.log('done');
} else {
    console.log('Not found');
}
