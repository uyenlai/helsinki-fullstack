const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://uyenlai:${password}@cluster0.xqur29f.mongodb.net/phonebookDB?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('Phonebook')
    result.forEach((p) => {
      console.log(`${p.name} ${p.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length >= 4) {
  if (process.argv[3].indexOf(' ') !== -1) {
    const person = new Person({
      name: 'Linus Gweneth',
      number: '333-444444444',
    })

    person.save().then(() => {
      console.log(
        `added "${person.name}" number ${person.number} to phonebook`
      )
      mongoose.connection.close()
    })
  } else {
    const person = new Person({
      name: 'Isla',
      number: '090-898998989',
    })

    person.save().then(() => {
      console.log(`added ${person.name} number ${person.number} to phonebook`)
      mongoose.connection.close()
    })
  }
}
