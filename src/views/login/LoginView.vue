<script setup>
import { ref } from 'vue';
import { loginService } from '@/api/user.js'
import { useUserStore } from '@/stores'
import router from '@/router';
import { ElMessage } from 'element-plus';
const form = ref()
//登录表单
const formModel = ref({
    username: '',
    password: ''
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
}
const userStore = useUserStore()
const login = async () => {
    //登录之前的校验
    await form.value.validate()
    console.log("开始进行登录")
    //登录请求
    const res = await loginService(formModel.value)
    ElMessage.success('登录成功')

    //存token
    userStore.setToken(res.data.data.token)
    router.push('/home')
}
</script>
<template>

    <div class="login">
        <h2>
            商品管理系统
        </h2>
        <h1>
            登录
        </h1>
        <div class="loginFrame">
            <el-form ref="form" :model="formModel" :rules="rules" class="form" @keyup.enter="login">
                <el-form-item prop="username">
                    <p>用户名</p>
                    <el-input v-model="formModel.username" style="width: 20vw;" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <p style="margin-right:22px;">密码</p>
                    <el-input style="width: 20vw" v-model="formModel.password" placeholder="请输入密码" type="password"
                        show-password></el-input>
                </el-form-item>
                <el-button @click="login" class="button" type="primary">登录</el-button>
                <a href="/register" class="flex">没有账号？去注册</a>
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
    height: 45vh;
    box-shadow: -3px 0px 24px #a1b4cc;
    border-radius: 31px;
    border: 2px solid #00afee;
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