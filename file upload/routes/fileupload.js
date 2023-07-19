const express = require("express")
const router = express.Router()

const { localFileUpload, imageUpload, videoUpload, imgSizeReducerUpload } = require('../controllers/fileupload')

router.post("/localFileUpload", localFileUpload)
router.post("/imageUpload", imageUpload)
router.post("/videoUpload", videoUpload)
router.post("/imgSizeReducerUpload", imgSizeReducerUpload)

module.exports = router