<script setup>
import { useUserStore } from '@/stores'

const userStore = useUserStore()

const checkGender = (gender) => {
    if (gender === 1) {
        return '男'
    } else {
        return '女'
    }
}
</script>

<template>
    <el-col style="flex: 1;background-color:#f5f5f5;width: 100%;">
        <el-row style="margin-left: 3vw;margin-top: 3vh;">
            <div style="width: 100%">
                <el-avatar :size="200" :src="User" />
            </div>
        </el-row>
        <el-row style="margin-left: 3vw;margin-top: 1vh;margin-right:3vw;">
            <el-descriptions title="用户信息" style="width: 70%;" :column="3" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <user />
                            </el-icon>
                            <span>
                                用户名称
                            </span>
                        </div>
                    </template>
                    <span>
                        {{ userStore.user.username }}
                    </span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <PieChart />
                            </el-icon>
                            <span>
                                年龄
                            </span>
                        </div>
                    </template>
                    <span>
                        {{ userStore.user.age }}
                    </span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <Connection />
                            </el-icon>
                            <span>
                                性别
                            </span>
                        </div>
                    </template>
                    <span>
                        {{ checkGender(userStore.user.gender) }}
                    </span>

                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <phone />
                            </el-icon>
                            <span>
                                手机号
                            </span>
                        </div>
                    </template>
                    {{ userStore.user.phone }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>
                                住址
                            </span>
                        </div>
                    </template>
                    {{ userStore.user.address }}
                </el-descriptions-item>
            </el-descriptions>
        </el-row>
    </el-col>
</template>

<style scoped>
el-descriptions-item {
    display: inline;
}

.self {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.cell-item {
    display: flex;
    align-items: center;

    span {
        margin-left: 10px;
    }
}
</style>