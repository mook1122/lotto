"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
let LottoNum = [];
// 당첨회차 계산
const calculateWeeks = () => {
    const startDate = new Date('2002-12-07'); // 시작 날짜
    const currentDate = new Date(); // 현재 날짜
    // 두 날짜의 시간 차이를 밀리초 단위로 계산
    const diffInMs = currentDate.getTime() - startDate.getTime();
    // 밀리초를 주 단위로 변환
    const weeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
    return weeks;
};
// 동행복권 로또 API 번호 요청
const fetchLottoData = (drawNo) => __awaiter(void 0, void 0, void 0, function* () {
    const winning_num = document.querySelectorAll('.winning-num');
    const bonus_num = document.querySelector('.bonus');
    const draw = document.querySelector('.draw');
    const draw_date = document.querySelector('.draw-date');
    const url = `http://localhost:8080/getLottoData?drawNo=${drawNo}`;
    try {
        const response = yield fetch(url);
        const data = yield response.json();
        if (data.returnValue === "success") {
            LottoNum = [data.drwtNo1, data.drwtNo2, data.drwtNo3, data.drwtNo4, data.drwtNo5, data.drwtNo6];
            winning_num.forEach((a, i) => {
                a.innerHTML = `${LottoNum[i]}`;
            });
            if (bonus_num instanceof Element) {
                bonus_num.innerHTML = `${data.bnusNo}`;
            }
            if (draw instanceof Element) {
                draw.innerHTML = `${data.drwNo}`;
            }
            if (draw_date instanceof Element) {
                draw_date.innerHTML = `${data.drwNoDate}`;
            }
            console.log(`회차: ${data.drwNo}`);
            console.log(`당첨번호: ${data.drwtNo1}, ${data.drwtNo2}, ${data.drwtNo3}, ${data.drwtNo4}, ${data.drwtNo5}, ${data.drwtNo6}`);
            console.log(`보너스번호: ${data.bnusNo}`);
            ball_color();
        }
        else {
            console.log("해당 회차의 데이터가 존재하지 않습니다.");
        }
    }
    catch (error) {
        console.error("API 호출 중 오류 발생:", error);
    }
});
// 당첨번호 출력
fetchLottoData(calculateWeeks() + 1);
// 번호 생성
const num_result_box = document.querySelector('.num-result-box');
(_a = document.querySelector('.create-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const lotto = [];
    while (lotto.length < 6) {
        let num = Math.floor(Math.random() * 45) + 1;
        if (lotto.indexOf(num) === -1) {
            lotto.push(num);
        }
    }
    lotto.sort(function (a, b) {
        return a - b;
    });
    console.log(lotto);
    if (num_result_box instanceof Element) {
        num_result_box.insertAdjacentHTML('beforeend', `
            <div class="result-box">
                <span class="result-num ball">${lotto[0]}</span>
                <span class="result-num ball">${lotto[1]}</span>
                <span class="result-num ball">${lotto[2]}</span>
                <span class="result-num ball">${lotto[3]}</span>
                <span class="result-num ball">${lotto[4]}</span>
                <span class="result-num ball">${lotto[5]}</span>
            </div>
        `);
    }
    ball_color();
});
// 번호 색상 변환
const ball_color = function () {
    const ball = document.querySelectorAll('.ball');
    ball.forEach((a, i) => {
        var _a;
        const ballElement = ball[i];
        if (ballElement instanceof Element) {
            const ballValue = (_a = ballElement.textContent) === null || _a === void 0 ? void 0 : _a.trim();
            const ballNumber = Number(ballValue);
            console.log(ballNumber);
            if (ballNumber <= 10) {
                ballElement.classList.add('ball-1-10');
            }
            else if (10 < ballNumber && ballNumber <= 20) {
                ballElement.classList.add('ball-11-20');
            }
            else if (20 < ballNumber && ballNumber <= 30) {
                ballElement.classList.add('ball-21-30');
            }
            else if (30 < ballNumber && ballNumber <= 40) {
                ballElement.classList.add('ball-31-40');
            }
            else if (40 < ballNumber && ballNumber <= 45) {
                ballElement.classList.add('ball-41-45');
            }
        }
    });
};
