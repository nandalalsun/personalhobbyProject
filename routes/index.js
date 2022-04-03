const router = require("express").Router();
const musicController = require("../controller/musicController");


router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next();
  });

router.route("/music")
    .get(musicController.getAll);

router.route("/music/:musicId")
    .get(musicController.getOne)
    .delete(musicController.deleteOne)
    .post(musicController.addOne)
    .patch(musicController.updateOne);

module.exports = router;
