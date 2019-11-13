var AWS = require("aws-sdk");

exports.handler = async (start, end) => {
  let data = await invokeLambda(start, end)

  console.log("We have the start: ", data.body.start, " end: ", data.body.end, "distance: ", data.body.distance)

  return new Promise((resolve) => {
    resolve(data.body)
  })
};

async function invokeLambda(start, end) {
    var lambda = new AWS.Lambda();

    let payload = {
      "start": start,
      "end": end
    }

    var params = {
     FunctionName: "googleStuff",
     Payload: JSON.stringify(payload)
   };

  return new Promise((resolve, reject) => {
    lambda.invoke(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        reject(err)
      }
      else {
        resolve(JSON.parse(data.Payload))
      }
    });
  })
}
