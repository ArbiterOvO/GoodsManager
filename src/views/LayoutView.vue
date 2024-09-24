<script setup>
import router from '@/router';
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus';
import { onMounted } from 'vue';
const userStore = useUserStore()
onMounted(() => {
    userStore.getUser()
})
const handleSelect = (index) => {
    router.push(index)
}

const showSlefInfo = () => {
    router.push('/self')
    console.log('showSlefInfo')
}

const logout = () => {

    router.push('/')
    userStore.removeToken()
    ElMessage.success('注销成功')
}
</script>

<template>
    <el-container style="height: 100vh;">
        <el-aside style="display: flex;flex-direction: column;width: 13vw;background-color:#293953 ;">
            <div class="logo">
                <h1>A集团</h1>
            </div>
            <el-menu active-text-color="#ffd04b" router background-color="#545c64" class="menu"
                :default-active="$route.path" text-color="#fff" @select="handleSelect">
                <el-menu-item index="/home" class="menu-item">
                    <el-icon>
                        <HomeFilled />
                    </el-icon>
                    <span class="menu-item-text">首页</span>
                </el-menu-item>
                <el-menu-item index="/goods" class="menu-item">
                    <el-icon>
                        <ShoppingBag />
                    </el-icon>
                    <span class="menu-item-text">商品管理</span>
                </el-menu-item>
                <el-menu-item index="/original" class="menu-item">
                    <el-icon>
                        <Wallet />
                    </el-icon>
                    <span class="menu-item-text">货源管理</span>
                </el-menu-item>
                <el-menu-item index="/brand" class="menu-item">
                    <el-icon>
                        <CollectionTag />
                    </el-icon>
                    <span class="menu-item-text">品牌管理</span>
                </el-menu-item>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header>
                <div style="display: flex; justify-content: center;align-items: center;">
                    <p style="font-size: 25px;font-weight: bold;">A集团商品管理系统</p>
                </div>
                <div class="head-user">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <el-icon style="position: relative;top:20%">
                                <User />
                            </el-icon>
                            {{ userStore.user.username }}
                            <el-icon>
                                <CaretBottom />
                            </el-icon>
                        </span>
                        <template v-slot:dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item><span @click="showSlefInfo()">个人信息</span></el-dropdown-item>
                                <el-dropdown-item><span @click="logout()">退出登录</span></el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </el-header>
            <el-main class="main">
                <div style="flex: 1;display: flex;">
                    <router-view :key="$route.fullPath"></router-view>
                </div>
            </el-main>
        </el-container>


    </el-container>



</template>

<style scoped>
/* 主体 */
.main {
    padding: 10px;
    display: flex;
    flex-direction: row;
    background-color: #ccc;
}

/* 侧边栏 */
.menu {
    border: 0 !important;
    padding: 0;
    background-color: #293953;
    flex: 1;
}

.menu-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: safe;
}

.menu-item-text {
    margin-left: 10%;
}

.logo {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1a4979;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
}

/* 头 */
.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.head-user {
    display: flex;
    justify-content: end;
    align-items: center;
    height: 100%;
    padding: 20px;
    border-left: 1px solid #ccc;
}

.el-dropdown-link {
    color: #000;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
}

.el-dropdown-link:focus {
    outline: none;
}

.el-dropdown-menu {
    background-color: #d8e5f3;
}

.el-dropdown-menu__item {
    color: #fff;
}

.el-dropdown-menu__item:hover {
    background-color: #1a4979
}
</style>