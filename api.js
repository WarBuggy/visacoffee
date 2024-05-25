let fs = require('fs-extra');

module.exports = function (app) {
    app.post('/save', async function (request, response) {
        let savedOrders = await getSavedOrders();
        if (savedOrders == null) {
            response.status(550);
            response.json({ success: false, });
            return;
        }
        console.log(savedOrders);
        let classmateName = request.body.name;
        let coffee = request.body.coffee;
        response.json({
            success: true,
            result: 0,
            name: classmateName,
            coffee: coffee,
        });
    });

    async function getSavedOrders() {
        try {
            const savedOrders = await fs.readJson('./orders.json')
            console.log(savedOrders);
            return savedOrders;
        } catch (err) {
            console.error(err);
            return null;
        }
    };
};