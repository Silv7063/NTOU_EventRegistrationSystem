<template>
  <div class="event-card">
    <div class="event-card-header">
      <h3 class="event-title">
        {{ event.title }}
      </h3>
      <span class="event-date">{{ formattedDate }}</span>
    </div>
    <div class="event-card-body">
      <p class="event-description">
        {{ event.description }}
      </p>
      <p class="event-location">
        Location: {{ event.location }}
      </p>
    </div>
    <div class="event-card-footer">
      <button
        class="btn btn-primary"
        @click="goToEventDetail"
      >
        View Details
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedDate() {
      const date = new Date(this.event.date);
      return date.toLocaleDateString('zh-TW');  
    }
  },
  methods: {
    goToEventDetail() {
      this.$router.push({ path: `event/${this.event._id}` });
    }
  }
};
</script>

<style scoped>
.event-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  width: 80%; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  align-items: center;
  margin-left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
}

.event-card-header {
  display: flex;
  justify-content: space-between;
}

.event-title {
  font-size: 18px;
  font-weight: bold;
}

.event-date {
  font-size: 14px;
  color: #555;
}

.event-card-body {
  margin-top: 12px;
}

.event-description {
  font-size: 14px;
  color: #777;
}

.event-location {
  font-size: 14px;
  color: #777;
}

.event-card-footer {
  margin-top: 16px;
  text-align: right;
}

.btn {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

</style>
