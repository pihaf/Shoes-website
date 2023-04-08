const products = [
    {
        id: 1,
        name: "nike",
        image: "",
        price: 40,
        description: "This is nike",
    },
    {
        id: 2,
        name: "adidas",
        image: "",
        price: 39.99,
        description: "This is adidas",
    },
    {
        id: 3,
        name: "jordan",
        image: "",
        price: 50,
        description: "This is jordan",
    },
    {
        id: 4,
        name: "hermes",
        image: "",
        price: 20,
        description: "This is hermes",
    }
]

const users = [
    {
        id: 1,
        name: 'nam',
    },
    {
        id: 2,
        name: 'minh',
    },
    {
        id: 3,
        name: 'long',
    },
]

module.exports = {products, users}

/*
const {products} = require('../data')

const getProducts = (req, res) => {
    const newProducts = products.map((product) => {
        const {id, name, image} = product
        return {id, name, image}
    })

    res.json(newProducts)
}

const getProductsWQuery = (req, res) => {
    const {search, limit} =  req.query
    let sortedProducts = [...products]

    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search)
        })
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    if (sortedProducts.length < 1) {
        return res.status(200).json({success: true, data: []})
    }
    res.status(200).json(sortedProducts)
}

const getSpecificProduct = (req, res) => {
    //get a specific product with given id in path
    const {productID} = req.params
    const tempProduct = products.find((product) => product.id === Number(productID))
    if (!Number(productID) && !tempProduct) {
        return res.status(404).send("Product doesn't exist")
    }   
    return res.json(tempProduct)
}

const createProduct = (req, res) => {
    const {id} = req.body
    if (!id) {
        return res.status(400).json({success: false, msg: 'Please provide the required information'})
    }

    res.status(200).json({success: true, user: id})
}

const updateProduct = (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const product = products.find((product) => product.id === Number(id))

    if (!product) {
        return res.status(404).json({success: false, msg: `No user with id ${id}`})
    }
    const newProducts = products.map((product) => {
        if (product.id === Number(id)) {
            product.name = name
        }
        return product
    })
    res.status(200).json({success: true, data: newProducts})
}

const deleteProduct = (req, res) => {
    const product = products.find((product) => product.id === Number(req.params.id))

    if (!product) {
        return res.status(404).json({success: false, msg: `No product with id ${req.params.id}`})
    }

    const newProducts = product.filter((product) => { product.id !== Number(req.params.id)})
    return res.status(200).json({success: true, data: newProducts})
}

module.exports = {getProducts, getProductsWQuery, getSpecificProduct, createProduct, updateProduct, deleteProduct}


===========================================

const {users} = require('../data')

const getUsers = (req, res) => {
    return res.status(200).json({success: true, data: users}) }

const createUser = (req, res) => {
    const {name} = req.body
    if (!name) {
        return res.status(400).json({success: false, msg: 'Please provide the required information'})
    }

    res.status(200).json({success: true, user: name})
}

const updateUser = (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const user = users.find((user) => user.id === Number(id))

    if (!user) {
        return res.status(404).json({success: false, msg: `No user with id ${id}`})
    }
    const newUsers = users.map((user) => {
        if (user.id === Number(id)) {
            user.name = name
        }
        return user
    })
    res.status(200).json({success: true, data: newUsers})
}

const deleteUser = (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id))

    if (!user) {
        return res.status(404).json({success: false, msg: `No user with id ${req.params.id}`})
    }

    const newUsers = user.filter((user) => { user.id !== Number(req.params.id)})
    return res.status(200).json({success: true, data: newUsers})
}

module.exports = {getUsers, createUser, updateUser, deleteUser}

==============================================

const { orderDetail } = require('../models/orderDetail');
const { order } = require('../models/order');
const { shoe } = require('../models/shoe');
const { inventory } = require('../models/inventory');
const { Op } = require('sequelize');


let getUsersOrder = async (req, res) => {

    try {

        // check whether user has active order or not
        // if not create one
        let getOrder = await order.findOrCreate({
            where: {
                [Op.and]: [
                    { uid: { [Op.eq]: req.user.uid }},
                    { status: { [Op.eq]: "active" }}
                ]
            },
            defaults: {
                uid: req.user.uid,
                status: "active"
            },
        });

        // get inventory id
        let getOrderDetails = await orderDetail.findAll({
            where: {
                oid: {
                    [Op.eq]: getOrder[0].oid
                }
            },
            include: {
                model: inventory,
                include: shoe
            }
        });

        let toSend = [];

        // normalize response and calculating total cost
        getOrderDetails.forEach(async (Element) => {

            // verify quantity in stock is sufficient or quantity is illegal (eg. <0)
            if (Element.inventory.qtyInStock < 0 || Element.qty <= 0) {

                // if there are none left, remove item from cart
                Element.destroy();
            } else {

                // if quantity in stock is less than quantity ordering
                if (Element.inventory.qtyInStock < Element.qty) {
                    Element.update({ qty: Element.inventory.qtyInStock });
                }
                toSend.push({
                    iid: Element.iid,
                    sid: Element.inventory.shoe.sid,
                    name: Element.inventory.shoe.name,
                    imageURL: Element.inventory.shoe.imageURL,
                    gender: Element.inventory.shoe.gender,
                    price: Element.inventory.shoe.price,
                    size: Element.inventory.size,
                    qty: ((Element.inventory.qtyInStock < Element.qty)? Element.inventory.qtyInStock : Element.qty)
                });
            }
        });

        // renders the order view with items in order
        res.status(200).json({ shoes: toSend })
    } catch(err) {

        // catch errors
        console.log(err);
        res.status(500);
    }

};

let alterOrder = async (req, res) => {

    try {

        // check whether user has active order or not
        // if not create one
        let getOrder = await order.findOrCreate({
            where: {
                [Op.and]: [
                    { uid: { [Op.eq]: req.user.uid }},
                    { status: { [Op.eq]: "active" }}
                ]
            },
            defaults: {
                uid: req.user.uid,
                status: "active"
            }
        });
        
        // check whether order has specific item or not
        // if not add one
        let getOrderDetail = await orderDetail.findOrCreate({
            where: {
                [Op.and]: [
                    { oid: { [Op.eq]: getOrder[0].oid }},
                    { iid: { [Op.eq]: req.body.iid }}
                ]
            },
            defaults: {
                oid: getOrder[0].oid,
                iid: req.body.iid,
                qty: 0
            }
        });
        
        // get inventory id
        let getInventory = await inventory.findOne({
            where: {
                [Op.and]: [
                    { iid: { [Op.eq]: req.body.iid }}
                ]
            }
        });

        console.log(getOrderDetail[0].qty);

        // check whether ordered quantity exceeds quantity in stock
        if (getOrderDetail[0].qty + req.body.qty > getInventory.qtyInStock ||
            getOrderDetail[0].qty + req.body.qty <= 0) {
            
            // destroy newly created order (if qty = 0)
            if (getOrderDetail[0].qty == 0) {
                getOrderDetail[0].destroy();
            }


            res.status(406).json({ qty: getOrderDetail[0].qty, msg: "Insufficient stock" });
            
        } else {

            // increase quantity of specific item 
            getOrderDetail[0].increment({ qty: req.body.qty });

            // sends back the "ok" status 
            res.status(200).json({ msg: "OK" });

        }

    } catch(err) {
            
        // catch all errors
        console.log(err);
        res.status(500);
    }

};

let deleteItemFromOrder = async (req, res) => {

    try {
        // get user's active order
        let getOrder = await order.findOne({
            where: {
                [Op.and]: [
                    { uid: { [Op.eq]: req.user.uid }},
                    { status: { [Op.eq]: "active" }}
                ]
            }
        });

        // remove specific item from order
        let updateOrder = await orderDetail.destroy({
            where: {
                [Op.and]: [
                    { oid: { [Op.eq]: getOrder.oid }},
                    { iid: { [Op.eq]: req.body.iid }}
                ]
            }
        });

        updateOrder;

        // get order detail
        let getOrderDetails = await orderDetail.findAll({
            where: {
                oid: {
                    [Op.eq]: getOrder.oid
                }
            },
            include: {
                model: inventory,
                include: shoe
            }
        });

        // update total cost
        let total = 0;

        getOrderDetails.forEach(Element => {

            total += (Element.inventory.shoe.price * Element.qty);

        });

        // confirms update success and send back id of div to remove
        res.send({divId: `#tag-${req.body.iid}`, newTotal: total});

    } catch(err) {

        // catch all errors
        console.log(err);
        res.status(500);
    }

};

module.exports = { 
    getUsersOrder, 
    alterOrder, 
    deleteItemFromOrder 
};

*/