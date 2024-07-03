<template>
  <!-- <sidebar/> -->
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-6">
        <h2>Device Information</h2>
        <p >Device ID: {{ $store.state.payload.device }}</p>
        <p >Time: {{ $store.state.payload.time }}</p>
        <!-- Add more fields as needed -->
      </div>
      <div id="graph"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import sidebar from '@/components/sidebar.vue'




export default {
  name: 'HomeView',
  components: {
  sidebar
  },
  data() {
    return {
      
    

    }
  },
  computed : {
    fetchUsers(){
      this.$store.dispatch('fetchUsers')
    }
    ,
    fetchPayload(){
      this.$store.dispatch('fetchPayload')
      // this.payloadData = this.$store.state.payload
    }
  },
  methods: {
    conversion(){
      const voltage = this.$store.state.payload.seqNumber
      const volt = 615/1000
      console.log(volt);

    }
  },
  mounted() {
    this.fetchUsers,
    this.fetchPayload,
    this.conversion()
  },
  
  
       

}
</script>
