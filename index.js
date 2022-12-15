let mongoose  = require('mongoose');
let app = require('./app');
let hostname = '127.0.0.1';
let port = 5000
mongoose.connect("mongodb://localhost/assignment",{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB')
})

app.listen(port,hostname,()=>{
    console.log(`Node js server running at http://${hostname}:${port}`)
})

/* https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/ */