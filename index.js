#!/usr/bin/env node
const mdLinks=require("./md.js")
// const checkPathRoute=require("./md.js")
const routeMD=process.argv[2]
const opcion=process.argv[3]

if(require.main===module){
    
    mdLinks(routeMD,opcion).then(console.log);
  
}

mdLinks(routeMD,opcion)
// checkPathRoute(routeMD)