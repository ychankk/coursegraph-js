import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

mermaid.initialize({startOnLoad: true});

document.addEventListener('DOMContentLoaded', function () {
    function doSearch(text) {
        if (window.find(text)) {
            console.log('Text found:', text);
        } else {
            console.log('Text not found:', text);
            alert('일치하는 과목을 찾을 수 없습니다.');
        }
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

    document.getElementById('majorSelection').addEventListener('click', function (event) {
        const elementsToResize = [
            'B1', 'B2', 'C2', 'C3', 'D1', 'D2', 'D3',
            'C5', 'D4', 'E2', 'E4', 'F2', 'F4', 'F5'
        ];
        toggleTransparency(elementsToResize);

    });

    document.getElementById('basicMajor').addEventListener('click', function (event) {
        const elementsToResize = [
            'A2', 'A3', 'A4', 'B3', 'B4', 'I1', 'I2'
        ];
        toggleTransparency(elementsToResize);
    });

    console.log('Script loaded and DOM fully parsed');
});