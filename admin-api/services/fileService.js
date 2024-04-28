const File = require('../models/File')
const { Op } = require("sequelize");

class FileService {
	async getAll() {
		return await File.findAll({
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt']
            }
        });
	}
    async upload(data) {
        return await File.create(data)
    }
}

module.exports = new FileService();
