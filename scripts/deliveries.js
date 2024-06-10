const orders = [
    {
        "order_id": "2406069U1PVRCM",
        "address": {
            "street": "790-872 Roxas, Sampaloc, Maynila, 1008 Kalakhang Maynila",
            "city_province": "Manila, Metro Manila"
        },
        "coordinates": {
            "latitude": 14.609489,
            "longitude": 121.009139
        }
    },
    {
        "order_id": "2406069SNCT2Q6",
        "address": {
            "street": "898-994 Bohol, Sampaloc, Maynila, 1008 Kalakhang Maynila",
            "city_province": "Manila, Metro Manila"
        },
        "coordinates": {
            "latitude": 14.60968045029885,
            "longitude": 121.00722152922441
        }
    },
    {
        "order_id": "240528H1NP8TQS",
        "address": {
            "street": "Unang Hakbang, Lungsod Quezon, Kalakhang Maynila",
            "city_province": "Quezon City, Metro Manila"
        },
        "coordinates": {
            "latitude": 14.609970,
            "longitude": 121.011379
        }
    }
];

class Deliveries {
    constructor(container) {
        this.container = container;
    }

    display() {
        this.container.innerHTML = "";

        const deliveryContainer = document.createElement("div");
        let innerHTML = "";

        for (const delivery of this.getDeliveries()) {
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
    }

    getDefaultDeliveries() {
        const order_ids = ["2406069U1PVRCM", "2406069SNCT2Q6"];
        const res = [];

        for (const order of orders) {
            if (order_ids.includes(order["order_id"])) {
                res.push(order);
            }
        }

        return res;
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

        for (const order of orders) {
            if (order["order_id"] === orderID) {
                deliveries.push(order);
                break;
            }
        }

        localStorage.setItem("deliveries", JSON.stringify(deliveries));
        this.display();
    }
}
