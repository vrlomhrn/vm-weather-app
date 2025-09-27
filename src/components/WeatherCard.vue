<template>
  <div class="nature-card p-6">
    <!-- Search Section -->
    <div class="mb-6">
      <div class="flex gap-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Enter city name..."
          class="flex-1 px-4 py-2 border border-nature-sage/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-nature-moss"
          @keyup.enter="fetchWeather"
        />
        <button @click="fetchWeather" class="nature-btn" :disabled="loading">
          {{ loading ? "🔍" : "Search" }}
        </button>
      </div>
    </div>

    <!-- Weather Display -->
    <div v-if="weather" class="space-y-4">
      <!-- Current Weather -->
      <div class="text-center">
        <h2 class="text-2xl font-semibold text-nature-forest mb-2">
          {{ weather.name }}, {{ weather.sys.country }}
        </h2>
        <div class="flex items-center justify-center gap-4 mb-4">
          <img
            :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
            :alt="weather.weather[0].description"
            class="w-16 h-16"
          />
          <div>
            <div class="text-4xl font-bold text-nature-forest">
              {{ Math.round(weather.main.temp) }}°C
            </div>
            <div class="text-nature-earth">
              {{ weather.weather[0].description }}
            </div>
          </div>
        </div>
      </div>

      <!-- Weather Details -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center p-3 bg-nature-sage/10 rounded-lg">
          <div class="text-sm text-nature-earth">Feels like</div>
          <div class="text-lg font-semibold text-nature-forest">
            {{ Math.round(weather.main.feels_like) }}°C
          </div>
        </div>
        <div class="text-center p-3 bg-nature-sage/10 rounded-lg">
          <div class="text-sm text-nature-earth">Humidity</div>
          <div class="text-lg font-semibold text-nature-forest">
            {{ weather.main.humidity }}%
          </div>
        </div>
        <div class="text-center p-3 bg-nature-sage/10 rounded-lg">
          <div class="text-sm text-nature-earth">Wind</div>
          <div class="text-lg font-semibold text-nature-forest">
            {{ Math.round(weather.wind.speed * 3.6) }} km/h
          </div>
        </div>
        <div class="text-center p-3 bg-nature-sage/10 rounded-lg">
          <div class="text-sm text-nature-earth">Pressure</div>
          <div class="text-lg font-semibold text-nature-forest">
            {{ weather.main.pressure }} hPa
          </div>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="text-center py-8">
      <div class="text-red-600 mb-2">{{ error }}</div>
      <button
        @click="error = null"
        class="text-nature-moss hover:text-nature-forest"
      >
        Try again
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="text-nature-earth">🌿 Fetching weather data...</div>
    </div>

    <!-- Initial State -->
    <div v-if="!weather && !loading && !error" class="text-center py-8">
      <div class="text-nature-earth mb-4">
        🌍 Search for a city to see the weather
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "WeatherCard",
    data() {
      return {
        searchQuery: "",
        weather: null,
        loading: false,
        error: null,
        // API key from environment variable
        apiKey: import.meta.env.VITE_OPENWEATHER_API_KEY,
      };
    },
    methods: {
      async fetchWeather() {
        if (!this.searchQuery.trim()) {
          this.error = "Please enter a city name";
          return;
        }

        if (!this.apiKey) {
          this.error = "Please add your OpenWeather API key to the .env file";
          return;
        }

        this.loading = true;
        this.error = null;

        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.searchQuery}&appid=${this.apiKey}&units=metric`
          );
          this.weather = response.data;
        } catch (err) {
          this.error =
            err.response?.data?.message || "Failed to fetch weather data";
        } finally {
          this.loading = false;
        }
      },
    },
  };
</script>
