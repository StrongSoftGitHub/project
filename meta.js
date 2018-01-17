const path = require('path')
const fs = require('fs')

const {
    sortDependencies,
    installDependencies,
    runLintFix,
    runDev,
    printMessage,
} = require('./utils')
const pkg = require('./package.json')

const templateVersion = pkg.version

const { addTestAnswers } = require('./scenarios')

module.exports = {
    metalsmith: {
        // When running tests for the template, this adds answers for the selected scenario
        before: addTestAnswers
    },
    helpers: {
        if_or(v1, v2, options) {
            if (v1 || v2) {
                return options.fn(this)
            }
            return options.inverse(this)
        },
        template_version() {
            return templateVersion
        },
    },
    prompts: {
        name: {
            when: 'isNotTest',
            type: 'string',
            required: true,
            message: '项目名称（合同号+项目名称+cli，如综合信息平台：2017386-integrated-information-platform-cli）',
        }
    },
    filters: {
        '.eslintrc.js': 'lint',
        '.eslintignore': 'lint',
        'config/test.env.js': 'unit || e2e',
        'build/webpack.test.conf.js': "unit && runner === 'karma'",
        'test/unit/**/*': 'unit',
        'test/unit/index.js': "unit && runner === 'karma'",
        'test/unit/jest.conf.js': "unit && runner === 'jest'",
        'test/unit/karma.conf.js': "unit && runner === 'karma'",
        'test/unit/specs/index.js': "unit && runner === 'karma'",
        'test/unit/setup.js': "unit && runner === 'jest'",
        'test/e2e/**/*': 'e2e'
    },
    complete: function(data, { chalk }) {
        const green = chalk.green

        sortDependencies(data, green)

        const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

        if (data.autoInstall) {
            installDependencies(cwd, data.autoInstall, green)
                .then(() => {
                    return runLintFix(cwd, data, green)
                })
                .then(() => {
                    return runDev(cwd, data, green)
                })
                .then(() => {
                    printMessage(data, green)
                })
                .catch(e => {
                    console.log(chalk.red('Error:'), e)
                })
        } else {
            printMessage(data, chalk)
        }
    },
}