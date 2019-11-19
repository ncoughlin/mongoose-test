/*------------------------------------------
SETUP
------------------------------------------*/

// requiring mongoose in app
var mongoose = require("mongoose");

// connecting Mongo database
mongoose.connect('mongodb://localhost/icecream', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDB Connected");
});

/*------------------------------------------
SCHEMA
------------------------------------------*/

var iceCreamSchema = new mongoose.Schema({
    flavor:  String,
    delicious: Boolean,
    calories: Number,
    description: String
  });
  
/*------------------------------------------
METHODS - Must Go Before COMPILE
------------------------------------------*/

iceCreamSchema.methods.display = function () {
  var consoleFlavor = this.flavor
    ? "Flavor is: " + this.flavor
    : "Flavor unknown";
  console.log(consoleFlavor);
}

/*------------------------------------------
COMPILE TO MODEL - METHODS Must Go Before
------------------------------------------*/
var IceCream = mongoose.model('IceCream', iceCreamSchema);


/*------------------------------------------
DATA
------------------------------------------*/

// add an ice cream to the DB
var rockyRoad = new IceCream({
    flavor:  "Rocky Road",
    delicious: false,
    calories: 500,
    description: "Rocky road ice cream is a chocolate flavored ice cream. Though there are variations from the original flavor, it is traditionally composed of chocolate ice cream, nuts, and whole or diced marshmallows."
});

console.log(rockyRoad.flavor);
// our method as defined above
rockyRoad.display()








