const fileService = require('../services/fileService')
require('dotenv').config()

class fileController {
  	async all(req, res) {
		try {
			const posts = await fileService.getAll()
			res.json(posts)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
  	}
  	async findById(req, res) {
		const id = req.params.id
		try {
			const post = await fileService.findById(id)
			res.json(post)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
  	}
    async upload(req, res, next) {
        console.log(req.file)
        console.log(req.files)
        const urls = []
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: "No files uploaded" })
            }
            for (const file of req.files) {
                const { path, mimetype, size, originalname } = file
                const oneFile = {
                    path: '/' + path.replace(/\\/g, '/'),
                    mimetype,
                    size,
                    name: originalname
                }
                const savedFile = await fileService.upload(oneFile)
                urls.push({
                    name: originalname,
                    path: '/' + path.replace(/\\/g, '/'),
                    size
                })
            }
            res.status(200).json({ message: "Files uploaded successfully", files: urls })
        } catch (error) {
            console.error("Error uploading files:", error)
            res.status(500).json({ error: "Error uploading files" })
        }
    }
	async remove(req, res) {
        const id = req.params.id
        try {
            await fileService.deletePost(id)
            res.json({
				message: "Публикация успешно удалена."
			}).status(204)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
	}
}

module.exports = new fileController()