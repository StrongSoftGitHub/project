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
        render_raw(v1, options) {
            return v1
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
        },
        description: {
            when: 'isNotTest',
            type: 'string',
            required: false,
            message: '项目简要概述',
            default: '一个Vue项目。'
        },
        author: {
            when: 'isNotTest',
            type: 'string',
            message: '作者',
        },
        lint: {
            when: 'isNotTest',
            type: 'confirm',
            message: '是否使用ESLint规范您的代码?'
        },
        unit: {
            when: 'isNotTest',
            type: 'confirm',
            message: '是否需要安装单元测试？',
            default: false
        },
        runner: {
            when: 'isNotTest && unit',
            type: 'list',
            message: '选择一个测试运行器',
            choices: [{
                    name: 'Jest',
                    value: 'jest',
                    short: 'jest',
                },
                {
                    name: 'Karma and Mocha',
                    value: 'karma',
                    short: 'karma',
                },
                {
                    name: 'none (自定义)',
                    value: 'noTest',
                    short: 'noTest',
                },
            ],
        },
        e2e: {
            when: 'isNotTest',
            type: 'confirm',
            message: '是否使用Nightwatch来进行e2e（端对端）测试？',
            default: false
        },
        autoInstall: {
            when: 'isNotTest',
            type: 'list',
            message: '在项目生成之后，是否需要自动安装依赖？',
            choices: [{
                    name: '是的',
                    value: 'npm',
                    short: 'Yes',
                },
                {
                    name: '不，我要自己安装',
                    value: false,
                    short: 'No',
                }
            ],
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