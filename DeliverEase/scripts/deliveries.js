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
                <div>
                    <span>ORDER ID: ${delivery["order_id"]}</span>
                    <br />
                    <span>${delivery["address"]["street"]}</span>
                    <br />
                    <span>${delivery["address"]["city_province"]}</span>
                </div>
                <hr style="margin: 10px 0;" />
            `;
        }

        deliveryContainer.innerHTML = innerHTML;
        this.container.appendChild(deliveryContainer);
        displayDeliveryPins(deliveriesData);
    }

    getDefaultDeliveries() {
        return {
            "2406069U1PVRCM": orders["2406069U1PVRCM"],
            "240528H1NP8TQS": orders["240528H1NP8TQS"],
            "24052340GFPN7G": orders["24052340GFPN7G"],
        };
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

    reset() {
        localStorage.removeItem("deliveries");
        this.display();
    }
}