const File = require('../models/file')

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

module.exports = { localFileUpload }