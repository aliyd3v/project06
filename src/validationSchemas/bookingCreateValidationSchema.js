exports.bookingCreateValidationSchema = {
    customer_name: {
        notEmpty: {
            errorMessage: 'Customer name is required!',
        },
        isString: {
            errorMessage: "Customer name cannot be empty!"
        },
        isLength: {
            options: { max: 100 },
            errorMessage: 'Customer name cannot exceed 100 characters!',
        },
        escape: true
    },
    email: {
        notEmpty: {
            errorMessage: 'Email is required!',
        },
        isEmail: {
            errorMessage: 'Email is not valid!',
        },
        normalizeEmail: true,
        escape: true
    },
    phone: {
        notEmpty: {
            errorMessage: 'Phone number is required!',
        },
        matches: {
            options: [/^(\+998|998|0)?[3-9]\d{8}$/],
            errorMessage: 'Phone number is not valid!',
        },
        escape: true
    },
    stol_number: {
        notEmpty: {
            errorMessage: "Stol number cannot be empty!"
        },
        isInt: {
            errorMessage: "Stol number must be a number!"
        },
        escape: true
    },
    date: {
        notEmpty: {
            errorMessage: "Date cannot be empty!"
        },
        matches: {
            options: [/^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/],
            errorMessage: 'Date format is wrong!. True format: dd-MM-yyyy',
        },
        escape: true
    },
    time: {
        notEmpty: {
            errorMessage: "Time cannot be empty!"
        },
        matches: {
            options: [/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/], // Format: HH:mm
            errorMessage: 'Time format is wrong!. True format: HH:mm',
        },
        escape: true
    },
    billed_time: {
        notEmpty: {
            errorMessage: "Billed time cannot be empty!"
        },
        matches: {
            options: [/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/], // Format: HH:mm
            errorMessage: 'Time format is wrong!. True format: HH:mm',
        },
        escape: true
    }
}