<template>
  <div class="registration-list">
    <h2>報名者清單</h2>
    <table>
      <thead>
        <tr>
          <th>姓名</th>
          <th>電子郵件</th>
          <th>報名時間</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="registration in registrations"
          :key="registration._id"
        >
          <td>{{ registration.name }}</td>
          <td>{{ registration.email }}</td>
          <td>{{ registration.registrationDate }}</td>
        </tr>
      </tbody>
    </table>
  
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="fetchRegistrations"
    />
  </div>
</template>
  
  <script>
  import Pagination from './Pagination.vue';
  
  export default {
    name: 'RegistrationList',
    components: {
      Pagination,
    },
    data() {
      return {
        registrations: [],
        currentPage: 1,
        totalPages: 5,
      };
    },
    created() {
      this.fetchRegistrations();
    },
    methods: {
      fetchRegistrations(page = this.currentPage) {
        // 使用 API 請求來獲取報名者清單資料
        console.log(`Fetching registrations for page ${page}`);
        // 假設的資料範例
        this.registrations = [
          { _id: '1', name: '張三', email: 'zhangsan@example.com', registrationDate: '2024-12-18' },
          { _id: '2', name: '李四', email: 'lisi@example.com', registrationDate: '2024-12-17' },
          { _id: '3', name: '王五', email: 'wangwu@example.com', registrationDate: '2024-12-16' },
        ];
      },
    },
  };
  </script>
  
  <style scoped>
  .registration-list {
    margin: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  Pagination {
    margin-top: 20px;
  }
  </style>
  