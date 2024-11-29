exports.categoryCreateValidationSchema = {
    en_name: {
        notEmpty: {
            errorMessage: "Category name cannot be empty!"
        },
        isString: {
            errorMessage: "Category name must be string!"
        },
        escape: true
    },
    ru_name: {
        notEmpty: {
            errorMessage: "Category name cannot be empty!"
        },
        isString: {
            errorMessage: "Category name must be string!"
        },
        escape: true
    }
}