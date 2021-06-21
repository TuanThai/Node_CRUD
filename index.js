console.log('May Node be with you')
const express = require('express');
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const app = express();

app.use(express.static('public'))

app.engine('hbs', exphbs({
    defaultLayout: 'index',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const connectionString = "'mongodb://127.0.0.1:27017"
const MongoClient = require('mongodb').MongoClient
MongoClient.connect(connectionString, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('atn-company')
    const usersCollection = db.collection('users')

    app.get('/', function (req, res) {
        usersCollection.find().toArray()
            .then(results => {
                console.log(results)
                res.render('home', { users: results })
            })
    })

    app.post('/users', (req, res) => {
        usersCollection.insertOne(req.body)
            .then(result => {
                console.log(result)
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })
    
    app.put('/users', (req, res) => {
        usersCollection.findOneAndUpdate(
          { username: 'tmtuan' },
          {
            $set: {
              username: req.body.username,
              password: req.body.password
            }
          },
          {
            upsert: true
          }
        )
          .then(result => {
              res.json('Success')
              res.redirect('/')
          })
          .catch(error => console.error(error))

      })

      app.delete('/users', (req, res) => {
        usersCollection.deleteOne(
          { username: req.body.username }
        )
          .then(result => {
            if (result.deletedCount === 0) {
              console.log('No user to delete')
              return res.json('No user to delete')
            }
            res.json('Deleted tmtuan')
            console.log('Deleted tmtuan')
          })
          .catch(error => console.error(error))
      })

})

app.listen(3000, function () {
    console.log('listening on 3000')
})