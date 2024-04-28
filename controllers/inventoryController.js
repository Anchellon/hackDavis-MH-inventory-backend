const { body, validationResult } = require("express-validator");
const WareHouse = require("../models/WareHouse");
const conn = require("../utils/connection");

/** get a list of all items to be donated from the DAVIS HOUSING SUPPORT  */
exports.index = (req, res, next) => {
    // get a list of all quizes by a particular user
    resObj = {};
    WareHouse.find({})
        .then((itemList) => {
            if (itemList) {
                resObj.items = itemList;
            }
            resObj.message = "Items List for the user";
            res.status(200).send(resObj);
        })
        .catch((error) => {
            //When there are errors We handle them here
            console.log(err);
            res.send(400, "Bad Request");
        });
};

//

/*
ADMIN API
JSON 
{
    name: Apple,
    category: Food,
    QTY: default 0 / or a number provided
    moreRequired: Default 0 / or a number provided
    donatedby: UC DAVIS
}
*/
exports.newItemCreate = (req, res, next) => [
    // Process request after validation and sanitization.1
    async (req, res, next) => {
        try {
            const session = await conn.startSession();
            await session.withTransaction(async () => {
                let itemTransaction = await Transaction.create({
                    item: req.body.item.name,
                    category: req.body.item.category,
                    quantity:
                        req.body.item.quantity > 0 ? req.body.item.quantity : 0,
                    donatedBy: "UC DAVIS",
                });
                let whRecord = await WareHouse.create({
                    item: req.body.item.name,
                    category: req.body.item.category,
                    quantity:
                        req.body.item.quantity > 0 ? req.body.item.quantity : 0,
                    moreRequired:
                        req.body.item.moreRequired > 0
                            ? req.body.item.moreRequired
                            : 0,
                });
            });
            session.endSession();
            console.log("Succes!");
            res.status(200).send();
        } catch (error) {
            console.log(error);
        }
    },
];
/*
Admin API 
Add to inventory 
*/

exports.AddItemInventory = (req, res, next) => [
    // Process request after validation and sanitization.1
    async (req, res, next) => {
        try {
            const session = await conn.startSession();
            await session.withTransaction(async () => {
                let itemTransaction = await Transaction.create({
                    item: req.body.item.name,
                    category: req.body.item.category,
                    quantity:
                        req.body.item.quantity > 0 ? req.body.item.quantity : 0,
                    donatedBy: req.item.donor,
                });
                // find this reccord and the see if it reduces moreRequired to below 0
                let updateRec = await Adventure.findOne({
                    item: req.body.item,
                    category: req.body.item.category,
                });
                if (updateRec.moreRequired - req.body.item.quantity > 0) {
                    updateRec.moreRequired =
                        updateRec.moreRequired - req.body.item.quantity;
                } else {
                    updateRec.moreRequired = 0;
                }
                await WareHouse.findOneAndUpdate(
                    {
                        item: req.body.item.name,
                        category: req.body.item.category,
                    },
                    {
                        moreRequired: updateRec.moreRequired,
                        $inc: { inStock: req.body.item.inStock },
                    }
                );
            });
            session.endSession();
            console.log("Succes!");
            res.status(200).send();
        } catch (error) {
            console.log(error);
        }
    },
];

/*
Admin API 
Edit inventory Item
*/

exports.EditItemInventory = (req, res, next) => [
    // Process request after validation and sanitization.1
    async (req, res, next) => {
        try {
            // find this reccord and the see if it reduces moreRequired to below 0

            await WareHouse.findOneAndUpdate(
                {
                    item: req.body.item.name,
                    category: req.body.item.category,
                },
                {
                    item: req.body.item.name,
                    category: req.body.item.category,
                    inStock: req.body.item.inStock,
                    moreRequired: req.body.item.moreRequired,
                }
            );

            console.log("Succes!");
            res.status(200).send();
        } catch (error) {
            console.log(error);
        }
    },
];

/*
Admin API 
DistrIbute inventory Item
*/

exports.DistributeItemInventory = (req, res, next) => [
    // Process request after validation and sanitization.1
    async (req, res, next) => {
        try {
            // find this reccord and the see if it reduces moreRequired to below 0

            await WareHouse.findOneAndUpdate(
                {
                    item: req.body.item.name,
                    category: req.body.item.category,
                },
                {
                    $inc: { inStock: -1 * req.body.item.inStock },
                }
            );

            console.log("Succes!");
            res.status(200).send();
        } catch (error) {
            console.log(error);
        }
    },
];
