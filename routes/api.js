const express = require("express");
const router = express.Router();

// /**  Require controller modules. */
// const quiz_controller = require("../controllers/quizController");
const inventory_controller = require("../controllers/inventoryController");

// /* GET catalog home page. to display all inventory  */
router.get("/inventory/", inventory_controller.index);

// /* GET catalog home page. to display all inventory  */
// router.get("/inventory/urgent", inventory_controller.index);

/* POST catalog home page. to display all inventory  */
router.post("/admin/addNewItem", inventory_controller.newItemCreate);

/* POST catalog home page. to display all inventory  */
router.post("/admin/addStock", inventory_controller.AddItemInventory);

/* POST catalog home page. to display all inventory  */
router.post("/admin/editItem", inventory_controller.EditItemInventory);

/* POST catalog home page. to display all inventory  */
router.post("/admin/distribute", inventory_controller.DistributeItemInventory);

module.exports = router;
