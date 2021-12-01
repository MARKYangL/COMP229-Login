var {users} = require('./models/index')

users.insertMany([
    {
        username: 'ly',
        password: '12',
        email: 'admin@email.com'
    }
]).then(() =>{
    console.log("SUCCESS")
})