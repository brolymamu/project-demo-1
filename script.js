
/* =========================================================
   LOAN PORTAL FRONTEND DEMO
========================================================= */


/* ================= USERS ================= */

let users = [

    {
        id: "AG1001",
        password: "agent123",
        name: "Saif Malik",
        role: "agent",
        team: "TEAM01",
        branch: "Bangalore"
    },

    {
        id: "AG1002",
        password: "agent456",
        name: "Rahul Kumar",
        role: "agent",
        team: "TEAM01",
        branch: "Bangalore"
    },

    {
        id: "AG1003",
        password: "agent789",
        name: "Ajay Singh",
        role: "agent",
        team: "TEAM01",
        branch: "Bangalore"
    },

    {
        id: "TL1001",
        password: "tl123",
        name: "Arun Kumar",
        role: "tl",
        team: "TEAM01",
        branch: "Bangalore"
    },

    {
        id: "MGR1001",
        password: "manager123",
        name: "Vijay Sharma",
        role: "manager",
        branch: "Bangalore"
    },

    {
        id: "BACKEND1001",
        password: "backend123",
        name: "Backend Administrator",
        role: "backend",
        branch: "Bangalore"
    }

];


/* ================= SAMPLE CUSTOMERS ================= */

let customers = [

    {
        id: 1,
        name: "Rahul Kumar",
        age: 31,
        phone: "9876543210",
        address: "Bangalore, Karnataka",
        location: "KA",

        loanAmount: 500000,

        btAmount: 320000,
        btBank: "HDFC Bank",
        inHandAmount: 180000,

        salary: 32000,

        companyName: "VRL Logistics Limited",
        companyBank: "Axis Bank",

        cibil: 742,

        enquiries: 3,

        creditCards: "HDFC, ICICI",

        delays: "No",

        outstanding: 320000,

        iciciEmi: 2000,
        hdfcEmi: 10000,
        otherEmi: 0,

        banksApplied: "HDFC, ICICI",

        status: "Eligible",

        remarks: "Customer interested in balance transfer.",

        agentId: "AG1001"
    },


    {
        id: 2,
        name: "Ajay Kumar",
        age: 29,
        phone: "9876501234",
        address: "Electronic City, Bangalore",
        location: "KA",

        loanAmount: 400000,

        btAmount: 200000,
        btBank: "ICICI Bank",
        inHandAmount: 200000,

        salary: 28000,

        companyName: "ABC Technologies",
        companyBank: "HDFC Bank",

        cibil: 710,

        enquiries: 4,

        creditCards: "SBI",

        delays: "1",

        outstanding: 200000,

        iciciEmi: 4500,
        hdfcEmi: 0,
        otherEmi: 3000,

        banksApplied: "SBI, ICICI",

        status: "Review",

        remarks: "Customer requested callback.",

        agentId: "AG1001"
    },


    {
        id: 3,
        name: "Ravi Sharma",
        age: 35,
        phone: "9988776655",
        address: "Yelahanka, Bangalore",
        location: "KA",

        loanAmount: 700000,

        btAmount: 450000,
        btBank: "Axis Bank",
        inHandAmount: 250000,

        salary: 45000,

        companyName: "Infosys Limited",
        companyBank: "ICICI Bank",

        cibil: 781,

        enquiries: 2,

        creditCards: "HDFC",

        delays: "No",

        outstanding: 450000,

        iciciEmi: 5000,
        hdfcEmi: 12000,
        otherEmi: 0,

        banksApplied: "Axis",

        status: "Pending",

        remarks: "Documents awaited.",

        agentId: "AG1002"
    },


    {
        id: 4,
        name: "Suresh Babu",
        age: 38,
        phone: "9911223344",
        address: "Whitefield, Bangalore",
        location: "KA",

        loanAmount: 600000,

        btAmount: 250000,
        btBank: "SBI",
        inHandAmount: 350000,

        salary: 52000,

        companyName: "TCS",
        companyBank: "HDFC Bank",

        cibil: 765,

        enquiries: 1,

        creditCards: "ICICI, SBI",

        delays: "No",

        outstanding: 250000,

        iciciEmi: 3000,
        hdfcEmi: 8000,
        otherEmi: 0,

        banksApplied: "HDFC",

        status: "Completed",

        remarks: "Application completed.",

        agentId: "AG1002"
    },


    {
        id: 5,
        name: "Manoj Reddy",
        age: 27,
        phone: "9001122334",
        address: "HSR Layout, Bangalore",
        location: "KA",

        loanAmount: 300000,

        btAmount: 100000,
        btBank: "Kotak Bank",
        inHandAmount: 200000,

        salary: 26000,

        companyName: "XYZ Pvt Ltd",
        companyBank: "SBI",

        cibil: 698,

        enquiries: 5,

        creditCards: "None",

        delays: "2",

        outstanding: 100000,

        iciciEmi: 0,
        hdfcEmi: 5000,
        otherEmi: 2500,

        banksApplied: "Kotak, SBI",

        status: "Pending",

        remarks: "Needs further verification.",

        agentId: "AG1003"
    }

];


/* ================= CURRENT USER ================= */

let currentUser = null;
let selectedCustomerIds = new Set();
let selectedAssignmentCustomerIds = new Set();


/* ================= INITIALIZATION ================= */

document.addEventListener("DOMContentLoaded", () => {

    const savedUser = localStorage.getItem("loanPortalUser");

    if (savedUser) {

        const user = users.find(
            u => u.id === savedUser
        );

        if (user) {

            currentUser = user;

            showApplication();

        }

    }

});

// Keep an already-open TL portal synchronized with uploads from other tabs.
window.addEventListener("storage", event => {
    if (event.key !== "loanPortalCustomers" || !currentUser) return;

    loadCustomerData();

    const visibleSection = document.querySelector(".section:not(.hidden)");
    if (visibleSection?.id === "customersSection") renderCustomers();
    if (visibleSection?.id === "assignmentsSection") renderAssignments();
    if (visibleSection?.id === "dashboardSection") updateDashboard();
});


/* ================= LOGIN ================= */

function login() {

    const id =
        document
            .getElementById("loginId")
            .value
            .trim();

    const password =
        document
            .getElementById("password")
            .value;

    const user = users.find(
        u =>
            u.id === id &&
            u.password === password
    );


    if (!user) {

        document.getElementById("loginError")
            .textContent =
            "Invalid Login ID or Password.";

        return;

    }


    currentUser = user;

    localStorage.setItem(
        "loanPortalUser",
        user.id
    );

    document.getElementById("loginError")
        .textContent = "";

    showApplication();

}


/* ================= SHOW APPLICATION ================= */

function showApplication() {

    // Reload shared customer data so TLs see uploads made by backend or managers.
    loadCustomerData();

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("app")
        .classList.remove("hidden");


    document
        .getElementById("sidebarUserName")
        .textContent =
        currentUser.name;


    document
        .getElementById("sidebarUserRole")
        .textContent =
        currentUser.role.toUpperCase();


    const firstLetter =
        currentUser.name
            .charAt(0)
            .toUpperCase();


    document
        .getElementById("userAvatar")
        .textContent = firstLetter;

    document
        .getElementById("topAvatar")
        .textContent = firstLetter;


    configurePermissions();

    showSection("dashboard");

}


