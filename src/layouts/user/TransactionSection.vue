<template>
  <div class="tab-content">
    <div class="content-header">
      <h2><i class="fas fa-receipt header-icon"></i> My Transactions</h2>
      <p class="subtitle">Your purchase history</p>
    </div>

    <div class="transactions-table">
      <div class="table-header">
        <div class="header-item">Course</div>
        <div class="header-item">Date</div>
        <div class="header-item">Amount</div>
        <div class="header-item">Payment Method</div>
        <div class="header-item">Status</div>
      </div>

      <div class="transaction-row">
        <div class="transaction-cell course-cell">
          <div class="course-title">Vue.js Fundamentals</div>
        </div>
        <div class="transaction-cell date-cell">
          <i class="fas fa-calendar-alt"></i> 10 January 2023
        </div>
        <div class="transaction-cell amount-cell">
          $49.99
        </div>
        <div class="transaction-cell method-cell">
          <i class="fas fa-credit-card"></i> Credit Card (•••• 4242)
        </div>
        <div class="transaction-cell status-cell">
          <span class="status-badge status-completed">
            completed
          </span>
        </div>
      </div>

      <div class="transaction-row">
        <div class="transaction-cell course-cell">
          <div class="course-title">Advanced CSS Techniques</div>
        </div>
        <div class="transaction-cell date-cell">
          <i class="fas fa-calendar-alt"></i> 22 February 2023
        </div>
        <div class="transaction-cell amount-cell">
          $29.99
        </div>
        <div class="transaction-cell method-cell">
          <i class="fas fa-credit-card"></i> PayPal
        </div>
        <div class="transaction-cell status-cell">
          <span class="status-badge status-completed">
            completed
          </span>
        </div>
      </div>

      <div class="transaction-row">
        <div class="transaction-cell course-cell">
          <div class="course-title">JavaScript Masterclass</div>
        </div>
        <div class="transaction-cell date-cell">
          <i class="fas fa-calendar-alt"></i> 5 March 2023
        </div>
        <div class="transaction-cell amount-cell">
          $79.99
        </div>
        <div class="transaction-cell method-cell">
          <i class="fas fa-credit-card"></i> Credit Card (•••• 4242)
        </div>
        <div class="transaction-cell status-cell">
          <span class="status-badge status-completed">
            completed
          </span>
        </div>
      </div>

      <div class="transaction-row">
        <div class="transaction-cell course-cell">
          <div class="course-title">React for Beginners</div>
        </div>
        <div class="transaction-cell date-cell">
          <i class="fas fa-calendar-alt"></i> 18 April 2023
        </div>
        <div class="transaction-cell amount-cell">
          $59.99
        </div>
        <div class="transaction-cell method-cell">
          <i class="fas fa-credit-card"></i> Credit Card (•••• 4242)
        </div>
        <div class="transaction-cell status-cell">
          <span class="status-badge status-refunded">
            refunded
          </span>
        </div>
      </div>

      <div class="transaction-row">
        <div class="transaction-cell course-cell">
          <div class="course-title">Node.js Crash Course</div>
        </div>
        <div class="transaction-cell date-cell">
          <i class="fas fa-calendar-alt"></i> 2 May 2023
        </div>
        <div class="transaction-cell amount-cell">
          $39.99
        </div>
        <div class="transaction-cell method-cell">
          <i class="fas fa-credit-card"></i> Bank Transfer
        </div>
        <div class="transaction-cell status-cell">
          <span class="status-badge status-pending">
            pending
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transactions-table {
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr 1fr;
  background-color: var(--light-gray);
  padding: 0.75rem 1rem;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--dark-color);
}

.transaction-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid var(--light-gray);
  align-items: center;
  transition: var(--transition);
}

.transaction-row:last-child {
  border-bottom: none;
}

.transaction-row:hover {
  background-color: var(--primary-light);
}

.transaction-cell {
  font-size: 0.9rem;
  color: var(--dark-color);
  display: flex;
  align-items: center;
}

.course-title {
  font-weight: 500;
}

.transaction-cell i {
  margin-right: 0.5rem;
  color: var(--gray-color);
  font-size: 0.85rem;
}

.status-badge {
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.status-completed {
  background-color: #e6f7ee;
  color: #00a76f;
}

.status-pending {
  background-color: #fff7e6;
  color: #ffab00;
}

.status-refunded {
  background-color: #ffebee;
  color: #ff5630;
}

@media (max-width: 992px) {
  .table-header {
    display: none;
  }
  
  .transaction-row {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1.5rem;
    position: relative;
  }
  
  .transaction-cell::before {
    content: attr(data-label);
    font-weight: 600;
    margin-right: 0.5rem;
    color: var(--gray-color);
    font-size: 0.8rem;
    min-width: 100px;
    display: inline-block;
  }
  
  .transaction-cell {
    display: flex;
    align-items: center;
  }
  
  .course-cell::before { content: "Course:"; }
  .date-cell::before { content: "Date:"; }
  .amount-cell::before { content: "Amount:"; }
  .method-cell::before { content: "Payment:"; }
  .status-cell::before { content: "Status:"; }
}

@media (max-width: 576px) {
  .transaction-row {
    padding: 1rem;
  }
}
</style>