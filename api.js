let fs = require('fs-extra');

module.exports = function (app) {
    app.post('/save', async function (request, response) {
        let savedOrders = await getSavedOrders();
        if (savedOrders == null) {
            response.status(550);
            response.json({ success: false, });
            return;
        }
        let classmateName = request.body.name;
        if (savedOrders[classmateName] == null) {
            response.status(551);
            response.json({ success: false, });
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
        } catch (err) {
            console.error(err);
            response.status(552);
            response.json({ success: false, });
        }
    });

    async function getSavedOrders() {
        try {
            const data = await fs.readJson('./orders.json');
            return data.Orders;
        } catch (err) {
            console.error(err);
            return null;
        }
    };
};