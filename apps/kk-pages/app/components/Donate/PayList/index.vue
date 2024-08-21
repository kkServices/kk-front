<script setup lang="ts">
const { data, status } = await useRequest('/donate/order/recent', {
  server: false,
});

const totalAmount = computed(() => {
  return data.value?.reduce((total, item) => total + item.totalAmount, 0) || 0;
});
</script>

<template>
  <div>
    <h3 class="border-b-2 border-[#ddd] pb-2 text-2xl">
      施舍记录
    </h3>

    <div class="mt-4 flex flex-col gap-4">
      <template v-for="item in data" :key="item.id">
        <DonatePayListItem
          :amount="item.totalAmount"
          :message="item.message || ''"
          :email-hash="item.emailHash"
          :time="item.time"
          :user-name="item.userName || ''"
        />
      </template>
      <DonatePayListItemLoading :class="{ hidden: status === 'success' }" />
    </div>

    <div>
      <p class="mt-4 flex items-center text-base">
        小记：<i class="icon-[f7--money-yen]" /> {{ totalAmount }}
      </p>
      <p class="text-xs text-gray-300 dark:text-gray-600">
        仅包含¥1元以上的记录
      </p>
    </div>
  </div>
</template>
