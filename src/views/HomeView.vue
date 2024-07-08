<template>
  <!-- Sidebar component -->
  <sidebar/>
  <!-- Main container -->
  <div class="container d-flex justify-content-center align-items-center">
    <div class="row mt-5">
      <!-- Graph column -->
      <div class="col-lg-12">
        <canvas id="graph"></canvas>
      </div>
      <!-- Data card column -->
      <div class="col-lg-4">
        <!-- Data cards can go here -->
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from '@/components/sidebar.vue'; 
import { Chart } from 'chart.js/auto'; 
import { toast } from "vue3-toastify"; 
import "vue3-toastify/dist/index.css"; 

export default {
  name: 'HomeView', // Component name
  components: {
    sidebar // Register sidebar component
  },
  data() {
    return {
      chart: null, // Chart instance
      pitch: 0 
    };
  },
  computed: {
    // Fetch users data 
    fetchUsers() {
      return this.$store.dispatch('fetchUsers');
    },
    // Retrieve JWT token from cookies
    jwt() {
      return this.$cookies.get('jwt');
    }
  },
  methods: {
    // Fetch payload data from Vuex store
    async fetchPayload() {
      await this.$store.dispatch('fetchPayload');
      return this.$store.state.payload;
    },
    // Convert sequence number to voltage
    async conversion() {
  try {
    await this.fetchPayload();
    const payloadData = this.$store.state.payload;

    if (!Array.isArray(payloadData)) {
      throw new Error("Payload data is not an array");
    }

    const convertedValues = payloadData.map(item => {
      const voltage = item.data;

      let convertedValue;

      if (voltage === "01") {
        convertedValue = "01";
      } else if (!isNaN(voltage)) {
        convertedValue = parseFloat(voltage);
      } else {
        convertedValue = parseFloat(String(voltage).replace(/[^0-9.-]+/g, ''));
      }

      console.log(convertedValue);

      return { ...item, data: convertedValue };
    });

    return convertedValues;

  } catch (error) {
    console.error("Error converting voltage:", error);
    return null;
  }
},
,
    // Calculate average time conversion
    async timeconversion() {
  try {
    await this.fetchPayload();
    const payloadData = this.$store.state.payload;

    if (!Array.isArray(payloadData)) {
      throw new Error("Payload data is not an array");
    }

    // Sum all time values in payloadData
    const totalTimes = payloadData.reduce((accumulator, dataPoint) => accumulator + dataPoint.time, 0);
    const averageMinutes = totalTimes / (payloadData.length * 60); // Calculate average minutes
    return averageMinutes.toFixed(2);

  } catch (error) {
    console.error("Error in timeconversion:", error);
    return null;
  }
},
,
    // Schedule reset alert for the device
    scheduleResetAlert(deviceId) {
      toast('Device will reset in 10 minutes', { theme: "dark", timeout: 3000 });

      setTimeout(() => {
        toast('Device is now resetting', { theme: "dark", timeout: 3000 });
        // Add your device reset logic here if applicable
      }, 10 * 60 * 1000); // 10 minutes in milliseconds
    },
    // Calculate pitch and roll based on accelerometer data
    async calculatePitchAndRoll() {
      try {
        await this.fetchPayload();
        const payloadData = await this.conversion(); // Use the conversion method to get the converted payload

        payloadData.forEach(dataPoint => {
          if (dataPoint.data === '01') {
            let initialOrientation = { pitch: 0, roll: 0 };

            let accelerometerData = [
              { time: '25551050', x: 28.0, y: -26.0, z: 0 } // Example accelerometer data
            ];

            accelerometerData.forEach(accelData => {
              // Calculate pitch based on accelerometer data
              let pitchChange = Math.atan2(accelData.y, Math.sqrt(accelData.x ** 2 + accelData.z ** 2));
              let pitch = pitchChange * (180 / Math.PI);

              // Calculate roll based on accelerometer data
              let rollChange = Math.atan2(accelData.z, accelData.x);
              let roll = rollChange * (180 / Math.PI);

              // Normalize pitch and roll values
              pitch = ((pitch + 180) % 360) - 180;
              roll = ((roll + 180) % 360) - 180;

              // Accumulate pitch and roll values
              initialOrientation.pitch += pitch;
              initialOrientation.roll += roll;
            });

            // Display toast if tampering detected
            if (Math.abs(initialOrientation.pitch) > 40 || Math.abs(initialOrientation.roll) > 40) {
              toast('Tamper detection: ' + dataPoint.data, { theme: "dark", timeout: 3000 });

              // Schedule reset alert for the device
              this.scheduleResetAlert(dataPoint.device);
            }

            // Log pitch and roll values
            console.log(`Pitch: ${initialOrientation.pitch} degrees, Roll: ${initialOrientation.roll}`);

            // Set pitch state
            this.pitch = initialOrientation.pitch.toFixed(2);
          }
        });
      } catch (error) {
        console.error("Error in calculatePitchAndRoll:", error);
      }
    },
    // Render chart using Chart.js
    async renderChart() {
  try {
    await this.fetchPayload();
    const payloadData = this.$store.state.payload;

    if (!Array.isArray(payloadData)) {
      throw new Error("Payload data is not an array");
    }

    // Extracting data for chart
    const labels = payloadData.map(dataPoint => dataPoint.time);
    const snrData = payloadData.map(dataPoint => parseFloat(dataPoint.snr));
    const avgSnrData = payloadData.map(dataPoint => parseFloat(dataPoint.avgSnr));
    const rssiData = payloadData.map(dataPoint => parseFloat(dataPoint.rssi));

    const ctx = document.getElementById('graph').getContext('2d');

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'SNR',
          data: snrData,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Avg SNR',
          data: avgSnrData,
          fill: false,
          borderColor: 'rgb(192, 75, 192)',
          tension: 0.1
        },
        {
          label: 'RSSI',
          data: rssiData,
          fill: false,
          borderColor: 'rgb(192, 192, 75)',
          tension: 0.1
        }
      ]
    };

    // Create new Chart.js instance
    if (this.chart) {
      this.chart.destroy(); // Destroy previous chart instance if exists
    }
    this.chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

  } catch (error) {
    console.error('Error rendering chart:', error);
    // Handle error as needed
  }
},

  },
  // Execute methods on component mount
  async mounted() {
    if (this.jwt) {
      await this.fetchPayload();
      await this.conversion();
      await this.renderChart();
      await this.timeconversion();
      await this.calculatePitchAndRoll();
    } else {
      alert('Please log in first to see the data.');
    }
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
