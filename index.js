const fetch = require("node-fetch");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


function getContent() {
    const opts = {
        headers: {
            cookie: 'hasCookie=true'
        }
    };
    return fetch('https://codequiz.azurewebsites.net', opts)
    .then(res => res.text())
}

const args = process.argv.slice(2);

getContent().then((body)=>{
    const dom = new JSDOM(body);
    const nodeList = [...dom.window.document.querySelectorAll('tr')];
    for (const tr of nodeList) {
        const columns = [...tr.querySelectorAll('td')];
        if(columns.length > 1 && columns[0].innerHTML.includes(args)){
            console.log(columns[1].innerHTML);
            break;
        }
    }
})