<template>
  <sidebar/>
  <div class="container">
    <div class="row mt-5">
      <canvas id="graph"></canvas>
    </div>
  </div>
</template>

<script>
import sidebar from '@/components/sidebar.vue';
import { Chart } from 'chart.js/auto';

export default {
  name: 'HomeView',
  components: {
    sidebar
  },
  data() {
    return {
      chart: null
    };
  },
  computed: {
    fetchUsers() {
      return this.$store.dispatch('fetchUsers');
    }
  },
  methods: {
    async fetchPayload() {
      await this.$store.dispatch('fetchPayload');
      return this.$store.state.payload;
    },
    async conversion() {
      const payloadData = await this.fetchPayload();
      const voltage = payloadData.seqNumber;
      const volt = 615 / 1000;
      console.log(volt);
      return volt;
    },
    async timeconversion() {
      const payloadData = await this.fetchPayload();
      const minutes = payloadData.time / 60;
      console.log(minutes.toFixed(2));
      return minutes.toFixed(2);
    },
    async calculatePitchAndRoll() {
      const payloadData = await this.fetchPayload();
      // Assuming the device starts in a known orientation (flat)
      let initialOrientation = { pitch: 0, roll: 0 };

      // Replace this example accelerometerData with actual data from your application
      let accelerometerData = [
        { time: '25551050', x: 28.0, y: -26.0, z: 0 }
      ];

      accelerometerData.forEach(dataPoint => {
        // Calculate pitch
        let pitchChange = Math.atan2(dataPoint.y, Math.sqrt(dataPoint.x ** 2 + dataPoint.z ** 2));
        let pitch = pitchChange * (180 / Math.PI); // Convert radians to degrees

        // Calculate roll
        let rollChange = Math.atan2(dataPoint.z, dataPoint.x);
        let roll = rollChange * (180 / Math.PI); // Convert radians to degrees

        // Normalize pitch and roll to range between -180 and 180 degrees
        pitch = ((pitch + 180) % 360) - 180;
        roll = ((roll + 180) % 360) - 180;

        // Accumulate pitch and roll values across all data points
        initialOrientation.pitch += pitch;
        initialOrientation.roll += roll;
      });

      // Check if pitch or roll exceeds 40 degrees
      if (Math.abs(initialOrientation.pitch) > 40 || Math.abs(initialOrientation.roll) > 40) {
        alert(payloadData.data);
        // console.log(payloadData.data);
      }

      // Optionally, you may want to store or use initialOrientation here
      console.log(`Pitch: ${initialOrientation.pitch} degrees, Roll: ${initialOrientation.roll} degrees`);

      return initialOrientation; // Return the final pitch and roll
    },

    async renderChart() {
      const ctx = document.getElementById('graph').getContext('2d');
      const labels = [1596940.629, 319388125875, 6387762.5175, 12775525.035, await this.timeconversion()];
      const data = {
        labels: labels,
        datasets: [{
          label: 'My First Dataset',
          data: [0.100, 0.200, 0.300, 0.400, 0.500, await this.conversion()],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };

      this.chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {}
      });
    }
  },

  async mounted() {
    await this.fetchUsers;
    await this.fetchPayload();
    await this.conversion();
    await this.renderChart();
    await this.timeconversion();
    await this.calculatePitchAndRoll();
  }
};
</script>
