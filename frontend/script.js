// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        menuItems: document.querySelectorAll('.menu-item'),
        searchInput: document.querySelector('.search-input'),
        searchButton: document.querySelector('.search-button'),
        dropdownButton: document.querySelector('.dropdown-button'),
        dropdownContent: document.querySelector('.dropdown-content'),
        filterButtons: document.querySelectorAll('.filter-button'),
        themeToggle: document.querySelector('.theme-toggle')
    };

    // State management
    const state = {
        currentFilter: 'all',
        isDarkMode: true,
        isDropdownOpen: false
    };

    // Initialize dashboard
    initializeDashboard();

    // Event Listeners
    function setupEventListeners() {
        // Menu navigation
        elements.menuItems.forEach(item => {
            item.addEventListener('click', () => {
                updateActiveMenuItem(item);
                navigateToSection(item.dataset.section);
            });
        });

        // Search functionality
        elements.searchInput.addEventListener('input', debounce((e) => {
            handleSearch(e.target.value);
        }, 300));

        elements.searchButton.addEventListener('click', () => {
            handleSearch(elements.searchInput.value);
        });

        // Dropdown toggle
        elements.dropdownButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            if (state.isDropdownOpen) {
                closeDropdown();
            }
        });

        // Filter buttons
        elements.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                updateActiveFilter(button);
                handleFilterChange(button.dataset.type);
            });
        });

        // Theme toggle
        elements.themeToggle.addEventListener('click', toggleTheme);
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
    function updateActiveMenuItem(clickedItem) {
        elements.menuItems.forEach(item => item.classList.remove('active'));
        clickedItem.classList.add('active');
    }

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
        elements.dropdownContent.classList.toggle('show');
    }

    function closeDropdown() {
        state.isDropdownOpen = false;
        elements.dropdownContent.classList.remove('show');
    }

    // Filter Functions
    function updateActiveFilter(button) {
        elements.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        state.currentFilter = button.dataset.type;
    }

    function handleFilterChange(filterType) {
        const filteredTransactions = filterTransactionsByType(filterType);
        updateTransactionDisplay(filteredTransactions);
    }

    // Theme Functions
    function toggleTheme() {
        state.isDarkMode = !state.isDarkMode;
        document.body.classList.toggle('light-mode');
        elements.themeToggle.textContent = state.isDarkMode ? '🌞' : '🌙';
        localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light');
    }

    function setInitialTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        state.isDarkMode = savedTheme === 'dark';
        if (!state.isDarkMode) {
            document.body.classList.add('light-mode');
            elements.themeToggle.textContent = '🌙';
        }
    }

    // Metrics Functions
    function updateMetrics() {
        const metrics = {
            received: 200500.00,
            shopping: 30500.00,
            sent: 40500.00
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
            .then(transactions => {
                updateTransactionDisplay(transactions);
            })
            .catch(handleError);
    }

    function updateTransactionDisplay(transactions) {
        // Implement transaction display logic
        console.log('Updating transactions:', transactions);
    }

    function filterTransactionsBySearch(searchTerm) {
        return mockTransactions.filter(transaction => 
            transaction.description.toLowerCase().includes(searchTerm) ||
            transaction.amount.toString().includes(searchTerm)
        );
    }

    function filterTransactionsByType(type) {
        if (type === 'all') return mockTransactions;
        return mockTransactions.filter(transaction => transaction.type === type);
    }

    // Utility Functions
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'RWF'
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
        return transactions.filter(transaction => 
            transaction.description.toLowerCase().includes(searchTerm) ||
            transaction.amount.toString().includes(searchTerm)
        );
    }

    function filterTransactionsByType(type) {
        // Implement transaction type filtering
        return transactions.filter(transaction => 
            transaction.type === type
        );
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
        console.log('Loading home section');
    }

    function loadAnalyticsSection() {
        // Implement analytics section loading
        console.log('Loading analytics section');
    }

    function loadTransactionsSection() {
        // Implement transactions section loading
        console.log('Loading transactions section');
    }

    // Error Handling
    function handleError(error) {
        console.error('Dashboard Error:', error);
        // Implement error notification system
    }

   
});