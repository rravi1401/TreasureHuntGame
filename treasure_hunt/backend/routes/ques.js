const {
  addQues,
  getQues,
  deleteQues,
  editQues,
} = require("../controllers/quesController");
const { verifyTokenAndAdmin, verifyToken } = require("./verifyToken");

const router = require("express").Router();

router.post("/", verifyTokenAndAdmin, addQues);
router.get("/", verifyToken, getQues);
router.delete("/:id", verifyTokenAndAdmin, deleteQues);
router.put("/:id", verifyTokenAndAdmin, editQues);

module.exports = router;
