// Grade options
const gradeOptions = [
    'S', 'A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'P', 'F'
];
// Set the initial value of select elements to null
document.querySelectorAll('table tbody tr td.grade select').forEach(function(select) {
    select.selectedIndex = -1;
});

// Function to show grade options
function showGradeOptions(span) {
    // Create select element
    const select = document.createElement('select');
    gradeOptions.forEach(function(option) {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });

    // Replace content with select element
    span.parentNode.innerHTML = ''; // Remove the span
    span.parentNode.appendChild(select);

    // Focus on the select element
    select.focus();
}

function calculateSGPA(containerId) {
    const container = document.getElementById(containerId);
    
    // Get all the rows in the specified container
    const rows = container.querySelectorAll('tbody tr');

    // Initialize variables for calculating SGPA
    let totalCredit = 0;
    let totalGradePoint = 0;

    // Iterate over each row in the specified container
    rows.forEach(function(row) {
        // Get the grade select element
        const gradeSelect = row.querySelector('.grade select');

        // Get the selected grade and corresponding grade point
        const selectedGrade = gradeSelect.value;
        const gradePoint = getGradePoint(selectedGrade);

        // Get the credit for the subject from the table cell
        const creditCell = row.querySelector('.credit');
        const credit = parseInt(creditCell.querySelector('input').value);

        // Update total credit and total grade point
        totalCredit += credit;
        totalGradePoint += credit * gradePoint;
    });

    // Calculate SGPA for the specified container
    let sgpa;
    if (totalCredit > 0) {
        sgpa = totalGradePoint / totalCredit;
    } else {
        sgpa = 0; // Handle division by zero
    }

    // Display SGPA for the specified container and disable the input field
    const sgpaInput = container.querySelector('.sgpa-input');
    sgpaInput.value = sgpa.toFixed(2);
    sgpaInput.disabled = true;
    
}

// Function to get grade point based on grade
function getGradePoint(grade) {
    switch(grade) {
        case 'S':
            return 10;
        case 'A+':
            return 9.0;
        case 'A':
            return 8.5;
        case 'B+':
            return 8.0;
        case 'B':
            return 7.5;
        case 'C+':
            return 7.0;
        case 'C':
            return 6.5;
        case 'D':
            return 6.0;
        case 'P':
            return 5.5;
        case 'F':
            return 0;
        default:
            return 0;
    }
}

// Update the Clear button click event to set all grade selects to null
function clearAll(containerId) {
    // Clear SGPA box and grade in the specified container
    const container = document.getElementById(containerId);
    container.querySelectorAll('td.grade select').forEach(function(select) {
        select.selectedIndex = -1; // Set to null
    });
    const sgpaInput = container.querySelector('.sgpa-input');
    sgpaInput.value = '';
    sgpaInput.disabled = false; // Enable the SGPA text field
    
}
function addSubject(containerId) {
    let container = document.getElementById(containerId);
    let table = container.querySelector('table');
    let rowCount = table.rows.length;
    let newRow = table.insertRow(rowCount);

    let slNoCell = newRow.insertCell(0);
    slNoCell.textContent = rowCount;

    let subjectCell = newRow.insertCell(1);
    subjectCell.className = 'subject';
    subjectCell.innerHTML = '<input type="text" placeholder="Subject">';

    let creditCell = newRow.insertCell(2);
    creditCell.className = 'credit';
    creditCell.innerHTML = '<input type="text" placeholder="Credit" value="4">';

    let gradeCell = newRow.insertCell(3);
    gradeCell.className = 'grade';
    gradeCell.innerHTML = `
        <select>
            <option value="S">S</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="P">P</option>
            <option value="F">F</option>
        </select>
    `;
}
function removeSubject() {
    var table = document.querySelector('#semc table tbody');
    if (table.children.length > 1) {
        table.lastElementChild.remove();
        updateSerialNumbers(); // Update serial numbers after removal
    }
}



