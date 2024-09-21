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
// 동행복권 로또 API 번호 요청
const fetchLottoData = (drawNo) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `http://localhost:8080/getLottoData?drawNo=${drawNo}`;
    try {
        const response = yield fetch(url);
        const data = yield response.json();
        if (data.returnValue === "success") {
            console.log(`회차: ${data.drwNo}`);
            console.log(`당첨번호: ${data.drwtNo1}, ${data.drwtNo2}, ${data.drwtNo3}, ${data.drwtNo4}, ${data.drwtNo5}, ${data.drwtNo6}`);
            console.log(`보너스번호: ${data.bnusNo}`);
        }
        else {
            console.log("해당 회차의 데이터가 존재하지 않습니다.");
        }
    }
    catch (error) {
        console.error("API 호출 중 오류 발생:", error);
    }
});
// 1000회차 당첨번호 출력
fetchLottoData(1000);
