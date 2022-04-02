const router = require("express").Router();
const musicController = require("../controller/musicController");


router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next();
  });

router.route("/music").get(musicController.allMusic);

router.route("/music/:musicId").get(musicController.oneMusic).delete(musicController.deleteOne);

module.exports = router;
