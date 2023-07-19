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

async function uploadFileToCloudinary(file, folder) {
    let options = { folder }
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
                message: "file formate is not supported"
            })
        }

        // file formate supported,upload the file
        const response = await uploadFileToCloudinary(file, "mohandemo")
        console.log(response);

        //    save the entry into database
        const fileData = await File.create({
            name,
            email,
            tags,
            imgurl: response.secure_url
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


module.exports = { localFileUpload, imageUpload }