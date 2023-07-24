const {
  addScore,
  getAllScores,
  scoreAnalysis,
  timeAnalysis,
  skillAnalysis,
} = require("../controllers/leaderBoardController");
const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

router.post("/", verifyToken, addScore);

router.get("/", verifyToken, getAllScores);
router.get("/scores", verifyTokenAndAdmin, scoreAnalysis);
router.get("/times", verifyTokenAndAdmin, timeAnalysis);
router.get("/skills", verifyTokenAndAdmin, skillAnalysis);

module.exports = router;
