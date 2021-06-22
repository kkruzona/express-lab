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
    res.json(cartItems);
  });
// cart.get("/:price", (req, res) => {
//     let price = req.params.price;
//     console.log("Getting ", price);
//     res.json(`Getting only ${price}`);
//   });
cart.get("/:id", (req, res) => {
    let id = req.params.id;
    console.log("Getting ", id);
    let found = cartItems.find((item) => {
        return item.id == id
    })
    res.json(found);
  });
  // accept POST request at URI: /students
  cart.post("/", (req, res) => {
      console.log(req.body);
      let test = req.body.test
      console.log("Test results:", test )

    res.status(201).json("Adding new item..");
  });

  // accept PUT request at URI: /students
  cart.put("/:id", (req, res) => {
    res.json("Updating the cart..");
  });

  // accept DELETE request at URI: /students
  cart.delete("/:id", (req, res) => {
    let id = req.params.id;
      //logic find index; use splice to remove
    res.status(204).json("Deleting cart item..");
  });

  module.exports = cart;


//   res.status(404).json(`Getting all students with last name: ${cart}`);

