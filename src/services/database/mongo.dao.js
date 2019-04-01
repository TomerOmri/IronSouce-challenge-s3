const mongoose = require('mongoose');
const File = mongoose.model('File');

class mongoDao {

    // Upload
    static async uploadFile(file, ownerId, access_token) {
        const fileInDB = await File.findOne({ownerId: ownerId, name: file.name});

        if (!fileInDB) {
            try {
                let fileToUpload = new File(file);
                fileToUpload.ownerId = ownerId;

                if (access_token){
                    fileToUpload.isPrivate = true;
                    fileToUpload.access_token = access_token;
                }

                return await fileToUpload.save();
            } catch (e) {
                throw e;
            }
        } else {
            return fileInDB;
        }
    }

    // Find
    static async findPrivateFile(fileIdentifier) {
        return await File.findOne({secretId: fileIdentifier});
    };

    static async findFile (ownerId, fileName) {
        return await File.findOne({ownerId: ownerId, name: fileName});
    };



    // Update
    static async updateFilePermission (ownerId, fileName, access_token) {
        if (access_token) {
            // If we hold the *right* access_token, the file is private - there is no other way to get it
            return await File.findOneAndUpdate({ownerId: ownerId, secretId: fileName}, { isPrivate: false });
        }

        const a =  await File.findOneAndUpdate({ownerId: ownerId, name: fileName}, { isPrivate: true });
        return a;
    }



    // Delete
    static async deleteFile (ownerId, fileName) {
        return await File.findOneAndUpdate({ownerId: ownerId, name: fileName}, { deletedAt: Date.now() });
    }



}


module.exports = mongoDao;