import express from "express";
const router = express.Router({strict:true});

//@ Description > Testing Route
//@ Route > /user/test
//@ Access Control > Public
router.route('/test').get((req, res, next) => {
  return res.status(200).json({
    message: `Yay! It's working...`
  });
});

export default router;