<script lang="ts" setup>
import useSettingsStore from '@/store/modules/settings.ts'

const router = useRouter()
const settingsStore = useSettingsStore()

const data = ref<{
  inter: IntervalHandle | number
  countdown: number
}>({
  inter: Number.NaN,
  countdown: 5,
})

onBeforeRouteLeave(() => {
  data.value.inter && clearInterval(data.value.inter)
})

onMounted(() => {
  data.value.inter = setInterval(() => {
    data.value.countdown--
    if (data.value.countdown === 0) {
      data.value.inter && clearInterval(data.value.inter)
      goBack()
    }
  }, 1000)
})

function goBack() {
  router.push(settingsStore.settings.home.fullPath)
}
</script>

<template>
  <div class="notfound">
    <SvgIcon name="404" class="icon" />
    <div class="content">
      <h1>404</h1>
      <div class="desc">
        抱歉，你访问的页面不存在
      </div>
      <ElButton type="primary" @click="goBack">
        {{ data.countdown }} 秒后，返回首页
      </ElButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notfound {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 700px;

  @include position-center(xy);

  .icon {
    width: 400px;
    height: 400px;
  }

  .content {
    h1 {
      margin: 0;
      font-size: 72px;
      color: var(--el-text-color-primary);
    }

    .desc {
      margin: 20px 0 30px;
      font-size: 20px;
      color: var(--el-text-color-secondary);
    }
  }
}
</style>
