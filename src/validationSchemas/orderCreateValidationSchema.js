exports.orderCreateValidationSchema = {
    email: {
        notEmpty: {
            errorMessage: 'Email is required!',
        },
        isEmail: {
            errorMessage: 'Email is not valid!',
        },
        normalizeEmail: true,
    },
    phone: {
        notEmpty: {
            errorMessage: 'Phone number is required!',
        },
        matches: {
            options: [/^(\+998|998|0)?[3-9]\d{8}$/],
            errorMessage: 'Phone number is not valid!',
        },
    },
    meals: {
        notEmpty: {
            errorMessage: 'Meals is required!',
        },
        isArray: {
            errorMessage: 'Meals must be an array of objects!',
        },
        custom: {
            options: (meals) => {
                if (!meals.every(meal =>
                    typeof meal === 'object' &&
                    typeof meal.mealId === 'string' &&
                    typeof meal.amount === 'number' &&
                    meal.amount > 0
                )) {
                    throw new Error('Each meal must have a valid mealId (string) and amount (positive number)!');
                }
                return true;
            },
        },
    }
}