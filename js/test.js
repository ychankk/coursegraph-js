document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('courseCanvas');
    const ctx = canvas.getContext('2d');
    const data = [
        { year: 1, semester: 1, subject: '리그오브레전드' },
        { year: 1, semester: 1, subject: '발로란트' },
        { year: 1, semester: 1, subject: '피파온라인' },
        { year: 1, semester: 1, subject: '배틀그라운드' },
        { year: 1, semester: 2, subject: '로스트아크' },
        { year: 2, semester: 1, subject: '발로란트' },
        { year: 2, semester: 1, subject: '크레이지아케이드' },
        { year: 3, semester: 2, subject: '서든어택' },
        { year: 4, semester: 2, subject: '오버워치' },
        { year: 4, semester: 2, subject: '스타듀밸리' }
    ];

    drawGraph(data, ctx);
});

function drawGraph(data, ctx) {
    const yearGap = 400; // 각 학년 열 간의 수평 간격
    const verticalGap = 100; // 과목 간의 수직 간격
    const boxWidth = 300; // 박스 너비
    const boxHeight = 80; // 박스 높이

    let columns = {};

    // 각 과목의 x, y 위치를 계산
    data.forEach(course => {
        if (!columns[course.year]) {
            columns[course.year] = {
                x: 50 + (course.year - 1) * yearGap,
                y: 50
            };
        }
        let x = columns[course.year].x;
        let y = columns[course.year].y;

        // 과목 그리기
        ctx.fillStyle = 'lightblue';
        ctx.fillRect(x, y, boxWidth, boxHeight);
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(x, y, boxWidth, boxHeight);
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.fillText(course.subject, x + 10, y + 50);

        // 다음 과목 위치 업데이트
        columns[course.year].y += verticalGap + boxHeight;
    });
}
