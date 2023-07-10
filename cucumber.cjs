let common = [
    '--publish-quiet',
    'features/check.feature',
    '--require steps/stepdef.js'
].join(' ')
module.exports = { default: common }   