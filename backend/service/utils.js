class Utils {
    convertBigIntsToNumbers(data) {
        if (typeof data === 'bigint') {
            return Number(data);
        }

        if (Array.isArray(data)) {
            return data.map(new Utils().convertBigIntsToNumbers);
        }

        if (data !== null && typeof data === 'object') {
            const converted = {};
            for (const key in data) {
                if (!isNaN(Number(key))) continue;
                converted[key] = this.convertBigIntsToNumbers(data[key]);
            }
            return converted;
        }

        return data;
    }
}

module.exports = new Utils();