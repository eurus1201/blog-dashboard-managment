<template>
  <div
    v-if="visible"
    :class="['toast', 'position-fixed', 'top-0', 'end-0', 'm-3', statusClass]"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    data-delay="3000"
  >
    <div class="toast-header">
      <strong class="mr-auto">{{ status }}</strong>
      <button
        type="button"
        class="ml-2 mb-1 close"
        @click="closeToast"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  computed: {
    statusClass() {
      return this.status === "Success" ? "bg-success" : "bg-danger";
    },
  },
  methods: {
    closeToast() {
      this.visible = false;
    },
  },
};
</script>

<style scoped></style>
