class Deliveries {
    constructor(container) {
        this.container = container;
        this.defaultLocation = this.getDefaultLocationFromStorage(); // Initialize defaultLocation from storage
    }

    display() {
        this.container.innerHTML = "";

        const deliveriesData = Object.values(this.getDeliveries());
        const deliveryContainer = document.createElement("div");
        let innerHTML = "";

        for (const delivery of deliveriesData) {
            innerHTML += `
                <div class="delivery-item">
                    <div class="delivery-details">
                        <span>ORDER ID: ${delivery["order_id"]}</span>
                        <br />
                        <span>${delivery["address"]["street"]}</span>
                        <br />
                        <span>${delivery["address"]["city_province"]}</span>
                    </div>
                    <div class="delivery-actions">
                        <button class="delivery-button done" onclick="deliveries.markDone('${delivery["order_id"]}')">
                            <i class="fa-solid fa-circle-check"></i>
                        </button>
                        <button class="delivery-button delete" onclick="deliveries.deleteDelivery('${delivery["order_id"]}')">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
                <hr class="delivery-separator" />
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
        return JSON.parse(localStorage.getItem("deliveries")) || this.getDefaultDeliveries();
    }

    getDefaultLocationFromStorage() {
        return JSON.parse(localStorage.getItem("defaultLocation"));
    }

    saveDefaultLocationToStorage(location) {
        localStorage.setItem("defaultLocation", JSON.stringify(location));
    }

    removeDefaultLocationFromStorage() {
        localStorage.removeItem("defaultLocation");
    }

    // Adds a new delivery to the list
    addDelivery() {
        const input = document.querySelector(".floating-panel input");
        const orderID = input.value.trim(); // Trim to remove any leading/trailing whitespace

        // Check if input is empty
        if (!orderID) {
            alert('Please enter a delivery code.');
            return;
        }

        const deliveries = this.getDeliveries();

        input.value = "";

        // Check if orderID exists in deliveries
        if (deliveries[orderID]) {
            alert('You have already entered this delivery code.');
            return;
        }

        // Check if orderID exists in orders
        if (!orders[orderID]) {
            alert('The delivery code entered does not exist or is incorrect.');
            return;
        }

        // Add delivery to deliveries if it exists in orders
        deliveries[orderID] = orders[orderID];

        localStorage.setItem("deliveries", JSON.stringify(deliveries));
        this.display();
    }

    // Marks a delivery as done and updates display
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

    // Deletes a delivery and updates display
    deleteDelivery(orderID) {
        const deliveries = this.getDeliveries();
        delete deliveries[orderID];
        localStorage.setItem("deliveries", JSON.stringify(deliveries));
        this.display();
        displayRoute(source, true);
    }

    // Resets all deliveries and default location
    reset() {
        localStorage.removeItem("deliveries");
        this.defaultLocation = null; 
        this.removeDefaultLocationFromStorage();
        this.display();
        clearPolylines();
        clearMarkers();
    }

    // Sets the default starting location for route optimization
    setDefaultLocation(location) {
        this.defaultLocation = location;
        this.saveDefaultLocationToStorage(location);
    }

    // Optimizes the route based on the default starting location
    optimize() {
        if (!this.defaultLocation) {
            alert('Please select a starting point and add delivery codes before optimizing the route.');
            return;
        }
    }
}

// Callback function when a starting point is selected on the map
function onStartingPointSelected(lat, lng) {
    deliveries.setDefaultLocation({ lat, lng });
}
