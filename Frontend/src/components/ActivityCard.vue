<template>
  <div class="activity-card">
    <div class="activity-card-header">
      <h3 class="activity-title">
        {{ activity.title }}
      </h3>
      <span class="activity-date">{{ formattedDate }}</span>
    </div>
    <div class="activity-card-body">
      <p class="activity-description">
        {{ activity.description }}
      </p>
      <p class="activity-location">
        Location: {{ activity.location }}
      </p>
    </div>
    <div class="activity-card-footer">
      <button
        class="btn btn-primary"
        @click="goToActivityDetail"
      >
        View Details
      </button>
    </div>
  </div>
</template>
  
  <script>
  export default {
    props: {
      activity: {
        type: Object,
        required: true
      }
    },
    computed: {
      formattedDate() {
        const date = new Date(this.activity.date);
        return date.toLocaleDateString();  // Adjust as needed
      }
    },
    methods: {
      goToActivityDetail() {
        this.$router.push({ name: 'ActivityDetail', params: { id: this.activity._id } });
      }
    }
  };
  </script>
  
  <style scoped>
  .activity-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .activity-card-header {
    display: flex;
    justify-content: space-between;
  }
  
  .activity-title {
    font-size: 18px;
    font-weight: bold;
  }
  
  .activity-date {
    font-size: 14px;
    color: #555;
  }
  
  .activity-card-body {
    margin-top: 12px;
  }
  
  .activity-location {
    font-size: 14px;
    color: #777;
  }
  
  .activity-card-footer {
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
  