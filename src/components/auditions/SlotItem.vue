<!-- eslint-disable max-len -->
<template>
  <li>
    <div class="flex items-center justify-around px-8">
      <div class="w-3/4 relative">
        <input
          class="w-full py-2 pl-20 rounded-full border border-purple my-2 focus:outline-none"
          type="text"
          readonly
        >
        <span class="absolute text-purple left-0 py-2 px-4 my-2 border border-purple rounded-l-full">
          {{ data.time || data.number }}
        </span>
      </div>
      <div
        class="w-10 h-10 flex justify-center items-center rounded-full border border-purple cursor-pointer"
        :class="{ 'bg-purple': value }"
        @click="$emit('input', !value)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21.182"
          height="15.893"
          viewBox="0 0 21.182 15.893"
        >
          <path
            id="Path_3054"
            data-name="Path 3054"
            d="M17717.283,10215.319l6.916,6.856,10.027-11.582"
            transform="translate(-17715.162 -10208.479)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-width="3"
          />
        </svg>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    value: Boolean,
  },
};
</script>
