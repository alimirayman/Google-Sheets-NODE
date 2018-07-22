const { google } = require("googleapis");
const path = require("path");
const config = require("../../config/config");

const key = require(path.join(__dirname, "../../../c3bodx-02c03338828c.json"));

const getjwt = (userEmail = "") => {
  return new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"],
    userEmail || config.user.email
  );
};

async function main(userEmail = "") {
  const jwt = getjwt(userEmail);
  await jwt.authorize();
  google.options({ auth: jwt });
  return {
    sheet: {
      appendAll,
      getAll,
      createSheet
    }
  };
}

const ensureData = data => (data ? data : " ");

const createSheet = async (title = "Test") => {
  const sheets = google.sheets({ version: "v4" });
  const { data } = await sheets.spreadsheets.create({});
  return data;
};

const appendAll = async (range, majorDimension, values, id) => {
  const sheets = google.sheets({ version: "v4" });
  var request = {
    // The ID of the spreadsheet to update.
    spreadsheetId: id || config.sheet.id,

    // The A1 notation of a range to search for a logical table of data.
    // Values will be appended after the last row of the table.
    range,

    // How the input data should be interpreted.
    valueInputOption: "USER_ENTERED",

    // How the input data should be inserted.
    // insertDataOption: "OVERWRITE",

    resource: {
      majorDimension,
      values,
      range
    }
  };
  const { data } = await sheets.spreadsheets.values.update(request);
  return data;
};

const getAll = async (range = "Sheet1!A4:B7", id = "") => {
  const sheets = google.sheets({ version: "v4" });

  var request = {
    // The ID of the spreadsheet to update.
    spreadsheetId: id || config.sheet.id,
    // The A1 notation of a range to search for a logical table of data.
    // Values will be appended after the last row of the table.
    range
  };
  const { data } = await sheets.spreadsheets.values.get(request);
  return data;
};

module.exports = main;
