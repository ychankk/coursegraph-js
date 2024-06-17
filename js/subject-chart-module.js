import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: true });

document.addEventListener('DOMContentLoaded', function () {
    let searchText = '';
    let isFirstSearch = true;

    function doSearch(text) {
        let isfind = false;
        document.querySelectorAll('.nodeLabel')
            .forEach((element) => {
                if (doDeleteSpace(element.textContent).includes(doDeleteSpace(text))) {
                    window.find(element.textContent, false, false, false, false, false, false);

                    isfind = true;
                }
            });
        if (isfind)
            return;
        alert('일치하는 과목을 찾을 수 없습니다.');
    }

    function doDeleteSpace(text) {
        return text.split(' ').join('');
    }

    document.getElementById('SearchBtn').addEventListener('click', function () {
        doSearch(document.getElementById('SearchTxt').value);
    });

    document.getElementById('SearchTxt').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            doSearch(event.target.value);
        }
    });

    function toggleTransparency(elementsToResize) {
        let isTransparent = false;
        document.querySelectorAll('.node').forEach(node => {
            if (node.classList.contains('transparent')) {
                isTransparent = true;
            }
        });

        if (isTransparent) {
            document.querySelectorAll('.node').forEach(node => {
                node.classList.remove('transparent');
            });
        } else {
            document.querySelectorAll('.node').forEach(node => {
                node.classList.add('transparent');
            });

            elementsToResize.forEach(id => {
                const element = document.querySelector(`[data-id="${id}"]`);
                if (element) {
                    element.classList.remove('transparent');
                }
            });
        }
    }

    function getChangeDivText(elementId) {
      const element = document.getElementById(elementId); // 실제 DOM 요소를 가져옴
      const text = element.innerText; // 요소의 텍스트 내용을 가져옴

      if (text === "전공기초(필수)") {
          element.innerText = "전공기초(필수)(표시하지않음)";
      } else if (text === "전공기초(필수)(표시하지않음)") {
          element.innerText = "전공기초(필수)";
      } else if (text === "공통권장과목") {
          element.innerText = "공통권장과목(표시하지않음)";
      } else if (text === "공통권장과목(표시하지않음)") {
          element.innerText = "공통권장과목";
      }
      
    }

    document.getElementById('majorSelection').addEventListener('click', function () {
        const elementsToResize = [
            'B1', 'B2', 'C2', 'C3', 'D1', 'D2', 'D3',
            'C5', 'D4', 'E2', 'E4', 'F2', 'F4', 'F5'
        ];
        toggleTransparency(elementsToResize);
        getChangeDivText('majorSelection');
    });

    document.getElementById('basicMajor').addEventListener('click', function () {
      
        const elementsToResize = [
            'A2', 'A3', 'A4', 'B3', 'B4', 'I1', 'I2'
        ];
        toggleTransparency(elementsToResize);
        getChangeDivText('basicMajor');
    });

    console.log('Script loaded and DOM fully parsed');
});

// 페이지 로드 시 특정 섹션으로 자동 스크롤
window.onload = function () {
    const element = document.getElementById("basicMajor");
    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
};

function scrollToSection(sectionId) {
    const section = document.querySelector(`subgraph[title="${sectionId}"]`);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function filterCourses(year) {
    const yearSections = {
        '1학년': ['웹스크립트프로그래밍', '프로그래밍실습', '컴퓨터개론', '확률과 통계', '고급프로그래밍', '정보보호개론', '이산구조', '파이썬프로그래밍'],
        '2학년': ['시스템프로그래밍', '시스템보안', '자료구조', '오픈소스sw개발', '컴퓨터네트워크', '알고리즘', '계산이론', '객체지향프로그래밍', '컴퓨터구조', '임베디드시스템 및 실습', '양자컴퓨팅개론'],
        '3학년': ['모바일프로그래밍', '프로그래밍언어론', '머신러닝의이해', '운영체제', '.NET프로그래밍', '네트워크 프로그래밍 및 보안', '인공지능', '컴퓨터그래픽스', '데이터베이스', '소프트웨어공학'],
        '4학년': ['웹서버프로그래밍', '가상증강현실', '게임서버프로그래밍', '데이터베이스프로그래밍', '역공학', '암호의 이해', '빅데이터', '클라우드컴퓨팅', '블록체인']
    };

    document.querySelectorAll('.node').forEach(node => {
        const nodeText = node.textContent || node.innerText;
        if (yearSections[year].some(course => nodeText.includes(course))) {
            node.classList.remove('transparent');
        } else {
            node.classList.add('transparent');
        }
    });
}
