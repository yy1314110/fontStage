<template>
  <div class="login_class">
    <div class="video-container">
      <video
        ref="video"
        :poster="page_dict.video_img"
        loop="loop"
        height="100%"
        id="videos"
        style="object-fit: fill"
        width="100%"
      >
        <source :src="page_dict.video" type="video/mp4" />
      </video>
    </div>
    <div id="video-btn" :class="c_btn" style="float: right"></div>
    <main :class="main_class">
      <div class="box">
        <div class="inner-box">
          <div class="forms-wrap">
            <form
              action=""
              onsubmit="return false;"
              autocomplete="off"
              method="post"
              class="sign-in-form"
            >
              <div class="logo">
                <a href="/">
                  <img
                    src="/logo.png"
                    style="height: 60px; width: 100px"
                    alt="easyclass"
                  />
                  <!--                <h4>聚词云</h4>-->
                </a>
                <div style="margin-left: 30px" @click="login_switch">
                  <p style="color: #bbb; font-size: 0.7rem; margin-top: 10px">
                    切换登录模式
                  </p>
                  <div type="submit" class="sign-btn1">
                    -> {{ login_show_text }}
                  </div>
                </div>
              </div>

              <div class="heading">
                <h2>Welcome Back</h2>
                <h6>没有账号?</h6>
                <a href="javascript:void(0)" class="toggle" @click="toggle_btn">
                  注 册</a
                >
              </div>

              <div class="actual-form" v-if="login_show">
                <div class="input-wrap">
                  <input
                    type="text"
                    placeholder="请输入账号"
                    name="user_name"
                    minlength="1"
                    class="input-field"
                    autocomplete="off"
                    required
                    v-model="login_user.username"
                  />
                  <!--                  <label>账号</label>-->
                </div>

                <div class="input-wrap">
                  <input
                    type="password"
                    placeholder="请输入密码"
                    name="password"
                    minlength="6"
                    class="input-field"
                    autocomplete="off"
                    required
                    v-model="login_user.password"
                  />
                  <label></label>
                </div>

                <input
                  type="submit"
                  value="登 录"
                  class="sign-btn"
                  @click="LoginPwd"
                />

                <p class="text">
                  忘记密码或登录数据？点击
                  <a href="#">忘记密码</a>.
                </p>
              </div>

              <div class="actual-form" v-if="!login_show">
                <div class="input-wrap">
                  <input
                    type="text"
                    placeholder="请输入手机号"
                    v-model="login_sms.phone"
                    class="input-field"
                    autocomplete="on"
                    title="请输入正确的手机号!"
                    pattern="^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$"
                  />
                  <!--                      oninvalid="setCustomValidity('请输入11位手机号');"-->
                  <!--                  <label>账号</label>-->
                </div>

                <div class="input-wrap">
                  <input
                    type="text"
                    placeholder="请输入验证码"
                    maxlength="6"
                    minlength="6"
                    class="input-field"
                    autocomplete="off"
                    required
                    v-model="login_sms.sms_code"
                    style="width: 160px"
                  />
                  <div
                    style="text-align: right"
                    @click="getSmsCode(login_sms.phone, 1)"
                  >
                    <p :class="form_c.sms_class">{{ form_c.sms_text }}</p>
                  </div>

                  <!--                  <label></label>-->
                </div>

                <input
                  type="submit"
                  value="登 录"
                  class="sign-btn"
                  @click="LoginSms()"
                />

                <p class="text">
                  忘记密码或登录数据？点击
                  <a href="#">忘记密码</a>.
                </p>
              </div>
            </form>

            <form
              action="/"
              autocomplete="off"
              onsubmit="return false;"
              class="sign-up-form"
            >
              <div class="logo">
                <a href="/">
                  <img
                    src="/logo.png"
                    style="height: 60px; width: 100px"
                    alt="easyclass"
                  />
                  <!--                <img src="/img/logo.png" alt="easyclass" />-->
                  <!--                <h4>easyclass</h4>-->
                </a>
              </div>

              <div class="heading">
                <h3>注册账号</h3>
                <h6>已经有一个帐户?</h6>
                <a href="javascript:void(0)" class="toggle" @click="toggle_btn">
                  登 录</a
                >
              </div>

              <div class="actual-form">
                <div class="input-wrap">
                  <input
                    type="text"
                    minlength="4"
                    placeholder="请输入注册的手机号"
                    class="input-field"
                    name="phone"
                    v-model="register.phone"
                    autocomplete="off"
                    required
                  />
                  <!--                  <label>Name</label>-->
                </div>

                <div class="input-wrap">
                  <input
                    type="text"
                    placeholder="请输入验证码"
                    minlength="4"
                    class="input-field"
                    v-model="register.sms_code"
                    autocomplete="off"
                    required
                    style="width: 160px"
                  />
                  <div
                    style="text-align: right"
                    @click="getSmsCode(register.phone, 0)"
                  >
                    <p :class="form_c.sms_class">{{ form_c.sms_text }}</p>
                  </div>

                  <!--                  <label></label>-->
                </div>

                <div class="input-wrap">
                  <input
                    show-password
                    type="password"
                    placeholder="请输入注册的密码"
                    minlength="4"
                    v-model="register.password"
                    class="input-field"
                    autocomplete="off"
                    required
                  />

                  <!--                  <el-input placeholder="请输入密码" v-model="input" show-password></el-input>-->
                  <!--                  <label>Password</label>-->
                </div>
                <div class="idestiny">
                  <input
                    type="radio"
                    name="teacher"
                    v-model="check"
                    value="teacher"
                  />
                  <span>老师请勾选</span>
                  <input
                    type="radio"
                    name="teacher"
                    id=""
                    v-model="check"
                    value="student"
                  />
                  <span>学生请勾选</span>
                </div>

                <input
                  type="submit"
                  value="注 册"
                  class="sign-btn"
                  @click="registerHandler"
                />

                <p class="text">
                  注册即表示我同意
                  <a href="#">服务条款</a> 和
                  <a href="#">隐私政策</a>
                </p>
              </div>
            </form>
          </div>

          <div class="carousel">
            <div class="block">
              <!--    <span class="demonstration">Click 指示器触发</span>-->
              <el-carousel trigger="click" height="350px" @change="r_item">
                <el-carousel-item>
                  <img :src="page_dict.image_url" class="image" alt="" />
                </el-carousel-item>
                <el-carousel-item>
                  <img :src="page_dict.image_url2" class="image" alt="" />
                </el-carousel-item>
                <el-carousel-item>
                  <img :src="page_dict.image_url3" class="image" alt="" />
                </el-carousel-item>
              </el-carousel>
            </div>

            <div class="text-wrap">
              <div class="text-group" :style="item_1">
                <div>
                  <h2>{{ page_dict.image_text }}</h2>
                </div>
                <div>
                  <h2>{{ page_dict.image_text2 }}</h2>
                </div>
                <div>
                  <h2>{{ page_dict.image_text3 }}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div class="square">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="circle">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>

