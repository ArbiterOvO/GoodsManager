<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { getNewsById } from '@/api/news'
const route = useRoute()
const news = ref(
    {
        title: '',
        content: ''
    }
)
onMounted(async () => {
    console.log(route.query.id)
    const res = await getNewsById(route.query.id)
    news.value = res.data.data
}

)

</script>

<template>
    <div class="container">
        <el-row class="title">
            <el-icon size="50" @click="$router.back()" style="cursor: pointer;">
                <Back />
            </el-icon>
            <div class="content">
                <h1>{{ news.title }}</h1>
            </div>
        </el-row>


        <p>{{ news.content }}</p>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    flex: 1;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: start;
}

.title {
    display: flex;
    align-items: center;
    justify-content: start;
    background-color: white;

    .content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 50px;
    }

}
</style>
