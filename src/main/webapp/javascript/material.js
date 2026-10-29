const BASE_URL = API_CONFIG.BASE_URL;

// =========================
// Load Materials on Page Load
// =========================
window.onload = function () {
    loadMaterials();
};

// =========================
// Add Material
// =========================
function saveMaterial() {

    let material = {
        materialName: document.getElementById("material_name").value,
        materialType: document.getElementById("material_type").value,
        quantity: parseInt(document.getElementById("quantity").value),
        unit: document.getElementById("unit").value,
        unitPrice: parseFloat(document.getElementById("unit_price").value),
        supplierName: document.getElementById("supplier_name").value,
        minimumStock: parseInt(document.getElementById("minimum_stock").value)
    };

    fetch(BASE_URL + "/addMaterial", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(material)
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        document.getElementById("materialForm").reset();
        loadMaterials();
    })
    .catch(err => console.log(err));
}

// =========================
// View All Materials
// =========================
function loadMaterials() {

    fetch(BASE_URL + "/viewallMaterial")
    .then(res => res.json())
    .then(data => {

        let rows = "";

        data.forEach(material => {

            rows += `
            <tr>
                <td>${material.material_id}</td>
                <td>${material.materialName}</td>
                <td>${material.materialType}</td>
                <td>${material.quantity}</td>
                <td>${material.unit}</td>
                <td>${material.unitPrice}</td>
                <td>${material.supplierName}</td>
                <td>${material.minimumStock}</td>

                <td>

                    <button class="btn btn-warning btn-sm"
                    onclick="editMaterial(
                    ${material.material_id},
                    '${material.materialName}',
                    '${material.materialType}',
                    ${material.quantity},
                    '${material.unit}',
                    ${material.unitPrice},
                    '${material.supplierName}',
                    ${material.minimumStock}
                    )">
                    Edit
                    </button>

                    <button class="btn btn-danger btn-sm"
                    onclick="deleteMaterial(${material.material_id})">
                    Delete
                    </button>

                    <button class="btn btn-success btn-sm"
                    onclick="consumeMaterial(${material.material_id})">
                    Consume
                    </button>

                    <button class="btn btn-info btn-sm"
                    onclick="checkStock(${material.material_id})">
                    Stock
                    </button>

                </td>

            </tr>
            `;

        });

        document.getElementById("materialTable").innerHTML = rows;

    })
    .catch(err => console.log(err));

}

// =========================
// Edit Material
// =========================
function editMaterial(id, name, type, qty, unit, price, supplier, minStock) {

    document.getElementById("material_id").value = id;
    document.getElementById("material_name").value = name;
    document.getElementById("material_type").value = type;
    document.getElementById("quantity").value = qty;
    document.getElementById("unit").value = unit;
    document.getElementById("unit_price").value = price;
    document.getElementById("supplier_name").value = supplier;
    document.getElementById("minimum_stock").value = minStock;

}

// =========================
// Update Material
// =========================
function updateMaterial() {

    let material = {

        material_id: parseInt(document.getElementById("material_id").value),
        materialName: document.getElementById("material_name").value,
        materialType: document.getElementById("material_type").value,
        quantity: parseInt(document.getElementById("quantity").value),
        unit: document.getElementById("unit").value,
        unitPrice: parseFloat(document.getElementById("unit_price").value),
        supplierName: document.getElementById("supplier_name").value,
        minimumStock: parseInt(document.getElementById("minimum_stock").value)

    };

    fetch(BASE_URL + "/updmaterial", {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(material)

    })
    .then(res => res.text())
    .then(msg => {

        alert(msg);

        document.getElementById("materialForm").reset();

        loadMaterials();

    })
    .catch(err => console.log(err));

}

// =========================
// Delete Material
// =========================
function deleteMaterial(id) {

    if (!confirm("Delete Material?"))
        return;

    fetch(BASE_URL + "/delMaterial/" + id, {

        method: "DELETE"

    })
    .then(res => res.text())
    .then(msg => {

        alert(msg);

        loadMaterials();

    })
    .catch(err => console.log(err));

}

// =========================
// Consume Material
// =========================
function consumeMaterial(id) {

    let qty = prompt("Enter Consumed Quantity");

    if (qty == null || qty == "")
        return;

    fetch(BASE_URL + "/material/consume/" + id + "?quantity=" + qty, {

        method: "PUT"

    })
    .then(res => res.text())
    .then(msg => {

        alert(msg);

        loadMaterials();

    })
    .catch(err => console.log(err));

}

// =========================
// Check Stock
// =========================
function checkStock(id) {

    fetch(BASE_URL + "/material/checkStock/" + id)

    .then(res => res.text())

    .then(msg => {

        alert(msg);

    })
    .catch(err => console.log(err));

}