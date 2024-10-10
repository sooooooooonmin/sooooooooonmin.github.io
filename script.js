fetch('https://api.padlet.dev/v1/boards/uctz1iehqn3raj?include=posts', {
  headers: {
    'x-api-key': 'pdltp_fcbe58d2c1f7d08a0714744f890231dea23fa9871afc7e52b468c4f370a075df447b3d', // 소문자로 사용해 보세요.
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
  console.log(data); // 전체 API 응답 데이터 출력
  const petitionList = document.getElementById('petition-list');

  // posts 배열이 존재하는지 확인
  if (data.data && data.data.posts && Array.isArray(data.data.posts)) {
    // 모든 게시물 가져와서 표시하기
    data.data.posts.forEach(post => {
      const petitionElement = document.createElement('div');
      petitionElement.classList.add('petition');
      petitionElement.innerHTML = `
        <h3>${post.attributes.content.subject}</h3>
        <p>${post.attributes.content.body ? post.attributes.content.body.substring(0, 100) : '내용 없음'}...</p>
        <button>자세히 보기</button>
      `;
      petitionList.appendChild(petitionElement);
    });
  } else {
    petitionList.innerHTML = "<p>게시물이 없습니다.</p>"; // 게시물이 없을 때 메시지 표시
  }
})
.catch(error => console.error('Error fetching Padlet posts:', error));
