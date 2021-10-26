const express = require('express');
const conn = require('./database/db')
const {graphqlHTTP} = require('express-graphql');
const schema = require('./database/schema')


const app = express()
const port = 5000
//MongoDB connection
conn;

app.use('/graphql', graphqlHTTP({
    schema : schema,
    graphiql : true
}))

app.get('/', (req, res) => res.send('Hello World!'))



app.listen(port, () => console.log(`App listening!`))