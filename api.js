let fs = require('fs-extra');

module.exports = function (app) {
    app.post('/save', async function (request, response) {
        let savedOrders = await getSavedOrdersFromJson();
        if (savedOrders == null) {
            response.status(550);
            response.json({ success: false, });
            console.log('save: Error 550.');
            return;
        }
        let classmateName = request.body.name;
        if (savedOrders[classmateName] == null) {
            response.status(551);
            response.json({ success: false, });
            console.log('save: Error 551.');
            return;
        };
        let coffee = request.body.coffee;
        savedOrders[classmateName].Coffee = coffee;
        try {
            await fs.writeJson('./orders.json', { "Orders": savedOrders });
            response.json({
                success: true,
                result: 0,
                name: classmateName,
                coffee: coffee,
            });
            console.log(`save: ${classmateName}, ${coffee}.`);
        } catch (err) {
            console.error(err);
            response.status(552);
            response.json({ success: false, });
            console.log('save: Error 552.');
        }
    });

    async function getSavedOrdersFromJson() {
        try {
            const data = await fs.readJson('./orders.json');
            return data.Orders;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    app.post('/getOrder', async function (request, response) {
        let savedOrders = await getSavedOrdersFromJson();
        if (savedOrders == null) {
            response.status(550);
            response.json({ success: false, });
            console.log('save: Error 550.');
            return;
        }
        let classmateName = request.body.name;
        if (savedOrders[classmateName] == null) {
            response.status(551);
            response.json({ success: false, });
            console.log('save: Error 551.');
            return;
        };
        let coffee = savedOrders[classmateName].Coffee || '';
        response.json({
            success: true,
            result: 0,
            name: classmateName,
            coffee: coffee,
        });
        let debugCoffee = coffee;
        if (debugCoffee == '') {
            debugCoffee = 'Not yet ordered'
        }
        console.log(`getOrder: ${classmateName}, ${debugCoffee}.`);
    });
};