import { getCode,register,login } from "@/api/user"
export default {
  name: "Login",

  data() {
    return {

      // 短信登录
      login_sms: {
        phone: "",
        sms_code: "",
      },
      // 账号登录
      login_user: {
        username: "",
        password: "",
      },
      register: {
        phone: "",
        sms_code: "",
        password: "",
      },

      // 身份信息、
      check: '',
      page_dict: {}, //页面数据

      remember: true, // 是否记住登录

      item_1: "qwq",
      isShow: true,
      s_img: "",
      c_btn: "video-play",
      main_class: this.$route.query.state, // 切换css样式
      login_show: true, // 登录模式
      login_show_text: "短信登录", //登录文本

      form_c: {
        phone: "",
        flag: false,
        sms_text: "点击获取验证码",
        code: "",
        validateResult: false,
        interval_time: 60, // 倒计时时间
        delivery: false,
        sms_class: "sms_class",
      },
    };
  },
  watch: {
    name: function () {
      this.login_sms.phone = this.login_sms.phone.replace(
        /[^\u4E00-\u9FA5]/g,
        ""
      );
    },
  },
  methods: {
    // // 获取登陆页的图片数据以及轮播图数据
    // async getImgInfo() {
    //   let res = await imgInfo();
    //   if (res.status == 200) {
    //     this.page_dict = res.data[0];
    //   }
    // },

    check_phone(val) {
      console.log(val);
      let e = val.target;
      e.setCustomValidity("请填写正确的手机号!");

      // val.setCustomValidity('请填写正确的手机号!');
      //  var patt = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
      // if (!patt.test(val)){
      //   q.setCustomValidity('请填写正确的手机号!');
      // }

      // var it = obj.validity;
      //
      //       if(it.typeMismatch === true){
      //           obj.setCustomValidity("请输入带http://的网站");
      //       }
    },

    // 滚动图下文本
    r_item(val) {
      // console.log(this.img_list[val][1])
      this.item_1 = "transform: translateY(-" + val * 2.2 + "rem)";

      // console.log(this.item_1)
    },

    // 登录和注册样式切换
    toggle_btn() {
      if (this.main_class === "sign-up-mode") {
        this.main_class = "";
      } else {
        this.main_class = "sign-up-mode";
      }
    },

    // 切换登录模式
    login_switch() {
      this.login_show = this.login_show !== true;
      if (this.login_show_text === "短信登录") {
        this.login_show_text = "密码登录";
      } else {
        this.login_show_text = "短信登录";
      }
    },

    // 发送验证码
    //  第一个参数是 手机号，第二个参数是判断是登陆的验证码还是注册的验证码
    async getSmsCode(val_phone, p_state) {
      let re_str =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!re_str.test(val_phone)) {
        this.$message.error("亲~ 手机号有误!");
        return;
      }
      getCode({phone:this.register.phone})
      
    },
    // 短信登陆
    async LoginSms() {
      //表单验证判断  待补充...
      if (!this.login_sms.phone || !this.login_sms.phone) {
        return;
      }

      // 登录，用户名、密码、验证码shuju
      try {
        let res = await smsLogin({
          mobile: this.login_sms.phone,
          sms_code: this.login_sms.sms_code,
        });
        // 判断是否记住密码
        // console.log(this.remember);
        if (this.remember) {
          localStorage.token = res.data.token;
          localStorage.username = res.data.username;
          localStorage.avatar = res.data.avatar;
          // localStorage.credit = res.data.credit;
          // localStorage.credit_to_money = res.data.credit_to_money;
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("avatar");

          // sessionStorage.removeItem('id');
          // sessionStorage.removeItem('credit');
          // sessionStorage.removeItem('credit_to_money');
        } else {
          sessionStorage.token = res.data.token;
          sessionStorage.username = res.data.username;
          sessionStorage.avatar = res.data.avatar;
          // sessionStorage.credit = res.data.credit;
          // sessionStorage.credit_to_money = res.data.credit_to_money;
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("avatar");
          // localStorage.removeItem('id');
          // localStorage.removeItem('credit');
          // localStorage.removeItem('credit_to_money');
        }

        this.$confirm("下一步想去哪消费！", "提示", {
          confirmButtonText: "去首页",
          cancelButtonText: "回到上一页",
          type: "success",
        })
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {
            this.$router.go(-1);
          });
      } catch (error) {
        // console.log(error.response.data);
        this.$message.error(error.response.data.non_field_errors[0]);
      }
    },

    // 密码登录
    async LoginPwd() {
      const userObj = {
        username: this.login_user.username,
        password: this.login_user.password,
        type: 1
      }
      const result = await login(userObj)
      // console.log('登录的数据',result);
      
      this.$store.dispatch('user/login',result.data)
      this.$router.push('/')      
    },

    // 注册按钮的回调
    async registerHandler() {
      let identity = 0
      if(this.check === "teacher") {
        identity = 1
      } else if(this.check === "student") {
        identity = 2
      }
      const dataObj = {
        phone: this.register.phone,
        code: this.register.sms_code,
        password: this.register.password,
        type: 3,
        identity: identity
      }
      const result = await register(dataObj)
      
    },

  },
};
</script>

