<script setup>
import seckillHttp from '@/api/seckillHttp';
import { onMounted, ref } from 'vue';

let commodities = ref([])

onMounted(async () => {
    const data = await seckillHttp.getCommodityList();
    commodities.value = data;
})

const onAddGoodsClick = () => {

}
</script>

<template>
<el-card>
    <template #header>
        <div style="display: flex; justify-content: space-between;">
            <h1>商品管理</h1>
            <el-button type="primary" @click="onAddGoodsClick">
                <el-icon><Plus /></el-icon>添加商品
            </el-button>
        </div>
    </template>
    <el-table :data="commodities" style="width: 100%">
        <el-table-column label="图片" width="120">
            <template #default="scope">
                <el-image :src="scope.row.covers[0]" style="height: 100px; width: 80px;"></el-image>
            </template>
        </el-table-column>
        <el-table-column label="标题">
            <template #default="scope">
                <router-link to="#">{{scope.row.title}}</router-link>
            </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" width="180" />
        <el-table-column prop="create_time" label="发布时间" />
    </el-table>
</el-card>
</template>

<style scoped>

</style>