const display = document.getElementById("display");
const originalExpression = document.getElementById("original_expression");
const clearBtn = document.getElementById("clear-btn");
let lastClickedOperator = false;
const operators = ['+', '-', '×', '÷', '%'];

// Check if display has content (output)
function updateClearButtonText() {
    if (display.value !== "") {
        // Display has output - show C (Clear display only)
        clearBtn.textContent = "C";
    } else {
        // Display is empty - show AC (All Clear history)
        clearBtn.textContent = "AC";
    }
}

function append(val) {
    // Prevent consecutive operators
    if (operators.includes(val)) {
        if (lastClickedOperator || display.value === '') return;
        lastClickedOperator = true;
    } else {
        lastClickedOperator = false;
    }

    display.value += val;
    updateClearButtonText();
}

function clearDisplay() {
    display.value = "";
    originalExpression.value = "";
    lastClickedOperator = false;
    updateClearButtonText();
}

function clearOrAllClear(event) {
    event.preventDefault();

    if (display.value !== "") {
        // C - Clear display only (display has content)
        clearDisplay();
    } else {
        // AC - Clear history (display is empty)
        document.getElementById("clear-history-form").submit();
    }
}

function backspace() {
    display.value = display.value.slice(0, -1);
    lastClickedOperator = false;
    updateClearButtonText();
}

// Handle form submission - convert symbols before sending
document.getElementById("calc-form").addEventListener("submit", function (e) {
    let original = display.value;
    let converted = display.value;

    // Store original expression (with visual symbols)
    originalExpression.value = original;

    // Set the expression field with converted expression
    document.querySelector('input[name="expression"]').value = converted;

    updateClearButtonText();
});

// Initialize button text on page load
document.addEventListener('DOMContentLoaded', function () {
    updateClearButtonText();
});