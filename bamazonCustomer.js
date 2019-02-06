var mysql = require('mysql');
var inquirer = require('inquirer');
var colors = require('colors');
require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "viviana13",
    database: "bamazon"
});
colors.setTheme({
    custom: ['rainbow', 'underline']
  });

 

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connection successful!");
    console.log("");
    makeTable();
});

var makeTable = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        console.table(res);        
        selectItem(res);
    })
};

var selectItem = function(inventory) {
    inquirer.prompt([{
        type: 'input',
        name: 'itemChoice',
        message: 'What is the ID of the item you would like to purchase? [Quit with Q]',
        validate: function(val) {
            return !isNaN(val) || val.toLowerCase() === "q"
        }
    }]).then(function(val) {
        // Check if user wants to exit
        userExit(val.itemChoice);

        var choiceId = parseInt(val.itemChoice);
        var product = checkInventory(choiceId, inventory);

        if (product) {
            selectQuantity(product);
        } else {
            console.log("That item is not in the inventory")
        }
    })
}

var selectQuantity = function(product) {
 // Inquirer prompt asking user for quantity desired
 inquirer.prompt([{
    type: 'input',
    name: 'itemChoice',
    message: 'What is the ID of the item you would like to purchase? [Quit with Q]',

 // Validate to make sure user enters a number or a Q
 validate: function(val) {
    return !isNaN(val) || val.toLowerCase() === "q"
}
}]).then(function(val) {
 // Check if user wants to exit
 userExit(val.itemChoice);

 // Check if quantity desired exceeds quantity available 

if (quantity <= productData.stock_quantity) {
    console.log('Congratulations, the product you requested is in stock! Placing order!');


}
 // var quantity = parseInt(val.itemQuantity) if (quantity > product.stock_quantity)
 var choiceId = parseInt(val.itemChoice);
 var product = checkInventory(choiceId, inventory);

 // If quantity is available, run the makePurchase function
 
 // If quantity is not available, console.log a message stating that

});

var makePurchase = function() {
    // Connect to mysql 
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [quantity, product.item_id], 
    function(err, res) {
        console.log("Congratulations.  Your purchase was successful");
        makeTable();
    })
}

var checkInventory = function(choiceId, inventory) {
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i].item_id === choiceId) {
            return inventory[i];
        }        
    }
    return null;
}

var userExit = function(choice) {
    if (choice.toLowerCase() === "q") {
        console.log("")
        console.log("Goodbye!");
        console.log("");
        process.exit(0)
    }
}


}
