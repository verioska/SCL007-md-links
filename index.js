#!/usr/bin/env node // indica que se va ejecutar con node
const mdLinks=require("./md.js")
// const checkPathRoute=require("./md.js")
const routeMD=process.argv[2]
const opcion=process.argv[3]

//permite saber si lo estan ejecutando desde la terminal o lo usan como modulo
if(require.main===module){
    
    mdLinks(routeMD,opcion).then(console.log);
  
}

mdLinks(routeMD,opcion)
// checkPathRoute(routeMD)