# dadamda-front
<center><img src="./public/dadamda-logo128.png" width="300" height="300"></center>

## 📰 세상의 모든 URL, '다담다'
> 소프트웨어 마에스트로 14기 <b><영원한 팀></b> <br/>
제작 기간 : 2023.03 ~

'다담다'는 모든 사이트의 URL을 담을 수 있고 여러 스크랩들을 모아 사용자가 보드를 꾸미고 공유할 수 있는 웹 서비스입니다.

## 서비스 링크

1. [서비스 링크](https://dadamda.me/)
2. [크롬 익스텐션](https://chrome.google.com/webstore/detail/dadamda/kgaiabolccidmgihificdfaimdlfmcfj?hl=ko)

## 시작 가이드
```
npm install
npm run dev
```

## 기술 스택
### 환경
<div style='display: flex, gap: 5px'>
<img src="https://img.shields.io/badge/VSCode-007ACC?style=flat&logo=visualstudiocode&logoColor=white"/>
<img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white"/>
<img src="https://img.shields.io/badge/Github-181717?style=flat&logo=github&logoColor=white"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/Storybook-FF4785?style=flat&logo=storybook&logoColor=white"/>
</div>

   ### 개발
   <div style='display: flex, gap: 5px'>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black"/>
 <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/MaterialUI-007FFF?style=flat&logo=Mui&logoColor=white"/>
  <img src="https://img.shields.io/badge/Styled-Components-DB7093?style=flat&logo=styled-components&logoColor=white"/>
  </div>

   ### 소통 및 관리
   <div style='display: flex, gap: 5px'>
<img src="https://img.shields.io/badge/Discord-5865F2?style=flat&logo=discord&logoColor=white"/>
 <img src="https://img.shields.io/badge/Jira-0052CC?style=flat&logo=jira&logoColor=white"/>
  <img src="https://img.shields.io/badge/Confluence-172B4D?style=flat&logo=confluence&logoColor=white"/>
  </div>

## 주요 기능
✨ 크롬 익스텐션을 통한 빠른 스크랩 추가 가능

✨ 스크랩 카테고리 맞춤 컨텐츠 제공

✨ '보드'를 통해 수집한 스크랩을 꾸미고, 타인에게 공유

✨ 타인의 보드를 보며 인사이트를 얻을 수 있는 트렌딩

## 상세 기능 및 화면 구성
### 트렌딩 기능
![트렌딩 페이지 이미지](https://github.com/SWM-team-forever/dadamda-frontend/assets/83866983/0cb4de4b-1496-4a6e-805a-ba7e38f9f25d)
- 엔터테인먼트/예술, 취미/여가/여행, 생활/노하우/쇼핑, 지식/동향 분야의 보드를 조회할 수 있습니다.
- 보드 조회, 좋아요 표시하기, 보드 복사하기가 가능합니다. (타인의 보드를 복사한 경우 다시 트렌딩에 게시할 수 없습니다.)
### 보드 기능
![보드 페이지 이미지](https://github.com/SWM-team-forever/dadamda-frontend/assets/83866983/95d7a158-75fa-462b-8239-56fd0fa56ace)
- 핀 아이콘을 통해 상단에 노출하고 싶은 보드를 선택할 수 있습니다.
- 설정 아이콘을 통해 보드 정보 편집 및 삭제가 가능합니다.
- 검색을 통해 특정 키워드를 포함하는 보드를 검색할 수 있습니다.


![보드 이미지](https://github.com/SWM-team-forever/dadamda-frontend/assets/83866983/5d8bfc41-9bcb-4a4d-9b9a-b0e775d6d82e)
- 편집 기능을 통해 컨텐츠(스티커 및 스크랩)의 위치 이동, 열 이동, 열 삭제가 가능합니다.
- 스티커 버튼을 통해 보드에 노출하고 싶은 메모를 추가할 수 있습니다.
- 스크랩 버튼을 통해 보드에 추가하고 싶은 스크랩을 추가할 수 있습니다.
- 공유 버튼을 통해 트렌딩에 게시하거나 타인에게 공유할 수 있습니다.
### 스크랩 기능
![스크랩 페이지 이미지](https://github.com/SWM-team-forever/dadamda-frontend/assets/83866983/fc4fc766-6518-4777-9c54-743921f76d4f)
- 크롬 익스텐션을 통해 쉽게 스크랩을 추가할 수 있습니다.
- 이미 저장된 URL은 중복하여 추가되지 않습니다.
- 원하는 컨텐츠에서 우클릭을 통해 원하는 일부를 스크랩에 노출시킬 수 있습니다.
- 별도의 메모를 스크랩에  추가할 수 있습니다.
- 스크랩 페이지 자체에서 스크랩을 추가할 수도 있습니다.
- 각 스크랩은 카테고리에 따라 자동 분류되어 주요 정보가 추출됩니다.
  - 영상: 제목, 설명, 조회수, 영상 길이, 업로드한 유저 정보 및 게시일
  - 아티클: 제목, 설명, 업로드한 유저 정보 및 게시일
  - 상품: 제목, 가격
- 더보기 버튼을 통해 스크랩의 수정 및 삭제가 가능합니다.
- 스크랩 페이지에서 기타가 아닌 카테고리의 상품들은 내용을 확인하면서 메모 작성이 가능합니다.

### 동영상으로 확인하기
[![동영상 제목](https://img.youtube.com/vi/uYIQj-_aNZc/0.jpg)](https://www.youtube.com/watch?v=uYIQj-_aNZc)



