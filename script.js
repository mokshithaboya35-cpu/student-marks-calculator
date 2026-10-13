const marksForm = document.getElementById("marksForm");
const resultSection = document.getElementById("result");

marksForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const studentName = document.getElementById("studentName").value.trim();
  const subjectIds = ["subject1", "subject2", "subject3", "subject4", "subject5"];
  const marks = subjectIds.map((id) => Number(document.getElementById(id).value));

  if (!studentName) {
    alert("Please enter the student's name.");
    return;
  }

  const invalidMarks = marks.some((mark) => !Number.isFinite(mark) || mark < 0 || mark > 100);
  if (invalidMarks) {
    alert("Please enter marks from 0 to 100 for every subject.");
    return;
  }

  const total = marks.reduce((sum, mark) => sum + mark, 0);
  const percentage = total / marks.length;
  const passed = marks.every((mark) => mark >= 35);

  let grade;
  if (!passed) {
    grade = "F";
  } else if (percentage >= 90) {
    grade = "A+";
  } else if (percentage >= 80) {
    grade = "A";
  } else if (percentage >= 70) {
    grade = "B";
  } else if (percentage >= 60) {
    grade = "C";
  } else if (percentage >= 50) {
    grade = "D";
  } else {
    grade = "E";
  }

  document.getElementById("resultName").textContent = `Student: ${studentName}`;
  document.getElementById("totalMarks").textContent = `${total} / 500`;
  document.getElementById("percentage").textContent = `${percentage.toFixed(2)}%`;
  document.getElementById("grade").textContent = grade;

  const statusElement = document.getElementById("status");
  statusElement.textContent = passed ? "PASS" : "FAIL";
  statusElement.className = passed ? "pass" : "fail";

  const messageElement = document.getElementById("resultMessage");
  messageElement.textContent = passed
    ? "Congratulations! You passed all subjects."
    : "You did not pass every subject. Each subject requires at least 35 marks.";
  messageElement.className = `result-message ${passed ? "pass" : "fail"}`;

  resultSection.classList.remove("hidden");
  resultSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

marksForm.addEventListener("reset", function () {
  resultSection.classList.add("hidden");
});
