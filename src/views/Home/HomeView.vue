<script setup>
import router from '@/router';
import { getNewsAll } from '@/api/news'
import { onMounted, ref } from 'vue';
import { formattedDate } from '@/utils/date'
onMounted(() => {
    getNewsList();
})
const getNewsList = async () => {
    const res = await getNewsAll();
    newsList.value = res.data.data;
}
const newsList = ref([
    {
        title: '新闻标题1',
        content: '新闻内容1',
        img: '',
        createTime: ''
    }
]);
const getDate = () => {
    const date = new Date();
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}


const menu = [
    {
        name: '商品管理',
        backgroundColor: '#f0722e',
        icon: 'HomeFilled',
        router: '/goods'
    },
    {
        name: '货源管理',
        backgroundColor: '#28e77e',
        icon: 'ShoppingBag',
        router: '/original'

    },
    {
        name: '品牌管理',
        backgroundColor: '#3bc1f1',
        icon: 'Wallet',
        router: '/brand'
    }
]
</script>
<template>
    <el-col class="home-body">
        <p style="margin-top: 0px;margin-bottom: 5px; color: #555;">今天是{{ getDate() }},欢迎来到A集团商品管理系统！</p>
        <!-- 快捷菜单 -->
        <el-col style="background-color: white;height: 15vh;padding: 5px;margin-bottom: 10px;">
            <el-row style="border-bottom: 1px solid #e4e7ed;padding: 5px;">
                <el-icon :color="'#49b1f2'" :size="20">
                    <Menu />
                </el-icon>
                <span style="margin-left: 10px;margin-top: -1px;">快捷菜单</span>
            </el-row>
            <el-row class="home-menu-grid">
                <div :style="{ 'background-color': i.backgroundColor }" v-for="i in menu" :key="i.name"
                    class="quick-menu-item" @click="router.push(i.router)">
                    <component :is="i.icon" style="width: 40px;"></component>
                    <span style="font-size: 24px;font-family:'YouYuan';margin-left: 5px;">{{ i.name }}</span>
                </div>
            </el-row>
        </el-col>
        <el-row :gutter="10" style="margin-bottom: 10px;">
            <!-- 新闻资讯 -->
            <el-col :span="12">
                <div style="background-color: white;height: 30vh;padding: 5px;">
                    <el-row
                        style="border-bottom: 1px solid #e4e7ed;padding: 5px;display: flex;justify-content: space-between;">
                        <div style="display: flex;align-items: center;">
                            <el-icon :color="'#49b1f2'" :size="20">
                                <Menu />
                            </el-icon>
                            <span style="margin-left: 10px;margin-top: -1px;">新闻资讯</span>
                        </div>
                        <div style="display: flex;align-items: center;cursor: pointer;">
                            <span style="margin-top: -1px;color: cornflowerblue;">更多</span>
                            <el-icon color="cornflowerblue">
                                <ArrowRightBold />
                            </el-icon>
                        </div>
                    </el-row>
                    <el-row class="news" v-for="(news, index) in newsList" :key="index">
                        <span class="title">{{ news.title }}</span>
                        <span class="time">{{ formattedDate(news.createTime) }}</span>
                    </el-row>
                </div>
            </el-col>
            <!-- 通知公告 -->
            <el-col :span="12">
                <div style="background-color: white;height: 30vh;padding: 5px;">
                    <el-row
                        style="border-bottom: 1px solid #e4e7ed;padding: 5px;display: flex;justify-content: space-between;">
                        <div style="display: flex;align-items: center;">
                            <el-icon :color="'#49b1f2'" :size="20">
                                <Menu />
                            </el-icon>
                            <span style="margin-left: 10px;margin-top: -1px;">通知公告</span>
                        </div>
                        <div style="display: flex;align-items: center;cursor: pointer;">
                            <span style="margin-top: -1px;color: cornflowerblue;">更多</span>
                            <el-icon color="cornflowerblue">
                                <ArrowRightBold />
                            </el-icon>
                        </div>
                    </el-row>
                </div>

            </el-col>
        </el-row>
        <el-row :gutter="10">
            <!-- 新增商品 -->
            <el-col :span="12">
                <div style="background-color: white;height: 40vh;padding: 5px;">
                    <el-row
                        style="border-bottom: 1px solid #e4e7ed;padding: 5px;display: flex;justify-content: space-between;">
                        <div style="display: flex;align-items: center;">
                            <el-icon :color="'#49b1f2'" :size="20">
                                <Menu />
                            </el-icon>
                            <span style="margin-left: 10px;margin-top: -1px;">新增商品</span>
                        </div>
                        <div style="display: flex;align-items: center;cursor: pointer;">
                            <span style="margin-top: -1px;color: cornflowerblue;">更多</span>
                            <el-icon color="cornflowerblue">
                                <ArrowRightBold />
                            </el-icon>
                        </div>
                    </el-row>
                </div>
            </el-col>
            <!-- 统计报表 -->
            <el-col :span="12">
                <div style="background-color: white;height: 40vh;padding: 5px;">
                    <el-row
                        style="border-bottom: 1px solid #e4e7ed;padding: 5px;display: flex;justify-content: space-between;">
                        <div style="display: flex;align-items: center;">
                            <el-icon :color="'#49b1f2'" :size="20">
                                <Menu />
                            </el-icon>
                            <span style="margin-left: 10px;margin-top: -1px;">统计报表</span>
                        </div>
                        <div style="display: flex;align-items: center;cursor: pointer;">
                            <span style="margin-top: -1px;color: cornflowerblue;">更多</span>
                            <el-icon color="cornflowerblue">
                                <ArrowRightBold />
                            </el-icon>
                        </div>
                    </el-row>
                </div>
            </el-col>
        </el-row>

    </el-col>
</template>
<style scoped>
.home-body {
    flex: 1;
    margin-top: 0;
}

.home-menu-grid {
    margin-top: 5px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 5px;
    color: white;
}

.quick-menu-item {
    width: 200px;
    height: 80px;
    border-radius: 5px;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: aliceblue;

}

.news {
    margin-left: 5px;
    margin-top: 8px;
    margin-right: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;


    :hover {
        cursor: pointer;
    }

    .time {
        color: #333;
        font-weight: 500;
    }

    .title {
        color: #666;
        border-bottom: 1px solid #666;
        font-weight: 500;
    }
}
</style>