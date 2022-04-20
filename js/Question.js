class Question {
    constructor(title, sourceImage, answer) {
        this._title = title;
        this._img = sourceImage;
        this._answer = answer;
        this._status = false; // kiểm tra trả lời đúng hay sai
        this._playing = false;// Kiểm tra xem đã trả lời hay chưa;
        this._myAnswer = []; // Luu cau tra loi nhap tu input;
        this._time = 30; // mỗi câu đc tra loi trong 30s
        this._timeOut = false; // Biến xác định xem còn thơi gian chơi hay không
    }

    saveMyAnswer() { // lay gia tri nhap tu o input luu lai
        this._myAnswer = []; // reset mảng khi nhập lại kết quả
        for (let i = 0; i < this._answer.length; i++) {
            this._myAnswer.push(document.getElementById(`q-${i}`).value);
        }
    }

    pushMyAnswer() {// viet lai cau tra loi len o input
        console.log(this._myAnswer)
        for (let i = 0; i < this._answer.length; i++) {
            if (this._myAnswer[i] === undefined) {
                // kiem tra this.myAnswer da co phan tu hay chua;
                return;
            }
            document.getElementById(`q-${i}`).value = this._myAnswer[i];
        }
    }

    drawInput() {// in ô in put theo độ dài của câu trả lời
        let html = '';
        for (let i = 0; i < this._answer.length; i++) {
            html += '<td>';
            html += `<input id="q-${i}" autocomplete="off">`
            html += '</td>';
        }
        document.getElementById('list-input').innerHTML = html;
    }

    checkWin() { // check câu trả lời đúng sai
        this._playing = true; //khi bắt đầu kiểm tra kết quả là bắt đầu chơi
        for (let i = 0; i < this._answer.length; i++) {
            if (document.getElementById(`q-${i}`).value === this._answer[i]) {
                this._status = true;
            } else {
                this._status = false;
                break;
            }

        }
        if (this._status) { // nếu trành thái trả về đúng
            return "chính xác"
        } else {
            return "Không chính xác"
        }
    }

    getResult() { // kt chơi hay ko chơi , nếu không chơi trả về chuỗi rỗng , nếu chơi trả về check đúng sai.
        if (this._playing === false) {
            return "";
        } else {
            return this.checkWin();
        }
    }

}
