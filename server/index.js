const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;

// adding in the thing to generate addresses
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

const key = ec.genKeyPair();

console.log({
  privateKey: key.getPrivate().toString(16),
  publicX: key.getPublic().x.toString(16),
  publicY: key.getPublic().y.toString(16),
});

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

const balances = {
  publicX + "" + publicY: 100,
  publicX + "" + publicY: 50,
  publicX + "" + publicY: 75,
}

app.get('/balance/:address', (req, res) => {
  const {address} = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const {sender, recipient, amount} = req.body;
  balances[sender] -= amount;
  balances[recipient] = (balances[recipient] || 0) + +amount;
  res.send({ balance: balances[sender] });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
