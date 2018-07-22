var config = require("../../config/config");
var googleAPI = require("../services/googleAPI");

// {
//   "range":"Sheet1!C4:S4",
//   "majorDimension": "ROWS",
//   "values": [
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
//   ]
// }

exports.post = async (req, res, next) => {
  console.log(req.body);
  const range = req.body.range;
  const majorDimension = req.body.majorDimension;
  const values = req.body.values;
  const id = req.params.id || "";
  const { sheet } = await googleAPI();
  const data = await sheet.appendAll(range, majorDimension, values, id);
  console.log(data);

  res.json(data);
};

exports.get = async (req, res, next) => {
  const { sheet } = await googleAPI();
  const range = req.query.range || "Sheet1!A4:B7";
  const id = req.params.id || "";
  const data = await sheet.getAll(range, id);
  console.log(data);

  res.json(data);
};

exports.create = async (req, res, next) => {
  const { sheet } = await googleAPI();
  const data = await sheet.createSheet();
  console.log(data);

  res.json(data);
};
