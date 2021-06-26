/* eslint-disable no-console */
const mongoose = require('mongoose');

const [, , password, name, number] = process.argv;

const url = `mongodb+srv://lmaero:${password}@fullstackopen.oqlrl.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

if (!password) {
  console.log(
    'To use this app you need to provide at least a password, if you want to add a contact use as follows: node mongo.js <password> <contactName> <contactNumber>',
  );
  process.exit(1);
}

mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// eslint-disable-next-line new-cap
const Person = new mongoose.model('Person', personSchema);

if (password && !name && !number) {
  Person.find({}).then((result) => {
    console.log('Phonebook:');
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    process.exit(1);
  });
} else if (!number) {
  console.log('You need to provide also a number in order to create a contact');
  process.exit(1);
} else if (process.argv.length === 5) {
  const person = new Person({
    name,
    number,
  });

  person.save().then(() => {
    console.log(`Added ${name} with number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log('You provided too many arguments');
  process.exit(1);
}
