class Deliveries {
    constructor(container) {
        this.container = container;
    }

    display() {
        this.container.innerHTML = "";

        const deliveriesData = Object.values(this.getDeliveries());
        const deliveryContainer = document.createElement("div");
        let innerHTML = "";

        for (const delivery of deliveriesData) {
            innerHTML += `
                <div style="margin-bottom: 10px;">
                    <div style="display: inline-block; width: 70%;">
                        <span>ORDER ID: ${delivery["order_id"]}</span>
                        <br />
                        <span>${delivery["address"]["street"]}</span>
                        <br />
                        <span>${delivery["address"]["city_province"]}</span>
                    </div>
                    <div style="display: inline-block; width: 25%; text-align: right;">
                        <button onclick="deliveries.markDone('${delivery["order_id"]}')">DONE</button>
                        <button onclick="deliveries.deleteDelivery('${delivery["order_id"]}')">DELETE</button>
                    </div>
                </div>
                <hr style="margin: 10px 0;" />
            `;
        }

        deliveryContainer.innerHTML = innerHTML;
        this.container.appendChild(deliveryContainer);
        displayDeliveryPins(deliveriesData);
    }

    getDefaultDeliveries() {
        return {};
    }

    getDeliveries() {
        return JSON.parse(localStorage.getItem("deliveries"))
            || this.getDefaultDeliveries();
    }

    addDelivery() {
        const input = document.querySelector(".floating-panel input");
        const orderID = input.value;
        const deliveries = this.getDeliveries();

        input.value = "";

        if (orders[orderID] !== undefined) {
            deliveries[orderID] = orders[orderID];
        }

        localStorage.setItem("deliveries", JSON.stringify(deliveries));
        this.display();
    }

    markDone(orderID) {
        console.log(`Marking order ${orderID} as done`);
        let deliveries = this.getDeliveries();

        if (deliveries[orderID]) {
            const coordinates = deliveries[orderID].coordinates;
            source = {
                lat: coordinates.latitude,
                lng: coordinates.longitude
            };

            delete deliveries[orderID];
            localStorage.setItem("deliveries", JSON.stringify(deliveries));
            this.display();
            displayRoute(source, true);
        } else {
            console.error(`Order ID ${orderID} not found`);
        }
    }

    deleteDelivery(orderID) {
        const deliveries = this.getDeliveries();
        delete deliveries[orderID];
        localStorage.setItem("deliveries", JSON.stringify(deliveries));
        this.display();
        displayRoute(source, true);
    }

    reset() {
        localStorage.removeItem("deliveries");
        this.display();
        clearPolylines();
    }
}
