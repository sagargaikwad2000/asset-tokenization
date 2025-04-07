const { json } = require("express");
const interact = require("../interact");


function convertBigIntsToNumbers(data) {
    if (typeof data === 'bigint') {
        return Number(data);
    }

    if (Array.isArray(data)) {
        return data.map(convertBigIntsToNumbers);
    }

    if (data !== null && typeof data === 'object') {
        const converted = {};
        for (const key in data) {
            if (!isNaN(Number(key))) continue;
            converted[key] = convertBigIntsToNumbers(data[key]);
        }
        return converted;
    }

    return data;
}


class RecordController {
    async create(req, res) {
        const { args } = req.body;
        if (!Array.isArray(args)) {
            return res.status(400).json({ error: 'args must be an array' });
        }
        const result = await interact.invoke("buy", args)
        res.send(result);
    }


    async getRecord(req, res) {
        const account = req.params.id;
        const result = await interact.query("getRecord", [account]);

        const serialized = convertBigIntsToNumbers(result);

        res.json(serialized);
    }


    async getHistory(req, res) {
        try {
            const account = req.params.id;
            const result = await interact.query("getHistory", [account]);
            const plain = Array.from(result);
            const serialized = convertBigIntsToNumbers(plain);
            res.json(serialized);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
}

module.exports = new RecordController();