


let users = [

    {
        id: "Rohan",
        password: "Login@123",
        name: "Rohan",
        role: "agent",
        team: "TEAM01",
        branch: "MAGADI",
        agentLocations: ["MH", "AP", "TL"],
        minLoanAmount: 1500000,
        maxLoanAmount: 5000000
    },

    {
        id: "Rahul",
        password: "Login@123",
        name: "Rahul Kumar",
        role: "agent",
        team: "TEAM02",
        branch: "Reva"
    },

    {
        id: "Ajay",
        password: "Login@123",
        name: "Ajay Singh",
        role: "agent",
        team: "TEAM01",
        branch: "MAGADI"
    },

    {
        id: "Arun",
        password: "TL@123",
        name: "Arun Kumar",
        role: "tl",
        team: "TEAM01",
        branch: "MAGADI"
    },

    {
        id: "Vijay",
        password: "Manager@123",
        name: "Vijay Sharma",
        role: "manager",
        branch: "Bangalore"
    },

    {
        id: "Malik",
        password: "backend@123",
        name: "Backend Administrator",
        role: "backend",
        branch: "Bangalore"
    },

    {
        id: "ASSIGN01",
        password: "Assign@123",
        name: "Customer Assigner",
        role: "assigner",
        branch: "Bangalore"
    }

];



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

        agentId: "Rohan"
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

        agentId: "Rohan"
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

        agentId: "Rahul"
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

        status: "Approved",

        remarks: "Application Approved.",

        agentId: "Rahul"
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

        agentId: "Ajay"
    }

];



const LEGACY_AGENT_ID_MAP = {
    AG1001: "Rohan",
    AG1002: "Rahul",
    AG1003: "Ajay"
};

function resolveCustomerAgentId(agentId) {
    if (!agentId) return "";

    const directMatch = users.find(user => user.id === agentId);
    if (directMatch) return directMatch.id;

    const normalizedAgentId = String(agentId).trim().toUpperCase();
    const mappedAgentId = LEGACY_AGENT_ID_MAP[normalizedAgentId];
    if (mappedAgentId && users.some(user => user.id === mappedAgentId)) {
        return mappedAgentId;
    }

    const looseMatch = users.find(user => user.id.toUpperCase() === normalizedAgentId);
    return looseMatch ? looseMatch.id : agentId;
}

function resolveCustomerAgent(customer) {
    if (!customer) return null;
    const resolvedId = resolveCustomerAgentId(customer.agentId);
    return users.find(user => user.id === resolvedId) || null;
}

const BANK_PROCESSING_STATUSES = [
    "TL Approved",
    "Logged In",
    "Underwriting",
    "Documents Pending",
    "Approved",
    "Rejected",
    "Disbursed"
];
let bankQueueStatusFilter = "all";

function normalizeBankProcessingStatus(status) {
    const normalized = String(status || "").trim().toLowerCase();
    const aliases = {
        "sent to bank": "TL Approved",
        "tl approved": "TL Approved",
        "in process": "Underwriting",
        underwriting: "Underwriting",
        "documents pending": "Documents Pending",
        "logged in": "Logged In",
        new: "TL Approved",
        approved: "Approved",
        rejected: "Rejected",
        disbursed: "Disbursed"
    };

    return aliases[normalized] || "TL Approved";
}

function normalizeBankName(bankName) {
    const normalized = String(bankName || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

    const bankAliases = {
        axis: "axis",
        axisbank: "axis",
        idfc: "idfc",
        idfcfirst: "idfc",
        idfcfirstbank: "idfc",
        idfcbank: "idfc",
        hdfc: "hdfc",
        hdfcbank: "hdfc",
        icici: "icici",
        icicibank: "icici",
        sbi: "sbi",
        statebankofindia: "sbi",
        kotak: "kotak",
        kotakmahindra: "kotak",
        kotakmahindrabank: "kotak",
        yes: "yes",
        yesbank: "yes"
    };

    return bankAliases[normalized] || normalized;
}

function getBankBackendMembers(bankName) {
    const normalizedBank = normalizeBankName(bankName);
    if (!normalizedBank) return [];

    return users.filter(user =>
        user.role === "bank_backend" &&
        normalizeBankName(user.bankName) === normalizedBank
    );
}

let currentUser = null;
let currentManagementPage = "agent";
let selectedCustomerIds = new Set();
let selectedAssignmentCustomerIds = new Set();
let dashboardCustomerStatuses = null;
let callbackNotificationTimer = null;
const notifiedCallbackIds = new Set();
const selectedCustomerDocumentIds = new Set();



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

    requestCallbackNotificationPermission();
    startCallbackReminderWatcher();
    setupCustomerDocumentDropzone();

});

// Keep an already-open TL portal synchronized with uploads from other tabs.
window.addEventListener("storage", event => {
    if (event.key !== "loanPortalCustomers" || !currentUser) return;

    loadCustomerData();

    const visibleSection = document.querySelector(".section:not(.hidden)");
    if (visibleSection?.id === "customersSection") {
        renderCustomers();
        renderAssignments();
    }
    if (visibleSection?.id === "dashboardSection") updateDashboard();
    if (visibleSection?.id === "bankQueueSection") renderBankApplications();
    if (visibleSection?.id === "leadsToApproveSection") renderLeadsToApprove();
    if (visibleSection?.id === "tlBankApplicationsSection") renderTLBankApplications();
});


/* ================= ACCOUNT MENU & PASSWORD ================= */

function toggleAccountMenu() {
    const menu = document.getElementById("accountMenu");
    const button = document.getElementById("topAvatar");
    const isOpening = menu.classList.contains("hidden");
    menu.classList.toggle("hidden", !isOpening);
    button.setAttribute("aria-expanded", String(isOpening));
}

function closeAccountMenu() {
    document.getElementById("accountMenu")?.classList.add("hidden");
    document.getElementById("topAvatar")?.setAttribute("aria-expanded", "false");
}

function openChangePassword() {
    closeAccountMenu();
    document.getElementById("changePasswordMessage").textContent = "";
    document.getElementById("changePasswordMessage").classList.remove("success");
    document.getElementById("changePasswordForm").reset();
    document.getElementById("changePasswordModal").classList.remove("hidden");
    document.getElementById("currentPassword").focus();
}

function closeChangePassword() {
    document.getElementById("changePasswordModal").classList.add("hidden");
}

document.getElementById("changePasswordForm").addEventListener("submit", event => {
    event.preventDefault();
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmNewPassword").value;
    const message = document.getElementById("changePasswordMessage");

    if (!currentUser || currentPassword !== currentUser.password) {
        message.classList.remove("success");
        message.textContent = "Current password is incorrect.";
        return;
    }
    if (newPassword.length < 6) {
        message.classList.remove("success");
        message.textContent = "New password must be at least 6 characters.";
        return;
    }
    if (newPassword !== confirmPassword) {
        message.classList.remove("success");
        message.textContent = "New passwords do not match.";
        return;
    }

    currentUser.password = newPassword;
    const passwordOverrides = JSON.parse(localStorage.getItem("loanPortalPasswords") || "{}");
    passwordOverrides[currentUser.id] = newPassword;
    localStorage.setItem("loanPortalPasswords", JSON.stringify(passwordOverrides));
    if (currentUser.role === "agent" || currentUser.isCustom) saveAgents();

    message.classList.add("success");
    message.textContent = "Password changed successfully.";
    event.target.reset();
});

document.addEventListener("click", event => {
    const menu = document.getElementById("accountMenu");
    if (menu && !event.target.closest(".top-account-menu")) closeAccountMenu();
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
    requestCallbackNotificationPermission();
    startCallbackReminderWatcher();

}

document.addEventListener("keydown", event => {
    if (
        event.key === "Enter" &&
        ["loginId", "password"].includes(event.target.id)
    ) {
        event.preventDefault();
        login();
    }
});


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

    showSection(currentUser.role === "bank_backend" ? "bank-queue" : "dashboard");

}




function updateMemberRoleFields() {
    const newRole = currentManagementPage;
    const editRole = document.getElementById("editAgentRole")?.value;

    document.querySelectorAll("#agentForm .member-team-field, #editAgentForm .member-team-field")
        .forEach(field => field.classList.toggle("hidden", ["manager", "assigner", "bank_backend"].includes(
            field.closest("#agentForm") ? newRole : editRole
        )));
    document.querySelectorAll("#agentForm .member-assignment-field, #editAgentForm .member-assignment-field")
        .forEach(field => field.classList.toggle("hidden", ["manager", "assigner", "bank_backend"].includes(
            field.closest("#agentForm") ? newRole : editRole
        )));
    document.querySelectorAll("#agentForm .member-bank-field, #editAgentForm .member-bank-field")
        .forEach(field => field.classList.toggle("hidden",
            (field.closest("#agentForm") ? newRole : editRole) !== "bank_backend"
        ));
}

document.getElementById("newAgentRole")?.addEventListener("change", updateMemberRoleFields);
document.getElementById("editAgentRole")?.addEventListener("change", updateMemberRoleFields);

function configurePermissions() {

    const assignmentNav =
        document.getElementById("assignmentNav");

    const performanceNav =
        document.getElementById("performanceNav");
    const leadsToApproveNav = document.getElementById("leadsToApproveNav");
    const tlBankApplicationsNav = document.getElementById("tlBankApplicationsNav");

    const addButton =
        document.getElementById("addCustomerButton");
    const forwardButton = document.getElementById("forwardCustomerToTLButton");

    const uploadButton =
        document.getElementById("uploadCustomersButton");

    const agentsNav = document.getElementById("agentsNav");
    const teamLeadersNav = document.getElementById("teamLeadersNav");
    const managersNav = document.getElementById("managersNav");
    const assignersNav = document.getElementById("assignersNav");
    const bankBackendsNav = document.getElementById("bankBackendsNav");
    const membersNavGroup = document.getElementById("membersNavGroup");
    const bankQueueNav = document.getElementById("bankQueueNav");

    const bulkRemoveButton =
        document.getElementById("bulkRemoveCustomersButton");

    const bulkAssignmentPanel =
        document.getElementById("bulkAssignmentPanel");

    const assignmentFilters =
        document.getElementById("assignmentFilters");

    const customerSelectHeader =
        document.getElementById("customerSelectHeader");

    const memberRoleSelect = document.getElementById("newAgentRole");
    const editMemberRoleSelect = document.getElementById("editAgentRole");
    [memberRoleSelect, editMemberRoleSelect].forEach(select => {
        if (!select) return;
        Array.from(select.options).forEach(option => {
            option.hidden = currentUser.role === "manager" && option.value !== "agent";
        });
        if (currentUser.role === "manager") select.value = "agent";
    });
    updateMemberRoleFields();

    uploadButton.classList.add("hidden");
    forwardButton?.classList.toggle("hidden", currentUser.role !== "agent");
    leadsToApproveNav?.classList.toggle("hidden", currentUser.role !== "tl");
    tlBankApplicationsNav?.classList.toggle("hidden", currentUser.role !== "tl");
    [agentsNav, teamLeadersNav, managersNav, assignersNav, bankBackendsNav].forEach(nav => nav?.classList.add("hidden"));
    bankQueueNav?.classList.toggle("hidden", currentUser.role !== "bank_backend");
    document.getElementById("dashboardNav")?.classList.toggle("hidden", currentUser.role === "bank_backend");
    document.getElementById("customersNav")?.classList.toggle("hidden", currentUser.role === "bank_backend");
    performanceNav?.classList.toggle("hidden", currentUser.role === "bank_backend");
    if (currentUser.role === "bank_backend") addButton.classList.add("hidden");
    membersNavGroup?.classList.add("hidden");
    bulkRemoveButton.classList.add("hidden");
    bulkAssignmentPanel.classList.add("hidden");
    assignmentFilters.classList.toggle("hidden", currentUser.role === "agent");
    customerSelectHeader.classList.add("hidden");


    if (currentUser.role === "agent") {

        assignmentNav?.classList.add("hidden");

        performanceNav.classList.add("hidden");

        addButton.classList.remove("hidden");

        document
            .getElementById("customerDescription")
            .textContent =
            "Customers assigned to you";

    }


    if (currentUser.role === "tl") {

        assignmentNav?.classList.remove("hidden");

        performanceNav.classList.remove("hidden");

        addButton.classList.remove("hidden");
        bulkAssignmentPanel.classList.remove("hidden");

        document
            .getElementById("customerDescription")
            .textContent =
            "Customers assigned to your team";

    }


    if (currentUser.role === "manager" || currentUser.role === "backend" || currentUser.role === "assigner") {

        assignmentNav?.classList.remove("hidden");

        performanceNav.classList.remove("hidden");

        addButton.classList.add("hidden");
        uploadButton.classList.remove("hidden");
        if (currentUser.role === "manager") {
            agentsNav?.classList.remove("hidden");
            membersNavGroup?.classList.remove("hidden");
        }
        if (currentUser.role === "backend") {
            [agentsNav, teamLeadersNav, managersNav, assignersNav, bankBackendsNav].forEach(nav => nav?.classList.remove("hidden"));
            membersNavGroup?.classList.remove("hidden");
        }
        bulkAssignmentPanel.classList.remove("hidden");

        document
            .getElementById("customerDescription")
            .textContent = currentUser.role === "assigner"
                ? "All customers across branches"
                : "All customers in your branch";

    }

    if (["tl", "manager", "backend"].includes(currentUser.role)) {
        bulkRemoveButton.classList.remove("hidden");
    }
    if (["tl", "manager", "backend", "assigner"].includes(currentUser.role)) {
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
                resolveCustomerAgentId(c.agentId) === currentUser.id
        );

    }


    if (currentUser.role === "tl") {

        // A TL can see customers assigned to them or to agents in their team.
        return customers.filter(customer => {
            const normalizedAgentId = resolveCustomerAgentId(customer.agentId);
            if (normalizedAgentId === currentUser.id) return true;

            const assignedUser = users.find(user => user.id === normalizedAgentId);
            return assignedUser?.role === "agent" && assignedUser.team === currentUser.team;
        });

    }

    if (currentUser.role === "bank_backend") {
        const bank = normalizeBankName(currentUser.bankName);
        return bank
            ? customers.filter(customer =>
                customer.approvalStatus === "approved" &&
                normalizeBankName(customer.banksPushing) === bank
            )
            : [];
    }


    if (["manager", "backend", "assigner"].includes(currentUser.role)) {

        return customers;

    }


    return [];

}


