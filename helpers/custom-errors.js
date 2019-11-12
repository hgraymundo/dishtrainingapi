exports.getErrors = function (err, type = "others") {
  let error = [];
  /*
    errors: [{ message: ''}, {message: ''}]
  */
  if(err.name && err.name == "SequelizeUniqueConstraintError") {
    err.errors.forEach( err_ => {
      error.push({ message: err_.message});
    })
    return error;
  }

  if(err.errors && err.name == "SequelizeValidationError") {
    err.errors.forEach( err_ => {
      error.push({ message: err_.message});
    })
    return error;
  }

  if(type=="default"){
    console.log("default");
    console.log(err);
    err.forEach( err_ => {
      error.push({ message: err_.msg })
    })
    return error;
  }

}
