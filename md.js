const fs = require('fs'); //modulo de filesysten
const fetch = require('node-fetch');
const path = require('path');
const markdownLinkExtractor = require('markdown-link-extractor');


const mdLinks = (routeMD, option) => {
    
    let stats = fs.statSync(routeMD);
    extension = path.extname(routeMD)
    
    if (extension === ".md") {
        
        const markdown = fs.readFileSync(routeMD).toString();
        const links = markdownLinkExtractor(markdown);
        let resultLinks = [];
        let line=0
        for (let i = 0; i < links.length; i++) {
            let text = links[i].text;
            line++
            
            const arrPromise = fetch(links[i])
            .then(res => {
                if (option === "--stats") {
                    total= `${line}`
                            
                    return total
                }else  if (option === "--validate") {
                    let objetLinks = {
                        urlLinks: `${res.url}`,
                        statusLinks: `${res.status}`,
                            statusTextLinks: `${res.statusText}`,
                            ruta: `${routeMD}`
                        };
                        return objetLinks
                    } else {
                        let objetLinks = {
                            urlLinks: `${res.url}`,
                            ruta: `${routeMD}`,
                            text: text
                        };
                        return objetLinks
                    }
                })
                .catch((err) => {
                    const objetErr = { statusLinks: "Fail" };
                    return objetErr;
                })
            resultLinks.push(arrPromise)
        }
        return Promise.all(resultLinks) // devuleve una sola promesa 
        
    }
    else if (stats.isDirectory() === true) {
        
        let repeat = fs.readdirSync(route)
        return (Promise.all(repeat.map(element => {
            let arrayInfo = path.join(routeMd, element)
            return mdLinks(arrayInfo)
        }))).then(res =>{
            return Promise.resolve(res.reduce((a,b)=>{
                return a.concat(b);
            }))
        })
    }
    else {
        console.log("El archivo tine que ser formato .md ")
    }
}
module.exports = mdLinks;
//  module.exports = checkPathRoute;


// const checkPathRoute = (routeMd) => {
//     let repeat = fs.readdirSync(routeMd)
//     return (Promise.all(repeat.map(element => {
//         let arrayInfo = path.join(routeMd, element)
//         return mdLinks(arrayInfo)
//     }))).then(res =>{
//         return Promise.resolve(res.reduce((a,b)=>{
//         return a.concat(b);
//         }))
//     })
// }