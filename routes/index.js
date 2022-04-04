const router = require("express").Router();
const musicController = require("../controller/musicController");
const artistController = require("../controller/artistController");


router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next();
  });

router.route("/music/:musicId/artist/:artistId")
  .get(artistController.getOne)
  .delete(artistController.deleteOne)
  .patch(artistController.updateOne);

router.route("/music/:musicId/artist")
  .get(artistController.getAll)
  .post(artistController.addOne);

router.route("/music")
    .get(musicController.getAll)
    .post(musicController.addOne);

router.route("/music/:musicId")
    .get(musicController.getOne)
    .delete(musicController.deleteOne)
    .patch(musicController.updateOne);


    let page_not_found = (req, res)=>{
      res.status(404).json({Error: "Page not found"});
    }

    router.route("*")
    .get(page_not_found)
    .post(page_not_found)
    .patch(page_not_found)
    .delete(page_not_found);



module.exports = router;
