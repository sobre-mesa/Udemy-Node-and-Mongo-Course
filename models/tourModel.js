
const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A tour name mustnt be longer than 40 chars'],
    minlength: [10, 'A tour name mustnt be shorter than 10 chars'],
    validate: [validator.isAlpha, 'Chars only']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    enum: {
      values: ['easy,', 'medium', 'difficult'],
      message: 'Invalid difficulty'
    }
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
    default: 0,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must be less than 5']
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        //Only points to the current doc on NEW document creation, not update
        return val < this.price;
      },
      message: "Discount ({VALUE}) should be less than the actual price"
    }
  },
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


tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next();
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

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: { secretTour: false }
  })
  next();
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;