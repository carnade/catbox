const express = require('express');
const router = express.Router();
const fs = require('fs');

var map = new Map();

fs.readFile('/data/catbox_data.json', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(data)
    map = JSON.parse(data, reviver);
})


router.post('/:id', async (req, res, next) => {
    let new_obj = {};
    let obj = map.get(req.params.id);
    let count = 1;
    let done = false;
    if (obj) {
        count = obj.count + 1;
    }
    new_obj.name = req.params.id;
    new_obj.count = count;
    new_obj.date = Date.now();
    if (!obj || (Date.now() - obj.date) / 86400000 > 1) { //Error if not updated??
        map.set(req.params.id, new_obj);
        done = true;
    }
    fs.writeFile("/data/catbox_data.json", JSON.stringify(map, replacer), function (err) {
        if (err) {
            return console.log(err);
        }
    });

    res.json(new_obj);
});

router.get('/', (req, res) => {
    let resp = [];
    for (const [key, value] of map.entries()) {
        let temp = {};
        diff = Date.now() - value.date;
        temp = JSON.parse(JSON.stringify(value));
        temp.date = dhm(diff);
        temp.count = "  " + temp.count + "  ";
        resp.push(temp);
    }

    res.json(resp);
})

function dhm(t) {
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor((t - d * cd) / ch),
        m = Math.round((t - d * cd - h * ch) / 60000),
        pad = function (n) {
            return n < 10 ? '0' + n : n;
        };
    if (m === 60) {
        h++;
        m = 0;
    }
    if (h === 24) {
        d++;
        h = 0;
    }
    return d + "d " + h + "h " + m + " m";
}

function replacer(key, value) {
    const originalObject = this[key];
    if (originalObject instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(originalObject.entries()), // or with spread: value: [...originalObject]
        };
    } else {
        return value;
    }
}

function reviver(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}

module.exports = router;