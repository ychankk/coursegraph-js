document.getElementById('addButton').addEventListener('click', function() {
    const inputContainer = document.getElementById('inputContainer');
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');
    entryDiv.innerHTML = `
        <label>학년: <input type="number" class="grade" required></label>
        <label>학기: <input type="number" class="semester" required></label>
        <label>과목명: <input type="text" class="subject" required></label>
        <label>트랙: <input type="text" class="track"></label>
        <label>마이크로디그리: <input type="text" class="microdegree"></label>
        <label>실습여부:
            <select class="practical">
                <option value="true">True</option>
                <option value="false">False</option>
            </select>
        </label>
        <label>구분: <input type="text" class="category" required></label>
        <button type="button" class="removeButton">Remove</button>
    `;
    inputContainer.appendChild(entryDiv);

    entryDiv.querySelector('.removeButton').addEventListener('click', function() {
        inputContainer.removeChild(entryDiv);
    });
});

document.getElementById('jsonForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const entries = document.querySelectorAll('.entry');
    const jsonArray = [];

    entries.forEach(entry => {
        const grade = entry.querySelector('.grade').value;
        const semester = entry.querySelector('.semester').value;
        const subject = entry.querySelector('.subject').value;
        const track = entry.querySelector('.track').value;
        const microdegree = entry.querySelector('.microdegree').value;
        const practical = entry.querySelector('.practical').value === 'true';
        const category = entry.querySelector('.category').value;

        const jsonObject = {
            학년: parseInt(grade),
            학기: parseInt(semester),
            과목명: subject,
            트랙: track ? track.split(',').map(t => t.trim()) : null,
            마이크로디그리: microdegree ? microdegree.split(',').map(md => md.trim()) : null,
            실습여부: practical,
            구분: category
        };

        jsonArray.push(jsonObject);
    });

    const fileName = document.getElementById('fileName').value;
    if (fileName.trim() === "") {
        alert("Please enter a file name.");
        return;
    }

    const jsonOutput = JSON.stringify(jsonArray, null, 2);
    document.getElementById('jsonOutput').value = jsonOutput;

    downloadJSON(jsonOutput, fileName + ".json");
});

function downloadJSON(jsonString, fileName) {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