/* ================= PERMISSIONS ================= */

function configurePermissions() {

    const assignmentNav =
        document.getElementById("assignmentNav");

    const performanceNav =
        document.getElementById("performanceNav");

    const addButton =
        document.getElementById("addCustomerButton");

    const uploadButton =
        document.getElementById("uploadCustomersButton");

    const agentsNav =
        document.getElementById("agentsNav");

    const bulkRemoveButton =
        document.getElementById("bulkRemoveCustomersButton");

    const customerSelectHeader =
        document.getElementById("customerSelectHeader");

    const memberRoleSelect = document.getElementById("newAgentRole");
    Array.from(memberRoleSelect.options).forEach(option => {
        option.hidden = currentUser.role === "manager" && option.value !== "agent";
    });
    memberRoleSelect.value = "agent";

    uploadButton.classList.add("hidden");
    agentsNav.classList.add("hidden");
    bulkRemoveButton.classList.add("hidden");
    customerSelectHeader.classList.add("hidden");


    if (currentUser.role === "agent") {

        assignmentNav.classList.add("hidden");

        performanceNav.classList.add("hidden");

        addButton.classList.remove("hidden");

        document
            .getElementById("customerDescription")
            .textContent =
            "Customers assigned to you";

    }


    if (currentUser.role === "tl") {

        assignmentNav.classList.remove("hidden");

        performanceNav.classList.remove("hidden");

        addButton.classList.remove("hidden");
        uploadButton.classList.remove("hidden");

        document
            .getElementById("customerDescription")
            .textContent =
            "Customers assigned to your team";

    }


    if (currentUser.role === "manager" || currentUser.role === "backend") {

        assignmentNav.classList.remove("hidden");

        performanceNav.classList.remove("hidden");

        addButton.classList.add("hidden");
        uploadButton.classList.remove("hidden");
        agentsNav.classList.remove("hidden");

        document
            .getElementById("customerDescription")
            .textContent =
            "All customers in your branch";

    }

    if (["tl", "manager", "backend"].includes(currentUser.role)) {
        bulkRemoveButton.classList.remove("hidden");
        customerSelectHeader.classList.remove("hidden");
    }

}


/* ================= GET ACCESSIBLE CUSTOMERS ================= */

function getVisibleCustomers() {

    // Always use the latest shared data, including uploads from another portal tab.
    loadCustomerData();

    if (currentUser.role === "agent") {

        return customers.filter(
            c =>
                c.agentId === currentUser.id
        );

    }


    if (currentUser.role === "tl") {

        return customers;

    }


    if (currentUser.role === "manager" || currentUser.role === "backend") {

        return customers;

    }


    return [];

}


/* ================= NAVIGATION ================= */

function showSection(section) {

    document
        .getElementById("dashboardSection")
        .classList.add("hidden");

    document
        .getElementById("customersSection")
        .classList.add("hidden");

    document
        .getElementById("assignmentsSection")
        .classList.add("hidden");

    document
        .getElementById("performanceSection")
        .classList.add("hidden");

    document
        .getElementById("agentsSection")
        .classList.add("hidden");


    document
        .querySelectorAll(".nav-item")
        .forEach(
            item =>
                item.classList.remove("active")
        );


    if (section === "dashboard") {

        document
            .getElementById("dashboardSection")
            .classList.remove("hidden");

        document.getElementById("pageTitle")
            .textContent = "Dashboard";

        document.getElementById("pageSubtitle")
            .textContent =
            `Welcome back, ${currentUser.name}`;

        updateDashboard();

    }


    if (section === "customers") {

        document
            .getElementById("customersSection")
            .classList.remove("hidden");

        document.getElementById("pageTitle")
            .textContent = "Customers";

        document.getElementById("pageSubtitle")
            .textContent =
            "Customer loan applications";

        renderCustomers();

    }


    if (section === "assignments") {

        if (
            currentUser.role !== "tl" &&
            currentUser.role !== "manager" &&
            currentUser.role !== "backend"
        ) return;


        document
            .getElementById("assignmentsSection")
            .classList.remove("hidden");

        document.getElementById("pageTitle")
            .textContent = "Assignments";

        document.getElementById("pageSubtitle")
            .textContent =
            "Manage customer assignments";

        renderAssignments();

    }


    if (section === "performance") {

        if (
            currentUser.role !== "tl" &&
            currentUser.role !== "manager" &&
            currentUser.role !== "backend"
        ) return;


        document
            .getElementById("performanceSection")
            .classList.remove("hidden");

        document.getElementById("pageTitle")
            .textContent = "Team Performance";

        document.getElementById("pageSubtitle")
            .textContent =
            "Application performance overview";

        renderPerformance();

    }

    if (section === "agents") {

        if (currentUser.role !== "manager" && currentUser.role !== "backend") return;

        document
            .getElementById("agentsSection")
            .classList.remove("hidden");

        document.getElementById("pageTitle")
            .textContent = "Manage Team Members";

        document.getElementById("pageSubtitle")
            .textContent = "Add users and manage agent accounts";

        renderAgents();

    }

}


/* ================= DASHBOARD ================= */

function updateDashboard() {

    const data =
        getVisibleCustomers();


    const total =
        data.length;


    const pending =
        data.filter(
            c => c.status === "Pending"
        ).length;


    const eligible =
        data.filter(
            c => c.status === "Eligible"
        ).length;


    const completed =
        data.filter(
            c => c.status === "Completed"
        ).length;


    const loanTotal =
        data.reduce(
            (sum, c) =>
                sum + Number(c.loanAmount || 0),
            0
        );


    document
        .getElementById("totalCustomers")
        .textContent = total;


    document
        .getElementById("pendingCustomers")
        .textContent = pending;


    document
        .getElementById("eligibleCustomers")
        .textContent = eligible;


    document
        .getElementById("totalLoan")
        .textContent =
        formatMoney(loanTotal);


    document
        .getElementById("statusPending")
        .textContent = pending;


    document
        .getElementById("statusEligible")
        .textContent = eligible;


    document
        .getElementById("statusCompleted")
        .textContent = completed;


    const percentage =
        total === 0
            ? 0
            : (pending / total) * 100;


    document
        .getElementById("pendingBar")
        .style.width =
        percentage + "%";


    document
        .getElementById("eligibleBar")
        .style.width =
        (
            total === 0
                ? 0
                : (eligible / total) * 100
        ) + "%";


    document
        .getElementById("completedBar")
        .style.width =
        (
            total === 0
                ? 0
                : (completed / total) * 100
        ) + "%";


    renderRecentCustomers(data);

}


/* ================= RECENT CUSTOMERS ================= */

function renderRecentCustomers(data) {

    const container =
        document.getElementById(
            "recentCustomers"
        );


    if (data.length === 0) {

        container.innerHTML =
            "<p>No customers found.</p>";

        return;

    }


    container.innerHTML =
        data
            .slice(0, 5)
            .map(
                c => `

                <div class="customer-mini">

                    <div class="customer-mini-info">

                        <div class="customer-avatar">
                            ${getInitials(c.name)}
                        </div>

                        <div>

                            <strong>
                                ${escapeHTML(c.name)}
                            </strong>

                            <small>
                                ${formatMoney(c.loanAmount)}
                            </small>

                        </div>

                    </div>

                    <span class="status ${c.status.toLowerCase()}">
                        ${c.status}
                    </span>

                </div>

            `
            )
            .join("");

}


