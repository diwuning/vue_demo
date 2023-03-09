<!--使用elementUI实现登陆-->
<template>
    <div>
        <h3>注册表单</h3>
        <!--form表单-->
        <el-row type="flex" justify="center" align="bottom">
            <el-col :span="7" class="register-card">
                <el-form :model="registerForm" :rules="rules" label-width="21%">
                    <el-form-item label="用户名" prop="username" style="width: 380px">
                        <el-input v-model="registerForm.username"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                registerForm: {
                    username:'',password:'123456',code:'',remember: false,codeToken:'',
                    address:'',addressDetail:'',registerTime:'',age:18, headPic:''
                },
                //表单验证
                rules: {
                    username: [
                        {required: true, message:'请输入用户名',trigger:'blur'},
                        {min:3, max:10, message: '长度在3到10个字符',trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message:'请输入密码',  trigger:'blur'},
                        {min: 6, max:15, message: '长度在6到15个字符', trigger: 'blur'}
                    ],
                    code: [
                        { required: true, message:'请输入验证码', trigger:'blur'},
                        { min: 5, max: 5, message: '长度为5个字符', trigger: 'blur'}
                    ]
                },
                //绑定验证码图片
                codeImg: null
            }
        },
        methods: {

        },
    }
</script>

<style scoped>
    .register-card {
        background-color: #ffffff;
        opacity: 0.9;
        box-shadow: 0px 0 20px #ffffff;
        border-radius: 10px;
        padding: 40px 40px 30px 15px;
        width: auto;
    }
</style>
