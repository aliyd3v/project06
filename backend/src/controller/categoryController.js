const { validationResult, matchedData } = require("express-validator")
const { Category } = require("../model/categoryModel")
const { errorHandling } = require("./errorController")
const fs = require('fs')
const { supabase } = require("../storage/supabase")

exports.createCategory = async (req, res) => {
    const filePath = req.file.path
    const fileName = req.file.filename
    console.log(req.body)
    try {
        // Result validation.
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errorMessage = errors.array().map(error => error.msg)
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: errorMessage }
            })
        }
        const categoryData = matchedData(req)

        const condidat = await Category.findOne({
            $or: [
                { en_name: categoryData.en_name },
                { ru_name: categoryData.ru_name }
            ]
        })
        if (condidat) {
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: `Already exists category with name (en or ru).` }
            })
        }

        // Uploading and get public image url.
        const { data, error } = await supabase.storage.from('storage').upload(`category_images/${fileName}`, fs.createReadStream(filePath), {
            cacheControl: '3600',
            upsert: false,
            contentType: req.file.mimetype
        })
        const { publicUrl } = supabase.storage.from('storage').getPublicUrl(`storage_images/${fileName}`)
        fs.unlinkSync(filePath)

        const newCategory = await Category.create({
            en_name: categoryData.en_name,
            ru_name: categoryData.ru_name,
            image: publicUrl
        })
        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: "Categrory has been created successful.",
                categroy: { name: `${categoryData.name}` }
            }
        })
    } catch (error) {
        errorHandling(error, res)
    }
}

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('meals', 'name')
        return res.status(200).send({
            success: true,
            error: false,
            data: {
                message: "Getting all categories successful.",
                categories
            }
        })
    } catch (error) {
        errorHandling(error, res)
    }
}

exports.getOneCategory = async (req, res) => {
    const { params: { id } } = req
    try {
        // Checking id to valid.
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: "Url or Id is wrong!" }
            })
        }

        const category = await Category.findById(id).populate('meals', 'name')
        if (!category) {
            return res.status(404).send({
                success: false,
                data: null,
                error: { message: "Category is not found!" }
            })
        }
        return res.status(200).send({
            success: true,
            error: false,
            data: {
                message: "Category has been getted successful.",
                category
            }
        })
    } catch (error) {
        errorHandling(error, res)
    }
}

exports.updateOneCategory = async (req, res) => {
    const { params: { id } } = req
    try {
        // Checking id to valid.
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: "Url or Id is wrong!" }
            })
        }

        // Checking category to exists.
        const category = await Category.findById(id).populate('meals', 'name')
        if (!category) {
            return res.status(404).send({
                success: false,
                data: null,
                error: { message: "Category is not found!" }
            })
        }

        // Result validation.
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errorMessage = errors.array().map(error => error.msg)
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: errorMessage }
            })
        }
        const data = matchedData(req)

        // Checking for changes.
        if (category.name == data.name) {
            // Responsning.
            return res.status(200).send({
                success: true,
                error: false,
                data: {
                    message: "Category has been getted successful."
                }
            })
        }

        // Writing updates to database.
        const updateCategory = await Category.findByIdAndUpdate(id, {
            ...category,
            name: data.name
        })

        // Responsing.
        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: "Category has been updated successful."
            }
        })
    } catch (error) {
        // Error handling.
        errorHandling(error, res)
    }
}

exports.deleteOneCategory = async (req, res) => {
    const { params: { id } } = req
    try {
        // Checking id to valid.
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: "Url or Id is wrong!" }
            })
        }

        // Checking category to exists.
        const category = await Category.findById(id)
        if (!category) {
            return res.status(404).send({
                success: false,
                data: null,
                error: { message: "Category is not found!" }
            })
        }

        // Deleting category from database.
        await Category.findByIdAndDelete(id)

        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: "Category has been deleted successful."
            }
        })
    } catch (error) {
        errorHandling(error, res)
    }
}