module.exports = (message, statusCode) => {
  let error = new Error(message);
  error.statusCode = statusCode;
  return error
};

// module.exports = {
//   NotAuthorized: (message) => {  },
//   NotFound: () => {},
//   ServerError: () => {}
// }


// do method for each error, and send msg examle: throw new MyErrorClass.NotAuthrize("sdfsd");


// https://github.com/feathersjs/feathers/blob/master/packages/errors/lib/index.js