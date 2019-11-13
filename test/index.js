var AWS = require("aws-sdk");

exports.handler = async (event) => {

console.log(event)
  let start = event.start
  let end = event.end

  let data = await invokeLambda(start, end)

  console.log("We have the start: ", data.body.start, " end: ", data.body.end, "distance: ", data.body.distance)

  const response = {
        statusCode: 200,
        body: {},
  };
  return response;
};

async function invokeLambda(start, end) {
    var lambda = new AWS.Lambda();

    let payload = {
      "start": start,
      "end": end
    }

    var params = {
     FunctionName: "babs-google-distance-lambda",
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
