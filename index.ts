
// 로또 API 응답 데이터 타입 정의
interface LottoData {
    totSellamnt: number;
    returnValue: string;
    drwNoDate: string;
    firstWinamnt: number;
    drwtNo1: number;
    drwtNo2: number;
    drwtNo3: number;
    drwtNo4: number;
    drwtNo5: number;
    drwtNo6: number;
    bnusNo: number;
    drwNo: number;
}

// 동행복권 로또 API 번호 요청
const fetchLottoData = async (drawNo: number): Promise<void> => {
    const url = `http://localhost:8080/getLottoData?drawNo=${drawNo}`;

    try {
        const response = await fetch(url);
        const data: LottoData = await response.json();

        if (data.returnValue === "success") {
            console.log(`회차: ${data.drwNo}`);
            console.log(`당첨번호: ${data.drwtNo1}, ${data.drwtNo2}, ${data.drwtNo3}, ${data.drwtNo4}, ${data.drwtNo5}, ${data.drwtNo6}`);
            console.log(`보너스번호: ${data.bnusNo}`);
        } else {
            console.log("해당 회차의 데이터가 존재하지 않습니다.");
        }
    } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
    }
};

// 1000회차 당첨번호 출력
fetchLottoData(1000);

