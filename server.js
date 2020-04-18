const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

console.log('Attempting to connect to cluster0-sz7it.mongodb.net/test ...')
mongoose.connect(process.env.DATABASE, {  
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(con => console.log('💯👌💯👌C O N N E C T E D 💯👌💯👌'))
  .catch(e => console.log(e)).catch(e=>console.log(e.message));
  

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true

  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  }
})

const Tour = mongoose.model('Tour', tourSchema);
const PORT = 8000;
console.log('Starting server ...')
app.listen(PORT, () => {
  console.log(`Running  on : ${PORT} ..`)
});