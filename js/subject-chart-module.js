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
    const yearIds = {
        '1학년': ['1학년', '1학년 1학기', '1학년 2학기'],
        '2학년': ['2학년', '2학년 1학기', '2학년 2학기'],
        '3학년': ['3학년', '3학년 1학기', '3학년 2학기'],
        '4학년': ['4학년', '4학년 1학기', '4학년 2학기']
    };

    const selectedYearIds = yearIds[year];


    document.querySelectorAll('g.cluster').forEach(cluster => {
        const clusterId = cluster.getAttribute('id');
        if (selectedYearIds.includes(clusterId)) {
            cluster.classList.remove('transparent');
        } else {
            cluster.classList.add('transparent');
        }
    });

   
    document.querySelectorAll('g.edgePath path, g.edgeLabel text').forEach(element => {
        element.style.opacity = '0.2';
    });

    selectedYearIds.forEach(id => {
        document.querySelectorAll(`g[id="${id}"] ~ g.edgePath path, g[id="${id}"] ~ g.edgeLabel text`).forEach(element => {
            element.style.opacity = '1';
        });
    });
}

document.querySelectorAll('#navigation button').forEach(button => {
    button.addEventListener('click', () => {
        const year = button.textContent;
        filterCourses(year);
    });
});
