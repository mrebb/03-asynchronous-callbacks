'use strict';
const fs = require('fs');
module.exports = exports = {};

exports.readFile = (paths, callback) => {
  let contentArray = [];
  for(let i=0; i<paths.length;i++){
    fs.readFile( paths[i], (err, data) => {
      if(err) { callback(err); }
      else { 
        contentArray[i]=data.toString();
        if(paths.length === contentArray.length){
          callback(null, contentArray); 
        }
      }
    });
  }
};
exports.readDir = (dirName,callback) => {
  fs.readdir(dirName,(err,files)=>{
    if(err){
      callback(err);
    }
    callback(null,files);
  });
};
