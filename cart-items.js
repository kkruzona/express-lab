const express = require("express");
const cart = express.Router();

let cartItems = [
    {
        id: 01,
        product: "Shirt",
        price: 30,
        quantity: 4
    },
    {
        id: 02,
        product: "Pants",
        price: 50,
        quantity: 3
    },
    {
        id: 03,
        product: "Shoes",
        price: 40,
        quantity: 1
    },
    {
        id: 04,
        product: "Necklace",
        price: 20,
        quantity: 2
    },
    {
        id: 05,
        product: "Earrings",
        price: 15,
        quantity: 5
    }
];

cart.get("/", (req, res) => {
    let cart = req.query["cartItems"]
    console.log("");
    // res.json(cartItems);
    let maxPrice = req.query.maxPrice;
    let returnCart = cartItems;
    if (maxPrice){
      returnCart = cartItems.filter((item) => item.price <= maxPrice);
    }
    let prefix = req.query.prefix;
    if (prefix){
      // starts with ....
      returnCart = cartItems.filter((item) => item.product.toLowerCase().startsWith(prefix.toLowerCase()));
    }
    let pageSize = req.query.pageSize;
    if (pageSize){
      returnCart = cartItems.slice(0, pageSize);
    }
    res.json(returnCart);
    // res.json(returnCart);
  });
cart.get("/:id", (req, res) => {
    let id = req.params.id;
    console.log("Getting ", id);
    // THIS WORKS!
    let found = cartItems.find((item) => item.id == id);
    if(found){

    } else {
      return res.status(404).send('ID Not Found');
    }
    res.json(found);
  });
  // accept POST request at URI: /students
  cart.post("/", (req, res) => {
      console.log(req.body);
      let test = req.body.test
      console.log("Test results:", test )
      let x = cartItems.length + 1;       
      let newItem = req.body;
      newItem.id = x;
    cartItems.push(newItem);
    console.log(cartItems);
    res.status(201).json(cartItems);
  });

  // accept PUT request at URI: /students
  cart.put("/:id", (req, res) => {
    let id = req.params.id;
    let updatedCart = req.body;
    let found = cartItems.findIndex((item) => item.id == id);
    if (found) {
    cartItems[found] = {...cartItems[found], ...updatedCart};
    res.json(cartItems[found]);

  } else {
    res.json("no item updated")
    }
    //logic find id; & handle if the object doesnt exist if time (400 code)
    // cartItems[req.params.id] = {...cartItems[req.params.id], ...updatedCart};
  });

  // accept DELETE request at URI: /students
  cart.delete("/:id", (req, res) => {
      let id = req.params.id;
      //logic find index; use splice to remove
      // ITS WORKING!!
      let index = cartItems.findIndex(item => item.id == id);
      cartItems.splice(index,1);
      console.log(cartItems)
    res.status(204).json(cartItems);
  });

  module.exports = cart;


//   res.status(404).json(`Getting all students with last name: ${cart}`);

    // let found = cartItems.find((item) => {
    //     return item.id == id
    // })

