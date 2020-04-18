let parse = x => x.split(',').join(' ')

class APIFeatures {
  constructor(model, req) {
    this.model = model;
    this.query = model.find();
    this.queryString = req.query;
  }

  filter() {
    const queryObject = { ... this.queryString }

    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObject[el]);

    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace((/\b(gte|gt|lte|lt)\b/), x => `$${x}`);

    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    let sort = this.queryString.sort;
    this.query = sort ? this.query.sort(parse(sort)) : this.query;
    return this;
  }

  select(){
    let select = this.queryString.fields;
    this.query =  select ? this.query.select(parse(select)) : this.query.select("-__v");
    return this;
  }

   pagination(){
    let page = this.queryString.page * 1 || 1;
    let limit = this.queryString.limit * 1 || 5;
    let skip = ( page - 1 ) * limit;
    this.query =  this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;