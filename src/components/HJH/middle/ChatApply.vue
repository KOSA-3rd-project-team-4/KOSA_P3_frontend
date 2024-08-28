<template>
    <div id="test-board">
        <input type="text" v-model="inputedUsername" placeholder="참여한 유저 이름을 작성" />
        <button @click="Init">참여한 유저 이름</button>
    </div>

    <div id="app-content">
        <div id="app">
            <div id="chat-title">
                <div id="chat-title-content">
                    <div id="chat-title-content-left">
                        <img src="/src/assets/HJH/return.png" alt="" srcset="" />
                    </div>

                    <div id="chat-title-content-center">
                        <h2>채팅창 타이틀(아마 게시글, 신청자)</h2>
                    </div>

                    <div id="chat-title-content-right"></div>
                    <!-- 뭐넣지-->
                </div>
            </div>
            <div id="chat-sidebar">
                <div id="chat-sidebar-content">
                    <div class="chat-sidebar-icons">
                        <button>
                            <img src="/src/assets/HJH/phone.png" alt="" srcset="" />
                        </button>
                    </div>
                    <div class="chat-sidebar-icons">
                        <button>
                            <img src="/src/assets/HJH/money.png" alt="" srcset="" />
                        </button>
                    </div>
                </div>
            </div>
            <div id="chat-content" ref="chatContent">
                <!-- 여기에 채팅 내용이 올라와야 합니다.-->
                <div v-for="(message, index) in messages" :key="index" class="chat-message">
                    <div class="chat-block">
                        <!-- id='me'로 컨트롤 -->
                        <div class="chat-content" :id="message.user">
                            <div class="chat-username">{{ message.user }}</div>
                            {{ message.text }}
                        </div>
                    </div>
                </div>
            </div>

            <div id="chat-control">
                <div id="chat-control-content">
                    <!-- <textarea name="" id=""></textarea> -->
                    <textarea
                        v-model="newMessage"
                        @input="autoResize"
                        @keyup.enter="sendMessage"
                        placeholder="Type your message here..."
                        rows="1"
                        ref="textarea"
                    ></textarea>
                    <button @click="sendMessage">전송</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // TODO DATA: 현재 입장한
            inputedUsername: '', // 새 사용자를 입력받음
            participatedUsername: '', // 참석한 사용자 이름
            newMessage: '', // 새로운 메시지 입력 필드의 값
            messages: [
                // 채팅 메시지들을 저장하는 배열
            ],
        };
    },
    computed: {
        chat_id() {
            return this.$route.params.chat_id;
        },
    },
    methods: {
        // Init: 채팅방 입장시 입장한 유저 이름을 전달해야 합니다.
        Init() {
            if (this.inputedUsername.trim() !== '') {
                this.participatedUsername = this.inputedUsername; // user 값을 새로운 이름으로 변경
                console.log('Username changed to: ${this.user}');

                this.messages = [
                    {
                        user: 'me',
                        text: '안녕하세요',
                    },
                    {
                        user: '지원자',
                        text: '안녕하십니까 :)',
                    },
                    {
                        user: 'me',
                        text: '공고 조건 괜찮으신가요? 결격사유 문제 없으신거죠?',
                    },
                ];
            }
        },
        autoResize() {
            const textarea = this.$refs.textarea;
            textarea.style.height = 'auto'; // 높이를 초기화하여 스크롤 높이를 올바르게 계산
            textarea.styel.height = `${textarea.scrollHeight}px`; // scrollHeight에 맞춰 높이 조정
        },
        sendMessage() {
            console.log(this.newMessae);
            if (this.newMessage.trim() !== '') {
                // 메시지를 할당합니다.
                this.messages.push({
                    user: this.participatedUsername,
                    text: this.newMessage,
                });

                // 메시지를 초기화합니다.
                this.newMessage = '';
                this.$nextTick(() => {
                    this.scrollToBottom(); // 스크롤을 업데이트합니다.
                    this.autoResize(); // 사이즈를 조정합니다.
                });
            }
        },
        scrollToBottom() {
            const chatContent = this.$refs.chatContent;
            chatContent.scrollTop = chatContent.scrollHeight;
        },
        updated() {
            this.$nextTick(() => {
                this.scrollToBottom(); // 메시지가 추가될 때마다 스크롤을 아래로 이동
            });
        },
    },
};
</script>

