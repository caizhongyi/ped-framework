<template>
    <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
        <FormItem prop="userName">
            <i-input v-model="form.userName" size="large" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="ios-person"></Icon>
                </span>
            </i-input>
        </FormItem>
        <FormItem prop="password">
            <i-input type="password" size="large" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="16" type="ios-lock"></Icon>
                </span>
            </i-input>
        </FormItem>
        <FormItem>
            <Row>
                <Col span="12">
                    <Checkbox size="large" v-model="remember" label="记住密码">记住密码</Checkbox>
                </Col>
                <Col span="12" class="text-right">
                    <router-link to="/">忘记密码</router-link>
                </Col>
            </Row>
        </FormItem>
        <FormItem>
            <Button @click="handleSubmit" :loading="loading" type="primary" size="large" long>登录</Button>
        </FormItem>
    </Form>
</template>
<script>
  import cookie from "js-cookie";

  export default {
    name: "LoginForm",
    props: {
      userNameRules: {
        type: Array,
        default: () => {
          return [
            { required: true, message: "账号不能为空" }
          ];
        }
      },
      passwordRules: {
        type: Array,
        default: () => {
          return [
            { required: true, message: "密码不能为空" }
          ];
        }
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        remember: false,
        form: {
          userName: "superadmin",
          password: "1qazse4rfv"
        }
      };
    },
    computed: {
      rules() {
        return {
          userName: this.userNameRules,
          password: this.passwordRules
        };
      }
    },
    mounted() {
      let password = localStorage.getItem("password");
      let rememberPassword = localStorage.getItem("rememberPassword");
      if ( password ) {
        this.form.password = password;
      }
      this.remember = rememberPassword == 'true' ?  true : false;
    },
    methods: {
      handleSubmit() {
        localStorage.setItem("rememberPassword", this.remember);
        this.$refs.loginForm.validate((valid) => {
          if (this.remember) {
            localStorage.setItem("password", this.form.password );
          }
          else {
            localStorage.setItem("password", "");
          }

          if (valid) {
            this.$emit("on-success-valid", {
              userName: this.form.userName,
              password: this.form.password
            });
          }
        });
      }
    }
  };
</script>
