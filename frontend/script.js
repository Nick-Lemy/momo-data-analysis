// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Menu elements
    const menuItems = document.querySelectorAll('.menu-item');
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Search elements
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    // Dropdown elements
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    // Filter elements
    const filterButtons = document.querySelectorAll('.filter-button');
    
    // Chart data
    const monthlyData = {
        received: [65000, 59000, 80000, 81000, 76000, 82000, 90000, 95000, 123943],
        spent: [45000, 47000, 55000, 58000, 56000, 60000, 65000, 70000, 85000],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    };

    // Metrics data
    const metricsData = {
        received: 123943.00,
        shopping: 28933.00,
        sent: 35945.00
    };

    // Initialize the dashboard
    initializeDashboard();

    // Menu Item Click Handlers
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            item.classList.add('active');
            handleMenuChange(item.getAttribute('data-section'));
        });
    });

    // Search Functionality
    searchInput.addEventListener('input', debounce((e) => {
        handleSearch(e.target.value);
    }, 300));

    searchButton.addEventListener('click', () => {
        handleSearch(searchInput.value);
    });

    // Dropdown Toggle
    dropdownButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        closeDropdown();
    });

    // Prevent dropdown close when clicking inside
    dropdownContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Filter Buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            setActiveFilter(button);
            handleFilterChange(button.getAttribute('data-type'));
        });
    });

    // Theme Toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Utility Functions
    function initializeDashboard() {
        updateMetrics();
        updateChartData();
        setInitialTheme();
    }

    function handleSearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();
        if (searchTerm.length < 2) return;

        // Implement search logic here
        console.log(`Searching for: ${searchTerm}`);
        // Example: filterTransactionsBySearch(searchTerm);
    }

    function toggleDropdown() {
        dropdownContent.classList.toggle('show');
    }

    function closeDropdown() {
        dropdownContent.classList.remove('show');
    }

    function setActiveFilter(button) {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }

    function handleFilterChange(filterType) {
        // Implement filter logic here
        console.log(`Filter changed to: ${filterType}`);
        // Example: filterTransactionsByType(filterType);
    }

    function handleMenuChange(section) {
        // Implement menu change logic here
        console.log(`Menu changed to: ${section}`);
        // Example: loadSectionContent(section);
    }

    function updateMetrics() {
        // Update metrics display
        Object.entries(metricsData).forEach(([key, value]) => {
            const element = document.querySelector(`.metric-${key}`);
            if (element) {
                element.textContent = formatCurrency(value);
            }
        });
    }

    function updateChartData() {
        // Implement chart update logic here
        // Example: updateLineChart(monthlyData);
    }

    // Theme Functions
    function toggleTheme() {
        const isDarkMode = document.body.classList.toggle('light-mode');
        themeToggle.textContent = isDarkMode ? '🌙' : '🌞';
        localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    }

    function setInitialTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.textContent = '🌙';
        }
    }

    // Helper Functions
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
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

    // API Mock Functions (replace with real API calls)
    async function fetchTransactions() {
        try {
            // Simulate API call
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve([
                        // Sample transaction data
                        { id: 1, type: 'received', amount: 1000, date: '2024-02-18' },
                        { id: 2, type: 'shopping', amount: 150, date: '2024-02-17' },
                        // Add more sample data
                    ]);
                }, 500);
            });
        } catch (error) {
            handleError(error);
            return [];
        }
    }
});