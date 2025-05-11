const missingFields = (requiredFields) => {
         return Object.entries(requiredFields)
            .filter(([_, value]) => !value)
            .map(([key]) => key);
};

module.exports = missingFields