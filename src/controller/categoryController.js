const { Category } = require("../model/categoryModel")
const { errorHandling } = require("./errorController")
const fs = require('fs')
const { idChecking } = require("./idController")
const { uploadImage, getImageUrl, deleteImage } = require("./imageConroller")
const { validationController } = require("./validationController")

exports.createCategory = async (req, res) => {
    try {
        // Result validation.
        const data = validationController(req, res)

        // Registration path and name of file.
        const filePath = req.file.path
        const fileName = req.file.filename

        // Checking name for exists. (If exists responsing error.)
        const condidat = await Category.findOne({
            $or: [
                { en_name: data.en_name },
                { ru_name: data.ru_name }
            ]
        })
        if (condidat) {
            fs.unlinkSync(filePath)
            // Responsing.
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: `Already exists category with name (en or ru).` }
            })
        }

        // Uploading image to supabse storage and get image url.
        await uploadImage(fileName, filePath)
        const { publicUrl } = await getImageUrl(fileName, filePath)
        fs.unlinkSync(filePath)

        // Writing new category to database.
        const newCategory = await Category.create({
            en_name: data.en_name,
            ru_name: data.ru_name,
            image_url: publicUrl,
            image_name: fileName
        })

        // Responsing.
        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: "Category has been created successfully."
            }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}

exports.getAllCategories = async (req, res) => {
    try {
        // Getting all categories from database.
        const categories = await Category.find().populate('meals')

        // Responsing.
        return res.status(200).send({
            success: true,
            error: false,
            data: {
                message: "Getting all categories successfully.",
                categories
            }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}

exports.getOneCategory = async (req, res) => {
    const { params: { id } } = req
    try {
        // Checking id to valid.
        idChecking(id, res)

        // Searching category with id.
        const category = await Category.findById(id).populate('meals')

        // Checking to exists.
        if (!category) {
            // Responsing.
            return res.status(404).send({
                success: false,
                data: null,
                error: { message: "Category is not found!" }
            })
        }

        // Responsing.
        return res.status(200).send({
            success: true,
            error: false,
            data: {
                message: "Category has been getted successful.",
                category
            }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}

exports.updateOneCategory = async (req, res) => {
    const { params: { id } } = req
    try {
        // Checking id to valid.
        idChecking(id, res)

        // Checking category to exists.
        const category = await Category.findById(id).populate('meals')
        if (!category) {
            return res.status(404).send({
                success: false,
                data: null,
                error: { message: "Category is not found!" }
            })
        }

        // Result validation.
        const { data } = validationController(req, res)

        if (!req.file) {
            if (category.en_name == data.en_name && category.ru_name == data.ru_name) {
                // Responsing.
                return res.status(201).send({
                    success: true,
                    error: false,
                    data: { message: "Category has been updated successfully." }
                })
            } else {
                // Writing to database.
                const updateCategory = await Category.findByIdAndUpdate(id, {
                    ...category,
                    en_name: data.en_name,
                    ru_name: data.ru_name
                })
            }
        } else {
            // Registration path and name of file.
            const filePath = req.file.path
            const fileName = req.file.filename

            // Delete old image of category.
            await deleteImage(category.image_name)

            // Uploading image to supabse storage and get image url.
            await uploadImage(fileName, filePath)
            const { publicUrl } = await getImageUrl(fileName, filePath)
            fs.unlinkSync(filePath)

            // Writing to database.
            const updateCategory = await Category.findByIdAndUpdate(id, {
                ...category,
                en_name: data.en_name,
                ru_name: data.ru_name,
                image_url: publicUrl,
                image_name: fileName
            })
        }

        // Responsing.
        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: "Category has been updated successfully."
            }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}

exports.deleteOneCategory = async (req, res) => {
    const { params: { id } } = req
    try {
        // Checking id to valid.
        idChecking(id, res)

        // Checking category to exists.
        const category = await Category.findById(id)
        if (!category) {
            // Responsing.
            return res.status(404).send({
                success: false,
                data: null,
                error: { message: "Category is not found!" }
            })
        }

        // Deleting old image of category.
        await deleteImage(category.image_name)

        // Deleting category from database.
        await Category.findByIdAndDelete(id)

        // Responsing.
        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: "Category has been deleted successfully."
            }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}

exports.deleteAllCategories = async (req, res) => {
    try {
        // Checking categories for exists
        const categories = await Category.find()

        // Deleting images of categories.
        for (let index = 0; index < categories.length; index++) {
            await deleteImage(categories[i].image_name)
        }

        // Deleting category from database.
        await Category.deleteMany()

        // Responsing.
        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: "Categories has been deleted successfully."
            }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}