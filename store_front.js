var mysql = require("mysql");
var inquirer = require("inquirer");
var total = 0;


var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  user: "root",

  password: "root",
  database: "store_DB"
});

// Display the Store:
var displayStore = function() {
	connection.query("SELECT * FROM products", function(err, res) {
      if (err) {
          throw err;
      }

      console.log("Welcome to Bamazon!  Here is what is for sale: ");
      console.log("-----------------------------------------------");

	  for(var i = 0; i < res.length; i++) {
	  	console.log(res[i].item_id + " , " + res[i].product_name + " , " + res[i].price.toFixed(2));
    }

    inquirer.prompt([
        {
            type: "input",
            name: "item_id",
            message: "What is the item id of the product you are interested in? ",
            validate: function(value) {
                
                // this checks to see is the user's input it a valid item id and if there are at least one of the products in stock
                if(isNaN(value) === false && value > 0 && value < res.length + 1) {
                    console.log(" Item id is available");
                    return true;
                } 
                
                else {
                    console.log(" Sorry, we are out of stock.  Check back later");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to buy?",

            // this confirms that we have enought of that product in stock to fulfill the user's order
            validate: function(value) {
                if(isNaN(value) === false && value > 0) {
                    return true;
                } else {
                    return false;
                }
            }
        },

    // after we gather the user's input we can tell them if we can or cannont fulfill the order they made
    ]).then(function(input) {
        var quantity = input.quantity;
        var item_id = input.item_id;

        // if there is not enough of that product left in stock:
        if(quantity > res[item_id - 1].stock_quantity) {
            console.log("Sorry, we are out of stock for item id: " + item_id + " Please try again later.");

            // ask the user for a different order
            inquirer.prompt([
                {
                    type: "confirm",
                    name: "confirm",
                    message: "Do you want to keep browsing the store?"
                }
            ]).then(function(input) {
                if(input.confirm) {
                    displayStore();
                }
            });
        } else {
            // If there is enough in stock and the user buys the quantity they wanted, then we need to subtract the current stock_quantity by the quantity they ordered since the user is buying it
            connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [quantity, item_id], function(err, res) {});

            // total cost of what they just bought: 
            console.log("Your subtotal total is " + (res[item_id - 1].price * quantity).toFixed(2));

            total = total + (res[item_id - 1].price * quantity);

            // total cost of everything they bought:
            console.log("Your cart total is " + total.toFixed(2));

            // After the user confirms their first item, they can buy another one:
            inquirer.prompt([
                {
                    type: "confirm",
                    name: "confirm",
                    message: "Do you want to keep browsing the store?"
                }
            ]).then(function(input) {
                if(input.confirm) {
                    displayStore();
                }
            });
            }
        });
    });
    };
displayStore();