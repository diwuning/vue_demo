<!--使用elementUI实现登陆-->
<template>
    <div>
        <h3 style="margin: 30px 0">注册表单</h3>
        <!--justify设置flex 布局下的水平排列方式，start/end/center/space-around/space-between-->
        <!--不设type时，可用gutter设置栏间距-->
        <el-row type="flex" justify="space-around" align="top">
            <el-col class="register-card" :span="8">
                <!-- label-position 属性可以改变标签的位置,top/left/right,默认right，设为top，标签和内容分两行显示-->
                <!--  size表单尺寸medium/small/mini/large，即可在el-form上设置，也可以el-form-item上设置 -->
                <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="21%" label-position="right" size="mini">
                    <el-form-item label="用户名" prop="username" style="width: 380px">
                        <el-input v-model="registerForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="registerForm.checkPass"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code">
                        <el-input v-model="registerForm.code" style="width: 70%; float: left"></el-input>
                        <el-image :src="codeImg" class="codeImg"></el-image>
                    </el-form-item>
                    <el-form-item label="记住密码" prop="remember">
                        <el-switch v-model="registerForm.remember"></el-switch>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="registerForm.sex" @input="changeSex">
<!--                            <el-radio label="0" name="male">男</el-radio>-->
                            <el-radio label="男" name="male"></el-radio>
                            <el-radio label="女" name="female"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-slider v-model="registerForm.age" :format-tooltip="formatTooltip"
                                   @change="sliderChange" @input="sliderInput"></el-slider>
                    </el-form-item>
                    <el-form-item label="有效时间" prop="validateTime">
                        <!--  type为datetime可在同一选择器里同时进行日期时间选择，type为datetimerange可选择日期和时间范围,type为date为日期选择器-->
                        <el-date-picker v-model="registerForm.validateTime" type="datetimerange" style="width:300px"
                                   range-separator="--" start-placeholder="开始日期" end-placeholder="结束日期" @change="changeDate"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <!-- 级联选择器,clearable可清空-->
                        <el-cascader v-model="registerForm.address" :options="addrOptions" clearable
                                     style="width:300px" @change="cascaderChange" @expand-change="expandChange"></el-cascader>
                    </el-form-item>
                    <el-form-item label="地址2" prop="address" style="width:380px">
                        <!-- 省市区选择器-->
                        <area-dropdown @getAreaValue="getAreaValue"></area-dropdown>
                    </el-form-item>
                    <el-form-item label="头像" prop="headPic">
                        <!-- shape设置形状circle/square,默认circle，size设大小number/large/medium/small-->
                        <el-avatar size="large" shape="square" :src="registerForm.headPic" @error="errorAvatar"></el-avatar>
                        <!--图标头像-->
                        <el-avatar icon="el-icon-user-solid"></el-avatar>
                        <!--文字头像-->
                        <el-avatar>user</el-avatar>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
                        <el-button type="primary" @click="resetForm('registerForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import areaDropdown from "./view/areaDropdown";
    export default {
        name: "elFormDemo",
        components:{areaDropdown},
        data() {
            // 确认密码的验证
            var validatePass2 = (rule, value, callback) => {
              if(value === '') {
                  callback(new Error('请再次输入密码'))
              } else if(value != this.registerForm.password) {
                  callback(new Error('两次输入密码不一致'))
              } else {
                  callback()
              }
            };
            return {
                registerForm: {
                    username:'',password:'123456',checkPass:'', code:'',remember: false,codeToken:'',
                    address:'',addressDetail:'',validateTime:'',age:18, sex:'男',
                    headPic:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
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
                    checkPass: [
                        {validator: validatePass2, trigger:'blur'}
                    ],
                    code: [
                        { required: true, message:'请输入验证码', trigger:'blur'},
                        { min: 5, max: 5, message: '长度为5个字符', trigger: 'blur'}
                    ]
                },
                //绑定验证码图片
                codeImg: null,
                addrOptions: [
                    {value: 'bj', label:'北京', children: [{value:'sxq',label:'市辖区',children: [{value:'cyq',label:'朝阳区'},{value:'hdq',label:'海淀区'}]}]}
                ],
            }
        },
        created() {
            this.getVerifyCodeImg()
        },
        methods: {
            getVerifyCodeImg() {
                this.$axios.get('/getVerifyCode').then(res => {
                    //获取验证码key
                    this.registerForm.codeToken = res.data.data.codeToken;
                    //获取验证码图片
                    this.codeImg = res.data.data.codeImg;
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        alert('submit')
                        //提交表单
                        this.$axios.post('/login',this.registerForm).then(res => {
                            let result = JSON.parse(res.data.data);
                            let message = res.data.msg
                            if(result) {
                                //登陆成功
                                this.$message.success(message);
                                //跳转页面
                                this.$router.push('/')
                            } else {
                                // this.$message.error(message);
                                this.$message({
                                    showClose:true,
                                    message:message,
                                    type:'error'
                                })
                            }
                        })
                    } else {
                        console.log('error submit')
                        return false;
                    }
                })
            },
            resetForm(formName) {
                console.log(formName)
                this.$refs[formName].resetFields();
                // this.$refs.registerForm.resetFields();
            },
            //radioGroup选定
            changeSex(value) {
                console.log('changeSex',value)
                this.registerForm.sex = value;
            },
            //格式化 Tooltip
            formatTooltip(val) {
                return val;
            },
            //拖动时触发sliderInput，松开后触发sliderChange，点击时两个方法都会触发
            //增加show-input属性时，每点击一次+或-两个方法都会触发
            sliderChange(val) {
                console.log('sliderChange',val)
                this.registerForm.age = val
            },
            sliderInput(val) {
                console.log('sliderInput',val)
            },
            changeDate(data) {
                let selTime = []
                selTime.push(data[0].toLocaleString())
                selTime.push(data[1].toLocaleString())
                this.registerForm.validateTime = selTime;
                console.log('changeDate',selTime)
            },
            //级联选择器选中值时触发
            cascaderChange(value) {
                console.log('cascaderChange',value)
                this.registerForm.address = value[0]+value[1];
            },
            //级联选择器展开下一级菜单时触发
            expandChange(arr) {
                console.log('expandChange',arr)
                if(arr.length == 1) {
                   // let res = this.getAreaData(arr[0]);
                }
            },
            //获取子组件的值
            getAreaValue(data) {
                console.log('getAreaValue',data)
            },
            errorAvatar() {
                return true
            },
            //el-upload时用下列两个方法
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size/1024/1024 < 2;
                if(!isJPG) {
                    this.$message.error('上传图片只能是jpg格式！')
                }
                if( !isLt2M) {
                    this.$message.error('上传图片大小不能超过2M')
                }
                this.registerForm.headPic = file.url
                return isJPG && isLt2M
            },
            handleAvatarSuccess(res,file) {
                console.log('handleAvatarSuccess', res, file)
                this.registerForm.headPic = URL.createObjectURL(file.raw)
            }
        },
    }
</script>

<style scoped>
    .register-card {
        background-color: #ffffff;
        opacity: 0.9;
        /*box-shadow:X轴偏移量 Y轴偏移量 阴影模糊半径 阴影扩展半径 阴影颜色 投影方式*/
        /*默认的投影方式是外阴影, 设为inset时为内阴影*/
        box-shadow: 0px 5px 20px #000000;
        border-radius: 10px;
        padding: 40px 40px 30px 15px;
        width: auto;
        margin-bottom: 40px;
    }
    .codeImg {
        border-radius: 3px;
        width: 26%;
        float: right;
    }
    .el-form-item {
        text-align: left;
    }
    .avatar-uploader {
        border:1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 178px;
        height: 178px;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
