<br />
<div align="center">
  <h2>우만종합사회복지관<br /> 식단 Bot</h1>
</div>

----

<!-- ABOUT THE PROJECT -->
## About The Project

매일 아침마다 복지관 식단 알려주는 봇

## Archived

## 이메일 등록하기

`src/config/mail.json`에서, production에 보내고 싶은 이메일을 추가.

## Development Tips

1. 개발 가이드
    1. 원활한 개발을 위한 명령어
    ```bash
    yarn dev
    ```

    2. 코드 수정 or 작성하고, git add, commit까지 진행하기
    
    3. git push 전, gitlab-runner, docker 키기
    ```bash
    sudo gitlab-runner run
    ```
    ```powershell
    docker
    ```

    4. git push
        * gitlab-ci로 인해, master branch에 push 하기만 하면 자동으로 배포가 됩니다.


2. Docker 개발 가이드
    - docker container를 만들어 테스트 해보고 싶은 경우 
        - image 만들기
            ```bash
            docker build --tag wooman:1.0.0 .
            ```
        - docker container run
            ```
            docker stop wooman1 && docker rm wooman1 && docker run -it --name wooman1 -d \
            -e MAIL_USER=[MAIL_USER] \
            -e CLIENT_SECRET=[CLIENT_SECRET] \
            -e CLIENT_ID=[CLIENT_ID] \
            -e REFRESH_TOKEN=[REFRESH_TOKEN] \
            wooman:1.0.0
            ```

