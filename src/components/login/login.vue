<template lang="html">
  <div class="login-container">
    <div class="login-fix">
      <div class="login">
        <div class="side">
          <span class="iconfont"><img src="../../../static/img/icon.jpg" width="60px" height="60px"></span>
          <h3 class="title">微型问卷调查平台</h3>
        </div>
        <div class="main">
          <div class="form-wrap">
            <div class="type">
              <span
                @click="changeMode('loginForm')"
                :class="{'is-active': mode === 'loginForm'}">登录</span>
              /
              <span
                @click="changeMode('signupForm')"
                :class="{'is-active': mode === 'signupForm'}">注册</span>
            </div>
            <!-- 登录表单 & 注册表单 -->
            <!-- <validator v-for="(key, form) in forms" :name="form.validateName" :key="key">
              <form
                :name="form.name"
                v-show="mode === form.name"
                :id="form.name"
                @submit="form.submitCallback"
                novalidate>
                <div class="input-item" v-for="field of form.fields" :key="field.id">
                  <div class="input-item-box">
                    <input
                      :id="field.id"
                      :placeholder="field.placeholder"
                      :field="field.name"
                      :name="field.name"
                      :data-relate-id="field.relateId"
                      v-validate="field.validate"
                      @blur="$validate(field.name, true)"
                      initial="off"
                      detect-change="off"
                      :type="field.type">
                      <i class="iconfont icon">{{ field.icon }}</i>
                  </div>
                  <p
                    v-for="rule in field.tips" :key="rule.id"
                    v-show="form.self['$'+form.validateName][field.name][$key]"
                    class="tip">{{ rule }}</p>
                </div> -->
                <!-- 提示 -->
                <!-- <p v-show="showLoginTip" class="tip">{{ loginTipMsg }}</p> -->
                <!-- 提示 end -->
                <!-- <div class="btn-group">
                  <button
                    class="btn"
                    type="submit"
                    :class="{
                      abled: !form.self['$'+form.validateName].touched ? false : form.self['$'+form.validateName].valid,
                      disabled: isLoading
                    }"
                    >
                    {{ form.submitBtnText }}</button>
                </div>
              </form>
            </validator> -->

            <!-- 登录表单 & 注册表单 -->
            <Form ref="signupForm" :model="signupForm" label-position="top" v-show="mode == 'signupForm'" :rules="sigupRuleValidate">
                <FormItem label="昵称" prop="signupName">
                    <Input v-model="signupForm.signupName" placeholder="昵称"></Input>
                </FormItem>
               <FormItem label="登录邮箱" prop="signupEmail">
                  <Input v-model="signupForm.signupEmail" placeholder="登录邮箱"></Input>
              </FormItem>
              <FormItem label="密码" prop="signupPassword">
                  <Input type="password" v-model="signupForm.signupPassword" placeholder="密码"></Input>
              </FormItem>
              <FormItem label="确认密码" prop="reSignupPassword">
                  <Input type="password" v-model="signupForm.reSignupPassword"></Input>
              </FormItem>
            </Form>

             <Form ref="loginForm" :model="loginForm" v-show="mode == 'loginForm'" label-position="top" :rules="loginRuleValidate">
                <FormItem label="邮箱" prop="loginEmail">
                    <Input v-model="loginForm.loginEmail" placeholder="邮箱"></Input>
                </FormItem>
              <FormItem label="密码" prop="loginPsd">
                  <Input type="password" v-model="loginForm.loginPsd" placeholder="密码"></Input>
              </FormItem>
            </Form>
            <p v-show="showLoginTip" class="tip">{{ loginTipMsg }}</p>
              <Button @click="handleSubmit('loginForm')" v-show="mode === 'loginForm'">登录</Button>
               <Button  @click="handleSubmit('signupForm')" v-show="mode === 'signupForm'">注册</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        if (this.signupForm.reSignupPassword !== '') {
          // 对第二个密码框单独验证
          this.$refs.signupForm.validateField('reSignupPassword')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认密码不能为空'))
      } else if (value !== this.signupForm.signupPassword) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      mode: 'loginForm',
      showLoginTip: false,
      loginTipMsg: '账号或密码错误！',
      isLoading: false,
      loginForm: {
        loginEmail: '',
        loginPsd: ''
      },
      signupForm: {
        signupName: '',
        signupEmail: '',
        signupPassword: '',
        reSignupPassword: ''
      },
      loginRuleValidate: {
        loginEmail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        loginPsd: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      sigupRuleValidate: {
        signupName: [
          { required: true, message: '昵称不能为空', trigger: 'blur' }
        ],
        signupEmail: [
          { required: true, message: '登录邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        signupPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        reSignupPassword: [
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      },
      forms: {
        loginForm: {
          name: 'loginForm',
          validateName: 'loginValidator',
          self: this,
          submitCallback: this.postLogin,
          submitBtnText: '登录',
          fields: [
            {
              id: 'loginEmail',
              type: 'email',
              name: 'loginEmail',
              placeholder: '邮箱',
              icon: '&#xe628;',
              validate: {
                email: true
              },
              tips: {
                email: '请输入正确的邮箱格式'
              }
            },
            {
              id: 'loginPsd',
              type: 'password',
              name: 'loginPsd',
              placeholder: '密码',
              icon: '&#xe626;',
              validate: {
                minlength: 6,
                latin: true
              },
              tips: {
                minlength: '至少输入6位数的密码',
                latin: '密码只能是字母、数字或下划线'
              }
            }
          ]
        },
        signupForm: {
          name: 'signupForm',
          validateName: 'signupValidator',
          self: this,
          submitCallback: this.postSignup,
          submitBtnText: '注册',
          fields: [
            {
              id: 'signupName',
              type: 'text',
              name: 'signupName',
              placeholder: '昵称',
              icon: '&#xe606;',
              validate: {
                required: true
              },
              tips: {
                required: '昵称不能为空'
              }
            },
            {
              id: 'signupEmail',
              type: 'email',
              name: 'signupEmail',
              placeholder: '登录邮箱',
              icon: '&#xe628;',
              validate: {
                required: true,
                email: true,
                queryEmail: true
              },
              tips: {
                required: '登录邮箱不能为空',
                email: '请输入正确的邮箱格式',
                queryEmail: '该邮箱已经存在'
              }
            },
            {
              id: 'signupPassword',
              type: 'password',
              name: 'signupPassword',
              placeholder: '密码',
              icon: '&#xe626;',
              validate: {
                required: true,
                minlength: 6,
                latin: true
              },
              tips: {
                required: '密码不能为空',
                minlength: '至少输入6位数的密码',
                latin: '密码只能是字母、数字或下划线'
              }
            },
            {
              id: 'reSignupPassword',
              type: 'password',
              name: 'reSignupPassword',
              placeholder: '再次输入密码',
              icon: '&#xe626;',
              relateId: 'signupPassword',
              validate: {
                iSamePassword: true
              },
              tips: {
                iSamePassword: '密码不一致'
              }
            }
          ]
        }
      }
    }
  },
  created () {
  },
  validators: {
    iSamePassword (val) {
      let relateId = this.el.dataset.relateId
      let relateValue = document.getElementById(relateId).value
      return val === relateValue
    },
    queryEmail (val) {
      let url = '/getdatabyemail?email=' + val
      return window.fetch(url)
        .then(res => {
          return res.json()
        })
        .then((json) => {
          return json.code === 0
            ? Promise.reject(new Error())
            : Promise.resolve()
        })
    }
  },
  methods: {
    changeMode (mode) {
      this.mode = mode
    },
    handleSubmit (name) {
      let vm = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (vm.mode === 'loginForm') {
            vm.postLogin()
          }
          if (vm.mode === 'signupForm') {
            vm.postSignup()
          }
        } else {

        }
      })
    },
    postLogin () {
      var self = this
      if (!self.isLoading) {
        self.isLoading = true
        let formDataStr = self.getFormDataStr('loginForm')
        window.fetch('/login', {
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formDataStr,
          credentials: 'same-origin'
        }).then(function (response) {
          return response.json()
        }).then(function (result) {
          if (result.code === 0) {
            self.$router.push('/platform/questionare')
          }
          if (result.code === -1 || result.code === -2) {
            if (result.code === -1) {
              self.loginTipMsg = '邮箱未注册！'
              self.isLoading = false
            } else {
              self.loginTipMsg = '密码错误！'
              self.isLoading = false
            }
            self.showLoginTip = true
            window.setTimeout(function () {
              self.showLoginTip = false
            }, 5000)
          }
        })
      }
    },
    postSignup (e) {
      var self = this
      // 注册方法
      // e.preventDefault()
      // let validator = this.$signupValidator
      // 发起请求前验证整个表单
      // this.$validate()
      if (!self.isLoading) {
        // 验证正确才能提交请求
        let formDataStr = this.getFormDataStr('signupForm')
        self.isLoading = true
        window.fetch('/signup', {
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formDataStr,
          credentials: 'same-origin'
        }).then(function (response) {
          return response.json()
        }).then(function (result) {
          console.log(result)
          if (result.code === 0) {
            self.$router.push('/platform/questionare')
          }
        }).catch((err) => {
          self.isLoading = false
          console.log('loginerr' + err)
        })
      }
    },
    getFormDataStr (id) {
      var result = ''
      switch (id) {
        case 'signupForm': {
          result = this.signupForm
          break
        }
        case 'loginForm': {
          result = this.loginForm
          break
        }
      }
      let tmpArr = []
      Object.keys(result).forEach(key => {
        tmpArr.push(key + '=' + result[key])
      })
      return tmpArr.join('&')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/helpers/mixins.scss';
@import '../../scss/_variables.scss';
.disabled {
    @include btn-disabled;
}
.login-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url(../../../static/img/home-bg.jpg);
    .login-fix {
        background-color: rgba(39, 65, 82, 0.8);
        height: 100%;
        .login {
            width: 70rem;
            height: 40rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            border-radius: 0.4rem;
            overflow: hidden;
            box-shadow: 0.3rem 0.3rem 1rem 0 #333;
            @include clearfix;
        }
    }
    .side,
    .main {
        float: left;
    }
    .side {
        width: 30rem;
        background: $blue;
        height: 100%;
        text-align: center;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .iconfont {
            font-size: 6rem;
            display: inline-block;
        }
        .title {
            font-size: 2rem;
        }
    }
    .main {
        width: 100%;
        height: 100%;
        padding-left: 30rem;
        margin-left: -30rem;
        .form-wrap {
            padding: 4rem;
            height: 100%;
            overflow: auto;
            .tip {
                color: red;
                margin-bottom: 10px;
            }
            .type {
                font-size: 2rem;
                color: $gray;
                cursor: pointer;
                margin-bottom: 4rem;
                .is-active {
                    color: $blue;
                }
            }
        }
    }
    .input-item-box {
        border-bottom: 1px solid #eee;
        position: relative;
        font-size: 1.6rem;
        margin-top: 3rem;
        input {
            border: none;
            outline: none;
            padding: 0.5rem 2rem 0.5rem 0;
            width: 100%;
        }
        .icon {
            position: absolute;
            top: 50%;
            right: 10px;
            font-style: normal;
            transform: translateY(-50%);
            color: #aaa;
        }
    }
    .msg {
        color: $blue;
    }
    .btn {
        padding: 0.5rem 2rem;
        border: 1px solid $light-gray;
        background-color: #fff;
        font-size: $font-size-lg;
        color: $light-gray;
        outline: none;
        margin-top: 3rem;
        border-radius: 2rem;
        cursor: default;
        &:active {
            border: 1px solid $light-gray;
            background-color: #fff;
            color: $light-gray;
        }
        &.abled {
            border-color: $blue;
            color: $blue;
            cursor: pointer;
            &:hover {
                background-color: lighten($blue, 10%);
                color: #fff;
            }
            &:active {
                background-color: $blue;
            }
        }
    }
}
</style>
