const request = require('request');
const fs = require('fs');
const { parseUrl } = require('./parseUrl');
const arg = process.argv.slice(2)[0];
const url = parseUrl(arg);

const saveUrl = (url) => {
  request(url.urlPart, (error, response, body) => {
    if (error) {
      new Error(error);
    } else {
      saveFile(body, url);
    }
  });
};
const saveFile = (body, url) => {
  fs.writeFile(`${url.path.split("/")[url.path.split("/").length - 1]}`, body, function(err) {
    if (err) throw new Error("Could not save file");
    console.log('Saved!');
  });
};

saveUrl(url);