/* ================= CUSTOMER FILTERS ================= */

function filterCustomers(data, prefix) {
    const value = suffix =>
        document.getElementById(`${prefix}Filter${suffix}`).value.trim().toLowerCase();

    const name = value("Name");
    const phone = value("Phone");
    const cibil = value("Cibil");
    const loan = value("Loan");
    const place = value("Place");
    const locationElement = document.getElementById(`${prefix}FilterLocation`);
    const location = locationElement ? locationElement.value.trim().toLowerCase() : "";

    return data.filter(customer =>
        String(customer.name || "").toLowerCase().includes(name) &&
        String(customer.phone || "").toLowerCase().includes(phone) &&
        String(customer.cibil ?? "").toLowerCase().includes(cibil) &&
        String(customer.loanAmount ?? "").toLowerCase().includes(loan) &&
        String(customer.address || "").toLowerCase().includes(place) &&
        String(customer.location || "").toLowerCase().includes(location)
    );
}


/* ================= CUSTOMERS TABLE ================= */

function renderCustomers() {

    const data =
        getVisibleCustomers();


    const filtered = filterCustomers(data, "customer").filter(c => {
        const status = document.getElementById("statusFilter").value;
        return status === "all" || c.status === status;
    });


    const body =
        document.getElementById(
            "customerTableBody"
        );


    body.innerHTML =
        filtered.map(
            c => {

                const agent =
                    users.find(
                        u =>
                            u.id === c.agentId
                    );

                const canRemoveCustomers = ["tl", "manager", "backend"].includes(currentUser.role);
                const selectionCell = canRemoveCustomers
                    ? `<td><input type="checkbox" class="customer-select" value="${c.id}" aria-label="Select ${escapeHTML(c.name)}" ${selectedCustomerIds.has(c.id) ? "checked" : ""} onchange="toggleCustomerSelection(${c.id}, this.checked)"></td>`
                    : "";

                return `

                <tr>
                    ${selectionCell}

                    <td>

                        <span class="customer-name">
                            ${escapeHTML(c.name)}
                        </span>

                        <span class="customer-phone">
                            ${c.phone}
                        </span>

                    </td>

                    <td>
                        ${escapeHTML(c.location || "—")}
                    </td>

                    <td>
                        ${formatMoney(c.loanAmount)}
                    </td>

                    <td>
                        ${formatMoney(c.salary)}
                    </td>

                    <td>
                        <strong>${c.cibil}</strong>
                    </td>

                    <td>
                        ${formatMoney(c.btAmount)}
                    </td>

                    <td>

                        <span class="status ${c.status.toLowerCase()}">
                            ${c.status}
                        </span>

                    </td>

                    <td>
                        ${agent ? agent.name : "Unassigned"}
                    </td>

                    <td>

                        <button
                            class="action-btn"
                            onclick="openCustomer(${c.id})"
                        >
                            View
                        </button>
                        ${["tl", "manager", "backend"].includes(String(currentUser?.role || "").toLowerCase()) ? `
                            <button
                                class="delete-customer-btn"
                                onclick="removeCustomer(${c.id})"
                            >
                                Remove
                            </button>
                        ` : ""}

                    </td>

                </tr>

                `;

            }
        )
        .join("");


    if (filtered.length === 0) {

        body.innerHTML = `

            <tr>

                <td colspan="${["tl", "manager", "backend"].includes(currentUser.role) ? 10 : 9}"
                    style="text-align:center;padding:40px;">

                    No customers found.

                </td>

            </tr>

        `;

    }

    updateCustomerSelectionControls(filtered);

}

function toggleCustomerSelection(id, isSelected) {
    if (isSelected) selectedCustomerIds.add(id);
    else selectedCustomerIds.delete(id);
    renderCustomers();
}

function toggleAllCustomers(checkbox) {
    const visibleIds = filterCustomers(getVisibleCustomers(), "customer")
        .filter(customer => {
            const status = document.getElementById("statusFilter").value;
            return status === "all" || customer.status === status;
        })
        .map(customer => customer.id);

    visibleIds.forEach(id => {
        if (checkbox.checked) selectedCustomerIds.add(id);
        else selectedCustomerIds.delete(id);
    });
    renderCustomers();
}

function updateCustomerSelectionControls(visibleCustomers) {
    const selectedVisible = visibleCustomers.filter(customer => selectedCustomerIds.has(customer.id)).length;
    const selectedAccessible = getVisibleCustomers().filter(customer => selectedCustomerIds.has(customer.id)).length;
    const button = document.getElementById("bulkRemoveCustomersButton");
    const selectAll = document.getElementById("selectAllCustomers");

    button.textContent = `Remove Selected (${selectedAccessible})`;
    button.disabled = selectedAccessible === 0;
    selectAll.checked = visibleCustomers.length > 0 && selectedVisible === visibleCustomers.length;
    selectAll.indeterminate = selectedVisible > 0 && selectedVisible < visibleCustomers.length;
}


/* ================= REMOVE CUSTOMER ================= */

function removeCustomer(id) {
    const role = String(currentUser?.role || "").toLowerCase();
    if (!["tl", "manager", "backend"].includes(role)) {
        alert("You don't have permission to remove customers.");
        return;
    }

    const customer = customers.find(c => c.id === id);
    if (!customer || !getVisibleCustomers().some(c => c.id === id)) {
        alert("You don't have permission to remove this customer.");
        return;
    }

    if (!confirm(`Remove customer ${customer.name}? This action cannot be undone.`)) {
        return;
    }

    customers = customers.filter(c => c.id !== id);
    selectedCustomerIds.delete(id);
    saveData();
    renderCustomers();
    updateDashboard();
}

function removeSelectedCustomers() {
    if (!currentUser || !["tl", "manager", "backend"].includes(currentUser.role)) {
        alert("You don't have permission to remove customers.");
        return;
    }

    const accessibleIds = new Set(getVisibleCustomers().map(customer => customer.id));
    const selectedIds = [...selectedCustomerIds].filter(id => accessibleIds.has(id));
    if (selectedIds.length === 0) return;

    if (!confirm(`Remove ${selectedIds.length} selected customer(s)? This action cannot be undone.`)) {
        return;
    }

    const removedIds = new Set(selectedIds);
    customers = customers.filter(customer => !removedIds.has(customer.id));
    selectedCustomerIds.clear();
    saveData();
    renderCustomers();
    updateDashboard();
}


/* ================= OPEN CUSTOMER ================= */

function openCustomer(id) {

    const customer =
        customers.find(
            c => c.id === id
        );


    if (!customer) return;


    /* Permission check */

    if (
        !getVisibleCustomers()
            .some(c => c.id === id)
    ) {

        alert(
            "You don't have permission to view this customer."
        );

        return;

    }


    document
        .getElementById("modalTitle")
        .textContent =
        "Customer Application";


    document
        .getElementById("customerId")
        .value =
        customer.id;


    fillCustomerForm(customer);


    document
        .getElementById("customerModal")
        .classList.remove("hidden");

}


/* ================= FILL FORM ================= */

