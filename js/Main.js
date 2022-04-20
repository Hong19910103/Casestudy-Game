function start() {//khoi dong bang man hinh giao dien

    document.getElementById("start-screen").hidden = true;
    document.getElementById("ques1").hidden = false;

}

let listQuestion = []; //Tạo mảng rỗng chứa câu hoi hình ảnh và đáp án
let currentIndexQuestion = 0; //tạo biến chứa giá trị của thành phần trong  bộ câu hỏi
let currentQuestion = {}; // tạo 1 oject rỗng để chứa giá trị
let timer; // Thời gian chơi mỗi màn
function init() {
    let question1 = new Question('Câu số 1: Đây là gì?', 'image/tinhtruong.jpg', 'tinhtruong');
    let question2 = new Question('Câu số 2: Đây là gì?', 'image/thattruyen.jpg', 'thattruyen');
    let question3 = new Question('Câu số 3: Đây là gì?', 'image/kyquai.jpg', 'kyquai');
    let question4 = new Question('Câu số 4: Đây là gì?', 'image/quycu.jpg', 'quycu');
    let question5 = new Question('Câu số 5: Đây là gì?', 'image/cocua.jpg', 'cocua');
    let question6 = new Question('Câu số 6: Đây là gì?', 'image/xalan.jpg', 'xalan');
    let question7 = new Question('Câu số 7: Đây là gì?', 'image/baophu.jpg', 'baophu');
    listQuestion.push(question1, question2, question3, question4, question5, question6, question7);
} //Khởi tạo mảng mới từ class question

init(); // gọi hàm vừa khởi tạo


function setQuestionScreen() { // gọi ra ngoài màn hình câu hỏi, hình ảnh, câu trả lời
    currentQuestion = listQuestion[currentIndexQuestion]
    document.getElementById('title-question').innerHTML = currentQuestion._title;//in ra màn hình các câu hỏi

    document.getElementById('img-question').src = currentQuestion._img;// hiện ra mang hình thẻ theo tên các câu hỏi

    currentQuestion.drawInput(); // hiện ra màn hình các ô in put theo chiều dài các câu trả lời
// Đến câu cuối thì ẩn nút next để hiện nút end (nếu chưa câu cuối thì ẩn end hiện next)
    if (currentIndexQuestion === listQuestion.length - 1) {
        document.getElementById("next-button").hidden = true;
        document.getElementById("end-button").hidden = false;
    } else {
        document.getElementById("next-button").hidden = false;
        document.getElementById("end-button").hidden = true;
    }
    // Nếu đã hết thời gian chơi (thuộc tính _timeOut == true) thì disable các nút input, nếu không thì vẫn enable lên
    if (currentQuestion._timeOut === true) {
        disableInput();
    } else {
        enabaleInput();
    }

    // Hiện thời gian đếm ngược
    document.getElementById("timer").innerText = currentQuestion._time;
    timer = setInterval(function () {
        if (currentQuestion._time <= 0) {
            // Khi thuộc tính _time nhỏ hơn hoặc bằng 0 (tức là hết giờ)
            // Chuyển thuộc tính trạng thái hết giờ chơi của đối tượng câu hỏi sang true
            currentQuestion._timeOut = true;
            // Xóa interval
            clearInterval(timer);
        } else {
            currentQuestion._time--;
            // Ngay khi time của đối tượng câu hỏi về không thì disable input luôn

            if (currentQuestion._time === 0) {
                disableInput();
            }
            document.getElementById("timer").innerText = currentQuestion._time;
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
//in kết quả ra ngoài màn hình
function printResult() {
    let str = currentQuestion.getResult()
    document.getElementById('result').innerHTML = str;
}
// khi kết thúc ẩn các câu hỏi hiện ra màn hình cuối chứa số lượng
function checkEnd() { // đếm số câu trả lời đúng và hiện số câu trả lời đúng
    let score = 0;
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
// reset các đối tượng của Question để trả lời lại
function reStart() {
    document.getElementById("end-game").hidden = true;
    document.getElementById("ques1").hidden = false;
    clearInterval(timer)
// reset các đối tượng của Question về giá trị ban đầu để trả lời lại
    for (let i = 0; i < listQuestion.length; i++) {
        listQuestion[i]._status = false;
        listQuestion[i]._playing = false;
        listQuestion[i]._myAnswer = [];
        listQuestion[i]._time = 30;
        listQuestion[i]._timeOut = false;
    }
    currentIndexQuestion = 0;
    setQuestionScreen();
}
// Hàm disable các ô input, không cho nhập lại khi đã hết giờ

function disableInput() {
    // Lặp qua từng ô input tương ứng và thêm thuộc tính disable
    for (let i = 0; i < currentQuestion._answer.length; i++) {
        document.getElementById(`q-${i}`).disabled = true;
    }
    // disable nút kiểm tra
    document.getElementById("check1").disabled = true;

}

// Hàm enable để bật lại các ô input và nút kiểm tra
function enabaleInput() {
    // Lặp qua từng ô input tương ứng và xóa thuộc tính disable. tức là enable nó lên
    for (let i = 0; i < currentQuestion._answer.length; i++) {
        document.getElementById(`q-${i}`).disabled = false;
    }
    // enable nút kiểm tra
    document.getElementById("check1").disabled = false;

}