function renderPerformanceLoanAmounts() {
    const data = getVisibleCustomers();
    const assignedUser = customer => users.find(user =>
        user.id === resolveCustomerAgentId(customer.agentId)
    );
    const statsCard = (title, records) => {
        const countStatus = status => records.filter(customer =>
            normalizeCustomerStatus(customer.status) === status
        ).length;
        const loanTotal = records.reduce((total, customer) =>
            total + Number(customer.loanAmount || 0), 0
        );
        return `
            <article class="performance-card">
                <h3>${escapeHTML(title)}</h3>
                <div class="performance-stat"><span>Customers</span><strong>${records.length}</strong></div>
                <div class="performance-stat"><span>Not Called</span><strong>${countStatus("Not Called")}</strong></div>
                <div class="performance-stat"><span>Pending / Review / Bank Processing</span><strong>${["Pending", "Review", "TL Approved", "Logged In", "Underwriting", "Documents Pending"].reduce((count, status) => count + countStatus(status), 0)}</strong></div>
                <div class="performance-stat"><span>Eligible / Approved</span><strong>${countStatus("Eligible") + countStatus("Approved")}</strong></div>
                <div class="performance-stat"><span>Rejected</span><strong>${countStatus("Rejected")}</strong></div>
                <div class="performance-stat"><span>Disbursed</span><strong>${countStatus("Disbursed")}</strong></div>
                <div class="performance-stat"><span>Total Loan Amount</span><strong>${formatMoney(loanTotal)}</strong></div>
            </article>
        `;
    };
    const reportGroup = (title, cards) => cards.length
        ? `<section class="performance-report-group"><h3 class="performance-report-heading">${title}</h3><div class="performance-grid">${cards.join("")}</div></section>`
        : "";
    const organizationMembers = users.filter(user => ["agent", "tl"].includes(user.role));
    const branchMembers = users.filter(user => ["agent", "tl", "manager"].includes(user.role));

    const branchNames = [...new Set(branchMembers.map(user => user.branch).filter(Boolean))].sort();
    const branchCards = branchNames.map(branch => statsCard(
        `${branch} Branch`,
        data.filter(customer => assignedUser(customer)?.branch === branch || (!assignedUser(customer) && customer.branch === branch))
    ));

    const floorNames = [...new Set(organizationMembers.map(user => String(user.floor || "").trim()).filter(Boolean))].sort();
    const floorCards = floorNames.map(floor => statsCard(
        `${floor} Floor`,
        data.filter(customer => String(assignedUser(customer)?.floor || customer.floor || "").trim() === floor)
    ));

    const teamNames = [...new Set(organizationMembers.map(user => String(user.team || "").trim()).filter(Boolean))].sort();
    const teamCards = teamNames.map(team => {
        const leaders = users.filter(user => user.role === "tl" && user.team === team).map(user => user.name);
        const label = leaders.length ? `${team} · ${leaders.join(", ")}` : team;
        return statsCard(`${label} Team`, data.filter(customer => assignedUser(customer)?.team === team));
    });

    const agentCards = users.filter(user => user.role === "agent").map(agent =>
        statsCard(agent.name, data.filter(customer => resolveCustomerAgentId(customer.agentId) === agent.id))
    );

    document.getElementById("performanceCards").innerHTML = [
        reportGroup("Branch Performance", branchCards),
        reportGroup("Floor Performance", floorCards),
        reportGroup("Team Leader / Team Performance", teamCards),
        reportGroup("Agent Performance", agentCards)
    ].join("") || '<p class="history-empty">No team or branch data is available yet.</p>';
}

/* ================= NAVIGATION ================= */

function showSection(section) {
    if (currentUser?.role === "bank_backend" && section !== "bank-queue") return;

    document
        .getElementById("dashboardSection")
        .classList.add("hidden");

    document
        .getElementById("customersSection")
        .classList.add("hidden");

    document
        .getElementById("performanceSection")
        .classList.add("hidden");

    document
        .getElementById("leadsToApproveSection")
        .classList.add("hidden");

    document
        .getElementById("tlBankApplicationsSection")
        .classList.add("hidden");

    document
        .getElementById("bankQueueSection")
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

        clearDashboardMetricFilter();
        renderCustomers();
        renderAssignments();

    }


    if (section === "assignments") {
        showSection("customers");
        renderAssignments();
        return;
    }

    if (section === "leads-to-approve") {
        if (currentUser.role !== "tl") return;
        document.getElementById("leadsToApproveSection").classList.remove("hidden");
        document.getElementById("pageTitle").textContent = "Leads to Approve";
        document.getElementById("pageSubtitle").textContent = "Review applications forwarded by your team";
        document.getElementById("leadsToApproveNav").classList.add("active");
        renderLeadsToApprove();
        return;
    }

    if (section === "tl-bank-applications") {
        if (currentUser.role !== "tl") return;
        document.getElementById("tlBankApplicationsSection").classList.remove("hidden");
        document.getElementById("pageTitle").textContent = "Applications Sent to Bank";
        document.getElementById("pageSubtitle").textContent = "Track bank processing for applications you approved";
        document.getElementById("tlBankApplicationsNav").classList.add("active");
        renderTLBankApplications();
        return;
    }

    if (section === "bank-queue") {
        if (currentUser.role !== "bank_backend") return;
        document.getElementById("bankQueueSection").classList.remove("hidden");
        document.getElementById("pageTitle").textContent = "Bank Applications";
        document.getElementById("pageSubtitle").textContent = `${currentUser.bankName} · applications approved by team leaders`;
        renderBankApplications();
        document.getElementById("bankQueueNav").classList.add("active");
        return;
    }

    if (section === "performance") {

        if (
            currentUser.role !== "tl" &&
            currentUser.role !== "manager" &&
            currentUser.role !== "backend" &&
            currentUser.role !== "assigner"
        ) return;


        document
            .getElementById("performanceSection")
            .classList.remove("hidden");

        document.getElementById("pageTitle")
            .textContent = "Team Performance";

        document.getElementById("pageSubtitle")
            .textContent =
            "Application performance overview";

        renderPerformanceLoanAmounts();

    }

    const managementPages = {
        agents: { role: "agent", title: "Manage Agents", label: "Agent" },
        "team-leaders": { role: "tl", title: "Manage Team Leaders", label: "Team Leader" },
        managers: { role: "manager", title: "Manage Managers", label: "Manager" },
        assigners: { role: "assigner", title: "Manage Assigners", label: "Assigner" },
        "bank-backends": { role: "bank_backend", title: "Manage Bank Backends", label: "Bank Backend" }
    };
    const managementPage = managementPages[section];

    if (managementPage) {
        if (currentUser.role !== "backend" && !(currentUser.role === "manager" && managementPage.role === "agent")) return;

        currentManagementPage = managementPage.role;
        const membersNavGroup = document.getElementById("membersNavGroup");
        if (membersNavGroup) membersNavGroup.open = true;
        const managementNavIds = {
            agent: "agentsNav",
            tl: "teamLeadersNav",
            manager: "managersNav",
            assigner: "assignersNav",
            bank_backend: "bankBackendsNav"
        };
        document.getElementById(managementNavIds[managementPage.role])?.classList.add("active");
        document.getElementById("agentsSection").classList.remove("hidden");
        document.getElementById("pageTitle").textContent = managementPage.title;
        document.getElementById("pageSubtitle").textContent = `Create and manage ${managementPage.label.toLowerCase()} accounts`;

        const isAssignerPage = managementPage.role === "assigner";
        document.querySelector("#agentsSection .agent-table-container")?.classList.toggle("hidden", isAssignerPage);
        document.getElementById("assignerManagementPanel")?.classList.toggle("hidden", !isAssignerPage || currentUser.role !== "backend");
        document.getElementById("editAgentPanel")?.classList.add("hidden");

        const roleSelect = document.getElementById("newAgentRole");
        if (roleSelect) {
            roleSelect.value = managementPage.role;
            roleSelect.disabled = true;
        }
        updateMemberRoleFields();
        const nameLabel = document.querySelector('label[for="newAgentName"]');
        if (nameLabel) nameLabel.textContent = `${managementPage.label} Name`;
        const addButton = document.querySelector("#agentForm button[type='submit']");
        if (addButton) addButton.textContent = `+ Add ${managementPage.label}`;

        renderAgents();
    }

}


/* ================= DASHBOARD ================= */

function clearDashboardMetricFilter() {
    dashboardCustomerStatuses = null;
}

function openDashboardCustomers(metric) {
    const metricStatuses = {
        "not-called": ["Not Called"],
        pending: ["Pending", "Review", "TL Approved", "Logged In", "Underwriting", "Documents Pending"],
        rejected: ["Rejected"],
        "approved-loan": ["Eligible", "Approved"],
        "pending-loan": ["Pending", "Review", "TL Approved", "Logged In", "Underwriting", "Documents Pending"],
        "rejected-loan": ["Rejected"],
        disbursed: ["Disbursed"]
    };

    const selectedStatuses = metric === "all" ? null : metricStatuses[metric] || null;

    ["Name", "Phone", "Cibil", "Loan", "Place", "Location"].forEach(field => {
        const input = document.getElementById(`customerFilter${field}`);
        if (input) input.value = "";
    });
    document.getElementById("statusFilter").value = "all";
    document.getElementById("assignmentAssigneeFilter").value = "all";
    document.getElementById("assignmentStatusFilter").value = "all";

    showSection("customers");
    dashboardCustomerStatuses = selectedStatuses;
    const label = metric === "all" ? "All customers" : `Dashboard: ${metric.replace(/-/g, " ")} customers`;
    document.getElementById("pageSubtitle").textContent = `${label} · agent and team leader details`;
    renderCustomers();
}

function ensureNotCalledStatusRow() {
    const statusBars = document.querySelector(".status-bars");
    if (!statusBars || document.getElementById("statusNotCalled")) return;

    const pendingRow = document.getElementById("statusPending")?.closest(".status-row");
    const pendingBar = document.getElementById("pendingBar")?.closest(".progress");

    if (!pendingRow || !pendingBar) return;

    const notCalledRow = document.createElement("div");
    notCalledRow.className = "status-row";
    notCalledRow.innerHTML = '<span>Not Called</span><strong id="statusNotCalled">0</strong>';

    const notCalledBar = document.createElement("div");
    notCalledBar.className = "progress";
    notCalledBar.innerHTML = '<div id="notCalledBar"></div>';

    statusBars.insertBefore(notCalledRow, pendingRow);
    statusBars.insertBefore(notCalledBar, pendingRow);
}

