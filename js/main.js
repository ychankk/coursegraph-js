document.addEventListener('DOMContentLoaded', function() {
    const courses = [
        {"학년": 1, "학기": 1, "과목명": "웹스크립트프로그래밍", "트랙": ["FullStack"], "마이크로디그리": ["WebApp"], "실습여부": true, "구분": "전선"},
        {"학년": 1, "학기": 1, "과목명": "프로그래밍실습", "트랙": null, "마이크로디그리": null, "실습여부": true, "구분": "전기"},
        {"학년": 1, "학기": 1, "과목명": "컴퓨터개론", "트랙": null, "마이크로디그리": null, "실습여부": false, "구분": "전기"},
        {"학년": 1, "학기": 1, "과목명": "확률및통계", "트랙": null, "마이크로디그리": null, "실습여부": false, "구분": "전기"},
        {"학년": 1, "학기": 2, "과목명": "고급프로그래밍", "트랙": null, "마이크로디그리": null, "선수과목": ["프로그래밍실습"], "실습여부": true, "구분": "전선"},
        {"학년": 1, "학기": 2, "과목명": "정보보호개론", "트랙": ["InfoSec"], "마이크로디그리": ["InfoSec"], "실습여부": false, "구분": "전선"},
        {"학년": 1, "학기": 2, "과목명": "이산구조", "트랙": null, "마이크로디그리": null, "실습여부": false, "구분": "전기"},
        {"학년": 1, "학기": 2, "과목명": "파이썬프로그래밍", "트랙": null, "마이크로디그리": null, "실습여부": false, "구분": "전기"},
        {"학년": 2, "학기": 1, "과목명": "시스템프로그래밍", "트랙": ["InfoSec"], "마이크로디그리": ["InfoSec"], "선수과목": ["컴퓨터개론"], "실습여부": true, "구분": "전선"},
        {"학년": 2, "학기": 1, "과목명": "시스템보안", "트랙": ["InfoSec"], "마이크로디그리": ["InfoSec"], "선수과목": ["정보보호개론"], "실습여부": false, "구분": "전선"},
        {"학년": 2, "학기": 1, "과목명": "자료구조", "트랙": ["SW"], "마이크로디그리": null, "선수과목": ["이산구조"], "실습여부": false, "구분": "전선"},
        {"학년": 2, "학기": 1, "과목명": "오픈소스SW개발", "트랙": ["FullStack", "InfoSec"], "마이크로디그리": ["BackEnd", "InfoSec"], "선수과목": ["컴퓨터개론"], "실습여부": true, "구분": "전선"},
        {"학년": 2, "학기": 1, "과목명": "컴퓨터네트워크", "트랙": ["InfoSec", "SW"], "마이크로디그리": ["InfoSec"], "선수과목": ["고급프로그래밍"], "실습여부": false, "구분": "전선"},
        {"학년": 2, "학기": 2, "과목명": "알고리즘", "트랙": ["SW"], "마이크로디그리": null, "선수과목": ["자료구조"], "실습여부": false, "구분": "전선"},
        {"학년": 2, "학기": 2, "과목명": "계산이론", "트랙": ["SW"], "마이크로디그리": null, "선수과목": ["이산구조"], "실습여부": false, "구분": "전선"},
        {"학년": 2, "학기": 2, "과목명": "객체지향프로그래밍", "트랙": ["SW"], "마이크로디그리": null, "선수과목": ["알고리즘"], "실습여부": false, "구분": "전선"},
        {"학년": 3, "학기": 2, "과목명": "컴퓨터그래픽스", "트랙": null, "마이크로디그리": null, "선수과목": [".NET프로그래밍"], "실습여부": false, "구분": "전선"},
        {"학년": 3, "학기": 2, "과목명": "데이터베이스", "트랙": ["FullStack"], "마이크로디그리": ["DB"], "선수과목": ["자료구조"], "실습여부": false, "구분": "전선"},
        {"학년": 3, "학기": 2, "과목명": "소프트웨어공학", "트랙": ["SW"], "마이크로디그리": null, "선수과목": ["오픈소스SW개발"], "실습여부": false, "구분": "전선"},
        {"학년": 4, "학기": 1, "과목명": "웹서버프로그래밍", "트랙": ["FullStack"], "마이크로디그리": ["BackEnd"], "선수과목": ["웹스크립트프로그래밍", "컴퓨터네트워크"], "실습여부": true, "구분": "전선"},
        {"학년": 4, "학기": 1, "과목명": "게임서버프로그래밍", "트랙": null, "마이크로디그리": null, "선수과목": ["운영체제", "컴퓨터네트워크"], "실습여부": true, "구분": "전선"},
        {"학년": 4, "학기": 1, "과목명": "가상증강현실", "트랙": null, "마이크로디그리": null, "선수과목": ["컴퓨터그래픽스"], "실습여부": true, "구분": "전선"},
        {"학년": 4, "학기": 1, "과목명": "데이터베이스프로그래밍", "트랙": ["FullStack"], "마이크로디그리": ["DB"], "선수과목": ["데이터베이스"], "실습여부": true, "구분": "전선"},
        {"학년": 4, "학기": 1, "과목명": "캡스톤디자인", "트랙": null, "마이크로디그리": null, "선수과목": ["소프트웨어공학"], "실습여부": true, "구분": "전선"},
        {"학년": 4, "학기": 2, "과목명": "역공학", "트랙": ["InfoSec"], "마이크로디그리": ["InfoSec"], "선수과목": ["시스템보안", "컴퓨터구조", "운영체제"], "실습여부": true, "구분": "전선"},
        {"학년": 4, "학기": 2, "과목명": "암호의이해", "트랙": ["InfoSec"], "마이크로디그리": ["InfoSec"], "선수과목": ["정보보호개론", "확률및통계"], "실습여부": false, "구분": "전선"},
        {"학년": 4, "학기": 2, "과목명": "빅데이터", "트랙": ["FullStack"], "마이크로디그리": ["DB"], "선수과목": ["데이터베이스프로그래밍"], "실습여부": false, "구분": "전선"},
        {"학년": 4, "학기": 2, "과목명": "클라우드컴퓨팅", "트랙": ["FullStack"], "마이크로디그리": ["BackEnd"], "선수과목": ["운영체제", "컴퓨터네트워크"], "실습여부": true, "구분": "전선"},
        {"학년": 4, "학기": 2, "과목명": "블록체인", "트랙": ["InfoSec"], "마이크로디그리": ["InfoSec"], "선수과목": ["알고리즘", "컴퓨터네트워크"], "실습여부": true, "구분": "전선"}
    ];

    const width = 1000;
    const height = 2000;
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);

    //학년, 학기별 그룹
    const groupedCourses = {};
    courses.forEach(course => {
        const key = `${course.학년}-${course.학기}`;
        if (!groupedCourses[key]) {
            groupedCourses[key] = [];
        }
        groupedCourses[key].push(course);
    });

    //노드 저장 배열
    const nodes = [];
    const links = [];

    let yOffset = 50;
    for (const [semester, courses] of Object.entries(groupedCourses)) {
        let xOffset = 50;
        courses.forEach(course => {
            nodes.push({
                name: course.과목명,
                x: xOffset,
                y: yOffset,
                prerequisites: course.선수과목 || []
            });
            xOffset += 200; // 가로 간격
        });
        yOffset += 150; // 세로 간격
    }

    const nodeLookup = {};
    nodes.forEach(node => {
        nodeLookup[node.name] = node;
    });

    //조건에 따라 화살표
    nodes.forEach(node => {
        node.prerequisites.forEach(prerequisite => {
            if (nodeLookup[prerequisite]) {
                links.push({
                    source: nodeLookup[prerequisite],
                    target: node
                });
            }
        });
    });

    svg.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .attr("x1", d => d.source.x + 50)
        .attr("y1", d => d.source.y + 20)
        .attr("x2", d => d.target.x + 50)
        .attr("y2", d => d.target.y)
        .attr("marker-end", "url(#arrow)");

    // 노드 그리기
    const node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x},${d.y})`);
    // 글씨가 보이도록 노드에 테두리만 설정
    node.append("rect")
        .attr("width", 100)
        .attr("height", 40)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("stroke", "#000")
        .attr("fill", "none"); 

    node.append("text")
        .attr("dx", 10)
        .attr("dy", 25)
        .text(d => d.name);

    // 화살표
    svg.append("defs").append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 5)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("class", "arrowHead");
});
