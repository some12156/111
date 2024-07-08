var students = []; // 학생 정보를 저장할 배열
var seatsAvailable = Array.from({ length: 27 }, (_, index) => index + 1); // 사용 가능한 자리 목록 (1부터 27)

document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼 제출 기본 동작 중지
    var studentNamesInput = document.getElementById('studentNames').value.trim(); // trim()을 사용하여 앞뒤 공백 제거
    var studentNames = studentNamesInput.split('\n').map(name => name.trim()).filter(name => name !== ''); // 개행을 기준으로 이름 분리 및 정리

    if (studentNames.length === 0) {
        alert("이름을 입력해주세요.");
        return;
    }

    if (studentNames.length > seatsAvailable.length) {
        alert("자리가 부족합니다. " + seatsAvailable.length + "명 이하로 입력해주세요.");
        return;
    }

    studentNames.forEach(function(studentName) {
        var randomIndex = Math.floor(Math.random() * seatsAvailable.length);
        var seatNumber = seatsAvailable[randomIndex];
        seatsAvailable.splice(randomIndex, 1); // 사용된 자리 제거

        addStudent(studentName, seatNumber);
    });

    updateSeatChart();
    document.getElementById('studentForm').reset();
});

document.getElementById('resetButton').addEventListener('click', function() {
    students = []; // 학생 정보 초기화
    seatsAvailable = Array.from({ length: 27 }, (_, index) => index + 1); // 사용 가능한 자리 목록 초기화
    updateSeatChart(); // 자리 배치표 업데이트
});

function addStudent(name, seat) {
    students.push({ name: name, seat: seat });
}

function updateSeatChart() {
    var seatChart = document.getElementById('seatChart');
    seatChart.innerHTML = ''; // 기존 테이블 내용 초기화

    var table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-bordered', 'mt-4');
    var thead = document.createElement('thead');
    thead.classList.add('thead-dark');
    var headRow = document.createElement('tr');
    var th1 = document.createElement('th');
    th1.textContent = '이름';
    var th2 = document.createElement('th');
    th2.textContent = '자리 번호';
    headRow.appendChild(th1);
    headRow.appendChild(th2);
    thead.appendChild(headRow);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');
    students.forEach(function(student) {
        var row = document.createElement('tr');
        var cell1 = document.createElement('td');
        cell1.textContent = student.name;
        var cell2 = document.createElement('td');
        cell2.textContent = student.seat;
        row.appendChild(cell1);
        row.appendChild(cell2);
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    seatChart.appendChild(table);
}
