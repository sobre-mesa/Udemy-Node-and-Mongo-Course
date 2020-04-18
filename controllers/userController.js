const fs = require('fs');

let users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));
let successfulRes = x => ({ 'status': 'success', 'data': x });

exports.checkId = (id, res) => {
  if(id + 1 > tours.length) return res.status(404).json({ status: 'fail', message: 'invalid id' })
}
exports.getAllUsers = (req, res) => {
  return res.status(200).json(successfulRes({ users }));
}

exports.getUser = (req, res) => {
  const id = req.params.id * 1;
  const user = users.find(x => x.id === id);
  return user ? res.status(200).json(successfulRes({ user })) : res.status(404).json({ status: 'fail', message: 'invalid id' });
}

exports.updateUser = (req, res) => {
  const id = req.params.id * 1;
  const user = users.find(x => x.id === id);
  return user ? res.status(200).json(successfulRes({ user })) : res.status(404).json({ status: 'fail', message: 'invalid id' });
}

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  const user = users.find(x => x.id === id);
  return user ? res.status(200).json(successfulRes({ user })) : res.status(404).json({ status: 'fail', message: 'invalid id' });
}

exports.newUser = (req, res) => {
  const user = req.body
  users.push(user);
  fs.writeFile(`${__dirname}/dev-data/data/users.json`, JSON.stringify(users), err => {
    res.status(201).json(successfulRes({ user }));
  });
  res.send('ok');
}