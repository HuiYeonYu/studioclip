// 로컬 스토리지에서 기록을 불러와서 화면에 표시하는 함수
function loadActivities() {
  const weekdays = ['월요일', '화요일', '수요일', '목요일', '금요일'];
  const previousActivities = document.getElementById('previous-activities');
  previousActivities.innerHTML = ''; // 기존 내용을 초기화

  weekdays.forEach(weekday => {
      const activities = JSON.parse(localStorage.getItem(weekday)) || [];
      if (activities.length > 0) {
          const weekdayHeader = document.createElement('h3');
          weekdayHeader.textContent = weekday;
          previousActivities.appendChild(weekdayHeader);

          activities.forEach((activity, index) => {
              const activityItem = document.createElement('div');
              activityItem.classList.add('activity-item');

              const activityText = document.createElement('span');
              activityText.textContent = activity;

              const deleteButton = document.createElement('button');
              deleteButton.textContent = '삭제';
              deleteButton.classList.add('delete-button');
              deleteButton.onclick = () => deleteActivity(weekday, index);

              activityItem.appendChild(activityText);
              activityItem.appendChild(deleteButton);
              previousActivities.appendChild(activityItem);
          });
      }
  });
}

// 새로운 기록을 추가하고 로컬 스토리지에 저장하는 함수
function addActivity(weekday, activity) {
  const activities = JSON.parse(localStorage.getItem(weekday)) || [];
  activities.push(activity);
  localStorage.setItem(weekday, JSON.stringify(activities));
}

// 기록을 삭제하고 로컬 스토리지에 저장하는 함수
function deleteActivity(weekday, index) {
  const activities = JSON.parse(localStorage.getItem(weekday)) || [];
  activities.splice(index, 1);
  localStorage.setItem(weekday, JSON.stringify(activities));
  loadActivities(); // 기록을 다시 불러와 화면에 표시
}

// 폼 제출 이벤트 처리
document.getElementById('activity-form').addEventListener('submit', function(event) {
  event.preventDefault(); // 기본 제출 이벤트 방지

  // 선택된 요일과 입력된 활동 내용 가져오기
  const weekday = document.getElementById('weekday').value;
  const activity = document.getElementById('daily-activity').value.trim();

  // 활동 내용이 빈 값인지 확인
  if (activity === "") {
      alert("활동 내용을 입력해 주세요.");
      return;
  }

  // 이전 기록에 추가하기
  addActivity(weekday, activity);

  // 입력 필드 초기화
  document.getElementById('daily-activity').value = '';

  // 기록을 다시 불러와 화면에 표시
  loadActivities();
});

// 페이지 로드 시 기록 불러오기
window.onload = loadActivities;