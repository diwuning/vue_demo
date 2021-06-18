<template>
    <div>
        <a-form :form="form" :label-col="{span: 5}" :wrapper-col="{span:12}" @submit="handleSubmit">
            <a-form-item label="Note">
                <a-input v-decorator="['note',{rules:[{required:true, message: 'Please input your note!'}]}]"/>
            </a-form-item>
            <a-form-item label="Gender">
                <a-select v-decorator="['gender',{rules: [{required: true, message: 'Please select your gender!'}]}]"
                          plceholder="select a option and change input text above" @change="handleSelectChange">
                    <a-select-option value="male">
                        male
                    </a-select-option>
                    <a-select-option value="female">
                        female
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" html-type="submit">
                    Submit
                </a-button>
            </a-form-item>
        </a-form>
        <a-form-model ref="ruleForm" :model="loginForm" :rules="rules" :label-col="{span: 4}" :wrapper-col="{span: 5}">
            <a-form-model-item ref="name" label="账户" prop="username">
                <a-input v-model="loginForm.username" placeholder="UserName" :rules="rules.username"></a-input>
            </a-form-model-item>
            <a-form-model-item ref="password" label="密码" prop="password">
                <a-input type="password" v-model="loginForm.password" placeholder="123456"></a-input>
            </a-form-model-item>
            <a-form-model-item ref="code" label="验证码" prop="code">
                <a-input v-model="loginForm.code" style="width: 70%; float: left"/>
                <img :src="codeImg" class="codeImg">
            </a-form-model-item>
            <a-form-model-item ref="remember" label="记住密码">
                <a-switch v-model="loginForm.remember" style="float: left"/>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 4, offset: 4 }">
                <a-button  type="primary" @click="submitForm">提交</a-button>
                <a-button @click="resetForm">重置</a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this,{name:'coordinated'}),
                loginForm: {
                    // 账户数据
                    username: '',
                    // 密码数据
                    password: '123456',
                    // 验证码数据
                    code: '',
                    // 记住密码
                    remember: false,
                    // 验证码的key，因为前后端分离，这里验证码不能由后台存入session，所以交给vue状态管理
                    codeToken: ''
                },
                //表单验证
                rules: {
                    //设置账户校验规则
                    username: [
                        {required:true, message: '请输入账户', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3到10个字符的账户', trigger: 'blur'}
                    ],
                    // 设置密码效验规则
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 15, message: '长度在 6 到 15 个字符的密码', trigger: 'blur'}
                    ],
                    // 设置验证码效验规则
                    code: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                        {min: 5, max: 5, message: '长度为 5 个字符', trigger: 'blur'}
                    ]
                },
                //绑定验证码图片
                codeImg: null
            }
        },
        created() {
            this.getVerifyCodeImg()
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form:', values)
                    }
                })
            },
            handleSelectChange(value) {
                console.log(value);
                this.form.setFieldsValue({
                    note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
                });
            },
            submitForm() {
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        // 表单验证成功
                        // alert('submit')
                        this.$axios.post('/login', this.loginForm).then(res => {
                            let result = JSON.parse(res.data.data)
                            let message = res.data.msg
                            if (result) {
                                alert(message)
                                this.$router.push('/')
                            }
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            resetForm() {
                this.$refs.ruleForm.resetFields()
            },
            getVerifyCodeImg() {
                this.$axios.get('/getVerifyCode').then(res => {
                    this.loginForm.codeToken = res.data.data.codeToken
                    this.codeImg = res.data.data.codeImg
                })
            }
        }
    }
</script>

<style scoped>
    .codeImg {
        float: right;
        border-radius: 3px;
        width: 26%;
    }
</style>