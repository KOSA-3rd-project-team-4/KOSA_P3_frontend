<template>
  <div class="signup-container">
    <h2>회원가입</h2>
    <form @submit.prevent="register">
      <div>
        <label for="name">이름</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label for="username">아이디</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">비밀번호</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label for="confirmPassword">비밀번호 확인</label>
        <input type="password" v-model="confirmPassword" required />
      </div>
      <div>
        <label for="email">이메일</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="businessNumber">사업자등록번호</label>
        <div class="business-number-container">
          <input type="text" v-model="businessNumber" required />
          <button type="button" class="lookup-button" @click="lookupBusinessNumber">조회</button>
        </div>
      </div>
      <button type="submit">회원가입</button>
    </form>

    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>사업체 정보 입력</h2>
        <div>
          <label for="businessName">사업체 이름</label>
          <input type="text" v-model="businessName" required />
        </div>
        <div>
          <label for="businessAddress">사업체 주소</label>
          <div class="business-address-container">
            <input type="text" v-model="zonecode" placeholder="우편번호" disabled />
            <button type="button" class="lookup-button" @click="searchAddress">주소 검색</button>
          </div>
          <input type="text" v-model="roadAddress" placeholder="도로명 주소" disabled />
          <input type="text" v-model="roadAddressDetail" placeholder="상세주소를 입력해주세요." />
        </div>
        <div>
          <label for="businessPhone">사업체 전화번호</label>
          <input type="text" v-model="businessPhone" required />
        </div>
        <button @click="saveBusinessInfo">저장</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      businessNumber: '',
      businessName: '',
      zonecode: '',
      roadAddress: '',
      roadAddressDetail: '',
      businessPhone: '',
      isModalOpen: false,
    };
  },
  methods: {
    register() {
    if (this.password !== this.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const memberData = {
      username: this.username,
      password: this.password,
      email: this.email,
      bizrno: this.businessNumber,
      bizname: this.businessName,
      address: `${this.roadAddress} ${this.roadAddressDetail}`,
      call_number: this.businessPhone,
    };
    console.log(memberData);
    axios.post('http://localhost:8080/api/register', memberData)
      .then(() => {
        alert('회원가입이 완료되었습니다.');
        this.$router.push('/login');
      })
      .catch(err => {
        alert('회원가입에 실패했습니다: ' + err.message);
      });
  },
    lookupBusinessNumber() {
      this.businessNumber = this.businessNumber.replace(/[^0-9]/g, "");

      if (!this.businessNumber) {
        alert("사업자등록번호를 입력해주세요.");
        return;
      }

      const data = {
        "b_no": [this.businessNumber]
      };

      axios.post("https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=elKSdPM1k7zdhLRa7NyhquaPbmyeiTkOleT6e5by6XuWxnqILwltax%2BtXgl%2B%2BTNzAtgz5WCtXbUx7WbOZ1fUfg%3D%3D", data, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Accept": "application/json"
        }
      })
      .then(response => {
        const result = response.data;
        console.log(result);
        if (result.match_cnt === 1) {
          alert(result.data[0]["tax_type"]);
          this.isModalOpen = true;
        } else {
          alert("조회된 사업자 정보가 없습니다.");
        }
      })
      .catch(error => {
        console.log("error");
        console.log(error.response.data);
      });
    },
    searchAddress() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.zonecode = data.zonecode;
          this.roadAddress = data.roadAddress;
        },
      }).open();
    },
    saveBusinessInfo() {
      // 사업체 정보 저장 로직
      this.isModalOpen = false;
    },
    closeModal() {
      this.isModalOpen = false;
    }
  }
};
</script>

<style scoped>
  @import url('/src/assets/signup.css');
</style>
