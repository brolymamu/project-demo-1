
/* =========================================================
   LOAN PORTAL FRONTEND DEMO
========================================================= */


/* ================= USERS ================= */

const users = [

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

        document
            .getElementById("customerDescription")
            .textContent =
            "Customers assigned to your team";

    }


    if (currentUser.role === "manager") {

        assignmentNav.classList.remove("hidden");

        performanceNav.classList.remove("hidden");

        addButton.classList.add("hidden");

        document
            .getElementById("customerDescription")
            .textContent =
            "All customers in your branch";

    }

}


/* ================= GET ACCESSIBLE CUSTOMERS ================= */

function getVisibleCustomers() {

    if (currentUser.role === "agent") {

        return customers.filter(
            c =>
                c.agentId === currentUser.id
        );

    }


    if (currentUser.role === "tl") {

        const teamAgents =
            users
                .filter(
                    u =>
                        u.role === "agent" &&
                        u.team === currentUser.team
                )
                .map(
                    u => u.id
                );


        return customers.filter(
            c =>
                teamAgents.includes(c.agentId)
        );

    }


    if (currentUser.role === "manager") {

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
            currentUser.role !== "manager"
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
            currentUser.role !== "manager"
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


/* ================= CUSTOMERS TABLE ================= */

function renderCustomers() {

    const data =
        getVisibleCustomers();


    const search =
        document
            .getElementById("searchCustomer")
            .value
            .toLowerCase();


    const status =
        document
            .getElementById("statusFilter")
            .value;


    const filtered =
        data.filter(
            c => {

                const matchesSearch =
                    c.name
                        .toLowerCase()
                        .includes(search) ||

                    c.phone
                        .includes(search);


                const matchesStatus =
                    status === "all" ||
                    c.status === status;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );


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


                return `

                <tr>

                    <td>

                        <span class="customer-name">
                            ${escapeHTML(c.name)}
                        </span>

                        <span class="customer-phone">
                            ${c.phone}
                        </span>

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

                    </td>

                </tr>

                `;

            }
        )
        .join("");


    if (filtered.length === 0) {

        body.innerHTML = `

            <tr>

                <td colspan="8"
                    style="text-align:center;padding:40px;">

                    No customers found.

                </td>

            </tr>

        `;

    }

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


            const customer =
                customers.find(
                    c => c.id === id
                );


            if (!customer) return;


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


            saveData();


            closeModal();

            renderCustomers();

            updateDashboard();


            alert(
                "Customer application updated successfully."
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


/* ================= CLOSE MODAL ================= */

function closeModal() {

    document
        .getElementById("customerModal")
        .classList.add("hidden");

}


/* ================= ASSIGNMENTS ================= */

function renderAssignments() {

    const data =
        getVisibleCustomers();


    const body =
        document.getElementById(
            "assignmentTableBody"
        );


    const agents =
        users.filter(
            u => u.role === "agent"
        );


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
                        <strong>
                            ${escapeHTML(c.name)}
                        </strong>
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

                            ${agents
                                .filter(
                                    a =>
                                        currentUser.role === "manager" ||
                                        a.team === currentUser.team
                                )
                                .map(
                                    a => `

                                    <option
                                        value="${a.id}"
                                        ${a.id === c.agentId ? "selected" : ""}
                                    >
                                        ${a.name}
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

}


/* ================= REASSIGN ================= */

function reassignCustomer(id) {

    if (
        currentUser.role !== "tl" &&
        currentUser.role !== "manager"
    ) {

        return;

    }


    const select =
        document.getElementById(
            `agent-${id}`
        );


    const newAgent =
        select.value;


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


const savedCustomers =
    localStorage.getItem(
        "loanPortalCustomers"
    );


if (savedCustomers) {

    try {

        customers =
            JSON.parse(savedCustomers);

    } catch (error) {

        console.log(
            "Could not load saved customer data."
        );

    }

}

