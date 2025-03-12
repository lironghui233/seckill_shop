<template>
	<view 
		class="border font-sm px-2 py-1 rounded-10" 
		:class="seconds==props.seconds?'font-theme-color border-theme':'text-grey border'"
	>
		{{seconds==props.seconds?'获取验证码':seconds}}
	</view>
</template>

<script setup>
	import {ref} from "vue"
	
	// 外部变量
	const props = defineProps({
		seconds: {
			type: Number,
			default: 60
		}
	})
	let seconds = ref(props.seconds)
	
	// 定义事件
	const emit = defineEmits(['timeup'])
	
	let timer = null
	
	const start = () => {
		if(timer){
			return
		}
		timer = setInterval(()=>{
			seconds.value -= 1
			if(seconds.value <=0){
				clearInterval(timer)
				timer = null
				seconds.value = props.seconds
				// 触发事件
				emit('timeup')
			}
		}, 1000)
	}
	
	// 暴露方法给外部使用
	defineExpose({start})
	
</script>

<style scoped>
	
</style>