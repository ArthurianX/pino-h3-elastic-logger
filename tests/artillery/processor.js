const Faker = require('@faker-js/faker')
Faker.faker.locale = 'en'
Faker.faker.seed(1580)

function generateMockData(requestParams, ctx, ee, next) {
    ctx.vars['severity'] = Faker.faker.helpers.arrayElement([
        'info',
        'warn',
        'error',
        'success',
    ])
    ctx.vars['message'] = Faker.faker.hacker.phrase()

    return next()
}

module.exports = {
    generateMockData,
}
