// func is what we pass in

module.exports = (func) => {
  //this returns a new function that has fanc executed
  // and then catches any errors and passes them to next
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
