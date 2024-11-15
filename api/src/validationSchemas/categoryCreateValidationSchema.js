exports.categoryCreateValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: "Category name cannot be empty!"
        },
        isString: {
            errorMessage: "Category name must be string!"
        },
        escape: true
    }
}