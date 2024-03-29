const File = require('../models/file')
const cloudinary = require("cloudinary").v2

// localfileupload -> handler function
const localFileUpload = async (req, res) => {
    try {
        // fetch files
        const file = req.files.file
        console.log("file : - >", file);

        // create the path where file need to store in the server
        let path = __dirname + '/files/' + Date.now() + `.${file.name.split(".")[1]}`

        // add path to move function
        file.mv(path, (err) => console.log(err))

        // create a success response
        return res.status(200).json({
            success: true,
            message: "successfully uploaded the  files"
        })

    } catch (err) {
        console.log(err);
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "unable to upload files"
        })
    }
}

// image upload handler
function isFileTypeSupported(fileType, supportedType) {
    return supportedType.includes(fileType)
}

async function uploadFileToCloudinary(file, folder, qualityValue) {
    let options = { folder }
    options.resource_type = "auto"
    if (qualityValue) {
        options.quality = qualityValue
    }
    console.log('temp file path : - >', file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}
const imageUpload = async (req, res) => {
    try {
        // fetch data
        const { name, email, tags } = req.body
        console.log("name,email,tags : - >", name, email, tags);
        console.log("files are : - >", req.files);
        const file = req.files.file
        console.log("file are : - >", file);
        // validate data
        const supportedType = ['jpg', 'png', 'jpeg']
        const fileType = file.name.split(".")[1].toLowerCase()
        console.log("file type are : - >", fileType);
        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.status(500).json({
                success: false,
                message: "image formate is not supported"
            })
        }

        // file formate supported,upload the file
        const response = await uploadFileToCloudinary(file, "mohandemo")
        console.log("responce are  - > :", response);

        //    save the entry into database
        const fileData = await File.create({
            name,
            email,
            tags,
            url: response.secure_url
        })

        // successful response
        return res.status(201).json({
            success: true,
            message: "file uploaded successfully",
            data: fileData
        })
    } catch (err) {
        console.log(err);
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "unable to upload files on cloudinary"
        })
    }
}

// video upload handler
const videoUpload = async (req, res) => {
    try {
        // fetch data
        const { name, email, tags } = req.body
        console.log("name,email,tags : - >", name, email, tags);
        console.log("files are : - >", req.files);
        const file = req.files.file
        console.log("file are : - >", file);
        // validate data
        const supportedType = ['mp4', 'mkv']
        const fileType = file.name.split(".")[1].toLowerCase()
        console.log("file type are : - >", fileType);
        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.status(500).json({
                success: false,
                message: "video formate is not supported"
            })
        }

        // check foe the size
        if (file.size > 2000000) {
            return res.status(400).json({
                success: false, message: 'File size exceeds the limit of 2MB'
            });
        }

        // file formate supported,upload the file
        const response = await uploadFileToCloudinary(file, "mohandemo")
        console.log("response are  : - >", response);

        //    save the entry into database
        const fileData = await File.create({
            name,
            email,
            tags,
            url: response.secure_url
        })

        // successful response
        return res.status(201).json({
            success: true,
            message: "file uploaded successfully",
            data: fileData
        })
    } catch (err) {
        console.log(err);
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "unable to upload video on cloudinary"
        })
    }
}

// reduce image size uploader
let qualityValue = 90
const imgSizeReducerUpload = async (req, res) => {
    try {
        // fetch the data
        const { name, email, tags } = req.body
        console.log("name,email,tags : - >", name, email, tags);
        console.log("files are : - >", req.files);
        const file = req.files.file
        console.log("file are : - >", file);

        // validate data
        const supportedType = ['jpg', 'png', 'jpeg']
        const fileType = file.name.split(".")[1].toLowerCase()
        console.log("file type are : - >", fileType);
        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.status(500).json({
                success: false,
                message: "image formate is not supported"
            })
        }
        // file formate supported,upload the file
        const response = await uploadFileToCloudinary(file, "mohandemo", qualityValue)
        console.log("response are  : - >", response);

        //    save the entry into database
        const fileData = await File.create({
            name,
            email,
            tags,
            url: response.secure_url
        })

        // successful response
        return res.status(201).json({
            success: true,
            message: "file uploaded successfully",
            data: fileData
        })
    } catch (err) {
        console.log(err);
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "unable to upload image on cloudinary"
        })
    }
}

module.exports = { localFileUpload, imageUpload, videoUpload, imgSizeReducerUpload }