function updateDashboard() {

    const data =
        getVisibleCustomers();

    ensureNotCalledStatusRow();

    const total =
        data.length;

    const notCalled =
        data.filter(c => normalizeCustomerStatus(c.status) === "Not Called").length;

    const pending =
        data.filter(
            c => ["Pending", "Review", "TL Approved", "Logged In", "Underwriting", "Documents Pending"].includes(normalizeCustomerStatus(c.status))
        ).length;
    const regularPending = data.filter(c =>
        ["Pending", "Review"].includes(normalizeCustomerStatus(c.status))
    ).length;
    const bankStageCounts = {
        "TL Approved": data.filter(c => normalizeCustomerStatus(c.status) === "TL Approved").length,
        "Logged In": data.filter(c => normalizeCustomerStatus(c.status) === "Logged In").length,
        Underwriting: data.filter(c => normalizeCustomerStatus(c.status) === "Underwriting").length,
        "Documents Pending": data.filter(c => normalizeCustomerStatus(c.status) === "Documents Pending").length
    };


    const eligible =
        data.filter(
            c => normalizeCustomerStatus(c.status) === "Eligible"
        ).length;


    const Approved =
        data.filter(
            c => normalizeCustomerStatus(c.status) === "Approved"
        ).length;

    const rejected =
        data.filter(
            c => normalizeCustomerStatus(c.status) === "Rejected"
        ).length;

    const approvedLoanTotal = data
        .filter(c => ["Eligible", "Approved"].includes(normalizeCustomerStatus(c.status)))
        .reduce((sum, c) => sum + Number(c.loanAmount || 0), 0);

    const pendingLoanTotal = data
        .filter(c => ["Pending", "Review", "TL Approved", "Logged In", "Underwriting", "Documents Pending"].includes(normalizeCustomerStatus(c.status)))
        .reduce((sum, c) => sum + Number(c.loanAmount || 0), 0);

    const rejectedLoanTotal = data
        .filter(c => normalizeCustomerStatus(c.status) === "Rejected")
        .reduce((sum, c) => sum + Number(c.loanAmount || 0), 0);

    const disbursedLoanTotal = data
        .filter(c => normalizeCustomerStatus(c.status) === "Disbursed")
        .reduce((sum, c) => sum + Number(c.loanAmount || 0), 0);

    document
        .getElementById("totalCustomers")
        .textContent = total;

    document
        .getElementById("newCustomers")
        .textContent = notCalled;

    document
        .getElementById("pendingCustomers")
        .textContent = pending;

    const rejectedCustomersStat = document.getElementById("rejectedCustomers");
    if (rejectedCustomersStat) {
        rejectedCustomersStat.textContent = rejected;
    }

    const eligibleCustomersStat = document.getElementById("eligibleCustomers");
    if (eligibleCustomersStat) {
        eligibleCustomersStat.textContent = eligible;
    }

    const notCalledStatus = document.getElementById("statusNotCalled");
    const notCalledBar = document.getElementById("notCalledBar");

    if (notCalledStatus) {
        notCalledStatus.textContent = notCalled;
    }

    if (notCalledBar) {
        notCalledBar.style.background = "#2563eb";
        notCalledBar.style.width = (total === 0 ? 0 : (notCalled / total) * 100) + "%";
    }

    document
        .getElementById("statusPending")
        .textContent = regularPending;


    document
        .getElementById("statusEligible")
        .textContent = eligible;


    document
        .getElementById("statusApproved")
        .textContent = Approved;

    document
        .getElementById("statusRejected")
        .textContent = rejected;

    const bankStageElements = {
        "TL Approved": { count: "statusBankTlApproved", bar: "bankTlApprovedBar", color: "#0ea5e9" },
        "Logged In": { count: "statusBankLoggedIn", bar: "bankLoggedInBar", color: "#6366f1" },
        Underwriting: { count: "statusBankUnderwriting", bar: "bankUnderwritingBar", color: "#8b5cf6" },
        "Documents Pending": { count: "statusBankDocumentsPending", bar: "bankDocumentsPendingBar", color: "#f59e0b" }
    };
    Object.entries(bankStageElements).forEach(([status, elements]) => {
        const count = bankStageCounts[status];
        const countElement = document.getElementById(elements.count);
        const barElement = document.getElementById(elements.bar);
        if (countElement) countElement.textContent = count;
        if (barElement) {
            barElement.style.background = elements.color;
            barElement.style.width = `${total === 0 ? 0 : (count / total) * 100}%`;
        }
    });

    document
        .getElementById("approvedLoanTotal")
        .textContent = formatMoney(approvedLoanTotal);

    document
        .getElementById("pendingLoanTotal")
        .textContent = formatMoney(pendingLoanTotal);

    document
        .getElementById("rejectedLoanTotal")
        .textContent = formatMoney(rejectedLoanTotal);

    document
        .getElementById("disbursedLoanTotal")
        .textContent = formatMoney(disbursedLoanTotal);


    document
        .getElementById("pendingBar")
        .style.width =
        (total === 0 ? 0 : (regularPending / total) * 100) + "%";


    document
        .getElementById("eligibleBar")
        .style.width =
        (
            total === 0
                ? 0
                : (eligible / total) * 100
        ) + "%";


    document
        .getElementById("ApprovedBar")
        .style.width =
        (
            total === 0
                ? 0
                : (Approved / total) * 100
        ) + "%";

    document
        .getElementById("rejectedBar")
        .style.width =
        (total === 0 ? 0 : (rejected / total) * 100) + "%";


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
                c => {
                    const status = normalizeCustomerStatus(c.status);
                    const statusClass = status.toLowerCase().replace(/\s+/g, "-");
                    return `

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

                    <span class="status ${statusClass}">
                        ${status}
                    </span>

                </div>

            `;
                }
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
    let filtered = getFilteredAssignmentCustomers();
    if (dashboardCustomerStatuses) {
        const metricStatuses = new Set(dashboardCustomerStatuses);
        filtered = filtered.filter(customer => metricStatuses.has(normalizeCustomerStatus(customer.status)));
    }
    const canManageAssignments = ["tl", "manager", "backend", "assigner"].includes(currentUser.role);
    const assignmentTargets = canManageAssignments ? getAssignmentTargets() : [];
    const selectionLimit = getAssignmentSelectionLimit();
    const selectableIds = selectionLimit === null
        ? null
        : new Set(filtered.slice(0, selectionLimit).map(customer => customer.id));

    const body =
        document.getElementById(
            "customerTableBody"
        );


    body.innerHTML =
        filtered.map(
            c => {

                const agent = resolveCustomerAgent(c);
                const normalizedAgentId = resolveCustomerAgentId(c.agentId);
                const teamLeader = agent?.team
                    ? users.find(user => user.role === "tl" && user.team === agent.team)
                    : null;
                const latestCall = Array.isArray(c.activityHistory)
                    ? [...c.activityHistory].reverse().find(entry => ["call", "remarks"].includes(entry.type))
                    : null;
                const agentOrCaller = latestCall?.by || agent?.name || "Unassigned";

                const selectionCell = canManageAssignments
                    ? `<td><input type="checkbox" class="customer-select" value="${c.id}" aria-label="Select ${escapeHTML(c.name)}" ${selectedCustomerIds.has(c.id) || selectedAssignmentCustomerIds.has(c.id) ? "checked" : ""} ${selectableIds && !selectableIds.has(c.id) ? "disabled" : ""} onchange="toggleCustomerSelection(${c.id}, this.checked)"></td>`
                    : "";
                const assignmentCell = canManageAssignments
                    ? `<select id="agent-${c.id}" class="row-assignment-select" aria-label="Assign ${escapeHTML(c.name)}">
                        <option value="" ${!c.agentId ? "selected" : ""}>Unassigned</option>
                        ${assignmentTargets.map(target => `
                            <option value="${escapeHTML(target.id)}" ${target.id === normalizedAgentId ? "selected" : ""}>
                                ${escapeHTML(target.name)} (${target.role.toUpperCase()})
                            </option>
                        `).join("")}
                    </select>
                    <button class="action-btn" type="button" onclick="reassignCustomer(${c.id})">Save</button>`
                    : "—";

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

                    <td class="customer-remark" title="${escapeHTML(c.tlReturnComment ? `TL return reason: ${c.tlReturnComment}` : c.remarks || "No remark yet")}">
                        ${escapeHTML(c.remarks || "—")}
                        ${c.tlReturnComment ? `
                            <div class="tl-return-feedback">
                                <strong>TL return reason</strong>
                                <span>${escapeHTML(c.tlReturnComment)}</span>
                            </div>
                        ` : ""}
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

                    <td class="customer-status-cell">

                        <span class="status ${normalizeCustomerStatus(c.status).toLowerCase().replace(/\s+/g, "-")}">
                            ${normalizeCustomerStatus(c.status)}
                        </span>
                        ${c.approvalStatus === "approved" && c.bankStatus ? `
                            <div class="customer-bank-details">
                                <span class="customer-bank-detail">
                                    <span class="customer-bank-label">Bank</span>
                                    <strong>${escapeHTML(bankNameForCustomer(c) || "—")}</strong>
                                </span>
                                ${c.bankApplicationNumber ? `
                                    <span class="customer-bank-detail">
                                        <span class="customer-bank-label">App #</span>
                                        <strong>${escapeHTML(c.bankApplicationNumber)}</strong>
                                    </span>
                                ` : ""}
                                ${c.bankRemarks ? `<span class="customer-bank-update">${escapeHTML(c.bankRemarks)}</span>` : ""}
                                ${c.bankStatusUpdatedAt ? `
                                    <span class="customer-bank-updated">
                                        Updated by ${escapeHTML(users.find(user => user.id === c.bankStatusUpdatedBy)?.name || c.bankStatusUpdatedBy || "Bank")}
                                        · ${escapeHTML(formatActivityDate(c.bankStatusUpdatedAt))}
                                    </span>
                                ` : ""}
                            </div>
                        ` : ""}

                    </td>

                    <td>
                        ${escapeHTML(agentOrCaller)}
                        ${agent ? `<span class="customer-phone">Assigned: ${escapeHTML(agent.name)}</span>` : ""}
                    </td>

                    <td>
                        ${teamLeader ? escapeHTML(teamLeader.name) : "—"}
                    </td>

                    <td class="row-assignment-cell">
                        ${assignmentCell}
                    </td>

                    <td>

                        <button
                            class="action-btn"
                            onclick="openCustomer(${c.id})"
                        >
                            View
                        </button>
                        ${["tl", "manager", "backend"].includes(currentUser.role) ? `
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

                <td colspan="${canManageAssignments ? 13 : 12}"
                    style="text-align:center;padding:40px;">

                    No customers found.

                </td>

            </tr>

        `;

    }

    updateCustomerSelectionControls(filtered);
    updateAssignmentSelectionControls(filtered);

}

function toggleCustomerSelection(id, isSelected) {
    if (isSelected) selectedCustomerIds.add(id);
    else selectedCustomerIds.delete(id);
    if (isSelected) selectedAssignmentCustomerIds.add(id);
    else selectedAssignmentCustomerIds.delete(id);
    renderCustomers();
}

function toggleAllCustomers(checkbox) {
    let filteredCustomers = getFilteredAssignmentCustomers();
    if (dashboardCustomerStatuses) {
        const metricStatuses = new Set(dashboardCustomerStatuses);
        filteredCustomers = filteredCustomers.filter(customer => metricStatuses.has(normalizeCustomerStatus(customer.status)));
    }
    const selectionLimit = getAssignmentSelectionLimit();
    const visibleIds = (selectionLimit === null
        ? filteredCustomers
        : filteredCustomers.slice(0, selectionLimit)
    ).map(customer => customer.id);

    visibleIds.forEach(id => {
        if (checkbox.checked) {
            selectedCustomerIds.add(id);
            selectedAssignmentCustomerIds.add(id);
        } else {
            selectedCustomerIds.delete(id);
            selectedAssignmentCustomerIds.delete(id);
        }
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
    selectedAssignmentCustomerIds.delete(id);
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
    selectedAssignmentCustomerIds.clear();
    saveData();
    renderCustomers();
    updateDashboard();
}


/* ================= OPEN CUSTOMER ================= */

function updateForwardTLMessage() {
    const message = document.getElementById("forwardToTLMessage");
    const button = document.getElementById("forwardCustomerToTLButton");
    if (!message || !button) return;

    if (currentUser?.role !== "agent") {
        message.classList.add("hidden");
        button.classList.add("hidden");
        return;
    }

    const teamLeader = users.find(user => user.role === "tl" && user.team === currentUser.team);
    message.textContent = teamLeader
        ? `Forwarding sends this application and its uploaded document details to ${teamLeader.name} (${teamLeader.id}).`
        : `No team leader is configured for ${currentUser.team || "your team"}; forwarding is unavailable.`;
    message.classList.remove("hidden");
    button.classList.toggle("hidden", !teamLeader);
}

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
    renderCustomerHistory(customer);
    selectedCustomerDocumentIds.clear();
    renderCustomerDocuments(customer);
    updateCallbackNotificationStatus();
    updateForwardTLMessage();
    setCustomerModalReadOnly(currentUser?.role === "bank_backend");


    document
        .getElementById("customerModal")
        .classList.remove("hidden");

}

function setCustomerModalReadOnly(isReadOnly) {
    const form = document.getElementById("customerForm");
    if (!form) return;

    form.querySelectorAll("input, select, textarea").forEach(control => {
        control.disabled = isReadOnly;
    });
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) submitButton.classList.toggle("hidden", isReadOnly);
    form.querySelectorAll(".customer-document-actions .delete-document-btn")
        .forEach(button => button.classList.toggle("hidden", isReadOnly));
}


/* ================= CUSTOMER ACTIVITY HISTORY ================= */

function recordCustomerActivity(customer, type, message) {
    if (!customer) return;

    if (!Array.isArray(customer.activityHistory)) {
        customer.activityHistory = [];
    }

    customer.activityHistory.push({
        type,
        message,
        by: currentUser ? `${currentUser.name} (${currentUser.id})` : "System",
        at: new Date().toISOString()
    });
}

function renderCustomerHistory(customer) {
    const container = document.getElementById("customerHistory");
    if (!container) return;

    const history = Array.isArray(customer.activityHistory)
        ? [...customer.activityHistory].reverse()
        : [];

    container.innerHTML = history.length
        ? history.map(entry => `
            <div class="history-entry">
                <strong>${escapeHTML(entry.message || "Activity recorded")}</strong>
                <small>By ${escapeHTML(entry.by || "System")} · ${escapeHTML(formatActivityDate(entry.at))}</small>
            </div>
        `).join("")
        : '<p class="history-empty">No activity recorded yet.</p>';
}

const CUSTOMER_DOCUMENT_DB = "loanPortalCustomerDocuments";
const CUSTOMER_DOCUMENT_STORE = "documents";
const CUSTOMER_DOCUMENT_ALLOWED_EXTENSION = /\.(pdf|png|jpe?g|webp|docx?|xlsx?|csv)$/i;

function isSupportedCustomerDocument(file) {
    return CUSTOMER_DOCUMENT_ALLOWED_EXTENSION.test(file.name);
}

function openCustomerDocumentDB() {
    return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
            reject(new Error("Document storage is not supported by this browser."));
            return;
        }

        const request = indexedDB.open(CUSTOMER_DOCUMENT_DB, 1);
        request.onupgradeneeded = () => {
            if (!request.result.objectStoreNames.contains(CUSTOMER_DOCUMENT_STORE)) {
                request.result.createObjectStore(CUSTOMER_DOCUMENT_STORE);
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error || new Error("Could not open document storage."));
        request.onblocked = () => reject(new Error("Document storage is blocked by another open portal tab. Close older portal tabs and try again."));
    });
}

