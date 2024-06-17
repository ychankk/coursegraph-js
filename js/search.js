document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch(); // 사용자가 Enter 키를 누를 때 검색 실행
    }
});

function performSearch() {
    const input = document.getElementById('searchInput').value.trim();
    const filter = document.getElementById('searchFilter').value;
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = ''; // 이전 결과를 클리어

    if (!input) {
        resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    // 서버로 검색 요청 보내기
    fetch(`/api/search?filter=${filter}&term=${encodeURIComponent(input)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                const ul = document.createElement('ul');
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `${item.name} - ${item.details}`;
                    ul.appendChild(li);
                });
                resultsDiv.appendChild(ul);
            } else {
                resultsDiv.innerHTML = '<p>No results found.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultsDiv.innerHTML = `<p>Error retrieving results: ${error.message}</p>`;
        });
}
