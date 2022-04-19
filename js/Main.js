let listQuestion = []; //Tạo mảng rỗng chứa câu hoi hình ảnh và đáp án
let currentIndexQuestion = 0; //tạo biến chứa giá trị của thành phần trong  bộ câu hỏi
let currentQuestion = {};

function init() {
    let question1 = new Question('Câu số 1: Đây là gì?', 'image/tinhtruong.jpg', 'tinhtruong');
    let question2 = new Question('Câu số 2: Đây là gì?', 'image/thattruyen.jpg', 'thattruyen');
    let question3 = new Question('Câu số 3: Đây là gì?', 'image/kyquai.jpg', 'kyquai');
    let question4 = new Question('Câu số 4: Đây là gì?', 'image/quycu.jpg', 'quycu');
    let question5 = new Question('Câu số 5: Đây là gì?', 'image/cocua.jpg', 'cocua');
    let question6 = new Question('Câu số 6: Đây là gì?', 'image/xalan.jpg', 'xalan');
    let question7 = new Question('Câu số 7: Đây là gì?', 'image/baophu.jpg', 'baophu');
    listQuestion.push(question1, question2, question3, question4, question5, question6, question7);
} //Khởi tạo mảng mới với các câu hỏi

init(); // gọi hàm vừa khởi tạo
// console.log(listQuestion);
// console.log(currentIndexQuestion);

function start() {//khoi dong bang man hinh giao dien

    document.getElementById("start-screen").hidden = true;
    document.getElementById("ques1").hidden = false;

}

let timer;

function setQuestionScreen() { // gọi ra ngoài màn hình câu hỏi, hình ảnh, câu trả lời
    currentQuestion = listQuestion[currentIndexQuestion]
    document.getElementById('title-question').innerHTML = currentQuestion._title;

    document.getElementById('img-question').src = currentQuestion._img;

    currentQuestion.drawInput();

    if (currentIndexQuestion === listQuestion.length - 1) {
        document.getElementById("next-button").hidden = true;
        document.getElementById("end-button").hidden = false;
    } else {
        document.getElementById("next-button").hidden = false;
        document.getElementById("end-button").hidden = true;
    }

    // hiện giờ
    timer = setInterval(function () {
        if (currentQuestion._time <= 0) {
            clearInterval(timer); // hủy setInterval
            if (currentIndexQuestion === listQuestion.length - 1) {
                checkEnd();
            } else {
                next();
            }
        } else {
            document.getElementById("timer").innerText = currentQuestion._time;
            currentQuestion._time--;
        }
    }, 1000);


}

setQuestionScreen();

function next() { // chuyển sang câu hỏi tiếp theo
    if (currentIndexQuestion < listQuestion.length - 1) {
        currentIndexQuestion++;
        clearInterval(timer);
        setQuestionScreen();
        currentQuestion.pushMyAnswer();
        printResult();
    }

}

function questionReturn() { // quay trở lại câu trước đó
    if (currentIndexQuestion > 0) {
        currentIndexQuestion--;
        clearInterval(timer);
        setQuestionScreen();
        currentQuestion.pushMyAnswer();
        printResult();
    }

}

function check() { //gọi hàm check kết quả
    currentQuestion.saveMyAnswer();
    currentQuestion.checkWin()
    printResult()
}

function printResult() {
    let str = currentQuestion.getResult()
    document.getElementById('result').innerHTML = str;
}

function checkEnd() {
    let score = 0; //so cau tra loi dung
    for (let i = 0; i < listQuestion.length; i++) {
        if (listQuestion[i]._status === true) {
            score++;
        }
    }
    console.log(score)
    document.getElementById("end-game").hidden = false;
    document.getElementById("ques1").hidden = true;
    document.getElementById("end-game").innerHTML = `<p>Bạn đã trả lời đúng: ${score} / ${listQuestion.length} câu </p>
<button onclick="reStart()">Chơi Lại</button>
`


}

function reStart() {
    document.getElementById("end-game").hidden = true;
    document.getElementById("ques1").hidden = false;
// reset các đối tuong cau hoi
    for (let i = 0; i < listQuestion.length; i++) {
        listQuestion[i]._status = false;
        listQuestion[i]._playing = false;
        listQuestion[i]._myAnswer = [];
        listQuestion[i]._time = 30;
    }
    currentIndexQuestion = 0;
    setQuestionScreen();
}
