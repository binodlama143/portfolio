// Coffee Page Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Set current year
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Coffee buttons functionality
  const coffeeButtons = document.querySelectorAll(".coffee-btn[data-amount]");
  const customDonateBtn = document.getElementById("customDonate");
  const customAmountInput = document.getElementById("customAmount");
  const paymentModal = document.getElementById("paymentModal");
  const closeModal = document.querySelector(".close-modal");
  const paymentAmount = document.getElementById("paymentAmount");
  const confirmPaymentBtn = document.getElementById("confirmPayment");

  // Coffee button click
  coffeeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const amount = this.getAttribute("data-amount");
      openPaymentModal(amount, "Buy Me Coffee");
    });
  });

  // Custom donation
  customDonateBtn.addEventListener("click", function () {
    const amount = customAmountInput.value;
    if (amount && amount > 0) {
      openPaymentModal(amount, "Custom Donation");
    } else {
      showNotification("Please enter a valid amount", "error");
    }
  });

  // Payment method buttons
  document.getElementById("paypalBtn").addEventListener("click", function (e) {
    e.preventDefault();
    showNotification("Redirecting to PayPal...", "info");
    // In real implementation, this would redirect to PayPal
    setTimeout(() => {
      showNotification(
        "Payment successful! Thank you for your support!",
        "success",
      );
    }, 2000);
  });

  document.getElementById("stripeBtn").addEventListener("click", function (e) {
    e.preventDefault();
    showNotification("Opening Stripe checkout...", "info");
    // In real implementation, this would open Stripe
    setTimeout(() => {
      showNotification(
        "Payment successful! Thank you for your support!",
        "success",
      );
    }, 2000);
  });

  document.getElementById("bankBtn").addEventListener("click", function () {
    showNotification("Bank details copied to clipboard!", "info");
    // Simulate copying bank details
    const bankDetails = `Account Name: Binod Lama
Bank: Example Bank
Account Number: 1234567890
IFSC: EXMP0001234`;
    navigator.clipboard.writeText(bankDetails).then(() => {
      showNotification("Bank details copied to clipboard!", "success");
    });
  });

  // Open payment modal
  function openPaymentModal(amount, description) {
    paymentAmount.textContent = `$${amount}`;
    document.getElementById("paymentDescription").textContent = description;
    paymentModal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  // Close modal
  closeModal.addEventListener("click", function () {
    paymentModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Confirm payment
  confirmPaymentBtn.addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;

    if (!email || !name) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    showNotification("Processing payment...", "info");

    // Simulate payment processing
    setTimeout(() => {
      paymentModal.style.display = "none";
      document.body.style.overflow = "auto";
      showNotification(
        "Payment successful! Thank you for your support!",
        "success",
      );

      // Create confetti effect
      createConfetti();

      // Add to recent supporters (simulation)
      addSupporter(name, amount);

      // Reset form
      document.getElementById("email").value = "";
      document.getElementById("name").value = "";
      document.getElementById("message").value = "";
    }, 1500);
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === paymentModal) {
      paymentModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Add supporter to list
  function addSupporter(name, amount) {
    const supportersGrid = document.querySelector(".supporters-grid");
    const firstSupporter = supportersGrid.firstElementChild;

    const supporter = document.createElement("div");
    supporter.className = "supporter";
    supporter.innerHTML = `
            <div class="supporter-avatar">${name.charAt(0)}</div>
            <div class="supporter-info">
                <h4>${name}</h4>
                <p>Just now</p>
            </div>
            <div class="supporter-amount">$${amount}</div>
        `;

    supportersGrid.insertBefore(supporter, firstSupporter);

    // Remove last supporter if there are more than 3
    if (supportersGrid.children.length > 3) {
      supportersGrid.removeChild(supportersGrid.lastChild);
    }

    // Add animation
    supporter.style.animation = "slideInBottom 0.5s ease";
  }

  // Show notification
  function showNotification(message, type) {
    // Remove existing notifications
    const existingNotif = document.querySelector(".notification");
    if (existingNotif) existingNotif.remove();

    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
            <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
            <span>${message}</span>
        `;

    document.body.appendChild(notification);

    // Style notification
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === "success" ? "#10B981" : type === "error" ? "#EF4444" : "#3B82F6"};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 10000;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;

    // Remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }

  // Add fadeOut animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            to { opacity: 0; transform: translateX(100%); }
        }
    `;
  document.head.appendChild(style);

  // Add CSS for supporters
  const supportersStyle = document.createElement("style");
  supportersStyle.textContent = `
        .supporters-section {
            margin-top: 4rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(128, 128, 128, 0.2);
        }
        
        .supporters-grid {
            display: grid;
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .supporter {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: var(--card-bg);
            border-radius: 10px;
            animation: slideInBottom 0.5s ease;
        }
        
        .supporter-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
        }
        
        .supporter-info h4 {
            margin: 0;
            font-size: 1rem;
        }
        
        .supporter-info p {
            margin: 0;
            font-size: 0.8rem;
            opacity: 0.7;
        }
        
        .supporter-amount {
            margin-left: auto;
            font-weight: 700;
            color: var(--primary-color);
        }
        
        .custom-amount {
            margin: 3rem 0;
            text-align: center;
        }
        
        .custom-input {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .custom-input input {
            padding: 1rem;
            border: 2px solid var(--primary-color);
            border-radius: 10px;
            font-size: 1.2rem;
            width: 200px;
            background: var(--bg-color);
            color: var(--text-color);
        }
        
        .currency {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--primary-color);
        }
        
        .support-list {
            list-style: none;
            margin: 1rem 0;
        }
        
        .support-list li {
            margin: 0.5rem 0;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .payment-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }
        
        .payment-modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--card-bg);
            padding: 2rem;
            border-radius: 20px;
            width: 90%;
            max-width: 500px;
            box-shadow: var(--shadow);
        }
        
        .payment-details {
            margin: 1rem 0;
            padding: 1rem;
            background: var(--bg-color);
            border-radius: 10px;
        }
        
        .payment-form .form-group {
            margin: 1rem 0;
        }
        
        .payment-form label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
        }
        
        .payment-form input,
        .payment-form textarea {
            width: 100%;
            padding: 0.8rem;
            border: 2px solid rgba(128,128,128,0.2);
            border-radius: 10px;
            background: var(--bg-color);
            color: var(--text-color);
            font-family: 'Poppins', sans-serif;
        }
        
        .payment-form textarea {
            resize: vertical;
            min-height: 100px;
        }
    `;
  document.head.appendChild(supportersStyle);
});
