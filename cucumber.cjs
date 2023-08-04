const report = {
    format: [
        'pretty',
        'json:report/cucumber-report.json'
    ]
}
let common = [
    '--publish-quiet',
    'features/check.feature',
    '--require steps/stepdef.js',
    report
].join(' ')
module.exports = { default: common }   
