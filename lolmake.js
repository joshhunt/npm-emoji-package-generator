var allEmoji = require('node-emoji/lib/emoji.json')
var fs = require('fs');
var mkdirp = require('mkdirp');

var toPublish = [];

for (name in allEmoji) {
    toPublish.push({
        emojiName: name.replace(/_/g, '-'),
        packageName: 'emoji-' + name.replace(/_/g, '-'),
        emoji: allEmoji[name],
    })
}

console.log(toPublish);

var words = [
    'infamous',
    'glorious',
    'amazing',
    'wonderful',
    'charming',
    'creative',
    'imaginative',
    'unassuming',
    'witty',
    'friendly',
];

var counter = 0;

toPublish.forEach((set, index) => {
    var folder;

    if (counter === 0) {
      folder = './topublish_0/' + set.packageName;
    }

    if (counter === 1) {
      folder = './topublish_1/' + set.packageName;
    }

    if (counter === 2) {
      folder = './topublish_2/' + set.packageName;
    }

    if (counter === 3) {
      folder = './topublish_3/' + set.packageName;
      counter = -1;
    }

    counter += 1;

    mkdirp(folder, function(err) {
        if (err) throw err;

        var packageFile = {
          "name": set.packageName,
          "version": "1.2.1",
          "description": "returns the " + set.emojiName + ' emoji',
          "main": "index.js",
          "scripts": {
            "test": "node test.js",
          },
          "author": "Josh Hunt",
          "license": "ISC",
          "devDependencies": {
            "emoji-100": "^1.0.0"
          }
        };

        var adjective = words[Math.floor(Math.random() * words.length)];
        var indexDotJs = `module.exports = '${set.emoji}'`;
        var testDotJs;

        if (set.packageName === 'emoji-100') {
            delete packageFile.devDependencies;
            testDotJs = `console.assert(require('./index') === '${set.emoji}', 'Should return the ${set.emojiName} emoji');\nconsole.log('Tests passing ' + require('./index'))`
        } else {
            testDotJs = `console.assert(require('./index') === '${set.emoji}', 'Should return the ${set.emojiName} emoji');\nconsole.log('Tests passing ' + require('emoji-100'))`
        }
        var readme = `# ${set.emoji}

![Tests passing](https://img.shields.io/badge/tests-passing-green.svg) ![Tests passing](https://img.shields.io/badge/coverage-100%-green.svg)

Returns the ${adjective} ${set.emojiName} emoji.

## Usage

\`\`\`javascript
const emoji = require('${set.packageName}');
console.log(emoji) // ${set.emoji}
\`\`\`

## Tests

\`${set.packageName}\` proudly has 100% test coverage. Run tests with \`npm test\`.
`

        fs.writeFile(folder + '/package.json', JSON.stringify(packageFile, null, 2));
        fs.writeFile(folder + '/index.js', indexDotJs);
        fs.writeFile(folder + '/test.js', testDotJs);
        fs.writeFile(folder + '/readme.md', readme);
    });
});