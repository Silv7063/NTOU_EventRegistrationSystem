<template>
    <div class="activities-table">
      <table>
        <thead>
          <tr>
            <th>活動名稱</th>
            <th>應參與人數</th>
            <th>實際參與人數</th>
            <th>參與率</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(activity, index) in activities" :key="index">
            <td>{{ activity.name }}</td>
            <td>{{ activity.expected }}</td>
            <td>{{ activity.actual }}</td>
            <td>{{ calculateRate(activity.expected, activity.actual) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: "ActivitiesTable",
    props: {
      activities: {
        type: Array,
        required: true,
      },
    },
    methods: {
      calculateRate(expected, actual) {
        if (!expected) return 0;
        const rate = (actual / expected) * 100;
        return rate.toFixed(2);
      },
    },
  };
  </script>
  
  <style scoped>
  /* 容器本身保持透明，不加任何背景色 */
  .activities-table {
    margin: 20px 0;
    font-family: Arial, sans-serif;
    background-color: transparent; /* 保持容器背景透明 */
  }
  
  /* 表格本身也維持透明背景 */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    background-color: transparent; /* 保持表格背景透明 */
    color: #333; /* 文字顏色加深，方便閱讀 */
  }
  
  /* 表頭可稍微加深底色，提高辨識度 */
  thead {
    background-color: #e5e5e5; 
  }
  
  /* 加深邊框顏色 & 文字顏色 */
  th,
  td {
    border: 1px solid #bbb; 
    padding: 8px;
    text-align: left;
    /* 若想讓文字更深，再加上:
       color: #222;
    */
  }
  
  /* 表頭文字加粗  */
  th {
    font-weight: 600;
  }
  </style>
  