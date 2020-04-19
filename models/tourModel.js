
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty']
  },
  rating: {
    type: Number,
    default: 4.5
  },
  ratingQuantity: {
    type: Number,
    default: 4.5
  },
  ratingAverage: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    required: [true, 'A tour must have a summary'],
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDates: [Date],
  secretTour: {
    type: Boolean,
    default: false
  }
},
  {
    toJSON: { virtuals: true }, //When converted to JSON, apply virtuals
    toObject: { virtuals: true } //When converted to Object, apply virtuals
  })

tourSchema.virtual('cheap').get(function () {
  return this.price < 1000; //Field that will not be persisted, but shown in responses
})

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: false });
  this.start = Date.now();
  next();
})

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} miliseconds!`);
  next();
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;