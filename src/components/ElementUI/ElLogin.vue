<template>
    <div :xl="6" :lg="7" class="bg-login">
        <el-image :src="require('../../assets/logo.png')" class="logo"/>
        <!--  标题   -->
        <el-row type="flex" class="row-bg row-two" justify="center" align="middle">
            <el-col :span="6"></el-col>
            <el-col :span="6"><h1 class="title">xAdmin管理系统</h1></el-col>
            <el-col :span="6"></el-col>
        </el-row>
        <!-- form表单 -->
        <el-row type="flex" class="row-bg card" justify="center" align="bottom">
            <el-col :span="7" class="login-card">
                <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="21%" class="loginForm">
                    <el-form-item label="账户" prop="username" style="width: 380px">
                        <el-input v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" style="width: 380px">
                        <el-input type="password" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code" style="width: 380px">
                        <el-input v-model="loginForm.code" style="width: 70%; float: left"></el-input>
                        <el-image :src="codeImg" class="codeImg"></el-image>
                    </el-form-item>
                    <el-form-item label="记住密码" prop="remember">
                        <el-switch v-model="loginForm.remember"></el-switch>
                    </el-form-item>
                    <el-form-item class="btn-ground">
                        <el-button type="primary" @click="submitForm">立即登陆</el-button>
                        <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "ElLogin",
        data() {
            return {
                loginForm: {
                    username:'',
                    password:'12345',
                    code:'',//验证码
                    remember:false, //记住密码
                    // 验证码的key，因为前后端分离，这里验证码不能由后台存入session，所以交给vue状态管理
                    codeToken:''
                },
                rules: {
                    //设置账户校验规则
                    username: [
                        {required: true, message:'请输入账户', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3到10个字符的账户', trigger: 'blur'}
                    ],
                    //设置密码校验规则
                    password: [
                        {required: true, message:'请输入密码', trigger: 'blur'},
                        {min: 6, max: 15, message: '长度在6到15个字符的密码', trigger: 'blur'}
                    ],
                    //设置验证码校验规则
                    code: [
                        {required: true, message:'请输入验证码', trigger:'blur'},
                        {min: 5, max: 5, message: '长度为5个字符',trigger: 'blur'}
                    ]
                },
                //绑定验证码图片
                codeImg: null
            }
        },
        methods: {
            getVerifyCodeImg() {
                //获取验证码
                this.$axios.get('/getVerifyCode').then(res => {
                    //获取验证码key
                    this.loginForm.codeToken = res.data.data.codeToken
                    //获取验证码图片
                    this.codeImg = res.data.data.codeImg
                    console.log('111111',res)
                })
            },
            submitForm() {
                this.$refs.loginForm.validate((valid) => {
                    if(valid) {
                        //表单验证成功
                        alert('submit');
                        this.$axios.post('/login', this.loginForm).then(res => {
                            console.log('2222',res)
                            let result = JSON.parse(res.data.data);
                            let message = res.data.msg;
                            if(result) {
                                // alert('登陆成功');
                                //登陆成功
                                this.$message.success(message);
                                //跳转页面
                                this.$router.push('/')
                            } else {
                                // this.$message.error(message);
                                this.$message({
                                    showClose:false,
                                    message: message,
                                    type:'error'
                                })
                            }
                        })
                    } else {
                        console.log('error submit!');
                        return false
                    }
                })
            },
            resetForm() {
                this.$refs.loginForm.resetFields();
            }
        },
        created() {
            this.getVerifyCodeImg()
        }
    }
</script>

<style scoped>
    .bg-login {
        height: 100%;
        background-image: url("./../../assets/logo.png");
        background-size: 100%;
    }
    .logo {
        margin: 30px;
        height: 70px;
        width: 70px;
        position: fixed;
    }
    .title {
        text-shadow: -3px 3px 1px #5f565e;
        text-align: center;
        margin-top: 30%;
        color: #41b9a6;
        font-size: 40px;
    }
    .login-card {
        background-color: #ffffff;
        opacity: 0.9;
        box-shadow: 0 0 20px #ffffff;
        border-radius: 10px;
        padding: 40px 40px 30px 15px;
        width: auto;
    }
    .codeImg {
        float: right;
        border-radius: 3px;
        width: 26%;
    }
    .btn-ground {
        text-align: center;
    }
    .card {
        padding-bottom:30px;
    }
</style>