<style scoped>
/*视频按钮样式*/
.video-play {
  background-image: url("/img/play@32x32.png");
  background-repeat: no-repeat;
  height: 35px;
  width: 35px;

  transform: translateY(-40px);
}

.video-pause {
  background-image: url("/img/pause@32x32.png");
  background-repeat: no-repeat;
  height: 35px;
  width: 35px;

  /*margin-top:0px;height:35px;width:35px;transform:translateY(200px);*/
  transform: translateY(-40px);
}

* {
  /* 初始化 */
  margin: 0;
  padding: 0;
}

.video-container {
  /*position: absolute;*/
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*background: blanchedalmond url(./cover.jpg) no-repeat center center/cover;*/
  /*z-index: -1;*/
  overflow: hidden;
}

@media (min-width: 850px) {
  .login_class {
    /* 100%窗口高度 */
    height: 100vh;
    /* 弹性布局 居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    /* 渐变背景 */
    background: linear-gradient(200deg, #48c6ef, #6f86d6);
    /* 溢出隐藏 */
    overflow: hidden;
  }

  .video-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*background: blanchedalmond url(./cover.jpg) no-repeat center center/cover;*/
    /*z-index: -1;*/
    overflow: hidden;
  }

  .container {
    /* 相对定位 */
    position: relative;
    z-index: 1;
    background-color: #fff;
    border-radius: 15px;
    /* 弹性布局 垂直排列 */
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    height: 500px;
    /* 阴影 */
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }

  .container .tit {
    font-size: 26px;
    margin: 65px auto 70px auto;
  }

  .container input {
    width: 280px;
    height: 30px;
    text-indent: 8px;
    border: none;
    border-bottom: 1px solid #ddd;
    outline: none;
    margin: 12px auto;
  }

  .container button {
    width: 280px;
    height: 40px;
    margin: 35px auto 40px auto;
    border: none;
    background: linear-gradient(-200deg, #fac0e7, #aac2ee);
    color: #fff;
    font-weight: bold;
    letter-spacing: 8px;
    border-radius: 10px;
    cursor: pointer;
    /* 动画过渡 */
    transition: 0.5s;
  }

  .container button:hover {
    background: linear-gradient(-200deg, #aac2ee, #fac0e7);
    background-position-x: -280px;
  }

  .container span {
    font-size: 14px;
  }

  .container a {
    color: plum;
    text-decoration: none;
  }

  ul li {
    position: absolute;
    border: 1px solid #fff;
    background-color: #fff;
    width: 30px;
    height: 30px;
    list-style: none;
    opacity: 0;
  }

  .square li {
    top: 40vh;
    left: 60vw;
    /* 执行动画：动画名 时长 线性的 无限次播放 */
    animation: square 10s linear infinite;
  }

  .square li:nth-child(2) {
    top: 80vh;
    left: 10vw;
    /* 设置动画延迟时间 */
    animation-delay: 2s;
  }

  .square li:nth-child(3) {
    top: 80vh;
    left: 85vw;
    /* 设置动画延迟时间 */
    animation-delay: 4s;
  }

  .square li:nth-child(4) {
    top: 10vh;
    left: 70vw;
    /* 设置动画延迟时间 */
    animation-delay: 6s;
  }

  .square li:nth-child(5) {
    top: 10vh;
    left: 10vw;
    /* 设置动画延迟时间 */
    animation-delay: 8s;
  }

  .circle li {
    bottom: 0;
    left: 15vw;
    /* 执行动画 */
    animation: circle 10s linear infinite;
  }

  .circle li:nth-child(2) {
    left: 35vw;
    /* 设置动画延迟时间 */
    animation-delay: 2s;
  }

  .circle li:nth-child(3) {
    left: 55vw;
    /* 设置动画延迟时间 */
    animation-delay: 6s;
  }

  .circle li:nth-child(4) {
    left: 75vw;
    /* 设置动画延迟时间 */
    animation-delay: 4s;
  }

  .circle li:nth-child(5) {
    left: 90vw;
    /* 设置动画延迟时间 */
    animation-delay: 8s;
  }

  /* 定义动画 */
  @keyframes square {
    0% {
      transform: scale(0) rotateY(0deg);
      opacity: 1;
    }
    100% {
      transform: scale(5) rotateY(1000deg);
      opacity: 0;
    }
  }
  @keyframes circle {
    0% {
      transform: scale(0) rotateY(0deg);
      opacity: 1;
      bottom: 0;
      border-radius: 0;
    }
    100% {
      transform: scale(5) rotateY(1000deg);
      opacity: 0;
      bottom: 90vh;
      border-radius: 50%;
    }
  }
}

main {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  /*background-color: #ff8c6b;*/
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/*登录版背景颜色更改*/
.box {
  position: relative;
  width: 100%;
  max-width: 850px;
  height: 500px;
  background-color: rgba(255, 255, 255, 0.83);
  border-radius: 3.3rem;
  box-shadow: 0 60px 40px -30px rgba(0, 0, 0, 0.27);
}

.inner-box {
  position: absolute;
  width: calc(100% - 4.1rem);
  height: calc(100% - 4.1rem);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.forms-wrap {
  position: absolute;
  height: 100%;
  width: 45%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  transition: 0.8s ease-in-out;
}

form {
  max-width: 260px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  transition: opacity 0.02s 0.4s;
}

form.sign-up-form {
  opacity: 0;
  pointer-events: none;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 27px;
  margin-right: 0.3rem;
}

.logo h4 {
  font-size: 1.1rem;
  margin-top: -9px;
  letter-spacing: -0.5px;
  color: #151111;
}

.heading h2 {
  font-size: 2.1rem;
  font-weight: 600;
  color: #151111;
}

.heading h6 {
  color: #bababa;
  font-weight: 400;
  font-size: 0.75rem;
  display: inline;
}

.toggle {
  color: #151111;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 500;
  transition: 0.3s;
}

.toggle:hover {
  color: #8371fd;
}

.input-wrap {
  position: relative;
  height: 37px;
  margin-bottom: 2rem;
}

.input-field {
  position: absolute;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  outline: none;
  border-bottom: 1px solid #bbb;
  padding: 0;
  font-size: 0.95rem;
  color: #151111;
  transition: 0.4s;
}

label {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.95rem;
  color: #bbb;
  pointer-events: none;
  transition: 0.4s;
}

.input-field.active {
  border-bottom-color: #151111;
}

.input-field.active + label {
  font-size: 0.75rem;
  top: -2px;
}

.sign-btn {
  display: inline-block;
  width: 100%;
  height: 43px;
  background-color: #151111;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 0.8rem;
  font-size: 0.8rem;
  margin-bottom: 2rem;
  transition: 0.3s;
}

.sign-btn1 {
  /*display: inline-block;*/
  width: 80px;
  /*height: 43px;*/
  background-image: linear-gradient(-225deg, #b8dcff 48%, #6bbbff 100%);
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 0.8rem;
  font-size: 0.8rem;
  margin-bottom: 2rem;
  transition: 0.3s;
}

.sign-btn:hover {
  background-color: #8371fd;
}

.text {
  color: #bbb;
  font-size: 0.7rem;
}

.text a {
  color: #bbb;
  transition: 0.3s;
}

.text a:hover {
  color: #8371fd;
}

main.sign-up-mode form.sign-in-form {
  opacity: 0;
  pointer-events: none;
}

main.sign-up-mode form.sign-up-form {
  opacity: 1;
  pointer-events: all;
}

main.sign-up-mode .forms-wrap {
  left: 55%;
}

main.sign-up-mode .carousel {
  left: 0%;
}

/*登录版面的图片背景颜色*/
.carousel {
  position: absolute;
  height: 100%;
  width: 44%;
  left: 50%;
  top: 0;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 2rem;
  display: grid;
  grid-template-rows: auto 1fr;
  padding-bottom: 2rem;
  overflow: hidden;
  transition: 0.8s ease-in-out;
}

.images-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.image {
  width: 100%;
  grid-column: 1/2;
  grid-row: 1/2;
  opacity: 1;
  animation-name: tada; /*fadeInLeft为要使用的动画效果名，在这里不需要加animate前缀*/
  animation-duration: 3s; /*这里设定完成该动画的时间*/
}

.img-1 {
  transform: translate(0, -50px);
}

.img-2 {
  transform: scale(0.4, 0.5);
}

.img-3 {
  transform: scale(0.3) rotate(-20deg);
}

.image.show {
  opacity: 1;
  transform: none;
  animation-name: tada; /*fadeInLeft为要使用的动画效果名，在这里不需要加animate前缀*/
  animation-duration: 3s; /*这里设定完成该动画的时间*/
  /*transition: opacity 1s, transform 0.5s;*/
}

.text-slider {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.text-wrap {
  /*margin-top: 5px;*/
  max-height: 2.2rem;
  overflow: hidden;
  margin-bottom: 0rem;
}

.text-group {
  display: flex;
  flex-direction: column;
  text-align: center;

  transition: 0.5s;
}

.text-group h2 {
  line-height: 2.2rem;
  font-weight: 600;
  font-size: 1.6rem;
  /*animation-name: zoomOutDown ; !*fadeInLeft为要使用的动画效果名，在这里不需要加animate前缀*!*/
  /*animation-duration: 1s; !*这里设定完成该动画的时间*!*/
}

.bullets {
  display: flex;
  align-items: center;
  justify-content: center;
}

.bullets span {
  display: block;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #aaa;
  margin: 0 0.25rem;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
}

.bullets span.active {
  width: 1.1rem;
  background-color: #151111;
  border-radius: 1rem;
}

@media (max-width: 850px) {
  .box {
    height: auto;
    max-width: 550px;
    overflow: hidden;
  }

  .inner-box {
    position: static;
    transform: none;
    width: revert;
    height: revert;
    padding: 2rem;
  }

  .forms-wrap {
    position: revert;
    width: 100%;
    height: auto;
  }

  form {
    max-width: revert;
    padding: 1.5rem 2.5rem 2rem;
    transition: transform 0.8s ease-in-out, opacity 0.45s linear;
  }

  .heading {
    margin: 2rem 0;
  }

  form.sign-up-form {
    transform: translateX(100%);
  }

  main.sign-up-mode form.sign-in-form {
    transform: translateX(-100%);
  }

  main.sign-up-mode form.sign-up-form {
    transform: translateX(0%);
  }

  .carousel {
    position: revert;
    height: auto;
    width: 100%;
    padding: 3rem 2rem;
    display: flex;
  }

  .images-wrapper {
    display: none;
  }

  .text-slider {
    width: 100%;
  }
}

@media (max-width: 530px) {
  main {
    padding: 1rem;
  }

  .box {
    border-radius: 2rem;
  }

  .inner-box {
    padding: 1rem;
  }

  .carousel {
    padding: 1.5rem 1rem;
    border-radius: 1.6rem;
  }

  .text-wrap {
    margin-bottom: 1rem;
  }

  .text-group h2 {
    font-size: 1.2rem;
  }

  form {
    padding: 1rem 2rem 1.5rem;
  }
}

.sms_class {
  display: inline-block;
  width: 100px;
  text-align: center;
  line-height: 37px;
  /*height: 43px;*/
  /*background-color:gray;*/
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  color: #fff;
  /*border: none;*/
  /*cursor: pointer;*/
  border-radius: 0.5rem;
  font-size: 0.8rem;

  transition: 0.3s;
}

.sms_class1 {
  display: inline-block;
  width: 100px;
  text-align: center;
  line-height: 37px;
  /*height: 43px;*/
  /*background-color:gray;*/
  background-image: linear-gradient(to left, #bdbbbe 0%, #9d9ea3 100%);
  background-blend-mode: normal, lighten, soft-light;
  color: #fff;
  /*border: none;*/
  /*cursor: pointer;*/
  border-radius: 0.5rem;
  font-size: 0.8rem;

  transition: 0.3s;
}

.sms_class:hover {
  background-image: linear-gradient(-225deg, #b8dcff 0%, #6bbbff 100%);
  background-position-x: -200px;
  transition: 1.5s;
}

.idestiny {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 20px;
}
.idestiny input {
  width: 15px;
  height: 15px;
  outline: none;
}
</style>