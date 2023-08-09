const questions = [
    {
        "ques": "What is the population of Brazil?",
        "choices": ["145 million", "199 million", "182 million", "205 million"],
        "correctAnswer": "145"
    },
    {
        "ques": "What is 27*14?",
        "choices": ["485", "634", "408", "528"],
        "correctAnswer": "634"
    },
    {
        "ques": "What is the busiest train station in the world?",
        "choices": ["Grand Central, NY", "Shibuya, Tokyo", "Beijing Central, Chine", "Gard du Nord, Paris"],
        "correctAnswer": "Grand Central"
    },
    {
        "ques": "What is the longest river?",
        "vid": "https://www.youtube.com/embed/V5CufFEmrvw",
        "choices": ["Nile", "Amazon", "Mississippi", "Yangtze"],
        "correctAnswer": "Nile"
    },
    {
        "ques": "What is the busiest tube station in the London?",
        "img": "http://cosmotales.com/wp-content/uploads/2017/04/men-fashion.jpg",
        "choices": ["Waterloo", "Baker Street", "Kings Cross", "Victoria"],
        "correctAnswer": "Waterloo"
    }
];
let currentQuestion = 0; //For JSON Array index track
let questionCount = 0; //Count the question no
let firstTime = false;
let userAnswer = []; //Store the value selected by user
let seconds;
let blank = "";
//Validation of the regisration form of the user

$(document).ready(function () {
    $(".quizSection").hide(); //Hide quizSection
    $(".answerPage").hide();
    $("#userSubmitBtn").click(function () {
        let first_name = /^[a-zA-Z]+$/,
            last_name = /^[a-zA-Z]+$/,
            eMail = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/,
            phoneno = /^\d{10}$/,
            firstName = $("#firstname").val(),
            lastName = $("#lastname").val(),
            email = $("#email").val(),
            mobileNo = $("#mobileno").val();
        //Check the firstname
        if (firstName === "" || first_name.test(firstName) === false) {
            document.getElementById("fname").innerHTML = "*Insert First Name";
            return 0;
        }
        //check lastname
        else if (lastName === "" || last_name.test(lastName) == false) {
            document.getElementById("lname").innerHTML = "*Insert Last Name";
            return 0;
        }
        else if (email === "" || eMail.test(email) === false) {
            document.getElementById("emailid").innerHTML = "*Insert valid emailId";
            return 0;
        }
        else if (mobileNo === "" || phoneno.test(mobileNo) === false) {
            document.getElementById("phoneno").innerHTML = "*Insert valid MobileNo";
            return 0;
        }
        else {
            $(".wrapper").hide();
            $(".quizSection").show(); //Show Hidden quizSection
            questionPage(); //Call Question Page
        }



    });

    $(".choices").on("click", ".option", function () {
        $(this).addClass("active");
        $(".option").on("click", function () {
            $(".option").removeClass("active");
        });
    })
});

//questionPage for dynamic quiz question and option generation

function questionPage() {
    $(".quizSection").keydown(false);
    displayCurrentQuestion();
    //time();
    $(".nextButton").click(function () {
        $(".quizSection").keydown(false);
        if (!firstTime) {
            store = $("input[type='radio']:checked").val();
            if (store === null) {
                userAnswer[currentQuestion] = blank;
            }
            else {
                userAnswer[currentQuestion] = store;
            }
            console.log(userAnswer);
            if (questionCount === 4) {
                displayScore();
            }
            else {
                questionCount++;
                console.log(questionCount);
            }
        }
        firstTime = false;
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayCurrentQuestion();
            $('input[value=' + userAnswer[currentQuestion] + ']').prop('checked', true);
            $('input[value=' + userAnswer[currentQuestion] + ']').closest(".option").addClass("active");
        }
    });
    $(".prevButton").click(function () {
        currentQuestion--;
        if (currentQuestion < questions.length) {
            displayCurrentQuestion();
            let x = userAnswer[currentQuestion]; $('input[value=' + userAnswer[currentQuestion] + ']').prop('checked', true);
            $('input[value=' + userAnswer[currentQuestion] + ']').closest(".option").addClass("active");
        }
        questionCount--;
    });
}

//Display the current question called by questionPage

function displayCurrentQuestion() {
    let question = questions[currentQuestion].ques;
    console.log(question);
    let questionClass = $(document).find(".questionSection > .question");
    let choiceList = $(document).find(".questionSection > .choice");
    let numChoices = questions[currentQuestion].choices.length;
    let imgHtml = "";
    let vidHtml = "";
    if (questions[currentQuestion].img && questions[currentQuestion].img != "") {
        imgHtml = "<img src='" + questions[currentQuestion].img + "' class='qsnImg' />";
    }
    if (questions[currentQuestion].vid && questions[currentQuestion].vid != "") {
        imgHtml = "<iframe src='" + questions[currentQuestion].vid + "' class='qsnImg' /></iframe>";
    }
    $(questionClass).html("<h3>" + question + "</h3>" + imgHtml + vidHtml);
    $(".choices").html("");
    let choice = 0;
    for (let i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        console.log(choice);
        $('<div class="option"><input type="radio" class="qInput" name="answer" id=' + "inId" + i + ' value=' + choice + '><label class="qLabel" for=' + "inId" + i + '>' + choice + '</label></div>').appendTo(".choices");
    }
}

//displayScore Shows The Final Score To The User

function displayScore() {
    $(".quizSection").hide();
    $(".answerPage").show();
    let numCorrect = 0;
    let total = 100;
    let result = total / 5;
    for (let i = 0; i < userAnswer.length; i++) {
        if (userAnswer[i] == questions[i].correctAnswer) {
            numCorrect = numCorrect + result;
        }
    }
    console.log(numCorrect);
    $(".answer").html("Your Score is:" + numCorrect + "%");
    $(".thankYou").html("Thank You");
}

//Timer Start Along With The Quiz

function time() {
    let fiveMinutes = 60 * 10,
        display = document.querySelector('#clock');
    startTimer(fiveMinutes, display);
};
function startTimer(duration, display) {
    let timer = duration, minutes;
    let x = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = "Remaining time " + minutes + ":" + seconds;
        if (timer < 59) {
            $("#clock").css("color", "red");
            timer--;
            blink();
            if (timer < 0) {
                store = $("input[type='radio']:checked").val();
                if (store == null) {
                    userAnswer[currentQuestion] = blank;
                }
                else {
                    userAnswer[currentQuestion] = store;
                    console.log(userAnswer);
                }
                clearInterval(x);
                $(".quizSection").hide();
                $(".answerPage").show();
                displayScore();
            }
        }
        else {
            --timer;
        }
    }, 1000);
}

//Timer Blinking Start At 59 Second
function blink() {
    document.querySelector('#clock').innerHTML = '';
    setTimeout("appear()", 500);
}

function appear() {
    document.querySelector('#clock').innerHTML = '00:' + seconds;
    setTimeout('blink()', 500);
}

//Input Field Focus
$(".inputDetails").focusin(function () {
    document.getElementById('fname').innerHTML = "";
    document.getElementById('lname').innerHTML = "";
    document.getElementById('emailid').innerHTML = "";
    document.getElementById('phoneno').innerHTML = "";
});
