const ejs = require('ejs');
const fs = require('fs');
const prettier = require('prettier');

const dsl = require('./index.json');

const template = fs.readFileSync('./template.ejs', 'utf8');

const result = ejs.render(template, dsl, { rmWhitespace: true });

prettier.format(result, require('./prettier'))
  .then((code) => {
    fs.writeFileSync('./template.vue', code);
  });

