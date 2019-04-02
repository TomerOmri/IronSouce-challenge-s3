const mongoose = require('mongoose');
const File = mongoose.model('File');
const randomstring = require('randomstring');
const errorService = require('../../utils/error-service');

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
    static async findPrivateFile(fileIdentifier, access_token) {
        return await File.findOne({secretId: fileIdentifier, access_token: access_token});
    };

    static async findFile(ownerId, fileName) {
        return await File.findOne({ownerId: ownerId, name: fileName});
    };

    // Update
    static async updateFilePermission(ownerId, fileName) {

        const fileToUpdate = await File.findOne({ownerId: ownerId, name: fileName});
        if (!fileToUpdate || fileToUpdate.deletedAt) {
            throw new errorService('File not found', 404)
        }

        fileToUpdate.isPrivate = !fileToUpdate.isPrivate;

        if (!fileToUpdate.access_token) {
            fileToUpdate.access_token = randomstring.generate(10);
        }

        return await fileToUpdate.save();
    }

    // Delete
    static async deleteFile(ownerId, fileName) {
        return await File.findOneAndUpdate({ownerId: ownerId, name: fileName}, { deletedAt: Date.now() });
    }
}


module.exports = mongoDao;