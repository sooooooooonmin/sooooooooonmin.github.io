fetch('https://api.padlet.dev/v1/boards/uctz1iehqn3raj?include=posts', {
  headers: {
    'x-api-key': 'pdltp_fcbe58d2c1f7d08a0714744f890231dea23fa9871afc7e52b468c4f370a075df447b3d',
    'accept': 'application/vnd.api+json'
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  console.log(data);
  const petitionList = document.getElementById('petition-list');

  if (data.included && Array.isArray(data.included)) {
    const posts = data.included.filter(item => item.type === 'post');

    if (posts.length > 0) {
      posts.forEach(post => {
        if (post.attributes && post.attributes.content) {
          const petitionElement = document.createElement('div');
          petitionElement.classList.add('petition');
          const postUrl = post.webUrl && post.webUrl.live ? post.webUrl.live : '#';

          petitionElement.innerHTML = `
            <h3>${post.attributes.content.subject || '제목 없음'}</h3>
            <p>${post.attributes.content.bodyHtml.replace(/<[^>]+>/g, '').substring(0, 100) || '내용 없음'}...</p>
            <a href="#" class="details-link" data-title="${post.attributes.content.subject}" data-body="${post.attributes.content.bodyHtml}">자세히 보기</a>
          `;
          petitionList.appendChild(petitionElement);
        }
      });
    } else {
      petitionList.innerHTML = "<p>게시물이 없습니다.</p>";
    }
  } else {
    petitionList.innerHTML = "<p>게시물이 없습니다.</p>";
  }
})
.catch(error => console.error('Error fetching Padlet posts:', error));

// 모달 관련 코드
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const closeButton = document.getElementById('close-button');

// "자세히 보기" 링크 클릭 시
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('details-link')) {
    event.preventDefault(); // 기본 링크 클릭 동작 방지
    modalTitle.textContent = event.target.getAttribute('data-title');
    modalBody.innerHTML = event.target.getAttribute('data-body'); // HTML 내용으로 설정
    modal.style.display = 'block'; // 모달 표시
  }
});

// 모달 닫기 버튼 클릭 시
closeButton.addEventListener('click', function() {
  modal.style.display = 'none'; // 모달 숨김
});

// 모달 외부 클릭 시 닫기
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none'; // 모달 숨김
  }
});