function fillCustomerForm(c) {

    document.getElementById("customerName").value =
        c.name || "";

    document.getElementById("customerAge").value =
        c.age || "";

    document.getElementById("customerPhone").value =
        c.phone || "";

    document.getElementById("customerAddress").value =
        c.address || "";

    document.getElementById("customerLocation").value =
        c.location || "";

    document.getElementById("loanAmount").value =
        c.loanAmount || 0;

    document.getElementById("btAmount").value =
        c.btAmount || 0;

    document.getElementById("btBank").value =
        c.btBank || "";

    document.getElementById("inHandAmount").value =
        c.inHandAmount || 0;

    document.getElementById("salary").value =
        c.salary || 0;

    document.getElementById("companyName").value =
        c.companyName || "";

    document.getElementById("companyBank").value =
        c.companyBank || "";

    document.getElementById("cibil").value =
        c.cibil || 0;

    document.getElementById("enquiries").value =
        c.enquiries || 0;

    document.getElementById("creditCards").value =
        c.creditCards || "";

    document.getElementById("delays").value =
        c.delays || "";

    document.getElementById("outstanding").value =
        c.outstanding || 0;

    document.getElementById("iciciEmi").value =
        c.iciciEmi || 0;

    document.getElementById("hdfcEmi").value =
        c.hdfcEmi || 0;

    document.getElementById("otherEmi").value =
        c.otherEmi || 0;

    document.getElementById("banksApplied").value =
        c.banksApplied || "";

    document.getElementById("customerStatus").value =
        c.status || "Pending";

    document.getElementById("remarks").value =
        c.remarks || "";

}


/* ================= SAVE CUSTOMER ================= */

document
    .getElementById("customerForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const id =
                Number(
                    document
                        .getElementById("customerId")
                        .value
                );


            const isNew = !id;
            let customer = customers.find(
                c => c.id === id
            );

            if (isNew) {
                const assignedAgent = currentUser.role === "agent"
                    ? currentUser.id
                    : users.find(
                        u => u.role === "agent" && u.team === currentUser.team
                    )?.id;

                customer = {
                    id: Math.max(0, ...customers.map(c => Number(c.id) || 0)) + 1,
                    agentId: assignedAgent
                };
            } else if (!customer) {
                return;
            }


            /* Permission */

            if (
                currentUser.role === "agent" &&
                customer.agentId !== currentUser.id
            ) {

                alert(
                    "You cannot edit this customer."
                );

                return;

            }


            customer.name =
                document
                    .getElementById("customerName")
                    .value;


            customer.age =
                Number(
                    document
                        .getElementById("customerAge")
                        .value
                );


            customer.phone =
                document
                    .getElementById("customerPhone")
                    .value;


            customer.address =
                document
                    .getElementById("customerAddress")
                    .value;

            customer.location =
                document
                    .getElementById("customerLocation")
                    .value
                    .trim()
                    .toUpperCase();


            customer.loanAmount =
                Number(
                    document
                        .getElementById("loanAmount")
                        .value
                );


            customer.btAmount =
                Number(
                    document
                        .getElementById("btAmount")
                        .value
                );


            customer.btBank =
                document
                    .getElementById("btBank")
                    .value;


            customer.inHandAmount =
                Number(
                    document
                        .getElementById("inHandAmount")
                        .value
                );


            customer.salary =
                Number(
                    document
                        .getElementById("salary")
                        .value
                );


            customer.companyName =
                document
                    .getElementById("companyName")
                    .value;


            customer.companyBank =
                document
                    .getElementById("companyBank")
                    .value;


            customer.cibil =
                Number(
                    document
                        .getElementById("cibil")
                        .value
                );


            customer.enquiries =
                Number(
                    document
                        .getElementById("enquiries")
                        .value
                );


            customer.creditCards =
                document
                    .getElementById("creditCards")
                    .value;


            customer.delays =
                document
                    .getElementById("delays")
                    .value;


            customer.outstanding =
                Number(
                    document
                        .getElementById("outstanding")
                        .value
                );


            customer.iciciEmi =
                Number(
                    document
                        .getElementById("iciciEmi")
                        .value
                );


            customer.hdfcEmi =
                Number(
                    document
                        .getElementById("hdfcEmi")
                        .value
                );


            customer.otherEmi =
                Number(
                    document
                        .getElementById("otherEmi")
                        .value
                );


            customer.banksApplied =
                document
                    .getElementById("banksApplied")
                    .value;


            customer.status =
                document
                    .getElementById("customerStatus")
                    .value;


            customer.remarks =
                document
                    .getElementById("remarks")
                    .value;

            if (isNew) {
                customers.push(customer);
            }

            saveData();


            closeModal();

            renderCustomers();

            updateDashboard();


            alert(
                isNew
                    ? "Customer added successfully."
                    : "Customer application updated successfully."
            );

        }
    );


/* ================= ADD CUSTOMER ================= */

function openAddCustomer() {

    if (
        currentUser.role !== "agent" &&
        currentUser.role !== "tl"
    ) {

        alert(
            "You don't have permission to add customers."
        );

        return;

    }


    document
        .getElementById("modalTitle")
        .textContent =
        "Add New Customer";


    document
        .getElementById("customerForm")
        .reset();


    document
        .getElementById("customerId")
        .value = "";


    document
        .getElementById("customerModal")
        .classList.remove("hidden");


}


/* ================= EXCEL/CSV CUSTOMER UPLOAD ================= */

async function uploadCustomers(event) {
    if (!currentUser || !["tl", "manager", "backend"].includes(currentUser.role)) {
        alert("Only TLs, managers, or backend administrators can upload customers.");
        event.target.value = "";
        return;
    }

    const file = event.target.files[0];
    if (!file) return;

    try {
        // Prevent an older portal tab from overwriting customers uploaded elsewhere.
        loadCustomerData();

        const isExcel = /\.xlsx$/i.test(file.name) ||
            file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        const rows = isExcel
            ? await parseXLSX(await file.arrayBuffer())
            : parseCSV(await file.text());
        const imported = rows.map((row, index) => createCustomerFromRow(row, index));

        if (!imported.length) {
            throw new Error("No customer rows were found. Check that the first row contains column headings.");
        }

        customers.push(...imported);
        saveData();
        // Keep this tab's in-memory list synchronized before navigating or logging in as TL.
        loadCustomerData();
        renderCustomers();
        updateDashboard();
        alert(`${imported.length} customer(s) uploaded successfully.`);
    } catch (error) {
        alert(`Upload failed: ${error.message}`);
    }

    event.target.value = "";
}

