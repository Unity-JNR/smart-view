<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-6">
        <h2>Device Information</h2>
        <p >Device ID: {{ payloadData.device }}</p>
        <p >Time: {{ payloadData.time }}</p>
        <!-- Add more fields as needed -->
      </div>
      <div class="col-md-6">
        <canvas id="snrChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src




export default {
  name: 'HomeView',
  components: {
  
  },
  data() {
    return {
      payloadData: [],

    }
  },
  computed : {
    fetchUsers(){
      this.$store.dispatch('fetchUsers')
    }
    ,
    fetchPayload(){
      this.$store.dispatch('fetchPayload')
      this.payloadData = this.$store.state.payload[0]
    }
  },
  mounted() {
    this.fetchUsers,
    this.fetchPayload
  },
  
  
       

}
</script>
