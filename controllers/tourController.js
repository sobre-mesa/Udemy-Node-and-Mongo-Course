const fs = require('fs');
let tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
let successfulRes = x => ({ 'status': 'success', 'data': x });

exports.checkId = (id, res) => {
  if(id + 1 > tours.length) return res.status(404).json({ status: 'fail', message: 'invalid id' })
}
exports.getAllTours = (req, res) => {
  return res.status(200).json(successfulRes({ tours }));
}

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(x => x.id === id);
  return res.status(200).json(successfulRes({ tour }));
}

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(x => x.id === id);
  return res.status(200).json(successfulRes({ tour }));
}

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(x => x.id === id);
  return res.status(200).json(successfulRes({ tour }));
}

exports.newTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const tour = Object.assign({ id }, req.body);
  tours.push(tour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json(successfulRes({ tour }));
  });
  res.send('ok');
}