async function parseXLSX(buffer) {
    if (typeof DecompressionStream === "undefined") {
        throw new Error("This browser cannot unpack Excel files. Save the worksheet as CSV and upload it instead.");
    }

    const bytes = new Uint8Array(buffer);
    const view = new DataView(buffer);
    const decoder = new TextDecoder("utf-8");
    let end = -1;

    for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) {
        if (view.getUint32(i, true) === 0x06054b50) {
            end = i;
            break;
        }
    }
    if (end < 0) throw new Error("This is not a valid .xlsx file.");

    const entries = new Map();
    const entryCount = view.getUint16(end + 10, true);
    let cursor = view.getUint32(end + 16, true);

    for (let i = 0; i < entryCount; i++) {
        if (view.getUint32(cursor, true) !== 0x02014b50) {
            throw new Error("The Excel file appears to be damaged.");
        }
        const method = view.getUint16(cursor + 10, true);
        const compressedSize = view.getUint32(cursor + 20, true);
        const nameLength = view.getUint16(cursor + 28, true);
        const extraLength = view.getUint16(cursor + 30, true);
        const commentLength = view.getUint16(cursor + 32, true);
        const localOffset = view.getUint32(cursor + 42, true);
        const name = decoder.decode(bytes.slice(cursor + 46, cursor + 46 + nameLength));
        entries.set(name, { method, compressedSize, localOffset });
        cursor += 46 + nameLength + extraLength + commentLength;
    }

    const readEntry = async name => {
        const entry = entries.get(name);
        if (!entry) return null;
        const offset = entry.localOffset;
        const nameLength = view.getUint16(offset + 26, true);
        const extraLength = view.getUint16(offset + 28, true);
        const start = offset + 30 + nameLength + extraLength;
        const compressed = bytes.slice(start, start + entry.compressedSize);

        if (entry.method === 0) return decoder.decode(compressed);
        if (entry.method !== 8) throw new Error("This Excel file uses an unsupported compression format.");

        try {
            const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
            return await new Response(stream).text();
        } catch (error) {
            throw new Error("Could not decompress the Excel file in this browser.");
        }
    };

    const parseXML = text => {
        const xml = new DOMParser().parseFromString(text, "application/xml");
        if (xml.querySelector("parsererror")) throw new Error("The Excel workbook contains invalid XML.");
        return xml;
    };

    const workbookText = await readEntry("xl/workbook.xml");
    if (!workbookText) throw new Error("Could not find a worksheet in this Excel file.");
    const workbook = parseXML(workbookText);
    const firstSheet = workbook.getElementsByTagName("sheet")[0];
    if (!firstSheet) throw new Error("The Excel workbook has no worksheets.");

    const relationId = firstSheet.getAttribute("r:id") || firstSheet.getAttributeNS(
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships", "id"
    );
    const relationshipsText = await readEntry("xl/_rels/workbook.xml.rels");
    if (!relationshipsText) throw new Error("Could not locate the Excel worksheet.");
    const relationships = parseXML(relationshipsText);
    const relation = Array.from(relationships.getElementsByTagName("Relationship"))
        .find(item => item.getAttribute("Id") === relationId);
    if (!relation) throw new Error("Could not locate the first worksheet in the Excel file.");

    const target = relation.getAttribute("Target").replace(/^\//, "");
    const rawSheetPath = target.startsWith("xl/") ? target : `xl/${target}`;
    const sheetPath = rawSheetPath.split("/").reduce((parts, part) => {
        if (part === "..") parts.pop();
        else if (part && part !== ".") parts.push(part);
        return parts;
    }, []).join("/");
    const sheetText = await readEntry(sheetPath);
    if (!sheetText) throw new Error("Could not read the first worksheet.");
    const sheet = parseXML(sheetText);

    const sharedText = await readEntry("xl/sharedStrings.xml");
    const sharedStrings = sharedText
        ? Array.from(parseXML(sharedText).getElementsByTagName("si"))
            .map(item => Array.from(item.getElementsByTagName("t")).map(text => text.textContent).join(""))
        : [];

    const grid = Array.from(sheet.getElementsByTagName("row")).map(row => {
        const values = [];
        Array.from(row.getElementsByTagName("c")).forEach(cell => {
            const match = cell.getAttribute("r").match(/[A-Z]+/i);
            if (!match) return;
            let column = 0;
            for (const character of match[0].toUpperCase()) {
                column = column * 26 + character.charCodeAt(0) - 64;
            }
            column--;

            const type = cell.getAttribute("t");
            let value = cell.getElementsByTagName("v")[0]?.textContent || "";
            if (type === "s") value = sharedStrings[Number(value)] || "";
            if (type === "inlineStr") {
                value = Array.from(cell.getElementsByTagName("t")).map(text => text.textContent).join("");
            }
            values[column] = value;
        });
        return values;
    }).filter(row => row.some(value => String(value || "").trim()));

    if (grid.length < 2) return [];

    return rowsToCustomerRecords(grid);
}

