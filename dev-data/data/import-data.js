const fs = require('fs');
const Tour = require('../../models/tourModel');
let tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));

const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: '../../config.env' });

mongoose.connect(process.env.DATABASE, {  
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(con => { console.log('🏛   接続 ｃｏｎｎｅｃｔｅｄ 接続  🏛 \n💻 Atlas Cluster: cluster0-sz7it.mongodb.net/test ')});

const deleteData = async () => {
  try{
    await Tour.deleteMany();
    console.log("Deleted 👌")
  } catch (e) {
    console.log(e)
  }
  process.exit();
}

const importData = async () => {
  try{
    await Tour.create(tours);
    console.log("Imported 👌")
  } catch (e) {
    console.log(e)
  }
  process.exit();
}

if(process.argv[2] === '--import'){
  importData();
} else if(process.argv[2] === '--delete'){
  deleteData();
} 

  