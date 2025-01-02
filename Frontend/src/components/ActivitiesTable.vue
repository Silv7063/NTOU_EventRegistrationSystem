<template>
  <div class="activities-table">
    <table>
      <thead>
        <tr>
          <th>活動名稱</th>
          <th>參與人數上限</th>
          <th>實際參與人數</th>
          <th>參與率</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(event, index) in events" :key="index">
          <td @click="toggleParticipantList(index)" class="clickable">
            {{ event.title }}
          </td>
          <td>{{ event.participantLimit }}</td>
          <td>{{ countParticipants(event.participants) }}</td>
          <td>{{ calculateRate(event.participantLimit, countParticipants(event.participants)) }}%</td>
        </tr>
        <div></div>
        <!-- 顯示參與者的序號與名字 -->
        <template v-if="selectedEventIndex !== null">
          <tr
            v-for="(participant, i) in participants"
            :key="'participant-' + i"
          >
            <td colspan="4">{{ i + 1 }}. {{ participant }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ActivitiesTable",
  props: {
    events: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedEventIndex: null, // 用來記錄目前顯示的活動
      participants: [], // 儲存當前活動的參與者詳細資訊
    };
  },
  methods: {
    countParticipants(participants) {
      return participants.length;
    },
    calculateRate(expected, actual) {
      if (!expected) return 0;
      const rate = (actual / expected) * 100;
      return rate.toFixed(2);
    },
    async toggleParticipantList(index) {
      if (this.selectedEventIndex === index) {
        this.selectedEventIndex = null;
        this.participants = [];
      } else {
        this.selectedEventIndex = index;
        await this.fetchParticipants(this.events[index].participants);
      }
    },
    async fetchParticipants(participantIds) {
      try {
        const fetchedParticipants = [];
        for (const userId of participantIds) {
          const response = await this.$axios.get(`users/get/${userId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          fetchedParticipants.push(response.data.username);
        }
        this.participants = fetchedParticipants;
      } catch (error) {
        console.error("無法取得參與者資訊", error);
      }
    },
  },
};
</script>

<style scoped>
.activities-table {
  margin: 20px 0;
  font-family: Arial, sans-serif;
  background-color: transparent;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background-color: transparent;
  color: #333;
}

thead {
  background-color: #e5e5e5;
}

th,
td {
  border: 1px solid #bbb;
  padding: 8px;
  text-align: left;
}

th {
  font-weight: 600;
}

.clickable {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}

.participant {
  background-color: #f9f9f9;
  text-align: left;
  padding-left: 20px;
  font-style: italic;
}
</style>
