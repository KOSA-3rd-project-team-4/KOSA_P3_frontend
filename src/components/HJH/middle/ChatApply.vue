<template>
<div>
    <header-compo></header-compo>
    <div id="app-content">
    <!-- <div v-if="user" id="app-content"> -->
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
                </div>
            </div>
            <div id="chat-sidebar">
                <div id="chat-sidebar-content">
                </div>
            </div>
            <div id="chat-content" ref="chatContent">
                <div v-for="(message, index) in messages" :key="index" class="chat-message">
                    <div class="chat-block">
                        <div v-if="message.sent_by_member_id === 1" class="chat-content" style="margin-left: auto">
                            <div class="chat-username">{{ message.sender_name }}</div>
                            {{ message.content }}
                        </div>
                        <div v-else class="chat-content" style="margin-right: auto">
                            <div class="chat-username">{{ message.sender_name }}</div>
                            {{ message.content }}
                        </div>
                    </div>
                </div>
            </div>

            <div id="chat-control">
                <div id="chat-control-content">
                    <textarea
                        v-model="inputMessage"
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
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import HeaderCompo from '../../KBC/layouts/HeaderCompo.vue';

export default {
    name: 'ChatApply',
    components: {
        HeaderCompo,
    },
    computed: {
        chat_id() {
            return this.$route.params.chat_id;
        },
        ...mapGetters(['getUser']),
        user() {
            const userData = this.getUser;
            console.log('User data from Vuex:', userData);
            this.userInfo = userData;

            if (!userData) {
                console.log('비로그인 상태');
                return null;
            }

            if ('nick_name' in userData) {
                // alert('구직자입니다.');
                this.userRole = 1;
            }
            else if('bizname' in userData) {
                // alert('사업자입니다.');
                this.userRole = 2;
            }
            return userData;
        },
    },
    async created() {
      const loginType = this.$store.getters.getLoginType;

      // 로그인 유형에 따라 필요한 경우에만 fetch 호출
      if (loginType === 'oauth' && !this.$store.getters.isAuthenticated) {
        await this.$store.dispatch('fetchMemberLogin');
      } else if (loginType === 'normal' && !this.$store.getters.isAuthenticated) {
        await this.$store.dispatch('fetchBizLogin');
      }
    },
    data() {
        return {
            ws: null,
            inputMessage: '',
            inputedUsername: '',
            participatedUsername: '',
            messages: [],

            userInfo: '',
            userRole: 1, // 1이면 구직자, 2이면 사업자
        };
    },
    mounted() {
        this.setupWebSocket();

        axios
            .get('http://localhost:8080/query/view/chat/select/' + this.$route.params.chat_id)
            .then((response) => {
                const data = response.data;
                this.messages = data.map((item) => ({
                    chat_log_id: item.chat_log_id,
                    contract_chat_id: item.contract_chat_id,
                    sender_name: item.sender_name,
                    content: item.content,
                    chat_time: item.chat_time,
                    sent_by_member_id: item.sent_by_member_id,
                    sent_by_biz_member_id: item.sent_by_biz_member_id,
                }));

                // TODO 0829: 임시로 보내는 사람의 이름을 sender_name으로 한다.
                this.messages.forEach((item) => {
                    this.participatedUsername = item.sender_name;
                })

                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            })
            .catch((error) => {
                console.error('There was an error fetching the chat data:', error);
            });
    },
    methods: {
        autoResize() {
            const textarea = this.$refs.textarea;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        },
        sendMessage() {
            console.log(this);
            if (this.inputMessage.trim() !== '') {
                const message = {
                    chat_log_id: null, // 새 메시지이므로 null로 설정
                    contract_chat_id: this.chat_id, // 현재 채팅의 계약 ID
                    sender_name: this.participatedUsername || 'Unknown', // 사용자의 이름
                    content: this.inputMessage, // 사용자가 입력한 메시지
                    chat_time: new Date().toISOString(), // 현재 시간을 포함
                    sent_by_member_id: 1, // 현재 사용자의 ID
                    sent_by_biz_member_id: null, // 필요에 따라 설정
                };

                this.ws.send(JSON.stringify(message));
                this.inputMessage = '';
            }
        },
        setupWebSocket() {
            this.ws = new WebSocket('ws://localhost:8081');
  
            this.ws.onmessage = (event) => {
                let messageData;
                try {
                    messageData = JSON.parse(event.data);
                } catch (error) {
                    console.error("Failed to parse message data:", error);
                    return;
                }

                this.messages.push({
                    chat_log_id: messageData.chat_log_id,
                    contract_chat_id: messageData.contract_chat_id,
                    sender_name: messageData.sender_name,
                    content: messageData.content,
                    chat_time: messageData.chat_time,
                    sent_by_member_id: messageData.sent_by_member_id,
                    sent_by_biz_member_id: messageData.sent_by_biz_member_id,
                });

                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            };

            this.ws.onopen = () => {
                console.log('Connected to WebSocket server');
            };

            this.ws.onclose = () => {
                console.log('Disconnected from WebSocket server');
            };
        },
        scrollToBottom() {
            const chatContent = this.$refs.chatContent;
            chatContent.scrollTop = chatContent.scrollHeight;
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
    height: 85vh;
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
</style>