<style scoped>
#app-content {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    position: relative;
    /* background-color: rgb(196, 214, 124); */
    align-content: space-around;
    text-align: -webkit-center;
}

#app {
    align-self: center;
    border: 1px solid;
    width: 33%;
    height: 80vh;
    border-radius: 15px;
    padding: 0;
    position: relative;
    display: grid;
    grid-template-rows: 10% auto 20%; /* 10%는 title과 control의 최소 높이, auto는 content의 남은 공간 */
    grid-template-columns: 90px auto; /* 10%는 sidebar의 폭, auto는 content의 나머지 폭 */
}

#test-board {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 20%;
    height: 10%;
    background-color: white;
    z-index: 1;
}

/*---------------------------------------------------------------------------------------*/

#chat-title {
    grid-column: span 2; /* 두 개의 열을 모두 차지 */
    background-color: #f1f1f1;
    border-bottom: 1px solid #ccc;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;

    padding: 10px;
}

#chat-title-content {
    width: 100%;
    height: 100%;
    /* background-color: cyan; */
    justify-content: space-between;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px 0 10px;
}

#chat-title-content img {
    width: 40px;
    height: 40px;
}

/*---------------------------------------------------------------------------------------*/

#chat-sidebar {
    grid-row: span 1; /* 두 개의 행을 모두 차지하여 세로로 긴 영역을 만듦 */
    background-color: #ccc;
    border-right: 1px solid #ccc;
    padding: 10px;
}

#chat-sidebar-content {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
}

.chat-sidebar-icons {
    left: 0;
    top: 0;
    width: 70px;
    height: 70px;
    position: relative;
    border-radius: 15px;
}

.chat-sidebar-icons button {
    padding: 0;
    margin: 0;
}

.chat-sidebar-icons img {
    width: 90%;
    height: 90%;
    position: relative;
    align-self: center;
    display: inline-flex;
    vertical-align: text-top;
}

/*---------------------------------------------------------------------------------------*/
#chat-content {
    background-color: #fff;
    overflow-y: auto;
    box-sizing: border-box;
}

/*---------------------------------------------------------------------------------------*/
#chat-control {
    grid-column: span 2;
    background-color: #e1e1e1;
    border-top: 1px solid #ccc;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    display: flex;
    align-items: center;
    padding: 15px 10px;
    box-sizing: border-box;
}

#chat-control-content {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
}

#chat-control-content textarea {
    width: 89%;
    height: 100%;
    resize: none; /* 사용자가 크기를 조절하지 못하도록 설정*/
    border: 1px solid #ccc;
    border-radius: 5px 0 0 5px;
    box-sizing: border-box;
    font-size: 1rem;
    overflow: hidden;
    line-height: 1.5rem; /* 기본 텍스트 줄 높이 설정 */
}

#chat-control-content button {
    width: 10%;
    height: 100%;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    font-size: 1rem;
}

/*-------------------------------------*/

.chat-message {
    margin-bottom: 2px;
    height: fit-content;
    position: relative;
    box-sizing: border-box;
    padding: 5px;
    display: flex;
}

.chat-block {
    position: relative;
    width: 100%;
}

.chat-username {
    position: absolute;
    top: 0;
    display: block;
}

#me .chat-username {
    right: 0;
    padding-top: 3px;
    padding-right: 10px;
}

#other .chat-username {
    left: 0;
    padding-top: 3px;
    padding-left: 10px;
}

.chat-content {
    width: 80%;
    height: 100%;
    background-color: rgb(196, 214, 124);
    border-radius: 7px;
    padding: 30px 10px 10px 10px;
    box-sizing: border-box;
    word-wrap: break-word; /* 길어진 단어를 줄바꿈 */
    overflow-wrap: break-word; /* 길어진 단어가 폭을 넘을 경우 줄바꿈 */
    white-space: normal; /* 텍스트가 폭을 넘으면 줄바꿈 */
}

#me {
    margin-left: auto;
    color: black;
}

#other {
    margin-right: auto;
    color: black;
}
</style>
