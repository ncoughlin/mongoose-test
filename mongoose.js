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
CUSTOM METHODS - Must Go Before COMPILE
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
SAMPLE DATA
------------------------------------------*/

// add an ice cream to the DB
var rockyRoad = new IceCream({
    flavor:  "Rocky Road",
    delicious: false,
    calories: 500,
    description: "Rocky road ice cream is a chocolate flavored ice cream. Though there are variations from the original flavor, it is traditionally composed of chocolate ice cream, nuts, and whole or diced marshmallows."
});

var cookieDough = new IceCream({
    flavor:  "Cookie Dough",
    delicious: true,
    calories: 750,
    description: "Chocolate chip cookie dough ice cream is a popular ice cream flavor in which unbaked chunks of chocolate chip cookie dough are embedded in vanilla flavored ice cream."
});

// our custom method as defined above
rockyRoad.display()
cookieDough.display()

/*------------------------------------------
SAVE DATA TO MONGODB - .save Method
------------------------------------------*/

rockyRoad.save(function (err, rockyRoad){
  if (err) return console.error(err);
  rockyRoad.display();
});

cookieDough.save(function (err, rockyRoad){
  if (err) return console.error(err);
  cookieDough.display();
});


/*------------------------------------------
DISPLAY DATA - .find Method
------------------------------------------*/

IceCream.find(function (err, iceCreams){
  if (err) return console.error(err);
  console.log(iceCreams);
});