async function storeCustomerDocument(documentId, file) {
    const database = await openCustomerDocumentDB();
    return new Promise((resolve, reject) => {
        const transaction = database.transaction(CUSTOMER_DOCUMENT_STORE, "readwrite");
        transaction.objectStore(CUSTOMER_DOCUMENT_STORE).put(file, documentId);
        transaction.oncomplete = () => {
            database.close();
            resolve();
        };
        transaction.onerror = () => {
            database.close();
            reject(transaction.error || new Error("Could not save the document."));
        };
        transaction.onabort = () => {
            database.close();
            reject(transaction.error || new Error("Document storage was interrupted."));
        };
    });
}

async function getStoredCustomerDocument(documentId) {
    const database = await openCustomerDocumentDB();
    return new Promise((resolve, reject) => {
        const transaction = database.transaction(CUSTOMER_DOCUMENT_STORE, "readonly");
        const request = transaction.objectStore(CUSTOMER_DOCUMENT_STORE).get(documentId);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error || new Error("Could not retrieve the document."));
        transaction.oncomplete = () => database.close();
        transaction.onerror = () => {
            database.close();
            reject(transaction.error || new Error("Could not retrieve the document."));
        };
    });
}

async function deleteStoredCustomerDocument(documentId) {
    const database = await openCustomerDocumentDB();
    return new Promise((resolve, reject) => {
        const transaction = database.transaction(CUSTOMER_DOCUMENT_STORE, "readwrite");
        transaction.objectStore(CUSTOMER_DOCUMENT_STORE).delete(documentId);
        transaction.oncomplete = () => {
            database.close();
            resolve();
        };
        transaction.onerror = () => {
            database.close();
            reject(transaction.error || new Error("Could not delete the document."));
        };
        transaction.onabort = () => {
            database.close();
            reject(transaction.error || new Error("Document deletion was interrupted."));
        };
    });
}

function renderCustomerDocuments(customer) {
    const container = document.getElementById("customerDocumentList");
    if (!container) return;

    const documents = Array.isArray(customer.documents) ? customer.documents : [];
    const documentIds = new Set(documents.map(document => document.id));
    selectedCustomerDocumentIds.forEach(id => {
        if (!documentIds.has(id)) selectedCustomerDocumentIds.delete(id);
    });

    container.innerHTML = documents.length
        ? documents.map(document => `
            <div class="customer-document-item">
                <label class="customer-document-select">
                    <input type="checkbox" class="customer-document-checkbox" value="${escapeHTML(document.id)}" ${selectedCustomerDocumentIds.has(document.id) ? "checked" : ""} onchange="toggleCustomerDocumentSelection('${escapeHTML(document.id)}', this.checked)" aria-label="Select ${escapeHTML(document.name)}">
                </label>
                <span class="customer-document-name">
                    <strong>${escapeHTML(document.name)}</strong>
                    <small class="customer-phone">Uploaded ${escapeHTML(formatActivityDate(document.uploadedAt))} by ${escapeHTML(document.uploadedBy || "Unknown")}</small>
                </span>
                <div class="customer-document-actions">
                    <button type="button" class="action-btn" onclick="downloadCustomerDocument(${Number(customer.id)}, '${escapeHTML(document.id)}')">Download</button>
                    <button type="button" class="delete-document-btn" onclick="deleteCustomerDocument(${Number(customer.id)}, '${escapeHTML(document.id)}')" aria-label="Delete ${escapeHTML(document.name)}">Delete</button>
                </div>
            </div>
        `).join("")
        : '<p class="history-empty">No documents uploaded.</p>';

    updateCustomerDocumentSelectionControls(documents);
}

function toggleCustomerDocumentSelection(documentId, isSelected) {
    if (isSelected) selectedCustomerDocumentIds.add(documentId);
    else selectedCustomerDocumentIds.delete(documentId);
    const customerId = Number(document.getElementById("customerId").value);
    const customer = customers.find(item => item.id === customerId);
    if (customer) updateCustomerDocumentSelectionControls(customer.documents || []);
}

function toggleAllCustomerDocuments(isSelected) {
    const customerId = Number(document.getElementById("customerId").value);
    const customer = customers.find(item => item.id === customerId);
    if (!customer) return;
    (customer.documents || []).forEach(document => {
        if (isSelected) selectedCustomerDocumentIds.add(document.id);
        else selectedCustomerDocumentIds.delete(document.id);
    });
    renderCustomerDocuments(customer);
}

function updateCustomerDocumentSelectionControls(documents) {
    const selectedCount = documents.filter(document => selectedCustomerDocumentIds.has(document.id)).length;
    const selectAll = document.getElementById("selectAllCustomerDocuments");
    const count = document.getElementById("selectedDocumentCount");
    const downloadButton = document.getElementById("downloadSelectedDocumentsButton");
    const deleteButton = document.getElementById("deleteSelectedDocumentsButton");

    if (selectAll) {
        selectAll.checked = documents.length > 0 && selectedCount === documents.length;
        selectAll.indeterminate = selectedCount > 0 && selectedCount < documents.length;
        selectAll.disabled = documents.length === 0;
    }
    if (count) count.textContent = `${selectedCount} selected`;
    if (downloadButton) downloadButton.disabled = selectedCount === 0;
    if (deleteButton) deleteButton.disabled = selectedCount === 0;
}

function getSelectedCustomerDocuments() {
    const customerId = Number(document.getElementById("customerId").value);
    const customer = getVisibleCustomers().find(item => Number(item.id) === customerId);
    if (!customer) return { customer: null, documents: [] };
    const documents = (customer.documents || []).filter(item => selectedCustomerDocumentIds.has(item.id));
    return { customer, documents };
}

async function downloadSelectedCustomerDocuments() {
    const { customer, documents } = getSelectedCustomerDocuments();
    if (!customer || !documents.length) return;

    let failed = [];
    for (const item of documents) {
        try {
            const file = await getStoredCustomerDocument(item.id);
            if (!file) throw new Error("File unavailable");
            const url = URL.createObjectURL(file);
            const link = document.createElement("a");
            link.href = url;
            link.download = item.name;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            await new Promise(resolve => setTimeout(resolve, 150));
        } catch (error) {
            failed.push(`${item.name} (${error.message})`);
        }
    }
    if (failed.length) alert(`Could not download: ${failed.join(", ")}.`);
}

async function deleteSelectedCustomerDocuments() {
    const { customer, documents } = getSelectedCustomerDocuments();
    if (!customer || !documents.length) return;
    if (!confirm(`Delete ${documents.length} selected document(s)? This cannot be undone.`)) return;

    await removeCustomerDocuments(customer, documents);
}

async function removeCustomerDocuments(customer, documents) {
    const originalDocuments = [...(customer.documents || [])];
    const originalHistory = Array.isArray(customer.activityHistory) ? [...customer.activityHistory] : [];
    const originallySelectedIds = new Set(
        documents
            .filter(item => selectedCustomerDocumentIds.has(item.id))
            .map(item => item.id)
    );
    const deleted = [];
    const failed = [];

    for (const item of documents) {
        try {
            const file = await getStoredCustomerDocument(item.id);
            await deleteStoredCustomerDocument(item.id);
            customer.documents = customer.documents.filter(document => document.id !== item.id);
            selectedCustomerDocumentIds.delete(item.id);
            deleted.push({ item, file });
        } catch (error) {
            failed.push(`${item.name} (${error.message})`);
        }
    }

    if (deleted.length) {
        try {
            recordCustomerActivity(
                customer,
                "document",
                `Deleted ${deleted.length} document(s): ${deleted.map(entry => entry.item.name).join(", ")}`
            );
            saveData();
        } catch (error) {
            customer.documents = originalDocuments;
            customer.activityHistory = originalHistory;
            const restoreFailures = [];
            for (const { item, file } of deleted) {
                if (originallySelectedIds.has(item.id)) selectedCustomerDocumentIds.add(item.id);
                else selectedCustomerDocumentIds.delete(item.id);
                if (!file) continue;
                try {
                    await storeCustomerDocument(item.id, file);
                } catch (restoreError) {
                    restoreFailures.push(`${item.name} (${restoreError.message})`);
                }
            }
            failed.push(`Could not save customer record: ${error.message}`);
            if (restoreFailures.length) {
                failed.push(`Could not restore deleted files: ${restoreFailures.join(", ")}`);
            }
        }

        renderCustomerDocuments(customer);
        renderCustomerHistory(customer);
    }
    if (failed.length) alert(`Some documents could not be deleted:\n${failed.join("\n")}`);
}

function setupCustomerDocumentDropzone() {
    const dropZone = document.getElementById("customerDocumentDropZone");
    if (!dropZone) return;

    ["dragenter", "dragover"].forEach(eventName => {
        dropZone.addEventListener(eventName, event => {
            event.preventDefault();
            event.stopPropagation();
            dropZone.classList.add("drag-over");
        });
    });

    ["dragleave", "dragend"].forEach(eventName => {
        dropZone.addEventListener(eventName, event => {
            if (eventName === "dragleave" && dropZone.contains(event.relatedTarget)) return;
            dropZone.classList.remove("drag-over");
        });
    });

    dropZone.addEventListener("drop", event => {
        event.preventDefault();
        event.stopPropagation();
        dropZone.classList.remove("drag-over");
        const droppedFiles = Array.from(event.dataTransfer?.files || []);
        const files = droppedFiles.filter(isSupportedCustomerDocument);
        if (files.length < droppedFiles.length) {
            alert("Some files were skipped. Upload PDF, image, Word, Excel, or CSV files only.");
        }
        if (files.length) uploadCustomerDocuments(null, files);
    });
}

