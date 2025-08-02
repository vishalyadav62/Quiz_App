console.log("js is working");

const questions = [
  {
    question: "What is the capital of India?",
    options: ["New Delhi", "Mumbai", "Patna", "Lucknow"],
    answer: "New Delhi"
  },
  {
    question: "What is the capital of Bihar?",
    options: ["Delhi", "Mumbai", "Patna", "Lucknow"],
    answer: "Patna"
  },
  {
    question: "What is the capital of Uttar Pradesh?",
    options: ["Delhi", "Mumbai", "Patna", "Lucknow"],
    answer: "Lucknow"
  },
  {
    question: "What is the capital of Maharashtra?",
    options: ["Delhi", "Mumbai", "Patna", "Lucknow"],
    answer: "Mumbai"
  },
  {
    question: "What is the capital of Uttarakhand?",
    options: ["Dehradun", "Mumbai", "Patna", "Lucknow"],
    answer: "Dehradun"
  },
  {
    question: "Which language is used for web apps?",
    options: ["Python", "Java", "PHP", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Tool Marking Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which tag is used for inserting a line break in HTML?",
    options: ["<br>", "<lb>", "<break>", "<line>"],
    answer: "<br>"
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size"
  },
  {
    question: "What is the correct way to link a CSS file to HTML?",
    options: [
      "<style src='style.css'>",
      "<css href='style.css'>",
      "<link rel='stylesheet' href='style.css'>",
      "<script src='style.css'>"
    ],
    answer: "<link rel='stylesheet' href='style.css'>"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ],
    answer: "Cascading Style Sheet"
  },
  {
    question: "What is the output of: console.log(typeof [])?",
    options: ["array", "object", "number", "function"],
    answer: "object"
  }
];

let current = 0;
let score = 0;
let username = "";

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");

function showScreen(id) {
  const screens = ["login-screen", "signup-screen", "forgot-screen", "quiz-screen"];
  screens.forEach(screen => {
    document.getElementById(screen).style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}

function signupUser() {
  const uname = document.getElementById("signup-username").value.trim();
  const pwd = document.getElementById("signup-password").value;

  if (!uname || !pwd) return alert("Please fill all fields.");
  if (localStorage.getItem(uname)) return alert("Username already exists.");

  localStorage.setItem(uname, pwd);
  alert("Sign up successful. Please login.");
  showScreen("login-screen");
}

function loginUser() {
  const uname = document.getElementById("login-username").value.trim();
  const pwd = document.getElementById("login-password").value;

  const storedPwd = localStorage.getItem(uname);
  if (pwd === storedPwd) {
    username = uname;
    alert("Login successful!");
    showScreen("quiz-screen");
    loadQuestion();
  } else {
    alert("Invalid username or password.");
  }
}

function resetPassword() {
  const uname = document.getElementById("forgot-username").value.trim();
  const storedPwd = localStorage.getItem(uname);
  if (storedPwd) {
    alert(`Your password is: ${storedPwd}`);
  } else {
    alert("Username not found.");
  }
}

function loadQuestion() {
  const q = questions[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.style.cursor = "pointer";

    li.addEventListener("click", () => {
      const allOptions = document.querySelectorAll("#options li");
      allOptions.forEach(el => el.style.pointerEvents = "none");

      if (option === q.answer) {
        li.style.backgroundColor = "lightgreen";
        score++;
      } else {
        li.style.backgroundColor = "salmon";
        allOptions.forEach(el => {
          if (el.textContent === q.answer) {
            el.style.backgroundColor = "lightgreen";
          }
        });
      }

      setTimeout(() => {
        current++;
        if (current < questions.length) {
          loadQuestion();
        } else {
          showResult();
        }
      }, 1000);
    });

    optionsEl.appendChild(li);
  });
}

function showResult() {
  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  resultEl.innerHTML = `<h2>${username}, your score is ${score}/${questions.length}</h2>
  <button onclick="location.reload()">Restart</button>`;
}
