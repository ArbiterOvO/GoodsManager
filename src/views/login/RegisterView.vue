<script setup>
import { ref } from 'vue';
import { registerService } from '@/api/user.js'
import router from '@/router';
import { ElMessage } from 'element-plus';
const form = ref()
//注册表单
const formModel = ref({
    username: '',
    password: '',
    repassword: '',
    age: '',
    phone: '',
    gender: ''
})

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 10, message: '用户名必须是 2-10位 的字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
            pattern: /^\S{6,15}$/,
            message: '密码必须是 6-15位 的非空字符',
            trigger: 'blur'
        }
    ],
    repassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
            pattern: /^\S{6,15}$/,
            message: '密码必须是 6-15位 的非空字符',
            trigger: 'blur'
        },
        {
            validator: (rule, value, callback) => {
                // 判断 value 和 当前 form 中收集的 password 是否一致
                if (value !== formModel.value.password) {
                    callback(new Error('两次输入密码不一致'))
                } else {
                    callback() // 就算校验成功，也需要callback
                }
            },
            trigger: 'blur'
        }]
    , age: [
        { required: true, message: '请输入年龄', trigger: 'blur' },
        {
            pattern: /^\d{1,2}$/,
            message: '年龄必须是 1-2位 的数字',
            trigger: 'blur'
        }
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
        }
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'blur' }
    ]
}

const register = async () => {
    //注册之前的校验
    await form.value.validate()
    console.log("开始进行注册")
    //注册请求
    await registerService(formModel.value)
    ElMessage.success('注册成功')

    router.push('/')
}
</script>
<template>

    <div class="login">
        <h1>
            注册
        </h1>
        <div class="loginFrame">
            <el-form :model="formModel" ref="form" class="form" :rules="rules">
                <el-form-item prop="username">
                    <p style="margin-right: 20px;">用户名</p>
                    <el-input style="width: 20vw;" v-model="formModel.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <p style="margin-right: 40px;">密码</p>
                    <el-input style="width: 20vw" v-model="formModel.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="repassword">
                    <p>确认密码</p>
                    <el-input style="width: 20vw" v-model="formModel.repassword" placeholder="请再次输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="age">
                    <p style="margin-right: 40px;">年龄</p>
                    <el-input style="width: 20vw" v-model="formModel.age" placeholder="请输入年龄"></el-input>
                </el-form-item>
                <el-form-item prop="phone">
                    <p style="margin-right: 20px;">手机号</p>
                    <el-input style="width: 20vw" v-model="formModel.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="gender" style="margin-right: 285px;">
                    <p style="margin-right: 40px;">性别</p>
                    <el-radio-group v-model="formModel.gender">
                        <el-radio value="1" size="small">男</el-radio>
                        <el-radio value="2" size="small">女</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-button :onclick="register" type="primary" class="button">注册</el-button>
                <a href="/" class="flex">已有账号？去登录</a>
            </el-form>
        </div>
    </div>

</template>

<style scoped>
.login {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    background-color: #eee;
    overflow: hidden;
}

h1 {
    font-family: '微软雅黑';
    font-style: normal;
    font-weight: bold;
    font-size: 60px;
    color: #0071be;
    text-decoration: none;
    text-shadow: 7px 4px 4px #dbdbdb;
}

.loginFrame {
    width: 35vw;
    height: 70vh;
    box-shadow: -3px 0px 24px #a1b4cc;
    border-radius: 31px;
    border: 2px solid #00afee;
}

.form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;

    .title {
        margin: 0 auto;
    }

    .button {
        width: 40%;
        margin-bottom: 20px;
    }

    .flex {
        width: 50%;
        display: flex;
        justify-content: center;
    }
}

p {
    font-family: '微软雅黑';
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: #555;
    text-decoration: none;
    text-shadow: 7px 4px 4px #dbdbdb;
}
</style>