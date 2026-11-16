
// 1. Students Array
let studentsList = [];

// 2. Get HTML Elements
const studentNameInput = document.getElementById("studentName");
const grade1Input = document.getElementById("grade1");
const grade2Input = document.getElementById("grade2");
const grade3Input = document.getElementById("grade3");
const attendanceInput = document.getElementById("attendance");

const addStudentBtn = document.getElementById("addStudent");
const mercyCommitteeBtn = document.getElementById("mercyCommittee");

const errorMessage = document.getElementById("errorMessage");
const studentsListContainer = document.getElementById("studentsList");
const finalReport = document.getElementById("finalReport");


// 3. Student Class
class Student {

    // Private Fields
    #grade1;
    #grade2;
    #grade3;
    #attendance;

    constructor(name, grade1, grade2, grade3, attendance) {

        if (!name || !name.trim()) {
            throw new Error("Please enter student name");
        }

        this.name = name.trim();

        this.grade1 = grade1;
        this.grade2 = grade2;
        this.grade3 = grade3;
        this.attendance = attendance;
    }

    // Validation Function
    #validateScore(value, fieldName) {

        if (value === "" || value === null || value === undefined) {
            throw new Error(fieldName + " cannot be empty");
        }

        const number = Number(value);

        if (!Number.isFinite(number) || number < 0 || number > 100) {
            throw new Error(fieldName + " must be between 0 and 100");
        }

        return number;
    }

    // Setters
    set grade1(value) {
        this.#grade1 = this.#validateScore(value, "Subject 1");
    }

    set grade2(value) {
        this.#grade2 = this.#validateScore(value, "Subject 2");
    }

    set grade3(value) {
        this.#grade3 = this.#validateScore(value, "Subject 3");
    }

    set attendance(value) {
        this.#attendance = this.#validateScore(value, "Attendance");
    }

    // Getters
    get grade1() {
        return this.#grade1;
    }

    get grade2() {
        return this.#grade2;
    }

    get grade3() {
        return this.#grade3;
    }

    get attendance() {
        return this.#attendance;
    }

    // Calculate Average
    getAverage() {
        return (this.#grade1 + this.#grade2 + this.#grade3) / 3;
    }
}


// 4. Add Student Button
addStudentBtn.onclick = function () {

    try {

        errorMessage.textContent = "";

        // Get Input Values
        const name = studentNameInput.value;
        const grade1 = grade1Input.value;
        const grade2 = grade2Input.value;
        const grade3 = grade3Input.value;
        const attendance = attendanceInput.value;

        // Create New Student Object
        const student = new Student(
            name,
            grade1,
            grade2,
            grade3,
            attendance
        );

        // Add Student to Array
        studentsList.push(student);

        // Display Student
        const studentItem = document.createElement("p");

        studentItem.textContent =
            student.name + " - Average: " +
            student.getAverage().toFixed(2);

        studentsListContainer.appendChild(studentItem);

        // Clear Inputs
        studentNameInput.value = "";
        grade1Input.value = "";
        grade2Input.value = "";
        grade3Input.value = "";
        attendanceInput.value = "";

    }

    catch (error) {

        errorMessage.textContent = error.message;

    }
};


// 5. Mercy Committee Button
mercyCommitteeBtn.onclick = function () {

    // Filter Students Between 40 and 49
    const strugglingStudents = studentsList.filter(student => {

        const average = student.getAverage();

        return average >= 40 && average <= 49;

    });

    // Check if There Are No Students
    if (strugglingStudents.length === 0) {

        finalReport.innerHTML =
            "<p>No struggling students found.</p>";

        return;
    }

    // Map: Add 5 Mercy Marks
    const updatedStudents = strugglingStudents.map(student => {

        return {
            name: student.name,
            newAverage: student.getAverage() + 5
        };

    });

    // Reduce: Calculate General Average
    const totalAverage = updatedStudents.reduce((total, student) => {

        return total + student.newAverage;

    }, 0);

    const generalAverage =
        totalAverage / updatedStudents.length;

    // Display Final Report
    finalReport.innerHTML = `
        <h4>Mercy Committee Report</h4>

        <p>
            Number of Struggling Students:
            ${updatedStudents.length}
        </p>

        <h5>Students Names:</h5>

        <ul>
            ${updatedStudents.map(student => `
                <li>
                    ${student.name} -
                    New Average: ${student.newAverage.toFixed(2)}
                </li>
            `).join("")}
        </ul>

        <h5>
            General Average After Mercy:
            ${generalAverage.toFixed(2)}
        </h5>
    `;

};
