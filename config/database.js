var mongoose = require("mongoose");
var keys = require("./keys");

module.exports = {
  database: `mongodb://${keys.username}:${keys.password}@ds121565.mlab.com:21565/student_crud`,
  // with double quotes:
  // database: "mongodb://" + keys.username + ":" + keys.username + "@ds121565.mlab.com:21565/student_crud"
  // for george:
  //database: "mongodb://localhost:27017/student_crud"
  startDb: function() {
    // to get rid of an annoying warning
    mongoose.Promise = global.Promise;
    mongoose.connect(this.database, { useMongoClient: true });
    db = mongoose.connection;

    db.once("open", () => {
      console.log("Connected to Mongo DB");
    });

    db.on("error", error => {
      console.log(error);
    });
  }
};
