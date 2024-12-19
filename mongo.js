require('dotenv').config();
const mongoose = require('mongoose')

/*
if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
  }

const password = process.argv[2];
*/
const password = process.env.MONGODB_PASSWORD;
  
if (!password) {
    console.log('MONGODB_PASSWORD is missing in .env file');
    process.exit(1);
  }

const url = `mongodb+srv://ingcesaroman:${password}@projectnotescluster0.suooq.mongodb.net/notes`;
  
mongoose.set('strictQuery', false);
  
mongoose.connect(url)
    .then(() => {
    const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
  })
  
  const Note = mongoose.model('Note', noteSchema)
  
  const note = new Note({
    content: 'Mongoose no important note',
    important: false,
  })

    /*
  note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
    */

  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
  
  /*
  Note.find({ important: true })
  .then(result => {
    if (result.length === 0) {
      console.log('No important notes found.');
    } else {
      console.log('Important notes:');
      result.forEach(note => {
        console.log(note);
      });
    }
    mongoose.connection.close();
    })
      */

})