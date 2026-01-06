const router = require("express").Router();
const BlogController = require("../controllers/blog.controller");
const upload = require("../utils/upload");

router.post("/", upload.single("cover_image"), BlogController.store);
router.get("/", BlogController.index);
router.put("/", upload.single("cover_image"), BlogController.update);
router.delete("/:id", BlogController.trash);

router.post("/signUp", BlogController.signUp);
router.post("/login", BlogController.login);
router.get("/checkAuth", BlogController.checkAuth);

module.exports = router;
