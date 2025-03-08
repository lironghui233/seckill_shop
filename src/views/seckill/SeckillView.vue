<script setup>
import {onMounted, reactive, ref} from "vue";
import seckillHttp from "@/api/seckillHttp";
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'

let seckills = ref([]);
let dialogVisible = ref(false);

let seckillForm = reactive({
    // 商品id
    commodity_id: "",
    // 秒杀价
    sk_price: "",
    // 秒杀数量
    max_sk_count: "",
    // 每个人能秒杀的数量
    sk_per_max_count: "",
    // 开始时间
    start_time: "",
    // 结束时间
    end_time: "",
    // 时间区间
    date_range: []
})
let formLabelWidth = ref(100);
let commodities = ref([]);

onMounted(async () => {
    // 1. 获取秒杀列表
    const result = await seckillHttp.getSeckillList();
    seckills.value = result;
    
    // 2. 获取商品列表
    commodities.value = await seckillHttp.getCommodityList();
    console.log(commodities)
})

const onAddSeckillClick = () => {
    dialogVisible.value = true;
}

const onSubmitSeckillClick = async () => {
    let loading = ElLoading.service()
    seckillForm['start_time'] = seckillForm.date_range[0]
    seckillForm['end_time'] = seckillForm.date_range[1]
    seckillForm['stock'] = seckillForm.max_sk_count

    let result = await seckillHttp.addSeckill(seckillForm)
    console.log(result);
    loading.close()
    
    dialogVisible.value = false
    ElMessage({
        message: '秒杀数据添加成功！',
        type: 'success',
    })
}
</script>

<template>
<el-card>
    <template #header>
        <div style="display: flex; justify-content: space-between;">
            <h1>秒杀列表</h1>
            <el-button type="primary" @click="onAddSeckillClick"><el-icon><Plus /></el-icon>添加秒杀</el-button>
        </div>
    </template>
    <el-table :data="seckills">
        <el-table-column label="商品">
            <template #default="scope">
                {{ scope.row.commodity.title }}
            </template>
        </el-table-column>
        <el-table-column label="原价" prop="commodity.price" width="100"></el-table-column>
        <el-table-column label="秒杀" prop="sk_price" width="100"></el-table-column>
        <el-table-column label="库存" prop="stock" width="100"></el-table-column>
        <el-table-column label="每人秒杀" prop="sk_per_max_count" width="100"></el-table-column>
        <el-table-column label="创建时间" prop="create_time"></el-table-column>
        <el-table-column label="开始时间" prop="start_time"></el-table-column>
        <el-table-column label="结束时间" prop="end_time"></el-table-column>
    </el-table>
</el-card>

<el-dialog v-model="dialogVisible" title="添加秒杀" width="1000">
    <el-form :model="seckillForm">
      <el-form-item label="商品" :label-width="formLabelWidth">
        <el-select v-model="seckillForm.commodity_id">
            <el-option 
                v-for="commodity in commodities" 
                :key="commodity.id" 
                :label="commodity.title"
                :value="commodity.id"
            >
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="秒杀价" :label-width="formLabelWidth">
        <el-input v-model="seckillForm.sk_price" placeholder="请输入秒杀价" type="number"></el-input>
      </el-form-item>
      <el-form-item label="秒杀数量" :label-width="formLabelWidth">
        <el-input v-model="seckillForm.max_sk_count" placeholder="请输入秒杀数量" type="number"></el-input>
      </el-form-item>
      <el-form-item label="每人秒杀" :label-width="formLabelWidth">
        <el-input v-model="seckillForm.sk_per_max_count" placeholder="请输入每人最多秒杀量" type="number"></el-input>
      </el-form-item>
      <el-form-item label="秒杀时间" :label-width="formLabelWidth">
        <el-date-picker
            v-model="seckillForm.date_range"
            type="datetimerange"
            range-separator="到"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmitSeckillClick">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>