function normalizeImportHeader(value) {
    return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

function canonicalImportHeader(value) {
    const header = normalizeImportHeader(value);
    const aliases = {
        name: ["name", "customer", "applicant", "borrower"],
        customername: ["customername", "applicantname", "borrowername", "fullname", "customerfullname", "applicantfullname"],
        phone: ["phone", "mobile", "mobilenumber", "phonenumber", "contactnumber", "telephone"],
        loanamount: ["loan", "loanamount", "loanvalue", "requestedloanamount"],
        salary: ["salary", "monthlysalary", "netmonthlysalary", "income"],
        cibil: ["cibil", "cibilscore", "creditscore"],
        address: ["address", "place", "city", "residence"],
        location: ["location", "state", "statecode", "statecodeabbreviation"],
        btamount: ["btamount", "balancetransferamount"],
        btbank: ["btbank", "balancebank", "existingbank"],
        inhandamount: ["inhandamount", "inhand", "netloanamount"],
        companyname: ["companyname", "company", "employer"],
        companybank: ["companybank", "companylistedbank"],
        enquiries: ["enquiries", "numberofenquiries", "creditenquiries"],
        creditcards: ["creditcards", "creditcard", "cardsused"],
        delays: ["delays", "delayedpayments", "paymentdelays"],
        outstanding: ["outstanding", "outstandingamount"],
        banksapplied: ["banksapplied", "appliedbanks"],
        remarks: ["remarks", "callremarks", "comments"]
    };

    for (const [canonical, variants] of Object.entries(aliases)) {
        if (variants.includes(header)) return canonical;
    }

    // Also recognize headings with units or notes appended, such as "Loan Amount (INR)".
    for (const [canonical, variants] of Object.entries(aliases)) {
        if (variants.some(alias => header.startsWith(alias) || header.endsWith(alias))) return canonical;
    }
    return header;
}

function rowsToCustomerRecords(grid) {
    const recognizedFields = new Set([
        "name", "customername", "phone", "loanamount", "salary", "cibil",
        "address", "location", "age", "status", "agent", "agentid", "btamount"
    ]);
    let headerRowIndex = 0;
    let bestHeaderScore = 0;
    grid.slice(0, 15).forEach((row, index) => {
        const score = row
            .map(canonicalImportHeader)
            .filter(header => recognizedFields.has(header)).length;
        if (score > bestHeaderScore) {
            bestHeaderScore = score;
            headerRowIndex = index;
        }
    });

    if (bestHeaderScore === 0) return [];

    const headers = grid[headerRowIndex].map(canonicalImportHeader);
    return grid.slice(headerRowIndex + 1).map(values => headers.reduce((row, header, index) => {
        if (header) row[header] = String(values[index] || "").trim();
        return row;
    }, {})).filter(row => Object.values(row).some(Boolean));
}

function parseCSV(text) {
    const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter(line => line.trim());
    if (lines.length < 2) return [];

    const grid = lines.map(splitCSVLine);
    return rowsToCustomerRecords(grid);
}

function splitCSVLine(line) {
    const values = [];
    let value = "";
    let quoted = false;

    for (let i = 0; i < line.length; i++) {
        const character = line[i];
        if (character === '"' && line[i + 1] === '"') {
            value += '"';
            i++;
        } else if (character === '"') {
            quoted = !quoted;
        } else if (character === "," && !quoted) {
            values.push(value);
            value = "";
        } else {
            value += character;
        }
    }

    values.push(value);
    return values;
}

function parseImportNumber(value) {
    const normalized = String(value || "").replace(/[^0-9.-]/g, "");
    const number = Number(normalized);
    return Number.isFinite(number) ? number : 0;
}

function createCustomerFromRow(row, index) {
    const get = (...names) => {
        const key = names.find(name => row[name] !== undefined);
        return key ? row[key] : "";
    };

    const requestedAgentId = get("agentid", "agent", "assignedagent");
    const eligibleAgents = users.filter(user =>
        user.role === "agent" &&
        (currentUser.role !== "tl" || user.team === currentUser.team)
    );
    const assignedAgent = eligibleAgents.find(user => user.id === requestedAgentId);

    return {
        id: Date.now() + index,
        name: get("name", "customername", "applicantname", "customer") || `Imported Customer ${index + 1}`,
        age: parseImportNumber(get("age")),
        phone: get("phone", "mobilenumber", "mobile", "phonenumber", "contactnumber"),
        address: get("address", "place", "location", "city"),
        location: get("location", "state", "statecode", "statecodeabbreviation")
            .trim()
            .toUpperCase(),
        loanAmount: parseImportNumber(get("loanamount", "loan", "loanvalue")),
        btAmount: parseImportNumber(get("btamount")),
        btBank: get("btbank"),
        inHandAmount: parseImportNumber(get("inhandamount", "inhand")),
        salary: parseImportNumber(get("salary", "monthlysalary")),
        companyName: get("companyname", "company"),
        companyBank: get("companybank", "companylistedbank"),
        cibil: parseImportNumber(get("cibil", "cibilscore")),
        enquiries: parseImportNumber(get("enquiries", "numberofenquiries")),
        creditCards: get("creditcards"),
        delays: get("delays", "delayedpayments"),
        outstanding: parseImportNumber(get("outstanding", "outstandingamount")),
        iciciEmi: parseImportNumber(get("iciciemi")),
        hdfcEmi: parseImportNumber(get("hdfcemi")),
        otherEmi: parseImportNumber(get("otheremi")),
        banksApplied: get("banksapplied"),
        status: ["Pending", "Eligible", "Review", "Completed"].includes(get("status"))
            ? get("status")
            : "Pending",
        remarks: get("remarks", "callremarks"),
        agentId: assignedAgent ? assignedAgent.id : ""
    };
}

/* ================= CLOSE MODAL ================= */

function closeModal() {

    document
        .getElementById("customerModal")
        .classList.add("hidden");

}


/* ================= ASSIGNMENTS ================= */

function getAssignmentTargets() {
    if (currentUser.role === "tl") {
        return users.filter(user =>
            (user.role === "agent" && user.team === currentUser.team) ||
            user.id === currentUser.id
        );
    }

    if (currentUser.role === "manager" || currentUser.role === "backend") {
        return users.filter(user => ["agent", "tl"].includes(user.role));
    }

    return [];
}

function getAssignmentFilterMembers() {
    return users
        .filter(user => ["agent", "tl"].includes(user.role))
        .sort((first, second) => first.name.localeCompare(second.name));
}

function updateAssignmentAssigneeFilter() {
    const select = document.getElementById("assignmentAssigneeFilter");
    if (!select) return;

    const currentValue = select.value;
    const members = getAssignmentFilterMembers();
    select.innerHTML = `
        <option value="all">All Assignees</option>
        <option value="unassigned">None Assigned</option>
        ${members.map(member => `
            <option value="${escapeHTML(member.id)}">
                ${escapeHTML(member.name)} (${member.role === "tl" ? "TL" : "Agent"})
            </option>
        `).join("")}
    `;
    select.value = ["all", "unassigned", ...members.map(member => member.id)].includes(currentValue)
        ? currentValue
        : "all";
}

function getFilteredAssignmentCustomers() {
    const assignmentStatus = document.getElementById("assignmentStatusFilter")?.value || "all";
    const assignee = document.getElementById("assignmentAssigneeFilter")?.value || "all";

    return filterCustomers(getVisibleCustomers(), "assignment").filter(customer => {
        if (assignmentStatus === "unassigned" && customer.agentId) return false;
        if (assignmentStatus === "assigned" && !customer.agentId) return false;
        if (assignee === "unassigned") return !customer.agentId;
        if (assignee !== "all") return customer.agentId === assignee;
        return true;
    });
}

function renderAssignments() {

    updateAssignmentAssigneeFilter();

    const data = getFilteredAssignmentCustomers();

    const body = document.getElementById("assignmentTableBody");
    const assignmentTargets = getAssignmentTargets();
    const bulkAgentSelect = document.getElementById("bulkAssignmentAgent");
    if (bulkAgentSelect) {
        const currentValue = bulkAgentSelect.value;
        bulkAgentSelect.innerHTML = `<option value="">Select assignee</option>` + assignmentTargets.map(target =>
            `<option value="${escapeHTML(target.id)}">${escapeHTML(target.name)} (${escapeHTML(target.id)}) - ${target.role.toUpperCase()}</option>`
        ).join("");
        bulkAgentSelect.value = assignmentTargets.some(target => target.id === currentValue) ? currentValue : "";
    }


    body.innerHTML =
        data.map(
            c => {

                const agent =
                    users.find(
                        u =>
                            u.id === c.agentId
                    );


                return `

                <tr>

                    <td>
                        <input type="checkbox" class="assignment-select" value="${c.id}" aria-label="Select ${escapeHTML(c.name)}" ${selectedAssignmentCustomerIds.has(c.id) ? "checked" : ""} onchange="toggleAssignmentSelection(${c.id}, this.checked)">
                    </td>

                    <td>
                        <strong>
                            ${escapeHTML(c.name)}
                        </strong>
                    </td>

                    <td>
                        ${escapeHTML(c.location || "—")}
                    </td>

                    <td>
                        ${formatMoney(c.loanAmount)}
                    </td>

                    <td>
                        ${c.cibil}
                    </td>

                    <td>
                        ${agent ? agent.name : "Unassigned"}
                    </td>

                    <td>

                        <select
                            id="agent-${c.id}"
                            style="padding:7px;border:1px solid #ddd;border-radius:6px;"
                        >

                            <option value="" ${!c.agentId ? "selected" : ""}>None</option>

                            ${assignmentTargets
                                .map(
                                    target => `

                                    <option
                                        value="${target.id}"
                                        ${target.id === c.agentId ? "selected" : ""}
                                    >
                                        ${target.name} (${target.role.toUpperCase()})
                                    </option>

                                    `
                                )
                                .join("")
                            }

                        </select>

                    </td>

                    <td>

                        <button
                            class="action-btn"
                            onclick="reassignCustomer(${c.id})"
                        >
                            Assign
                        </button>

                    </td>

                </tr>

                `;

            }
        )
        .join("");

    if (data.length === 0) {
        body.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center;padding:40px;">
                    No customers match these filters.
                </td>
            </tr>
        `;
    }

    updateAssignmentSelectionControls(data);
}

function toggleAssignmentSelection(id, isSelected) {
    if (isSelected) selectedAssignmentCustomerIds.add(id);
    else selectedAssignmentCustomerIds.delete(id);
    renderAssignments();
}

function toggleAllAssignments(checkbox) {
    const filteredCustomers = getFilteredAssignmentCustomers();
    filteredCustomers.forEach(customer => {
        if (checkbox.checked) selectedAssignmentCustomerIds.add(customer.id);
        else selectedAssignmentCustomerIds.delete(customer.id);
    });
    renderAssignments();
}

function updateAssignmentSelectionControls(filteredCustomers) {
    const selectedVisible = filteredCustomers.filter(customer =>
        selectedAssignmentCustomerIds.has(customer.id)
    ).length;
    const selectedAccessible = getVisibleCustomers().filter(customer =>
        selectedAssignmentCustomerIds.has(customer.id)
    ).length;
    const count = document.getElementById("assignmentSelectionCount");
    const selectAll = document.getElementById("selectAllAssignments");
    if (count) count.textContent = `${selectedAccessible} selected`;
    if (selectAll) {
        selectAll.checked = filteredCustomers.length > 0 && selectedVisible === filteredCustomers.length;
        selectAll.indeterminate = selectedVisible > 0 && selectedVisible < filteredCustomers.length;
    }
}

function bulkAssignCustomers() {
    const role = String(currentUser?.role || "").toLowerCase();
    if (!["tl", "manager", "backend"].includes(role)) {
        alert("You don't have permission to assign customers.");
        return;
    }

    const assigneeId = document.getElementById("bulkAssignmentAgent").value;
    const accessibleIds = new Set(getVisibleCustomers().map(customer => customer.id));
    const selectedIds = [...selectedAssignmentCustomerIds].filter(id => accessibleIds.has(id));
    const assignmentTargets = getAssignmentTargets();
    const assignee = assignmentTargets.find(target => target.id === assigneeId);

    if (!assigneeId || !assignee) {
        alert("Select an assignee first.");
        return;
    }
    if (role === "tl" && assignee.id !== currentUser.id && assignee.team !== currentUser.team) {
        alert("You can only assign customers to yourself or agents in your team.");
        return;
    }
    if (!selectedIds.length) {
        alert("Select at least one customer.");
        return;
    }
    if (!confirm(`Assign ${selectedIds.length} customer(s) to ${assignee.name}?`)) return;

    const selectedSet = new Set(selectedIds);
    customers.forEach(customer => {
        if (selectedSet.has(customer.id)) customer.agentId = assignee.id;
    });
    selectedAssignmentCustomerIds.clear();
    saveData();
    renderAssignments();
    updateDashboard();
    alert(`${selectedIds.length} customer(s) assigned successfully.`);
}


/* ================= REASSIGN ================= */

function reassignCustomer(id) {

    if (
        currentUser.role !== "tl" &&
        currentUser.role !== "manager" &&
        currentUser.role !== "backend"
    ) {

        return;

    }


    const select =
        document.getElementById(
            `agent-${id}`
        );


    const newAgent =
        select.value;

    const assignmentTarget = getAssignmentTargets().find(target => target.id === newAgent);
    if (!assignmentTarget) {
        alert("You don't have permission to assign this customer to that user.");
        return;
    }


    const customer =
        customers.find(
            c => c.id === id
        );


    if (!customer) return;


    customer.agentId =
        newAgent;


    saveData();


    renderAssignments();

    updateDashboard();


    alert(
        "Customer assigned successfully."
    );

}


/* ================= PERFORMANCE ================= */

function renderPerformance() {

    const container =
        document.getElementById(
            "performanceCards"
        );


    let agents =
        users.filter(
            u => u.role === "agent"
        );


    if (currentUser.role === "tl") {

        agents =
            agents.filter(
                a =>
                    a.team === currentUser.team
            );

    }


    container.innerHTML =
        agents.map(
            agent => {

                const data =
                    customers.filter(
                        c =>
                            c.agentId === agent.id
                    );


                const pending =
                    data.filter(
                        c =>
                            c.status === "Pending"
                    ).length;


                const eligible =
                    data.filter(
                        c =>
                            c.status === "Eligible"
                    ).length;


                const completed =
                    data.filter(
                        c =>
                            c.status === "Completed"
                    ).length;


                const loan =
                    data.reduce(
                        (sum, c) =>
                            sum +
                            Number(c.loanAmount || 0),
                        0
                    );


                return `

                <div class="performance-card">

                    <h3>
                        ${escapeHTML(agent.name)}
                    </h3>

                    <div class="performance-stat">
                        <span>Customers</span>
                        <strong>${data.length}</strong>
                    </div>

                    <div class="performance-stat">
                        <span>Pending</span>
                        <strong>${pending}</strong>
                    </div>

                    <div class="performance-stat">
                        <span>Eligible</span>
                        <strong>${eligible}</strong>
                    </div>

                    <div class="performance-stat">
                        <span>Completed</span>
                        <strong>${completed}</strong>
                    </div>

                    <div class="performance-stat">
                        <span>Loan Value</span>
                        <strong>
                            ${formatMoney(loan)}
                        </strong>
                    </div>

                </div>

                `;

            }
        )
        .join("");

}


/* ================= AGENT MANAGEMENT ================= */

document
    .getElementById("agentForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        if (!currentUser || (currentUser.role !== "manager" && currentUser.role !== "backend")) {
            alert("Only managers or backend administrators can add team members.");
            return;
        }

        const id = document.getElementById("newAgentId").value.trim().toUpperCase();
        const name = document.getElementById("newAgentName").value.trim();
        const password = document.getElementById("newAgentPassword").value;
        const team = document.getElementById("newAgentTeam").value.trim();
        const role = document.getElementById("newAgentRole").value;

        if (!['agent', 'tl', 'manager'].includes(role)) {
            alert("Choose a valid team-member role.");
            return;
        }

        if (currentUser.role === "manager" && role !== "agent") {
            alert("Managers can only add agents.");
            return;
        }

        if (!/^[A-Z0-9_-]+$/.test(id)) {
            alert("Login ID can contain only letters, numbers, hyphens, and underscores.");
            return;
        }

        if (users.some(user => user.id.toUpperCase() === id)) {
            alert("That Login ID is already in use.");
            return;
        }

        users.push({
            id,
            name,
            password,
            role,
            team,
            branch: currentUser.branch,
            isCustom: true
        });

        saveAgents();
        event.target.reset();
        document.getElementById("newAgentTeam").value = "TEAM01";
        document.getElementById("newAgentRole").value = "agent";
        renderAgents();
        alert(`${role === "tl" ? "Team Leader" : role.charAt(0).toUpperCase() + role.slice(1)} added successfully.`);
    });

document
    .getElementById("editAgentForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        if (!currentUser || currentUser.role !== "backend") {
            alert("Only backend administrators can edit team-member information.");
            return;
        }

        const originalId = document.getElementById("editAgentOriginalId").value;
        const member = users.find(user => user.id === originalId);
        const id = document.getElementById("editAgentId").value.trim().toUpperCase();
        const name = document.getElementById("editAgentName").value.trim();
        const password = document.getElementById("editAgentPassword").value;
        const team = document.getElementById("editAgentTeam").value.trim();
        const role = document.getElementById("editAgentRole").value;

        if (!member || !["agent", "tl", "manager"].includes(member.role)) {
            alert("Team member not found.");
            return;
        }
        if (!/^[A-Z0-9_-]+$/.test(id)) {
            alert("Login ID can contain only letters, numbers, hyphens, and underscores.");
            return;
        }
        if (users.some(user => user.id.toUpperCase() === id && user.id !== originalId)) {
            alert("That Login ID is already in use.");
            return;
        }

        member.id = id;
        member.name = name;
        member.team = team;
        member.role = role;
        member.isCustom = true;
        if (password) member.password = password;

        if (id !== originalId) {
            customers.forEach(customer => {
                if (customer.agentId === originalId) customer.agentId = id;
            });
            saveData();
        }

        saveAgents();
        cancelEditTeamMember();
        renderAgents();
        updateDashboard();
        alert("Team-member information updated successfully.");
    });

function editTeamMember(id) {
    if (!currentUser || currentUser.role !== "backend") {
        alert("Only backend administrators can edit team-member information.");
        return;
    }

    const member = users.find(user => user.id === id);
    if (!member || !["agent", "tl", "manager"].includes(member.role)) return;

    document.getElementById("editAgentOriginalId").value = member.id;
    document.getElementById("editAgentId").value = member.id;
    document.getElementById("editAgentName").value = member.name;
    document.getElementById("editAgentPassword").value = "";
    document.getElementById("editAgentTeam").value = member.team || "";
    document.getElementById("editAgentRole").value = member.role;
    document.getElementById("editAgentPanel").classList.remove("hidden");
    document.getElementById("editAgentPanel").scrollIntoView({ behavior: "smooth", block: "center" });
}

function cancelEditTeamMember() {
    document.getElementById("editAgentForm").reset();
    document.getElementById("editAgentPanel").classList.add("hidden");
}

function renderAgents() {
    const body = document.getElementById("agentTableBody");
    const members = users.filter(user => ["agent", "tl", "manager"].includes(user.role));

    if (!members.length) {
        body.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;padding:40px;">
                    No team members found. Add someone using the form above.
                </td>
            </tr>
        `;
        return;
    }

    body.innerHTML = members.map(member => {
        const assignedCount = customers.filter(customer => customer.agentId === member.id).length;
        const roleLabel = member.role === "tl" ? "Team Leader (TL)" : member.role.charAt(0).toUpperCase() + member.role.slice(1);
        return `
            <tr>
                <td><strong>${escapeHTML(member.name)}</strong></td>
                <td>${escapeHTML(member.id)}</td>
                <td>${escapeHTML(member.team || "")}</td>
                <td>${escapeHTML(roleLabel)}</td>
                <td>${assignedCount}</td>
                <td>
                    ${currentUser.role === "backend" ? `
                        <button class="action-btn" onclick="editTeamMember('${escapeHTML(member.id)}')">
                            Edit
                        </button>
                    ` : ""}
                    ${member.role === "agent" || currentUser.role === "backend" ? `
                        <button class="remove-agent-btn" onclick="removeTeamMember('${escapeHTML(member.id)}')">
                            Remove
                        </button>
                    ` : "—"}
                </td>
            </tr>
        `;
    }).join("");
}

function removeTeamMember(id) {
    if (!currentUser || (currentUser.role !== "manager" && currentUser.role !== "backend")) {
        alert("Only managers or backend administrators can remove team members.");
        return;
    }

    const member = users.find(user => user.id === id);
    const canRemove = member && (
        currentUser.role === "backend" || member.role === "agent"
    );
    if (!canRemove) {
        alert("Managers can only remove agents.");
        return;
    }

    const isAgent = member.role === "agent";
    const message = isAgent
        ? `Remove agent ${member.name}? Assigned customers will become unassigned.`
        : `Remove ${member.role === "tl" ? "Team Leader" : "Manager"} ${member.name}?`;
    if (!confirm(message)) return;

    users = users.filter(user => user.id !== id);
    if (isAgent) {
        customers.forEach(customer => {
            if (customer.agentId === id) customer.agentId = "";
        });
        saveData();
    }

    saveAgents();
    renderAgents();
    updateDashboard();
}

function saveAgents() {
    const savedMembers = users.filter(user =>
        user.role === "agent" || (user.isCustom && ["tl", "manager"].includes(user.role))
    );
    localStorage.setItem("loanPortalAgents", JSON.stringify(savedMembers));

    const removedDefaultMembers = ["TL1001", "MGR1001"].filter(
        id => !users.some(user => user.id === id)
    );
    localStorage.setItem("loanPortalRemovedMembers", JSON.stringify(removedDefaultMembers));
}


/* ================= LOGOUT ================= */

function logout() {

    localStorage.removeItem(
        "loanPortalUser"
    );

    currentUser = null;


    document
        .getElementById("app")
        .classList.add("hidden");


    document
        .getElementById("loginPage")
        .classList.remove("hidden");


    document
        .getElementById("loginId")
        .value = "";

    document
        .getElementById("password")
        .value = "";

}


/* ================= PASSWORD ================= */

function togglePassword() {

    const password =
        document.getElementById(
            "password"
        );


    password.type =
        password.type === "password"
            ? "text"
            : "password";

}


/* ================= DEMO LOGIN ================= */

function fillLogin(id, password) {

    document.getElementById(
        "loginId"
    ).value = id;


    document.getElementById(
        "password"
    ).value = password;

}


/* ================= HELPERS ================= */

function formatMoney(number) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(number || 0);

}


