<template>
  <button :style="buttonStyle" :type="type">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { TButtonType } from "@/types";

const props = defineProps({
  bgColor: {
    type: String,
    default: "blue",
  },
  color: {
    type: String,
    default: "white",
  },
  rounded: Boolean,
  type: {
    type: String as () => TButtonType,
    default: "button",
  },
});

const buttonStyle = {
  backgroundColor: props.bgColor,
  color: props.color,
  borderRadius: props.rounded ? "50px" : "4px",
  padding: "10px 20px",
  cursor: "pointer",
  border: "none",
  outline: "none",
  transition: "background-color 0.3s, color 0.3s",
};
</script>
