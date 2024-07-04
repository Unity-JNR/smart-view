<template>
  <sidebar/>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="row mt-5">
      <div class="col-lg-8">
        <canvas id="graph"></canvas>
      </div>
      <div class="col-lg-4">
        <div class="card">
          <div class="content">
            <p class="heading">Data</p>
            <ul class="data-list">
              <li>Device: {{ $store.state.payload.device }}</li>
              <li>Snr: {{ $store.state.payload.snr }}</li>
              <li>AvgSnr: {{ $store.state.payload.avgSnr }}</li>
              <li>Station: {{ $store.state.payload.station }}</li>
              <li>Rssi: {{ $store.state.payload.rssi }}</li>
              <li>Degrees: {{ pitch }}</li>
            </ul>
          </div>
        </div>
      </div>
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
      chart: null,
      pitch: 0
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
      let initialOrientation = { pitch: 0, roll: 0 };

      let accelerometerData = [
        { time: '25551050', x: 28.0, y: -26.0, z: 0 }
      ];

      accelerometerData.forEach(dataPoint => {
        let pitchChange = Math.atan2(dataPoint.y, Math.sqrt(dataPoint.x ** 2 + dataPoint.z ** 2));
        let pitch = pitchChange * (180 / Math.PI);

        let rollChange = Math.atan2(dataPoint.z, dataPoint.x);
        let roll = rollChange * (180 / Math.PI);

        pitch = ((pitch + 180) % 360) - 180;
        roll = ((roll + 180) % 360) - 180;

        initialOrientation.pitch += pitch;
        initialOrientation.roll += roll;
      });

      if (Math.abs(initialOrientation.pitch) > 40 || Math.abs(initialOrientation.roll) > 40) {
        console.log(payloadData.data);
      }

      console.log(`Pitch: ${initialOrientation.pitch} degrees, Roll: ${initialOrientation.roll} degrees`);

      this.pitch = initialOrientation.pitch.toFixed(2);
    },

    async renderChart() {
      const ctx = document.getElementById('graph').getContext('2d');
      const labels = [1596940.63, 319388125875, 6387762.52, 12775525.04, await this.timeconversion()];
      const data = {
        labels: labels,
        datasets: [{
          label: 'Data',
          data: [0.100, 0.200, 0.300, 0.400, await this.conversion()],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };

      this.chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
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

<style scoped>
.container {
  height: 100vh;
}

.row {
  width: 100%;
}

#graph {
  width: 100% !important;
  height: 500px !important;
}

.card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 320px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 32px;
  overflow: hidden;
  border-radius: 10px;
  background: #212121;
  border: 2px solid #313131;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  margin-top: 5rem;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  color: #e8e8e8;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
}

.content .heading {
  font-weight: 700;
  font-size: 32px;
}

.data-list {
  list-style: none;
  padding: 0;
}

.data-list li {
  line-height: 1.5;
}

.card:hover {
  box-shadow: 0 0 20px rgba(9, 117, 241, 0.8);
  border-color: #0974f1;
}

.content .btn:hover {
  outline: 2px solid #e8e8e8;
  background: transparent;
  color: #e8e8e8;
}
</style>