function getInitials(name) {

    return name
        .split(" ")
        .map(
            word =>
                word.charAt(0)
        )
        .join("")
        .substring(0, 2)
        .toUpperCase();

}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* ================= LOCAL STORAGE ================= */

function saveData() {

    localStorage.setItem(
        "loanPortalCustomers",
        JSON.stringify(customers)
    );

}

function loadCustomerData() {
    const savedCustomers = localStorage.getItem("loanPortalCustomers");

    if (!savedCustomers) return;

    try {
        const parsedCustomers = JSON.parse(savedCustomers);
        if (Array.isArray(parsedCustomers)) {
            customers = parsedCustomers;
        }
    } catch (error) {
        console.log("Could not load saved customer data.");
    }
}

loadCustomerData();

const savedAgents = localStorage.getItem("loanPortalAgents");

if (savedAgents !== null) {
    try {
        const savedMembers = JSON.parse(savedAgents);
        if (Array.isArray(savedMembers)) {
            const validMembers = savedMembers.filter(member =>
                member &&
                ["agent", "tl", "manager"].includes(member.role) &&
                typeof member.id === "string" &&
                typeof member.name === "string" &&
                typeof member.password === "string"
            );
            const savedIds = new Set(validMembers.map(member => member.id));
            users = users
                .filter(user => user.role !== "agent" && !savedIds.has(user.id))
                .concat(validMembers);
        }
    } catch (error) {
        console.log("Could not load saved agent data.");
    }
}

const savedRemovedMembers = localStorage.getItem("loanPortalRemovedMembers");
if (savedRemovedMembers !== null) {
    try {
        const removedIds = JSON.parse(savedRemovedMembers);
        if (Array.isArray(removedIds)) {
            users = users.filter(user => !removedIds.includes(user.id));
        }
    } catch (error) {
        console.log("Could not load removed team-member data.");
    }
}









