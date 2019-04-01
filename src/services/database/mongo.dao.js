const mongoose = require('mongoose');
const File = mongoose.model('File');

class mongoDao {

    // Upload
    static async uploadPrivateFile (file, access_token) {
        try {
            let newFile = new File(file);
            newFile.isPrivate = true;
            newFile.access_token = access_token;
            return await newFile.save();
        } catch (e) {
            throw e;
        }
    }

    static async uploadPublicFile (file) {
        try {
            let newFile = new File(file);
            newFile.isPrivate = true;
            newFile.access_token = access_token;
            return newFile.save();
        } catch (e) {
            throw e;
        }
    }


    // Find
    static async findOnePrivateFile (ownerId, fileName) {
        return await File.findOne({ownerId: ownerId, secretId: fileName});
    };

    static async findOnePublicFile (ownerId, fileName) {
        return await File.findOne({ownerId: ownerId, fileName: fileName});
    };



    // Update
    static async updateFilePermission (ownerId, fileName, isPrivate) {
        if (isPrivate) {
            return await File.findOneAndUpdate({ownerId: ownerId, secretId: fileName}, { isPrivate: !isPrivate });
        }

        return await File.findOneAndUpdate({ownerId: ownerId, name: fileName}, { isPrivate: !isPrivate });
    }



    // Delete
    static async deleteFile (ownerId, fileName, isPrivate) {
        if (isPrivate) {
            const a =  await File.findOneAndDelete({ownerId: ownerId, name: fileName});
            return a;
        }
        const b =  await File.findOneAndDelete({ownerId: ownerId, name: fileName});
        return b
    }



}


module.exports = mongoDao;