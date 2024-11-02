document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalAmountDisplay = document.getElementById('total-amount');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseCategorySelect = document.getElementById('expense-category');
    const addExpenseBtn = document.getElementById('add-expense-btn');
    
    let totalAmount = 0;

    // Data structure to hold category totals
    const categoryTotals = {
        Food: 0,
        Transport: 0,
        Shopping: 0,
        Bills: 0,
        Other: 0,
    };

    // Function to handle adding a new expense
    function addExpense() {
        const expenseName = expenseNameInput.value.trim();
        const expenseAmount = parseFloat(expenseAmountInput.value);
        const expenseCategory = expenseCategorySelect.value;

        // Validation
        if (!expenseName || isNaN(expenseAmount) || !expenseCategory) {
            alert('Please fill in all fields with valid data.');
            return;
        }

        // Create new expense list item
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${expenseName} - ₹${expenseAmount.toFixed(2)}</span>
            <button class="delete-btn">Delete</button>
        `;
        expenseList.appendChild(listItem);

        // Update total amount and category totals
        totalAmount += expenseAmount;
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
        categoryTotals[expenseCategory] += expenseAmount;

        // Update pie chart
        updatePieChart();

        // Clear input fields
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
        expenseCategorySelect.value = '';

        // Handle delete button functionality
        listItem.querySelector('.delete-btn').addEventListener('click', () => {
            const itemAmount = parseFloat(listItem.querySelector('span').textContent.split('₹')[1]);
            const itemCategory = listItem.querySelector('span').textContent.split(' - ')[1].split('₹')[1];
            
            // Remove item from list
            listItem.remove();

            // Update total amount and category totals
            totalAmount -= itemAmount;
            totalAmountDisplay.textContent = totalAmount.toFixed(2);
            categoryTotals[expenseCategory] -= itemAmount;

            // Update pie chart
            updatePieChart();
        });
    }

    // Event listener for the Add Expense button
    addExpenseBtn.addEventListener('click', addExpense);

    // Initialize Pie Chart
    const ctx = document.getElementById('myPieChart').getContext('2d');
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(categoryTotals),
            datasets: [{
                data: Object.values(categoryTotals),
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0'],
                borderColor: '#fff',  // Light border color
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Function to update the pie chart
    function updatePieChart() {
        myPieChart.data.datasets[0].data = Object.values(categoryTotals);
        myPieChart.data.labels = Object.keys(categoryTotals);
        myPieChart.update();
    }
});