async function uploadCustomerDocuments(event, droppedFiles = null) {
    const input = event?.target || document.getElementById("customerDocumentsInput");
    if (!currentUser || currentUser.role === "bank_backend") {
        alert("You don't have permission to upload documents for this application.");
        if (input) input.value = "";
        return;
    }

    const files = Array.from(droppedFiles || input?.files || []);
    const customerId = Number(document.getElementById("customerId").value);

    if (!files.length) return;
    const supportedFiles = files.filter(isSupportedCustomerDocument);
    const rejectedFiles = files
        .filter(file => !isSupportedCustomerDocument(file))
        .map(file => `${file.name} (unsupported file type)`);
    if (!supportedFiles.length) {
        alert(`No supported documents were selected. Upload PDF, image, Word, Excel, or CSV files only.${rejectedFiles.length ? `\nSkipped: ${rejectedFiles.join(", ")}` : ""}`);
        if (input) input.value = "";
        return;
    }

    const visibleCustomer = getVisibleCustomers().find(item => Number(item.id) === customerId);
    if (!visibleCustomer) {
        alert("Save the customer record first, then upload documents.");
        if (input) input.value = "";
        return;
    }

    const customer = customers.find(item => Number(item.id) === customerId);
    if (!customer) {
        alert("Customer record could not be found. Please reopen it and try again.");
        if (input) input.value = "";
        return;
    }

    const uploaded = [];
    const failed = [...rejectedFiles];
    const originalDocuments = Array.isArray(customer.documents) ? [...customer.documents] : [];
    const originalHistory = Array.isArray(customer.activityHistory) ? [...customer.activityHistory] : [];
    try {
        if (!Array.isArray(customer.documents)) customer.documents = [];
        for (const file of supportedFiles) {
            const documentId = window.crypto?.randomUUID
                ? crypto.randomUUID()
                : `${customerId}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
            try {
                await storeCustomerDocument(documentId, file);
                const metadata = {
                    id: documentId,
                    name: file.name,
                    type: file.type || "application/octet-stream",
                    size: file.size,
                    uploadedAt: new Date().toISOString(),
                    uploadedBy: currentUser ? `${currentUser.name} (${currentUser.id})` : "System"
                };
                customer.documents.push(metadata);
                uploaded.push(metadata);
            } catch (error) {
                failed.push(`${file.name} (${error.message})`);
            }
        }
    } catch (error) {
        alert(`Could not upload documents: ${error.message}`);
        if (input) input.value = "";
        return;
    }

    if (uploaded.length) {
        try {
            recordCustomerActivity(
                customer,
                "document",
                `Uploaded ${uploaded.length} document(s): ${uploaded.map(document => document.name).join(", ")}`
            );
            saveData();
        } catch (error) {
            customer.documents = originalDocuments;
            customer.activityHistory = originalHistory;
            const cleanupFailures = [];
            for (const document of uploaded) {
                try {
                    await deleteStoredCustomerDocument(document.id);
                } catch (cleanupError) {
                    cleanupFailures.push(`${document.name} (${cleanupError.message})`);
                }
            }
            failed.push(...uploaded.map(document => `${document.name} (could not save customer record: ${error.message})`));
            if (cleanupFailures.length) {
                failed.push(`Storage cleanup failed: ${cleanupFailures.join(", ")}`);
            }
        }
        if (customer.documents.some(document => uploaded.some(item => item.id === document.id))) {
            renderCustomerDocuments(customer);
            renderCustomerHistory(customer);
        }
    }

    if (failed.length) {
        alert(`Some documents could not be saved:\n${failed.join("\n")}`);
    }
    if (input) input.value = "";
}

async function downloadCustomerDocument(customerId, documentId) {
    const customer = getVisibleCustomers().find(item => Number(item.id) === Number(customerId));
    if (!customer) {
        alert("You don't have permission to access this document.");
        return;
    }

    const metadata = (customer.documents || []).find(document => document.id === documentId);
    if (!metadata) return;

    try {
        const file = await getStoredCustomerDocument(documentId);
        if (!file) throw new Error("This document is no longer available in browser storage.");
        const url = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = url;
        link.download = metadata.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
        alert(error.message);
    }
}

async function deleteCustomerDocument(customerId, documentId) {
    const customer = getVisibleCustomers().find(item => Number(item.id) === Number(customerId));
    if (!customer) {
        alert("You don't have permission to delete this document.");
        return;
    }

    const metadata = (customer.documents || []).find(document => document.id === documentId);
    if (!metadata || !confirm(`Delete the document "${metadata.name}"? This cannot be undone.`)) return;

    await removeCustomerDocuments(customer, [metadata]);
}

function formatActivityDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "Unknown date" : date.toLocaleString("en-IN");
}

function toDateTimeLocalValue(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16);
}

function requestCallbackNotificationPermission() {
    if ("Notification" in window && Notification.permission === "default") {
        // Permission is requested after login because browsers require user interaction.
        return;
    }
    updateCallbackNotificationStatus();
}

function enableCallbackNotifications() {
    if (!("Notification" in window)) {
        updateCallbackNotificationStatus("This browser does not support notifications.");
        return;
    }

    Notification.requestPermission().then(permission => {
        updateCallbackNotificationStatus(
            permission === "granted"
                ? "Notifications are enabled."
                : "Notifications are blocked. Allow them in browser settings."
        );
        if (permission === "granted") startCallbackReminderWatcher();
    });
}

function updateCallbackNotificationStatus(message) {
    const status = document.getElementById("callbackNotificationStatus");
    if (!status) return;
    status.textContent = message || (
        "Notification" in window && Notification.permission === "granted"
            ? "Notifications are enabled."
            : "Notifications are not enabled."
    );
}

function startCallbackReminderWatcher() {
    if (callbackNotificationTimer) clearInterval(callbackNotificationTimer);
    checkCallbackReminders();
    callbackNotificationTimer = setInterval(checkCallbackReminders, 30000);
}

function checkCallbackReminders() {
    if (!currentUser || !("Notification" in window) || Notification.permission !== "granted") return;

    const now = Date.now();
    getVisibleCustomers().forEach(customer => {
        const callbackTime = new Date(customer.callbackAt || "").getTime();
        if (!Number.isFinite(callbackTime) || callbackTime > now || notifiedCallbackIds.has(customer.id)) return;

        new Notification("Customer callback due", {
            body: `Call ${customer.name}${customer.phone ? ` (${customer.phone})` : ""} now.`,
            tag: `callback-${customer.id}`
        });
        notifiedCallbackIds.add(customer.id);
    });
}


/* ================= FILL FORM ================= */

function getCustomerFormInput(labelText) {
    const normalize = value => String(value || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    const expectedLabel = normalize(labelText);
    const group = [...document.querySelectorAll("#customerForm .form-group")].find(item =>
        normalize(item.querySelector("label")?.textContent) === expectedLabel
    );
    return group?.querySelector("input, textarea, select") || null;
}

function setCustomerFormValue(labelText, value) {
    const input = getCustomerFormInput(labelText);
    if (!input) return;
    if (normalizeImportHeader(labelText).includes("email")) input.type = "text";
    input.value = value ?? "";
}

function getCustomerSalaryInput() {
    return getCustomerFormInput("Salary");
}

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

    const salaryInput = getCustomerSalaryInput();
    if (salaryInput) salaryInput.value = c.salary || 0;

    setCustomerFormValue("PERMANENT ADDRESS", c.permanentAddress || "");
    setCustomerFormValue("Company Name", c.companyName || "");
    setCustomerFormValue("Office Address", c.officeAddress || "");
    setCustomerFormValue("Personal Email-ID", c.personalEmail || "");
    setCustomerFormValue("Office Email-ID", c.officeEmail || "");

    document.getElementById("companyBank").value =
        c.companyBank || "";

    setCustomerFormValue("CIBIL Score", c.cibil || 0);

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

    document.getElementById("banksPushing").value =
        c.banksPushing || "";

    document.getElementById("customerStatus").value =
        c.status || "Pending";

    document.getElementById("remarks").value =
        c.remarks || "";

    document.getElementById("callbackAt").value =
        toDateTimeLocalValue(c.callbackAt);

}


/* ================= SAVE CUSTOMER ================= */

document
    .getElementById("customerForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();
            const shouldForwardToTL = event.submitter?.id === "forwardCustomerToTLButton";


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
            const previousRemarks = customer ? String(customer.remarks || "") : "";
            const previousCallbackAt = customer ? String(customer.callbackAt || "") : "";

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
                resolveCustomerAgentId(customer.agentId) !== currentUser.id
            ) {

                alert(
                    "You cannot edit this customer."
                );

                return;

            }

            const targetTL = currentUser.role === "agent"
                ? users.find(user => user.role === "tl" && user.team === currentUser.team)
                : null;
            if (shouldForwardToTL && currentUser.role !== "agent") {
                alert("Only agents can forward customer applications to a team leader.");
                return;
            }
            if (shouldForwardToTL && !targetTL) {
                alert(`No team leader is configured for ${currentUser.team || "your team"}. Ask your administrator to assign a TL to your team.`);
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


            const salaryInput = getCustomerSalaryInput();
            customer.salary = Number(salaryInput?.value || 0);


            customer.permanentAddress = getCustomerFormInput("PERMANENT ADDRESS")?.value || "";
            customer.companyName = getCustomerFormInput("Company Name")?.value || "";
            customer.officeAddress = getCustomerFormInput("Office Address")?.value || "";
            customer.personalEmail = getCustomerFormInput("Personal Email-ID")?.value || "";
            customer.officeEmail = getCustomerFormInput("Office Email-ID")?.value || "";


            customer.companyBank =
                document
                    .getElementById("companyBank")
                    .value;


            customer.cibil =
                Number(getCustomerFormInput("CIBIL Score")?.value || 0);


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

            customer.banksPushing =
                document
                    .getElementById("banksPushing")
                    .value;

            customer.status = normalizeCustomerStatus(
                document
                    .getElementById("customerStatus")
                    .value
            );
            if (customer.approvalStatus === "approved" && customer.bankStatus) {
                customer.status = normalizeBankProcessingStatus(customer.bankStatus);
            }


            customer.remarks =
                document
                    .getElementById("remarks")
                    .value;

            customer.callbackAt =
                document
                    .getElementById("callbackAt")
                    .value;

            if (currentUser.role === "agent") {
                if (shouldForwardToTL) {
                    customer.forwardedToTL = targetTL.id;
                    customer.forwardedAt = new Date().toISOString();
                    customer.approvalStatus = "pending";
                    delete customer.tlReturnComment;
                    delete customer.tlReturnAt;
                    delete customer.tlReturnBy;
                    delete customer.reviewedAt;
                    delete customer.reviewedBy;
                } else {
                    customer.approvalStatus = "draft";
                    delete customer.forwardedToTL;
                    delete customer.forwardedAt;
                }
            }

            if (isNew) {
                customer.activityHistory = [];
                customers.push(customer);
                recordCustomerActivity(customer, "created", "Customer application created");
                if (customer.agentId) {
                    const assignedAgent = users.find(user => user.id === customer.agentId);
                    recordCustomerActivity(customer, "assignment", `Assigned to ${assignedAgent ? assignedAgent.name : customer.agentId}`);
                }
            } else if (customer.remarks !== previousRemarks) {
                recordCustomerActivity(customer, "remarks", `Remarks updated: ${customer.remarks || "(cleared)"}`);
            }

            if (shouldForwardToTL) {
                recordCustomerActivity(customer, "forwarded", `Application forwarded to ${targetTL.name} (${targetTL.id}) for approval`);
            } else if (currentUser.role === "agent") {
                recordCustomerActivity(customer, "saved", "Application saved as a draft");
            }

            if (customer.callbackAt !== previousCallbackAt) {
                notifiedCallbackIds.delete(customer.id);
                if (!isNew) {
                    recordCustomerActivity(
                        customer,
                        "callback",
                        customer.callbackAt
                            ? `Callback scheduled for ${formatActivityDate(customer.callbackAt)}`
                            : "Callback reminder cleared"
                    );
                }
            }

            saveData();


            closeModal();

            renderCustomers();

            updateDashboard();


            if (shouldForwardToTL) {
                alert(`Application saved and forwarded to ${targetTL.name} (${targetTL.id}) for approval.`);
            } else {
                alert(isNew ? "Customer added successfully." : "Customer application saved successfully.");
            }

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

    renderCustomerHistory({ activityHistory: [] });
    renderCustomerDocuments({ documents: [] });
    updateForwardTLMessage();


    document
        .getElementById("customerModal")
        .classList.remove("hidden");


}


/* ================= EXCEL/CSV CUSTOMER UPLOAD ================= */

async function uploadCustomers(event) {
    if (!currentUser || !["manager", "backend", "assigner"].includes(currentUser.role)) {
        alert("Only managers, backend administrators, or assigners can upload customers.");
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

        const assignmentSummary = autoAssignImportedCustomers(imported);
        customers.push(...imported);
        saveData();
        // Reload persisted data before refreshing the UI, so the dashboard uses the saved records.
        loadCustomerData();
        renderCustomers();
        showSection("dashboard");
        alert(
            `${imported.length} customer(s) uploaded. ` +
            `${assignmentSummary.assigned} auto-assigned to matching agents; ` +
            `${assignmentSummary.unassigned} left unassigned because no agent matched their location and loan amount.`
        );
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
        location: ["location", "locations", "state", "statecode", "statecodeabbreviation"],
        btamount: ["btamount", "balancetransferamount"],
        btbank: ["btbank", "balancebank", "existingbank"],
        inhandamount: ["inhandamount", "inhand", "netloanamount"],
        companyname: ["companyname", "company", "employer"],
        permanentaddress: ["permanentaddress", "permanentaddr"],
        personalemail: ["personalemail", "personalemailid", "email", "emailid"],
        officeemail: ["officeemail", "officeemailid", "workemail"],
        officeaddress: ["officeaddress", "companyaddress", "workaddress"],
        companybank: ["companybank", "companylistedbank"],
        enquiries: ["enquiries", "numberofenquiries", "creditenquiries"],
        creditcards: ["creditcards", "creditcard", "cardsused"],
        delays: ["delays", "delayedpayments", "paymentdelays"],
        outstanding: ["outstanding", "outstandingamount"],
        banksapplied: ["banksapplied", "appliedbanks", "applied", "appliedwhere", "bankapplied", "alreadyapplied", "bankalreadyapplied"],
        bankspushing: ["bankspushing", "bankwearepushingfor", "targetbank", "preferredbank"],
        remarks: ["remarks", "callremarks", "comments"],
        callbackat: ["callbackat", "callback", "callbacktime", "callbackdatetime", "followupat", "followuptime"]
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
        "address", "location", "age", "status", "agent", "agentid", "btamount", "callbackat", "banksapplied",
        "permanentaddress", "personalemail", "officeemail", "officeaddress", "companyname"
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

function normalizeLocationCode(value) {
    const normalized = String(value || "").trim().toUpperCase();
    const stateCodes = {
        "MAHARASHTRA": "MH",
        "ANDHRA PRADESH": "AP",
        "TELANGANA": "TL",
        "KARNATAKA": "KA",
        "TAMIL NADU": "TN",
        "KERALA": "KL",
        "DELHI": "DL",
        "GUJARAT": "GJ",
        "RAJASTHAN": "RJ",
        "UTTAR PRADESH": "UP",
        "WEST BENGAL": "WB",
        "MADHYA PRADESH": "MP",
        "PUNJAB": "PB",
        "HARYANA": "HR",
        "ODISHA": "OD",
        "BIHAR": "BR"
    };
    if (stateCodes[normalized]) return stateCodes[normalized];

    // Accept full addresses such as "Pune, Maharashtra" and state codes in a location field.
    for (const [state, code] of Object.entries(stateCodes)) {
        if (normalized.includes(state)) return code;
    }
    const codeMatch = normalized.match(/(?:^|[^A-Z])(MH|AP|TL|KA|TN|KL|DL|GJ|RJ|UP|WB|MP|PB|HR|OD|BR)(?:$|[^A-Z])/);
    return codeMatch ? codeMatch[1] : normalized;
}

function parseAgentLocations(value) {
    const locations = Array.isArray(value) ? value : String(value || "").split(/[,;|/]/);
    return [...new Set(locations.map(normalizeLocationCode).filter(Boolean))];
}

function autoAssignImportedCustomers(importedCustomers) {
    const agents = users.filter(user => user.role === "agent");
    const assignmentCounts = new Map(agents.map(agent => [
        agent.id,
        customers.filter(customer => customer.agentId === agent.id).length
    ]));
    const configuredLocationCodes = new Set(agents.flatMap(agent =>
        parseAgentLocations(agent.agentLocations || agent.locations)
    ));
    let assigned = 0;
    let unassigned = 0;

    importedCustomers.forEach(customer => {
        if (customer.agentId) {
            assignmentCounts.set(customer.agentId, (assignmentCounts.get(customer.agentId) || 0) + 1);
            assigned++;
            return;
        }

        const locationCandidates = [customer.location, customer.address]
            .map(normalizeLocationCode)
            .filter(Boolean);
        const location = locationCandidates.find(code => configuredLocationCodes.has(code)) || locationCandidates[0];
        const loanAmount = parseImportNumber(customer.loanAmount);
        const matchingAgents = agents.filter(agent => {
            const locations = parseAgentLocations(agent.agentLocations || agent.locations);
            const minimum = parseImportNumber(agent.minLoanAmount);
            const maximum = agent.maxLoanAmount === null || agent.maxLoanAmount === "" || agent.maxLoanAmount === undefined
                ? Infinity
                : parseImportNumber(agent.maxLoanAmount);
            return location && locations.includes(location) &&
                loanAmount >= minimum && loanAmount <= maximum;
        }).sort((first, second) =>
            (assignmentCounts.get(first.id) || 0) - (assignmentCounts.get(second.id) || 0)
        );

        const agent = matchingAgents[0];
        if (!agent) {
            unassigned++;
            return;
        }

        customer.agentId = agent.id;
        assignmentCounts.set(agent.id, (assignmentCounts.get(agent.id) || 0) + 1);
        assigned++;
        recordCustomerActivity(customer, "assignment", `Automatically assigned to ${agent.name}`);
    });

    return { assigned, unassigned };
}

function createCustomerFromRow(row, index) {


    
    const get = (...names) => {
        const key = names.find(name => row[name] !== undefined);
        return key ? row[key] : "";
    };

    const requestedAgentId = get("agentid", "agent", "assignedagent");
    const eligibleAgents = users.filter(user => user.role === "agent");
    const assignedAgent = eligibleAgents.find(user => user.id === requestedAgentId);

    const customer = {
        id: Date.now() + index,
        name: get("name", "customername", "applicantname", "customer") || `Imported Customer ${index + 1}`,
        age: parseImportNumber(get("age")),
        phone: get("phone", "mobilenumber", "mobile", "phonenumber", "contactnumber"),
        address: get("address", "place", "city", "residence"),
        location: normalizeLocationCode(get("location", "locations", "state", "statecode", "statecodeabbreviation")),
        loanAmount: parseImportNumber(get("loanamount", "loan", "loanvalue")),
        btAmount: parseImportNumber(get("btamount")),
        btBank: get("btbank"),
        inHandAmount: parseImportNumber(get("inhandamount", "inhand")),
        salary: parseImportNumber(get("salary", "monthlysalary")),
        companyName: get("companyname", "company"),
        permanentAddress: get("permanentaddress", "permanentaddr"),
        personalEmail: get("personalemail", "personalemailid", "email", "emailid"),
        officeEmail: get("officeemail", "officeemailid", "workemail"),
        officeAddress: get("officeaddress", "companyaddress", "workaddress"),
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
        banksPushing: get("bankspushing"),
        status: normalizeCustomerStatus(
            ["Not called", "Not Called", "Pending", "Eligible", "Review", "Approved", "Rejected", "Disbursed"].includes(get("status"))
                ? get("status")
                : "Not Called"
        ),
        remarks: get("remarks", "callremarks"),
        agentId: assignedAgent ? assignedAgent.id : "",
        callbackAt: get("callbackat", "callback", "callbacktime"),
        activityHistory: []
    };

    recordCustomerActivity(customer, "created", "Customer imported");
    if (assignedAgent) {
        recordCustomerActivity(customer, "assignment", `Assigned to ${assignedAgent.name}`);
    }
    return customer;
}

/* ================= CLOSE MODAL ================= */

function closeModal() {

    document
        .getElementById("customerModal")
        .classList.add("hidden");
    setCustomerModalReadOnly(false);

}

// Normalize the modal after the browser repairs the unmatched closing div
// in the existing HTML, which can leave form sections outside the modal card.
function repairCustomerModalStructure() {
    const modal = document.getElementById("customerModal");
    const content = modal?.querySelector(".modal-content");
    const form = document.getElementById("customerForm");
    if (!modal || !content || !form) return;

    const header = content.querySelector(".modal-header");
    const misplacedElements = [
        ...Array.from(content.children),
        ...Array.from(modal.children)
    ].filter(element =>
        element !== content && element !== header && element !== form
    );

    content.replaceChildren(...[header, form].filter(Boolean));
    misplacedElements.forEach(element => form.appendChild(element));
}

repairCustomerModalStructure();

const customerModal = document.getElementById("customerModal");

customerModal.addEventListener("click", event => {
    if (event.target === customerModal) closeModal();
});

document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;

    closeAccountMenu();
    const passwordModal = document.getElementById("changePasswordModal");
    if (passwordModal && !passwordModal.classList.contains("hidden")) {
        closeChangePassword();
    }

    const calculatorPopup = document.getElementById("calculatorPopup");
    if (calculatorPopup && !calculatorPopup.hidden) {
        calculatorPopup.hidden = true;
    }

    if (!customerModal.classList.contains("hidden")) {
        closeModal();
    }
});


/* ================= ASSIGNMENTS ================= */

function getAssignmentTargets() {
    if (currentUser.role === "tl") {
        return users.filter(user =>
            (user.role === "agent" && user.team === currentUser.team) ||
            user.id === currentUser.id
        );
    }

    if (["manager", "backend", "assigner"].includes(currentUser.role)) {
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
    const customerStatus = document.getElementById("statusFilter")?.value || "all";

    return filterCustomers(getVisibleCustomers(), "customer").filter(customer => {
        if (customerStatus !== "all" && normalizeCustomerStatus(customer.status) !== customerStatus) return false;
        if (assignmentStatus === "unassigned" && customer.agentId) return false;
        if (assignmentStatus === "assigned" && !customer.agentId) return false;
        if (assignee === "unassigned") return !customer.agentId;
        if (assignee !== "all") return customer.agentId === assignee;
        return true;
    });
}

function getAssignmentSelectionLimit() {
    const value = document.getElementById("assignmentSelectCount")?.value.trim();
    if (!value) return null;

    const count = Number(value);
    return Number.isInteger(count) && count > 0 ? count : null;
}

function renderAssignments() {
    updateAssignmentAssigneeFilter();

    const assignmentTargets = getAssignmentTargets();
    const bulkAgentSelect = document.getElementById("bulkAssignmentAgent");
    if (bulkAgentSelect) {
        const currentValue = bulkAgentSelect.value;
        bulkAgentSelect.innerHTML = `<option value="">Select assignee</option>` + assignmentTargets.map(target =>
            `<option value="${escapeHTML(target.id)}">${escapeHTML(target.name)} (${escapeHTML(target.id)}) - ${target.role.toUpperCase()}</option>`
        ).join("");
        bulkAgentSelect.value = assignmentTargets.some(target => target.id === currentValue) ? currentValue : "";
    }
    updateAssignmentSelectionControls(getFilteredAssignmentCustomers());
}

function toggleAssignmentSelection(id, isSelected) {
    const selectionLimit = getAssignmentSelectionLimit();
    if (isSelected && selectionLimit !== null) {
        const allowedIds = new Set(
            getFilteredAssignmentCustomers()
                .slice(0, selectionLimit)
                .map(customer => customer.id)
        );
        if (!allowedIds.has(id)) return;
    }

    if (isSelected) {
        selectedAssignmentCustomerIds.add(id);
        selectedCustomerIds.add(id);
    } else {
        selectedAssignmentCustomerIds.delete(id);
        selectedCustomerIds.delete(id);
    }
    renderCustomers();
}

function toggleAllAssignments(checkbox) {
    const filteredCustomers = getFilteredAssignmentCustomers();
    const selectionLimit = getAssignmentSelectionLimit();
    const customersToSelect = selectionLimit === null
        ? filteredCustomers
        : filteredCustomers.slice(0, selectionLimit);

    if (checkbox.checked) {
        customersToSelect.forEach(customer => {
            selectedAssignmentCustomerIds.add(customer.id);
            selectedCustomerIds.add(customer.id);
        });
    } else if (selectionLimit !== null) {
        selectedAssignmentCustomerIds.clear();
        selectedCustomerIds.clear();
    } else {
        filteredCustomers.forEach(customer => {
            selectedAssignmentCustomerIds.delete(customer.id);
            selectedCustomerIds.delete(customer.id);
        });
    }

    renderCustomers();
}

function selectAssignmentCount() {
    const input = document.getElementById("assignmentSelectCount");
    const requestedCount = Number(input.value);

    if (!Number.isInteger(requestedCount) || requestedCount < 1) {
        alert("Enter a whole number of at least 1.");
        input.focus();
        return;
    }

    const filteredCustomers = getFilteredAssignmentCustomers();

    // Replace the selection so only the first N filtered rows remain selected.
    selectedAssignmentCustomerIds = new Set(filteredCustomers.slice(0, requestedCount).map(customer => customer.id));
    selectedCustomerIds = new Set(selectedAssignmentCustomerIds);

    renderCustomers();
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
    const customerSelectAll = document.getElementById("selectAllCustomers");
    if (count) count.textContent = `${selectedAccessible} selected`;
    if (selectAll) {
        selectAll.checked = filteredCustomers.length > 0 && selectedVisible === filteredCustomers.length;
        selectAll.indeterminate = selectedVisible > 0 && selectedVisible < filteredCustomers.length;
    }
    if (customerSelectAll) {
        customerSelectAll.checked = filteredCustomers.length > 0 && selectedVisible === filteredCustomers.length;
        customerSelectAll.indeterminate = selectedVisible > 0 && selectedVisible < filteredCustomers.length;
    }
}

function bulkAssignCustomers() {
    const role = String(currentUser?.role || "").toLowerCase();
    if (!["tl", "manager", "backend", "assigner"].includes(role)) {
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
        if (!selectedSet.has(customer.id)) return;

        const previousAgentId = customer.agentId || "";
        customer.agentId = assignee.id;
        if (previousAgentId !== assignee.id) {
            recordCustomerActivity(customer, "assignment", `Assigned to ${assignee.name}`);
        }
    });
    selectedAssignmentCustomerIds.clear();
    selectedCustomerIds.clear();
    saveData();
    renderCustomers();
    renderAssignments();
    updateDashboard();
    alert(`${selectedIds.length} customer(s) assigned successfully.`);
}

function autoAssignSelectedCustomers() {
    const role = String(currentUser?.role || "").toLowerCase();
    if (!["tl", "manager", "backend", "assigner"].includes(role)) {
        alert("You don't have permission to assign customers.");
        return;
    }

    const accessibleCustomers = getVisibleCustomers();
    const accessibleById = new Map(accessibleCustomers.map(customer => [customer.id, customer]));
    const selectedCustomers = [...selectedAssignmentCustomerIds]
        .map(id => accessibleById.get(id))
        .filter(Boolean);
    const agents = getAssignmentTargets().filter(user => user.role === "agent");

    if (!selectedCustomers.length) {
        alert("Select at least one customer.");
        return;
    }
    if (!agents.length) {
        alert("No agents are available for assignment.");
        return;
    }
    if (!confirm(`Auto assign ${selectedCustomers.length} selected customer(s) as evenly as possible across ${agents.length} agent(s)?`)) {
        return;
    }

    const assignmentCounts = new Map(agents.map(agent => [agent.id, 0]));
    const assignedCounts = new Map(agents.map(agent => [agent.id, 0]));

    selectedCustomers.forEach(customer => {
        const agent = agents.reduce((leastAssigned, candidate) =>
            assignmentCounts.get(candidate.id) < assignmentCounts.get(leastAssigned.id)
                ? candidate
                : leastAssigned
        );

        const previousAgentId = customer.agentId || "";
        customer.agentId = agent.id;
        assignmentCounts.set(agent.id, assignmentCounts.get(agent.id) + 1);
        assignedCounts.set(agent.id, assignedCounts.get(agent.id) + 1);

        if (previousAgentId !== agent.id) {
            recordCustomerActivity(customer, "assignment", `Assigned to ${agent.name} by equal auto-assignment`);
        }
    });

    selectedAssignmentCustomerIds.clear();
    selectedCustomerIds.clear();
    saveData();
    renderCustomers();
    renderAssignments();
    updateDashboard();

    const summary = agents
        .filter(agent => assignedCounts.get(agent.id) > 0)
        .map(agent => `${agent.name}: ${assignedCounts.get(agent.id)}`)
        .join("\n");
    alert(`Auto-assignment complete.\n${summary}`);
}


/* ================= REASSIGN ================= */

function reassignCustomer(id) {

    if (
        currentUser.role !== "tl" &&
        currentUser.role !== "manager" &&
        currentUser.role !== "backend" &&
        currentUser.role !== "assigner"
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
    if (newAgent && !assignmentTarget) {
        alert("You don't have permission to assign this customer to that user.");
        return;
    }


    const customer =
        customers.find(
            c => c.id === id
        );


    if (!customer) return;


    const previousAgentId = customer.agentId || "";
    customer.agentId = newAgent;

    if (previousAgentId !== newAgent) {
        const assignedAgent = users.find(user => user.id === newAgent);
        recordCustomerActivity(
            customer,
            "assignment",
            assignedAgent ? `Assigned to ${assignedAgent.name}` : "Customer unassigned"
        );
    }

    saveData();


    renderCustomers();
    renderAssignments();

    updateDashboard();


    alert(
        "Customer assigned successfully."
    );

}


/* ================= TL LEAD REVIEW ================= */

function renderLeadsToApprove() {
    const body = document.getElementById("leadsToApproveTableBody");
    if (!body || currentUser?.role !== "tl") return;

    const leads = getVisibleCustomers().filter(customer =>
        customer.forwardedToTL === currentUser.id && customer.approvalStatus === "pending"
    );

    body.innerHTML = leads.length ? leads.map(customer => {
        const agent = resolveCustomerAgent(customer);
        const documentCount = Array.isArray(customer.documents) ? customer.documents.length : 0;
        return `
            <tr>
                <td><strong>${escapeHTML(customer.name || "Unnamed customer")}</strong><span class="customer-phone">${escapeHTML(customer.phone || "")}</span></td>
                <td>${escapeHTML(agent?.name || customer.agentId || "Unknown agent")}</td>
                <td>${formatMoney(customer.loanAmount)}</td>
                <td>${documentCount}</td>
                <td>${escapeHTML(bankNameForCustomer(customer) || "Not selected")}</td>
                <td>${escapeHTML(formatActivityDate(customer.forwardedAt))}</td>
                <td>
                    <label class="tl-return-label" for="tlReturnComment-${Number(customer.id)}">Reason for return (required)</label>
                    <textarea
                        id="tlReturnComment-${Number(customer.id)}"
                        class="tl-return-comment"
                        maxlength="1000"
                        rows="2"
                        placeholder="Explain what the agent needs to update"
                        aria-label="Required reason for returning ${escapeHTML(customer.name || "customer")} to the agent"
                    ></textarea>
                    <button type="button" class="action-btn" onclick="openCustomer(${Number(customer.id)})">Review</button>
                    <button type="button" class="primary-btn" onclick="decideForwardedLead(${Number(customer.id)}, 'approved')">Approve</button>
                    <button type="button" class="delete-customer-btn" onclick="decideForwardedLead(${Number(customer.id)}, 'returned')">Return to Agent</button>
                </td>
            </tr>
        `;
    }).join("") : '<tr><td colspan="7" style="text-align:center;padding:40px;">No applications are waiting for approval.</td></tr>';
}

function decideForwardedLead(customerId, decision) {
    if (currentUser?.role !== "tl" || !["approved", "returned"].includes(decision)) return;
    const customer = customers.find(item => item.id === customerId);
    if (!customer || customer.forwardedToTL !== currentUser.id || customer.approvalStatus !== "pending") {
        alert("This application is no longer waiting for your review.");
        renderLeadsToApprove();
        return;
    }

    const returnCommentInput = decision === "returned"
        ? document.getElementById(`tlReturnComment-${Number(customerId)}`)
        : null;
    const returnComment = returnCommentInput?.value.trim() || "";
    if (decision === "returned" && !returnComment) {
        alert("Add a comment explaining why this application is being returned and what the agent must update.");
        returnCommentInput?.focus();
        return;
    }

    if (decision === "approved") {
        const bankName = String(customer.banksPushing || "").trim();
        if (!bankName) {
            alert("Set “Bank we are pushing for” on the customer application before approving it.");
            return;
        }
        if (!getBankBackendMembers(bankName).length) {
            alert(`No bank-backend account is configured for ${bankName}. Ask the backend administrator to add one before approving.`);
            return;
        }
    }

    const action = decision === "approved" ? "Approve" : "Return";
    if (!confirm(`${action} ${customer.name}'s application?`)) return;

    customer.approvalStatus = decision;
    customer.reviewedAt = new Date().toISOString();
    customer.reviewedBy = currentUser.id;
    if (decision === "returned") {
        customer.tlReturnComment = returnComment;
        customer.tlReturnAt = customer.reviewedAt;
        customer.tlReturnBy = currentUser.id;
    }
    if (decision === "approved") {
        const bankName = bankNameForCustomer(customer);
        const appliedBanks = String(customer.banksApplied || "")
            .split(",")
            .map(bank => bank.trim())
            .filter(Boolean);
        if (!appliedBanks.some(bank => normalizeBankName(bank) === normalizeBankName(bankName))) {
            appliedBanks.push(bankName);
        }
        customer.banksApplied = appliedBanks.join(", ");
        customer.bankStatus = "TL Approved";
        customer.status = "TL Approved";
        customer.bankForwardedAt = customer.reviewedAt;
        customer.bankForwardedBy = currentUser.id;
        customer.bankStatusUpdatedAt = customer.reviewedAt;
        customer.bankStatusUpdatedBy = currentUser.id;
    }
    recordCustomerActivity(
        customer,
        "approval",
        decision === "approved"
            ? `Application approved by ${currentUser.name}`
            : `Application returned to ${resolveCustomerAgent(customer)?.name || "the agent"} for updates: ${returnComment}`
    );
    if (decision === "approved") {
        recordCustomerActivity(customer, "bank-forwarded", `Application forwarded to ${bankNameForCustomer(customer)} bank backend`);
    }
    saveData();
    renderLeadsToApprove();
    if (decision === "approved") renderTLBankApplications();
    updateDashboard();
}

function bankNameForCustomer(customer) {
    return String(customer?.banksPushing || "").trim();
}

function renderTLBankApplications() {
    const body = document.getElementById("tlBankApplicationsTableBody");
    if (!body || currentUser?.role !== "tl") return;

    const applications = getVisibleCustomers()
        .filter(customer =>
            customer.approvalStatus === "approved" &&
            customer.bankForwardedBy === currentUser.id
        )
        .sort((a, b) =>
            new Date(b.bankForwardedAt || b.reviewedAt || 0) -
            new Date(a.bankForwardedAt || a.reviewedAt || 0)
        );
    const description = document.getElementById("tlBankApplicationsDescription");
    if (description) {
        description.textContent = `You approved and forwarded ${applications.length} application${applications.length === 1 ? "" : "s"} to bank processing`;
    }

    body.innerHTML = applications.length
        ? applications.map(customer => {
            const agent = resolveCustomerAgent(customer);
            const updatedBy = users.find(user => user.id === customer.bankStatusUpdatedBy);
            const status = normalizeBankProcessingStatus(customer.bankStatus);
            return `
                <tr>
                    <td>
                        <strong>${escapeHTML(customer.name || "Unnamed customer")}</strong>
                        <span class="customer-phone">${escapeHTML(customer.phone || "")}</span>
                        <small class="customer-phone">Application #${Number(customer.id)}</small>
                    </td>
                    <td>${escapeHTML(agent?.name || customer.agentId || "Unknown agent")}</td>
                    <td>${formatMoney(customer.loanAmount)}</td>
                    <td>${escapeHTML(bankNameForCustomer(customer) || "—")}</td>
                    <td>${escapeHTML(formatActivityDate(customer.bankForwardedAt || customer.reviewedAt))}</td>
                    <td>${escapeHTML(customer.bankApplicationNumber || "Not assigned")}</td>
                    <td><span class="status ${status.toLowerCase().replace(/\s+/g, "-")}">${escapeHTML(status)}</span></td>
                    <td>${escapeHTML(customer.bankRemarks || "—")}</td>
                    <td>
                        ${escapeHTML(updatedBy?.name || customer.bankStatusUpdatedBy || "—")}
                        <span class="customer-phone">${escapeHTML(formatActivityDate(customer.bankStatusUpdatedAt || customer.bankForwardedAt))}</span>
                    </td>
                    <td><button type="button" class="action-btn" onclick="openCustomer(${Number(customer.id)})">View Sheet</button></td>
                </tr>
            `;
        }).join("")
        : '<tr><td colspan="10" style="text-align:center;padding:40px;">You have not approved and sent any applications to bank processing yet.</td></tr>';
}

function renderBankApplications() {
    const body = document.getElementById("bankQueueTableBody");
    if (!body || currentUser?.role !== "bank_backend") return;

    const applications = getVisibleCustomers();
    const statusCounts = applications.reduce((counts, customer) => {
        const status = normalizeBankProcessingStatus(customer.bankStatus);
        counts[status] = (counts[status] || 0) + 1;
        return counts;
    }, {});
    const tabCounts = {
        all: applications.length,
        "TL Approved": statusCounts["TL Approved"] || 0,
        "Logged In": statusCounts["Logged In"] || 0,
        Underwriting: statusCounts.Underwriting || 0,
        "Documents Pending": statusCounts["Documents Pending"] || 0,
        Approved: statusCounts.Approved || 0,
        Rejected: statusCounts.Rejected || 0,
        Disbursed: statusCounts.Disbursed || 0
    };
    const tabCountElements = {
        all: "bankQueueCountAll",
        "TL Approved": "bankQueueCountTlApproved",
        "Logged In": "bankQueueCountLoggedIn",
        Underwriting: "bankQueueCountUnderwriting",
        "Documents Pending": "bankQueueCountDocumentsPending",
        Approved: "bankQueueCountApproved",
        Rejected: "bankQueueCountRejected",
        Disbursed: "bankQueueCountDisbursed"
    };
    Object.entries(tabCountElements).forEach(([status, elementId]) => {
        const element = document.getElementById(elementId);
        if (element) element.textContent = tabCounts[status];
    });
    document.querySelectorAll(".bank-queue-tab").forEach(tab => {
        const isActive = tab.dataset.bankStatus === bankQueueStatusFilter;
        tab.classList.toggle("active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
    });

    const visibleApplications = bankQueueStatusFilter === "all"
        ? applications
        : applications.filter(customer =>
            normalizeBankProcessingStatus(customer.bankStatus) === bankQueueStatusFilter
        );
    const queueTitle = bankQueueStatusFilter === "all"
        ? `All applications · ${applications.length}`
        : `${bankQueueStatusFilter} applications · ${visibleApplications.length}`;
    const description = document.getElementById("bankQueueDescription");
    if (description) description.textContent = `${currentUser.bankName} · ${queueTitle}`;

    body.innerHTML = visibleApplications.length
        ? visibleApplications.map(customer => {
            const status = normalizeBankProcessingStatus(customer.bankStatus);
            const options = BANK_PROCESSING_STATUSES.map(option =>
                `<option value="${option}" ${option === status ? "selected" : ""}>${option}</option>`
            ).join("");
            return `
                <tr>
                    <td>
                        <strong>${escapeHTML(customer.name || "Unnamed customer")}</strong>
                        <span class="customer-phone">${escapeHTML(customer.phone || "No phone")}</span>
                        <small class="customer-phone">Application #${escapeHTML(customer.id)}</small>
                        <small class="customer-phone">Bank: ${escapeHTML(bankNameForCustomer(customer))}</small>
                    </td>
                    <td>
                        <strong>${formatMoney(customer.loanAmount)}</strong>
                        <span class="customer-phone">BT: ${formatMoney(customer.btAmount)}</span>
                        <span class="customer-phone">Salary: ${formatMoney(customer.salary)}</span>
                        <span class="customer-phone">CIBIL: ${escapeHTML(customer.cibil ?? "—")}</span>
                    </td>
                    <td>
                        <span>${escapeHTML(customer.address || "—")}</span>
                        <span class="customer-phone">${escapeHTML(customer.location || "")}</span>
                        <span class="customer-phone">${escapeHTML(customer.personalEmail || "")}</span>
                    </td>
                    <td>
                        ${(customer.documents || []).length
                            ? `<button type="button" class="action-btn" onclick="downloadBankCustomerDocuments(${Number(customer.id)})">Download ${(customer.documents || []).length} file(s)</button>`
                            : '<span class="customer-phone">No uploaded files</span>'}
                    </td>
                    <td>
                        ${escapeHTML(users.find(user => user.id === customer.reviewedBy)?.name || customer.reviewedBy || "—")}
                        <span class="customer-phone">${escapeHTML(formatActivityDate(customer.reviewedAt))}</span>
                    </td>
                    <td>
                        <input
                            id="bankApplicationNumber-${Number(customer.id)}"
                            type="text"
                            maxlength="80"
                            value="${escapeHTML(customer.bankApplicationNumber || "")}"
                            placeholder="Enter bank application number"
                            aria-label="Bank application number for ${escapeHTML(customer.name)}"
                        >
                    </td>
                    <td>
                        <select id="bankStatus-${Number(customer.id)}" aria-label="Bank status for ${escapeHTML(customer.name)}">
                            ${options}
                        </select>
                    </td>
                    <td>
                        <input id="bankRemarks-${Number(customer.id)}" value="${escapeHTML(customer.bankRemarks || "")}" placeholder="Application / banking update" aria-label="Banking update for ${escapeHTML(customer.name)}">
                    </td>
                    <td>
                        <button type="button" class="action-btn" onclick="openCustomer(${Number(customer.id)})">View Sheet</button>
                        <button type="button" class="primary-btn" onclick="updateBankApplication(${Number(customer.id)})">Save Update</button>
                    </td>
                </tr>
            `;
        }).join("")
        : '<tr><td colspan="9" style="text-align:center;padding:40px;">No applications have been approved and routed to your bank yet.</td></tr>';
}

function setBankQueueStatusFilter(status) {
    if (currentUser?.role !== "bank_backend") return;
    if (status !== "all" && !BANK_PROCESSING_STATUSES.includes(status)) {
        alert("Choose a valid bank application page.");
        return;
    }
    bankQueueStatusFilter = status;
    renderBankApplications();
}

async function downloadBankCustomerDocuments(customerId) {
    if (currentUser?.role !== "bank_backend") {
        alert("Only bank-backend users can download files from bank applications.");
        return;
    }

    const customer = getVisibleCustomers().find(item => Number(item.id) === Number(customerId));
    if (!customer) {
        alert("This application is not assigned to your bank.");
        return;
    }

    const documents = Array.isArray(customer.documents) ? customer.documents : [];
    if (!documents.length) {
        alert("No files have been uploaded for this application.");
        return;
    }

    const failed = [];
    for (const item of documents) {
        try {
            const file = await getStoredCustomerDocument(item.id);
            if (!file) throw new Error("File unavailable");

            const url = URL.createObjectURL(file);
            const link = document.createElement("a");
            link.href = url;
            link.download = item.name;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            await new Promise(resolve => setTimeout(resolve, 150));
        } catch (error) {
            failed.push(`${item.name} (${error.message})`);
        }
    }

    if (failed.length) {
        alert(`Could not download: ${failed.join(", ")}.`);
    }
}

function updateBankApplication(customerId) {
    if (currentUser?.role !== "bank_backend") {
        alert("Only bank-backend users can update bank application details.");
        return;
    }

    const customer = getVisibleCustomers().find(item => Number(item.id) === Number(customerId));
    if (!customer) {
        alert("This application is not assigned to your bank.");
        renderBankApplications();
        return;
    }

    const applicationNumberInput = document.getElementById(`bankApplicationNumber-${Number(customerId)}`);
    const applicationNumber = applicationNumberInput?.value.trim() || "";
    if (applicationNumber.length > 80) {
        alert("Bank application number must be 80 characters or fewer.");
        return;
    }

    const status = document.getElementById(`bankStatus-${Number(customerId)}`)?.value;
    if (!BANK_PROCESSING_STATUSES.includes(status)) {
        alert("Choose a valid bank processing status.");
        return;
    }

    const remarks = document.getElementById(`bankRemarks-${Number(customerId)}`)?.value.trim() || "";
    const previousStatus = normalizeBankProcessingStatus(customer.bankStatus);
    const previousRemarks = customer.bankRemarks || "";
    const previousApplicationNumber = customer.bankApplicationNumber || "";
    customer.bankStatus = status;
    customer.status = status;
    customer.bankRemarks = remarks;
    customer.bankApplicationNumber = applicationNumber;
    customer.bankStatusUpdatedAt = new Date().toISOString();
    customer.bankStatusUpdatedBy = currentUser.id;
    if (status !== previousStatus || remarks !== previousRemarks || applicationNumber !== previousApplicationNumber) {
        const applicationNumberUpdate = applicationNumber !== previousApplicationNumber
            ? `; bank application number ${applicationNumber || "cleared"}`
            : "";
        recordCustomerActivity(
            customer,
            "bank-status",
            `Bank application updated to ${status}${applicationNumberUpdate}${remarks ? `: ${remarks}` : ""}`
        );
    }

    saveData();
    renderBankApplications();
    renderTLBankApplications();
    updateDashboard();
    renderCustomers();
    renderPerformanceLoanAmounts();
    alert("Bank application details saved.");
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


                const Approved =
                    data.filter(
                        c =>
                            c.status === "Approved"
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
                        <span>Approved</span>
                        <strong>${Approved}</strong>
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
        const role = currentManagementPage;
        const hasAssignmentCriteria = ["agent", "tl"].includes(role);
        const team = hasAssignmentCriteria ? document.getElementById("newAgentTeam").value.trim() : "";
        const bankName = role === "bank_backend" ? document.getElementById("newAgentBank").value.trim() : "";
        const floor = document.getElementById("newAgentFloor").value.trim();
        const agentLocations = hasAssignmentCriteria
            ? parseAgentLocations(document.getElementById("newAgentLocations").value)
            : [];
        const minLoanAmount = hasAssignmentCriteria
            ? Number(document.getElementById("newAgentMinLoan").value) || 0
            : 0;
        const maxLoanInput = hasAssignmentCriteria
            ? document.getElementById("newAgentMaxLoan").value.trim()
            : "";
        const maxLoanAmount = maxLoanInput ? Number(maxLoanInput) : null;

        if (!['agent', 'tl', 'manager', 'assigner', 'bank_backend'].includes(role)) {
            alert("Choose a valid team-member role.");
            return;
        }
        if (role === "bank_backend" && !bankName) {
            alert("Enter the bank assigned to this bank-backend account.");
            return;
        }
        if (["agent", "tl"].includes(role) && !team) {
            alert("Enter a team for agents and team leaders.");
            return;
        }
        if (maxLoanAmount !== null && (!Number.isFinite(maxLoanAmount) || maxLoanAmount < minLoanAmount)) {
            alert("Maximum loan amount must be greater than or equal to the minimum.");
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
            bankName,
            branch: currentUser.branch,
            floor,
            agentLocations,
            minLoanAmount,
            maxLoanAmount,
            isCustom: true
        });

        saveAgents();
        event.target.reset();
        document.getElementById("newAgentTeam").value = "TEAM01";
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
        const role = document.getElementById("editAgentRole").value;
        const hasAssignmentCriteria = ["agent", "tl"].includes(role);
        const team = hasAssignmentCriteria ? document.getElementById("editAgentTeam").value.trim() : "";
        const bankName = role === "bank_backend" ? document.getElementById("editAgentBank").value.trim() : "";
        const floor = document.getElementById("editAgentFloor").value.trim();
        const agentLocations = hasAssignmentCriteria
            ? parseAgentLocations(document.getElementById("editAgentLocations").value)
            : [];
        const minLoanAmount = hasAssignmentCriteria
            ? Number(document.getElementById("editAgentMinLoan").value) || 0
            : 0;
        const maxLoanInput = hasAssignmentCriteria
            ? document.getElementById("editAgentMaxLoan").value.trim()
            : "";
        const maxLoanAmount = maxLoanInput ? Number(maxLoanInput) : null;

        if (!member || !["agent", "tl", "manager", "bank_backend"].includes(member.role)) {
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
        if (!['agent', 'tl', 'manager', 'assigner', 'bank_backend'].includes(role)) {
            alert("Choose a valid team-member role.");
            return;
        }
        if (role === "bank_backend" && !bankName) {
            alert("Enter the bank assigned to this bank-backend account.");
            return;
        }
        if (["agent", "tl"].includes(role) && !team) {
            alert("Enter a team for agents and team leaders.");
            return;
        }
        if (maxLoanAmount !== null && (!Number.isFinite(maxLoanAmount) || maxLoanAmount < minLoanAmount)) {
            alert("Maximum loan amount must be greater than or equal to the minimum.");
            return;
        }

        member.id = id;
        member.name = name;
        member.team = team;
        member.bankName = bankName;
        member.floor = floor;
        member.role = role;
        member.agentLocations = agentLocations;
        member.minLoanAmount = minLoanAmount;
        member.maxLoanAmount = maxLoanAmount;
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
    if (!member || !["agent", "tl", "manager", "bank_backend"].includes(member.role)) return;

    document.getElementById("editAgentOriginalId").value = member.id;
    document.getElementById("editAgentId").value = member.id;
    document.getElementById("editAgentName").value = member.name;
    document.getElementById("editAgentPassword").value = "";
    document.getElementById("editAgentTeam").value = member.team || "";
    document.getElementById("editAgentBank").value = member.bankName || "";
    document.getElementById("editAgentFloor").value = member.floor || "";
    document.getElementById("editAgentLocations").value = (member.agentLocations || []).join(", ");
    document.getElementById("editAgentMinLoan").value = member.minLoanAmount ?? 0;
    document.getElementById("editAgentMaxLoan").value = member.maxLoanAmount ?? "";
    document.getElementById("editAgentRole").value = member.role;
    updateMemberRoleFields();
    document.getElementById("editAgentPanel").classList.remove("hidden");
    document.getElementById("editAgentPanel").scrollIntoView({ behavior: "smooth", block: "center" });
}

function cancelEditTeamMember() {
    document.getElementById("editAgentForm").reset();
    document.getElementById("editAgentPanel").classList.add("hidden");
}

function renderAgents() {
    const body = document.getElementById("agentTableBody");
    const members = users.filter(user => user.role === currentManagementPage && ["agent", "tl", "manager", "bank_backend"].includes(user.role));

    if (!members.length) {
        body.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center;padding:40px;">
                    No team members found. Add someone using the form above.
                </td>
            </tr>
        `;
        return;
    }

    body.innerHTML = members.map(member => {
        const assignedCount = member.role === "bank_backend"
            ? customers.filter(customer =>
                customer.approvalStatus === "approved" &&
                normalizeBankName(customer.banksPushing) === normalizeBankName(member.bankName)
            ).length
            : customers.filter(customer => customer.agentId === member.id).length;
        const roleLabel = member.role === "tl"
            ? "Team Leader (TL)"
            : member.role === "bank_backend"
                ? "Bank Backend"
                : member.role.charAt(0).toUpperCase() + member.role.slice(1);
        const locationLabels = Array.isArray(member.agentLocations) ? member.agentLocations.join(", ") : "";
        const minLoan = formatMoney(member.minLoanAmount || 0);
        const maxLoan = member.maxLoanAmount === null || member.maxLoanAmount === undefined || member.maxLoanAmount === ""
            ? "No maximum"
            : formatMoney(member.maxLoanAmount);
        const assignmentCriteria = member.role === "agent" && locationLabels
            ? `${escapeHTML(locationLabels)} · ${minLoan}–${maxLoan}`
            : "—";
        return `
            <tr>
                <td><strong>${escapeHTML(member.name)}</strong></td>
                <td>${escapeHTML(member.id)}</td>
                <td>${escapeHTML(member.role === "bank_backend" ? member.bankName || "" : member.team || "")}</td>
                <td>${escapeHTML(member.floor || "—")}</td>
                <td>${escapeHTML(roleLabel)}</td>
                <td>${assignmentCriteria}</td>
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
        : `Remove ${member.role === "tl" ? "Team Leader" : member.role === "bank_backend" ? "Bank Backend" : "Manager"} ${member.name}?`;
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
        user.role === "agent" ||
        user.role === "assigner" ||
        (user.isCustom && ["tl", "manager", "bank_backend"].includes(user.role))
    );
    localStorage.setItem("loanPortalAgents", JSON.stringify(savedMembers));

    const removedDefaultMembers = ["TL1001", "MGR1001"].filter(
        id => !users.some(user => user.id === id)
    );
    localStorage.setItem("loanPortalRemovedMembers", JSON.stringify(removedDefaultMembers));
}


/* ================= LOGOUT ================= */

function logout() {

    closeAccountMenu();
    closeChangePassword();
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

function normalizeCustomerStatus(status) {
    const value = String(status ?? "").trim();
    const normalized = value.toLowerCase();

    const statusMap = {
        "not called": "Not Called",
        "notcalled": "Not Called",
        pending: "Pending",
        eligible: "Eligible",
        review: "Review",
        new: "TL Approved",
        "sent to bank": "TL Approved",
        "tl approved": "TL Approved",
        "logged in": "Logged In",
        underwriting: "Underwriting",
        "in process": "Underwriting",
        "documents pending": "Documents Pending",
        approved: "Approved",
        rejected: "Rejected",
        disbursed: "Disbursed"
    };

    return statusMap[normalized] || value || "Pending";
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
            customers = parsedCustomers.map(customer => {
                if (customer?.approvalStatus === "approved" && customer.bankStatus) {
                    return {
                        ...customer,
                        bankStatus: normalizeBankProcessingStatus(customer.bankStatus),
                        status: normalizeBankProcessingStatus(customer.bankStatus)
                    };
                }
                return customer;
            });
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
                ["agent", "tl", "manager", "assigner", "bank_backend"].includes(member.role) &&
                typeof member.id === "string" &&
                typeof member.name === "string" &&
                typeof member.password === "string"
            ).map(member => {
                const defaults = users.find(user => user.id === member.id) || {};
                return {
                    ...defaults,
                    ...member,
                    agentLocations: Array.isArray(member.agentLocations)
                        ? member.agentLocations
                        : (defaults.agentLocations || []),
                    minLoanAmount: member.minLoanAmount ?? defaults.minLoanAmount ?? 0,
                    maxLoanAmount: member.maxLoanAmount !== undefined
                        ? member.maxLoanAmount
                        : (defaults.maxLoanAmount ?? null)
                };
            });
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

const savedPasswords = localStorage.getItem("loanPortalPasswords");
if (savedPasswords !== null) {
    try {
        const passwordOverrides = JSON.parse(savedPasswords);
        if (passwordOverrides && typeof passwordOverrides === "object") {
            users.forEach(user => {
                if (typeof passwordOverrides[user.id] === "string") {
                    user.password = passwordOverrides[user.id];
                }
            });
        }
    } catch (error) {
        console.log("Could not load saved password changes.");
    }
}

const toggle = document.getElementById("calculatorToggle");
const popup = document.getElementById("calculatorPopup");
const close = document.getElementById("calculatorClose");
const calculatorSalary = document.getElementById("calculatorSalary");
const calculatorEmi = document.getElementById("calculatorEmi");

function calculateEligibleLoan() {
    const salary = Math.max(0, Number(calculatorSalary.value) || 0);
    const emi = Math.max(0, Number(calculatorEmi.value) || 0);
    let salaryFactor = 0;

    if (salary >= 20000 && salary <= 49999) salaryFactor = 0.55;
    else if (salary >= 50000 && salary <= 99999) salaryFactor = 0.65;
    else if (salary >= 100000) salaryFactor = 0.75;

    // Formula result is in lakhs; round down to one decimal place like ROUNDDOWN(..., 1).
    const eligibleLakhs = salaryFactor
        ? Math.trunc(((salary * salaryFactor - emi) / 2500) * 10) / 10
        : 0;

    document.getElementById("calculatorEligibleAmount").textContent =
        formatMoney(eligibleLakhs * 100000);
    document.getElementById("calculatorEligibleLakh").textContent =
        `${eligibleLakhs.toFixed(1)} lakh`;
}

toggle.addEventListener("click", () => {
    popup.hidden = !popup.hidden;
});

close.addEventListener("click", () => {
    popup.hidden = true;
});

calculatorSalary.addEventListener("input", calculateEligibleLoan);
calculatorEmi.addEventListener("input", calculateEligibleLoan);
calculateEligibleLoan();
