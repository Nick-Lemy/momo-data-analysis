// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const elements = {
    menuItems: document.querySelectorAll(".menu-item"),
    searchInput: document.querySelector(".search-input"),
    searchButton: document.querySelector(".search-button"),
    dropdownButton: document.querySelector(".dropdown-button"),
    dropdownContent: document.querySelector(".dropdown-content"),
    filterButtons: document.querySelectorAll(".filter-button"),
    analysis: document.querySelector("#analysis"),
    home: document.querySelector("home"),
  };

  // State management
  const state = {
    currentFilter: "all",
    isDarkMode: true,
    isDropdownOpen: false,
  };

  // Initialize dashboard
  initializeDashboard();

  // Event Listeners
  function setupEventListeners() {
    // Menu navigation
    elements.menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        updateActiveMenuItem(item);
        navigateToSection(item.dataset.section);
      });
    });

    // elements.analysis.addEventListener("click", () => {
    //   const name = document.querySelector("#trans").className;
    //   const name2 = document.querySelector("#thechart").className;
    //   if (name.includes("no"))
    //     document.querySelector("#trans").classList.remove("no");
    //   if (name2.includes("no"))
    //     document.querySelector("#thechart").classList.remove("no");

    //   fetchData();
    // });

    // elements.home.addEventListener("click", () => {
    //   const name = document.querySelector("#trans").className;
    //   const name2 = document.querySelector("#thechart").className;
    //   if (name.includes("no") !== true)
    //     document.querySelector("#trans").classList.add("no");
    //   if (name2.includes("no") !== true)
    //     document.querySelector("#thechart").classList.add("no");

    //   fetchTransactions();
    //   fetchData();
    // });

    // Search functionality
    elements.searchInput.addEventListener(
      "input",
      debounce((e) => {
        handleSearch(e.target.value);
      }, 300)
    );

    elements.searchButton.addEventListener("click", () => {
      handleSearch(elements.searchInput.value);
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
      if (state.isDropdownOpen) {
        closeDropdown();
      }
    });

    // Filter buttons
    elements.filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        updateActiveFilter(button);
        handleFilterChange(button.dataset.type);
      });
    });

    // Theme toggle
  }

  // Initialization
  function initializeDashboard() {
    setupEventListeners();
    loadInitialData();
    setInitialTheme();
  }

  // Data Loading
  function loadInitialData() {
    updateMetrics();
    loadTransactions();
  }

  // Menu Functions

  function navigateToSection(section) {
    console.log(`Navigating to ${section} section`);
    // Implement section navigation logic
  }

  // Search Functions
  function handleSearch(searchTerm) {
    searchTerm = searchTerm.toLowerCase().trim();
    if (searchTerm.length < 2) return;

    // Filter transactions based on search term
    const filteredTransactions = filterTransactionsBySearch(searchTerm);
    updateTransactionDisplay(filteredTransactions);
  }

  // Dropdown Functions
  function toggleDropdown() {
    state.isDropdownOpen = !state.isDropdownOpen;
    elements.dropdownContent.classList.toggle("show");
  }

  function closeDropdown() {
    state.isDropdownOpen = false;
    elements.dropdownContent.classList.remove("show");
  }

  // Filter Functions
  function updateActiveFilter(button) {
    elements.filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    state.currentFilter = button.dataset.type;
  }

  function handleFilterChange(filterType) {
    const filteredTransactions = filterTransactionsByType(filterType);
    updateTransactionDisplay(filteredTransactions);
  }

  // Theme Functions
  function toggleTheme() {
    state.isDarkMode = !state.isDarkMode;
    document.body.classList.toggle("light-mode");
    localStorage.setItem("theme", state.isDarkMode ? "dark" : "light");
  }

  function setInitialTheme() {
    const savedTheme = localStorage.getItem("theme") || "dark";
    state.isDarkMode = savedTheme === "dark";
    if (!state.isDarkMode) {
      document.body.classList.add("light-mode");
    }
  }

  // Metrics Functions
  function updateMetrics() {
    const metrics = {
      received: 200500.0,
      shopping: 30500.0,
      sent: 40500.0,
    };

    Object.entries(metrics).forEach(([key, value]) => {
      const element = document.querySelector(`.metric-${key}`);
      if (element) {
        element.textContent = formatCurrency(value);
      }
    });
  }

  // Transaction Functions
  function loadTransactions() {
    fetchTransactions()
      .then((transactions) => {
        updateTransactionDisplay(transactions);
      })
      .catch(handleError);
  }

  function updateTransactionDisplay(transactions) {
    // Implement transaction display logic
    console.log("Updating transactions:", transactions);
  }

  function filterTransactionsBySearch(searchTerm) {
    return mockTransactions.filter(
      (transaction) =>
        transaction.description.toLowerCase().includes(searchTerm) ||
        transaction.amount.toString().includes(searchTerm)
    );
  }

  function filterTransactionsByType(type) {
    if (type === "all") return mockTransactions;
    return mockTransactions.filter((transaction) => transaction.type === type);
  }

  // Utility Functions
  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "RWF",
    }).format(amount);
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Data Functions
  function filterTransactionsBySearch(searchTerm) {
    // Implement transaction search filtering
    return transactions.filter(
      (transaction) =>
        transaction.description.toLowerCase().includes(searchTerm) ||
        transaction.amount.toString().includes(searchTerm)
    );
  }

  function filterTransactionsByType(type) {
    // Implement transaction type filtering
    return transactions.filter((transaction) => transaction.type === type);
  }

  function loadSectionContent(section) {
    // Implement section content loading
    const sectionMap = {
      home: loadHomeSection,
      analytics: loadAnalyticsSection,
      transactions: loadTransactionsSection,
      // Add more sections as needed
    };

    if (sectionMap[section]) {
      sectionMap[section]();
    }
  }

  // Section Loading Functions
  function loadHomeSection() {
    // Implement home section loading
    console.log("Loading home section");
  }

  function loadAnalyticsSection() {
    // Implement analytics section loading
    console.log("Loading analytics section");
  }

  function loadTransactionsSection() {
    // Implement transactions section loading
    console.log("Loading transactions section");
  }

  // Error Handling
  function handleError(error) {
    console.error("Dashboard Error:", error);
    // Implement error notification system
  }

  /// DT fetching
  const API_URL = "http://localhost:3000/";

  // Keep track of current filter and search state
  let currentFilterText = "All transactions";
  let currentSearchQuery = "";

  function dateToNumber(dateString) {
    return new Date(dateString).getTime();
  }

  async function fetchTransactions() {
    try {
      const response = await fetch("http://localhost:3000/");
      if (!response.ok) throw new Error("Failed to fetch data");

      const transactions = await response.json();
      window.allTransactions = transactions;
      displayTransactions(transactions);

      setupFilterButtons();
      setupSearch();
    } catch (error) {
      console.error("Error fetching transactions:", error);
      document.getElementById("transactions-body").innerHTML =
        "<tr><td colspan='7'>Failed to load transactions.</td></tr>";
    }
  }

  function setupFilterButtons() {
    const filterButtons = document.querySelectorAll(".filter-button");

    filterButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        e.target.classList.add("active");

        currentFilterText = e.target.textContent.trim();
        applyFilterAndSearch();
      });
    });
  }

  function setupSearch() {
    const searchInput = document.querySelector(".search-input");
    const searchButton = document.querySelector(".search-button");

    // Search on input change
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      applyFilterAndSearch();
    });

    // Search on button click
    searchButton.addEventListener("click", () => {
      currentSearchQuery = searchInput.value.trim().toLowerCase();
      applyFilterAndSearch();
    });

    // Search on Enter key
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        currentSearchQuery = searchInput.value.trim().toLowerCase();
        applyFilterAndSearch();
      }
    });
  }

  function applyFilterAndSearch() {
    if (!window.allTransactions) return;

    // First, apply the category filter
    let filteredData =
      currentFilterText === "All transactions"
        ? window.allTransactions
        : window.allTransactions.filter(
            (tx) =>
              tx.transaction_type.toLowerCase() ===
              currentFilterText.toLowerCase()
          );

    // Then, apply the search filter if there's a search query
    if (currentSearchQuery) {
      filteredData = filteredData.filter((tx) => {
        return (
          // Search across all relevant fields
          tx.transaction_id
            ?.toString()
            .toLowerCase()
            .includes(currentSearchQuery) ||
          tx.transaction_type.toLowerCase().includes(currentSearchQuery) ||
          tx.message?.toLowerCase().includes(currentSearchQuery) ||
          tx.receiver?.toLowerCase().includes(currentSearchQuery) ||
          tx.amount?.toString().toLowerCase().includes(currentSearchQuery) ||
          tx.number?.toString().toLowerCase().includes(currentSearchQuery) ||
          tx.date?.toLowerCase().includes(currentSearchQuery)
        );
      });
    }

    displayTransactions(filteredData);
  }

  function displayTransactions(data) {
    const tableBody = document.getElementById("transactions-body");
    tableBody.innerHTML = "";

    if (!data || data.length === 0) {
      const message = currentSearchQuery
        ? "No transactions found matching your search criteria."
        : "No transactions found for this category.";
      tableBody.innerHTML = `<tr><td colspan='7'>${message}</td></tr>`;
      return;
    }

    // Sort by date, newest first
    data = data.sort((a, b) => dateToNumber(a.date) - dateToNumber(b.date));

    data.forEach((tx) => {
      const row = document.createElement("tr");
      row.classList.add(
        `transaction-${tx.transaction_type.toLowerCase().replace(/\s+/g, "-")}`
      );

      // If there's a search query, highlight the matching text
      const highlightText = (text) => {
        if (!currentSearchQuery || !text) return text || "N/A";
        const regex = new RegExp(`(${currentSearchQuery})`, "gi");
        return text.toString().replace(regex, "<mark>$1</mark>");
      };

      row.innerHTML = `
      <td>${highlightText(tx.transaction_id)}</td>
      <td>${highlightText(tx.transaction_type)}</td>
      <td>${highlightText(tx.message)}</td>
      <td>${highlightText(tx.receiver)}</td>
      <td>${highlightText(tx.amount)}</td>
      <td>${highlightText(tx.number)}</td>
      <td>${highlightText(tx.date)}</td>
    `;

      tableBody.appendChild(row);
    });
  }

  // Add some basic error handling for the initialization
  function initializeApp() {
    if (!document.querySelector(".transaction-filters")) {
      console.error("Transaction filters container not found!");
      return;
    }
    if (!document.getElementById("transactions-body")) {
      console.error("Transactions table body not found!");
      return;
    }
    fetchTransactions();
  }
  // Initialize the functionality
  initializeApp();
  function applyFilterAndSearch() {
    if (!window.allTransactions) return;

    // Get selected date from input
    const datePicker = document.querySelector(".date-picker");
    const selectedDate = datePicker?.value ? new Date(datePicker.value) : null;

    // First, apply the category filter
    let filteredData =
      currentFilterText === "All transactions"
        ? window.allTransactions
        : window.allTransactions.filter(
            (tx) =>
              tx.transaction_type.toLowerCase() ===
              currentFilterText.toLowerCase()
          );

    // Apply the search filter if there's a search query
    if (currentSearchQuery) {
      filteredData = filteredData.filter((tx) => {
        return (
          tx.transaction_id
            ?.toString()
            .toLowerCase()
            .includes(currentSearchQuery) ||
          tx.transaction_type.toLowerCase().includes(currentSearchQuery) ||
          tx.message?.toLowerCase().includes(currentSearchQuery) ||
          tx.receiver?.toLowerCase().includes(currentSearchQuery) ||
          tx.amount?.toString().toLowerCase().includes(currentSearchQuery) ||
          tx.number?.toString().toLowerCase().includes(currentSearchQuery) ||
          tx.date?.toLowerCase().includes(currentSearchQuery)
        );
      });
    }

    // Apply date filter if a date is selected
    if (selectedDate) {
      filteredData = filteredData.filter((tx) => {
        const transactionDate = new Date(tx.date);
        return (
          transactionDate.toDateString() === selectedDate.toDateString() // Match the exact date
        );
      });
    }

    displayTransactions(filteredData);
  }

  // Add event listener to date picker
  document.querySelector(".date-picker").addEventListener("change", () => {
    applyFilterAndSearch();
  });
});
