<template>
  <div>
    <h1>Welcome to the Event Registration System</h1>
    <EventList />
  </div>
</template>

<script>
import EventList from '../components/EventList.vue';

export default {
  name: 'Home',
  components: {
    EventList
  }
};
</script>
