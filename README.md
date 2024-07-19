<!-- ![header](https://capsule-render.vercel.app/api?type=wave&color=373F67) -->

<br/>

<div style="text-align: center">
<img src="https://github.com/user-attachments/assets/83a7da13-7696-45d2-976e-0036e0570432" width="200px">
</div>

 <h2 style="text-align: center; color:#373F67">coding13-euid Vanilla Project</h2>
 <h5 style="text-align:center; color: #373F67">장주원 김가현 용애경 이지수</h5>
 <br/>

### ![slime](/public/slime.webp){width=35px} <span style="color:#5A85EE">중고거래 플랫폼 Enter EUID(엔터 이듬)</span>

- 멋쟁이 사자처럼 FE 10기 - 13조: 코딩을 일삼조 :computer:
- 개발 기간: 2024.07.05 ~ 2024.07.19
  <br/>

### ![slime](/public/slime.webp){width=35px} <span style="color:#5A85EE">Project Goal</span>

- **공동**
  - 시안에 있는 것을 다 하진 못해도 요구사항에 충실하자. 요구사항 만큼은 완벽히!
- **가현**
  - 협업 과정에서 컨벤션을 잘 지키기
  - 코드의 재사용성 최대한 고려하기
- **주원**
  - 수업시간에 배웠던 것들을 최대한으로 활용하기
- **지수**
  - 맡은 부분 최대한 구현하기..
  - 컨벤션 잘 지키기
  - 코드 통일성 고려하기
- **애경**
  - 수업시간에 놓친 부분, 이해가 안 가던 부분을 이번 기회로 확실히 짚고 넘어가기.
  - ..... 해내기... 밤새서라도 해내기.... 탈주 금지,,,
    <br/>

### ![slime](/public/slime.webp){width=35px} <span style="color:#5A85EE">Project URL</span>

[Enter EUID](https://enter-euid.netlify.app/)
<br/>

### ![slime](/public/slime.webp){width=35px} <span style="color: #5A85EE">Link</span>

[wiki 방문](https://github.com/FRONTENDSCHOOL10/coding13-euid/wiki)
[노션 방문](https://www.notion.so/13-41c83e44c06c4f1787cad96ca3d1a40b)
<br/>

### ![slime](/public/slime.webp){width=35px} <span style="color:#5A85EE">DB Model</span>

![db](/public/db.png){width=500px}
<br/>

### ![slime](/public/slime.webp){width=35px} <span style="color: #5A85EE">Project Feature

#### 1. 회원 가입 / 로그인

[시작하기(Start)](src/pages/start/index.html) -> [관심분야 선택(Category)](src/pages/category/index.html) -> [전화번호 인증(SignUp)](/src/pages/signup/index.html)

- **전화번호 검증**을 통해 회원가입
- 전화번호를 **localStorage의 key 값**으로 저장
- 선택한 **관심분야 localStorage에 저장**

#### 2. 메인 화면

[메인 화면 index.html](src/index.html)

- 메인 상품 **Swiper**로 구현
- 사용자 **지역 정보** 표시
- 상품 목록 렌더링
  - 상품 **상태 조회** 가능(예약중, 거래완료)
  - 상품 **검색** 기능
  - **기기 종류 별 조회** 기능 구현
- **하트** 클릭 시 상태 저장
- 상품 클릭 시 **상세 페이지로** 이동
  - 판매자가 이미지 2장 이상 등록 -> **Swiper**로 구현
  - 채팅하기 클릭 시 해당 상품의 **채팅방으로 이동**

[채팅 목록 chat/index.html](src/pages/chat/index.html)

- 채팅방 **최신순 정렬**

#### 3. 사용자 프로필

[프로필 profile/index.html](/src/pages/profile/index.html)

- 유저가 설정한 **프로필 이미지 상단 표시**
- 유저의 **열정온도** 표시
- 프로필 **조회, 수정** 기능 -> 수정 클릭 시 프로필 수정 페이지로 이동
- 프로필 수정
  - **사진 수정** 가능
  - radiobutton을 이용한 **성별 선택**
  - 수정 사항 저장 후 confirm 메시지를 **modal로 구현**
- **로그아웃** 기능

#### 4. 검색

[검색 search/index.html](/src/pages/search/index.html)

- **키워드**를 이용한 검색 -> **검색 결과 페이지**로 이동
- **최근 검색** 클릭 -> 해당 검색 결과 페이지로 이동
  - 최근 검색어 **삭제** 기능
  - 최근 검색어 **전체 삭제** 기능
- 검색창 아래 **드롭다운** 클릭 -> **모달창** 구현
  - 카테고리, 가격 **필터링**
  - 거래 가능/거래완료 선택 시 필터링 후 리렌더링
  - 검색 물품 정렬

#### 5.글쓰기</span>

[글쓰기 write-post/index.html](/src/pages/write-post/index.html)

- 카메라 아이콘 클릭 시 **사진 업로드** 기능
- 사진 업로드 시 **미리보기**
- **제목, 가격, 내용** 입력
- 작성 완료 시 **서버에 등록**
